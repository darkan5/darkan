<?php namespace App\Modules\Editor;

use DB;
use Auth;
use App\User;
use App\Modules\Ocs\Ocs;
use App\Modules\Models\ProjectVersion;
use App\Modules\Models\Projects;
use stdClass;
use ZipArchive;

class ProjectVersions {

     private $data = array();
        private $zip;
        private $request;
        private $ocs;
        
        function run($data) {

            $ocs_container_projects = config('app.ocs_container_projects');
            $ocs_container_banners = config('app.ocs_container_banners');

            // SESSION_METHOD::sessionStart();

            $this->request = $data['request'];

            //echo $this->request;
            
            switch((int)$this->request['request']) {
                // lista
                case 10:
                    $this->version_list();
                    break;
                
                // stworz nowa wersje
                case 11:
                    $this->ocs = new Ocs($ocs_container_projects, $ocs_container_banners);
                    $this->save_new_version();
                    $this->version_list();
                    break;
                
                // przywrocenie wersji projektu
                case 12:
                    $this->ocs = new Ocs($ocs_container_projects, $ocs_container_banners);
                    $this->restore_version();
                    break;
                
                // usuwnaie wersji projektu
                case 13:
                    $this->ocs = new Ocs($ocs_container_projects, $ocs_container_banners);
                    $this->delete_version();
                    $this->version_list();
                    break;
            }

            return $this->data;
        }
        
        private function delete_version() {
            
            $version_id = $this->request['version_id'];
            $project_id = $this->get_project_id($version_id);

            if ($project_id) {

                $projectData = Projects::find($project_id);

                if ($projectData) {
                    $realProjectUID = $projectData->user_id;
                
                    $path_project = config('app.projects_folder') . '/' . $realProjectUID.'/'.$project_id.'/';
                    
                    // $qu = $database->query("SELECT * FROM `project_version` WHERE `id`='$version_id' LIMIT 1");
                    $versionRow = ProjectVersion::find($version_id);
                    
                    if ($versionRow) {
                        $dir = $versionRow['dir'];
                        if (file_exists($path_project . '/versions/' . $dir)) {
                            $this->rrmdir($path_project . '/versions/' . $dir);
                        }

                        $this->ocs->delete($this->ocs->container_projects, 'projects/' . $realProjectUID . '/' . $project_id . '/versions/' . $dir . '/' . $dir . '.zip');
                        
                        // $qu1 = $database->query("DELETE FROM `project_version` WHERE `id`='$version_id'");
                        $versionRow->delete();
                        $this->data['delete'] = 'ok';
                    }
                }
            }
        }
        
        // tworznie nowej wersji
        private function save_new_version() {
            $this->data['powrot'] = 'ok, wszystko dziala!';
            
            $project_id = $this->request['project_id'];
            $dir = date('Y_m_d_H_i_s');
            $description = $this->request['description'];
            $date = $this->request['date'];

            $projectData = Projects::find($project_id);

            if ($projectData) {
                $realProjectUID = $projectData->user_id;

                $user_id = 0;
                if (Auth::check()){
                    $user_id = Auth::user()->id;
                }

                $path_project = config('app.projects_folder') . '/' . $realProjectUID.'/'.$project_id.'/';
                        

                if (!file_exists($path_project . 'versions')) {
                    mkdir($path_project . 'versions');
                }
                
                if (!file_exists($path_project . 'versions/' . $dir)) {
                    mkdir($path_project . 'versions/' . $dir);
                }
                
                $file_arch = $path_project . 'versions/' . $dir . '/' . $dir . '.zip';

                $this->zip = new ZipArchive();

                if ($this->zip->open($file_arch, ZIPARCHIVE::CREATE) !==TRUE) {
                    exit ("nie mogę zrobić pliku archiwum <$file_arch>");
                }
                
                $this->zip_dir($path_project . 'pre', $path_project . 'pre', 'pre/');
                $this->zip_dir($path_project . 'sitemap', $path_project . 'sitemap', 'sitemap/');
                
                $this->zip->close();
                
                if (file_exists($path_project . 'versions/' . $dir . '/' . $dir . '.zip')) {

                    $filesize = filesize($path_project . 'versions/' . $dir . '/' . $dir . '.zip');
                    
                    // $qu = $database->query("INSERT INTO `project_version` (`id`, `project_id`, `user_id`, `date`, `dir`, `description`, `size`) VALUES ('', '$project_id', '$user_id', '$date', '$dir', '$description', '$filesize')");
                    $newVersion = new ProjectVersion();
                    $newVersion->project_id = $project_id;
                    $newVersion->user_id = $user_id;
                    $newVersion->date = $date;
                    $newVersion->dir = $dir;
                    $newVersion->description = $description;
                    $newVersion->size = $filesize;
                    $newVersion->save();

                    $this->ocs->put($this->ocs->container_projects, $path_project . 'versions/' . $dir . '/' . $dir . '.zip', 'projects/' . $realProjectUID . '/' . $project_id . '/versions/' . $dir . '/' . $dir . '.zip');

                    unlink($path_project . 'versions/' . $dir . '/' . $dir . '.zip');
                    rmdir($path_project . 'versions/' . $dir);

                }

            }
            
        }
        
        // przywracanie wersji
        private function restore_version() {
            
            $save = $this->request['save'];
            if ($save == 1) {
                $this->request['description'] = '';
                $this->save_new_version();
            }
            
            $version_id = $this->request['version_id'];
            $project_id = $this->get_project_id($version_id);

            if ($project_id) {

                $projectData = Projects::find($project_id);

                if ($projectData) {
                    $realProjectUID = $projectData->user_id;
                
                    $path_project = config('app.projects_folder') . '/' . $realProjectUID.'/'.$project_id.'/';

                    if (file_exists($path_project . 'pre')) {
                        $this->rrmdir($path_project . 'pre');
                    }
                    
                    if (file_exists($path_project . 'sitemap')) {
                        $this->rrmdir($path_project . 'sitemap');
                    }
                    
                    mkdir($path_project . 'pre');
                    mkdir($path_project . 'pre/exported');
                    mkdir($path_project . 'pre/exported_view');
                    mkdir($path_project . 'sitemap');
                    
                    // $qu = $database->query("SELECT * FROM `project_version` WHERE `id`='$version_id' LIMIT 1");
                    
                    $versionRow = ProjectVersion::find($version_id);

                    if ($versionRow) {
                        if (!file_exists($path_project . 'versions/')) {
                            mkdir($path_project . 'versions/');
                        }

                        if (!file_exists($path_project . 'versions/' . $versionRow['dir'])) {
                            mkdir($path_project . 'versions/' . $versionRow['dir']);
                        }

                        $file_arch = $path_project . 'versions/' . $versionRow['dir'] . '/' . $versionRow['dir'] . '.zip';

                        if (!file_exists($path_project . 'versions/' . $versionRow['dir'] . '/' . $versionRow['dir'] . '.zip')) {
                            $this->ocs->get($this->ocs->container_projects, 'projects/' . $realProjectUID . '/' . $project_id . '/versions/' . $versionRow['dir'] . '/' . $versionRow['dir'] . '.zip', $file_arch);
                        }
                        
                        $zip = new ZipArchive();
                        $zip->open($file_arch);
                        $zip->extractTo($path_project);
                        $zip->close();

                        unlink($path_project . 'versions/' . $versionRow['dir'] . '/' . $versionRow['dir'] . '.zip');
                        rmdir($path_project . 'versions/' . $versionRow['dir']);
                    }
                }
            }

        }
        
        // lista wszystki wersji
        private function version_list() {
            
            $project_id = $this->request['project_id'];
            
            // $qu = $database->query("SELECT 
            //     `project_version`.`id` as `id`, 
            //     `project_version`.`date` as `date`, 
            //     `project_version`.`description` as `description`, 
            //     `project_version`.`size` as `size`, 
            //     `users`.`login` as `login` 
            //     FROM `project_version` 
            //     LEFT JOIN `users` 
            //     ON `project_version`.`user_id`=`users`.`user_id`
            //     WHERE `project_id`='$project_id' ORDER BY `date` DESC");

            $versionsList = ProjectVersion::where('project_id', '=', $project_id)->get();
            $this->data['list'] = array();

            $i = 0;
            foreach ($versionsList as $version) {
                $this->data['list'][$i] = array();
                $this->data['list'][$i]['id'] = $version['id'];
                $this->data['list'][$i]['date'] = $version['date'];
                $this->data['list'][$i]['description'] = $version['description'];
                $this->data['list'][$i]['size'] = $version['size'];
                $this->data['list'][$i]['login'] = $version->user->email;
                $i++;
            }
        }
        
        private function get_project_id($id) {

            // $qu = $database->query("SELECT * FROM `project_version` WHERE `id`='$_id' LIMIT 1");
            $project = ProjectVersion::find($id);
            if ($project) {
                $project_id = $project->project_id;
                return $project_id;
            }

            return false;
            
        }
        
        private function rrmdir($dir) {
            if (is_dir($dir)) {
                $objects = scandir($dir);
                foreach ($objects as $object) {
                    if ($object != "." && $object != "..") {
                        if (filetype($dir . "/" . $object) == "dir")
                            $this->rrmdir($dir . "/" . $object); else
                            unlink($dir . "/" . $object);
                    }
                }
                reset($objects);
                rmdir($dir);
            }
        }
        
        private function copy_dir($source, $dest) {
            foreach (
                $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($source),
                RecursiveIteratorIterator::SELF_FIRST) as $item
            ) {
            if ($item->isDir()) {
                    if (!file_exists($dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName()))
                        mkdir($dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName());
                } else {
                    $kk = explode(DIRECTORY_SEPARATOR, $item);
                    copy($item, $dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName());
                }
            }
        }
        
        private function zip_dir($dir, $dir2, $dir3) {
            if (is_dir($dir)) {
                $objects = scandir($dir);
                foreach ($objects as $object) {
                    if ($object != "." && $object != "..") {

                        if (filetype($dir . "/" . $object) == "dir") {
                            //echo 'folder - '.$dir."/".$object.'<br/>';
                            $this->zip_dir($dir . "/" . $object, $dir2, $dir3);
                        } else {
                            if (isset($dir3) && $dir3 != '')
                                $this->zip->addFile($dir . '/' . $object, $dir3 . substr($dir . "/" . $object, strlen($dir2) + 1));
                            else
                                $this->zip->addFile($dir . '/' . $object, substr($dir . "/" . $object, strlen($dir2) + 1));
                        }
                    }
                }
                reset($objects);
            }
        }
	

	
}