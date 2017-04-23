<?php
    /* mscislaw */

    require_once '../../../config_login.php';
    require_once '../../php/database.php';
    require_once '../../php/ocs.php';

    require_once '../../php/session.php';
    
//    session_set_cookie_params(28800, '/', '.' . $CFG['DOMAIN']);
//    session_start();
    
    Class PVersion {
        private $data = array();
        private $zip;
        private $request;
        private $ocs;
        
        function __construct($ocs_container_projects, $ocs_container_banners) {

            // SESSION_METHOD::sessionStart();

            $this->request = $_POST['request'];

            //echo $this->request;
            
            switch((int)$this->request['request']) {
                // lista
                case 10:
                    $this->version_list();
                    break;
                
                // stworz nowa wersje
                case 11:
                    $this->ocs = new OCS($ocs_container_projects, $ocs_container_banners);
                    $this->save_new_version();
                    $this->version_list();
                    break;
                
                // przywrocenie wersji projektu
                case 12:
                    $this->ocs = new OCS($ocs_container_projects, $ocs_container_banners);
                    $this->restore_version();
                    break;
                
                // usuwnaie wersji projektu
                case 13:
                    $this->ocs = new OCS($ocs_container_projects, $ocs_container_banners);
                    $this->delete_version();
                    $this->version_list();
                    break;
            }
        }
        
        function __destruct() {
            $this->send_data();
        }
        
        private function delete_version() {
            global $database, $prefix;
            
//            $project_id = $this->request['project_id'];
            $version_id = $database->mysql_conn->real_escape_string($this->request['version_id']);
            $project_id = $this->get_project_id($version_id);

            $realProjectUID = getProjectUserId($project_id);
            
            $path_project = '../../projects/' . $realProjectUID.'/'.$project_id.'/';
            
            $qu = $database->query("SELECT * FROM `project_version` WHERE `id`='$version_id' LIMIT 1");
            
            while ($ret = $qu->fetch_assoc()) {
                $dir = $ret['dir'];
                if (file_exists($path_project . 'versions/' . $dir)) {
                    $this->rrmdir($path_project . 'versions/' . $dir);
                }

                $this->ocs->delete($this->ocs->container_projects, 'projects/' . $realProjectUID . '/' . $project_id . '/versions/' . $dir . '/' . $dir . '.zip');
                
                $qu1 = $database->query("DELETE FROM `project_version` WHERE `id`='$version_id'");
                
                $this->data['delete'] = 'ok';
            }
        }
        
        // tworznie nowej wersji
        private function save_new_version() {
            global $database, $prefix;
            $this->data['powrot'] = 'ok, wszystko dziala!';
            
            $project_id = $database->mysql_conn->real_escape_string($this->request['project_id']);
            $dir = date('Y_m_d_H_i_s');
            $description = $database->mysql_conn->real_escape_string($this->request['description']);
            $date = $database->mysql_conn->real_escape_string($this->request['date']);


            $realProjectUID = getProjectUserId($project_id);
            
            if (SESSION_METHOD::isLogged()) {
                $user_id = SESSION_METHOD::sessionGet('user_id');
            } else {
                $user_id = 0;
            }
            
            $path_project = '../../projects/' . $realProjectUID.'/'.$project_id.'/';
            
//            $qu = $database->query("INSERT INTO `project_version` (`id`, `project_id`, `date`, `dir`, `description`) VALUES ('', '$project_id', NOW(), '$dir', '$description')");
            

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
            
            $filesize = filesize($path_project . 'versions/' . $dir . '/' . $dir . '.zip');
            
            $qu = $database->query("INSERT INTO `project_version` (`id`, `project_id`, `user_id`, `date`, `dir`, `description`, `size`) VALUES ('', '$project_id', '$user_id', '$date', '$dir', '$description', '$filesize')");

            // // $ocs = new OCS();

            $this->ocs->put($this->ocs->container_projects, $path_project . 'versions/' . $dir . '/' . $dir . '.zip', 'projects/' . $realProjectUID . '/' . $project_id . '/versions/' . $dir . '/' . $dir . '.zip');

            unlink($path_project . 'versions/' . $dir . '/' . $dir . '.zip');
            rmdir($path_project . 'versions/' . $dir);
        }

        // private function check_project_size($project_id) {
        //     global $database, $prefix, $login_id_share;

        //     $size = 0;

        //     $qu = $database->query("SELECT * FROM `project_version` WHERE `project_id`='$project_id'");
        //     while ($ret = $qu->fetch_assoc()) {
        //         $size += $ret['size'];
        //     }
        // }
        
        // przywracanie wersji
        private function restore_version() {
            global $database, $prefix;
            
            $save = $this->request['save'];
            if ($save == 1) {
                $this->request['description'] = '';
                $this->save_new_version();
            }
            
            $version_id = $database->mysql_conn->real_escape_string($this->request['version_id']);
            $project_id = $this->get_project_id($version_id);
//            $project_id = $this->request['project_id'];

            $realProjectUID = getProjectUserId($project_id);
            
            $path_project = '../../projects/' . $realProjectUID.'/'.$project_id.'/';
            
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
            
            $qu = $database->query("SELECT * FROM `project_version` WHERE `id`='$version_id' LIMIT 1");
            
            while ($ret = $qu->fetch_assoc()) {
                if (!file_exists($path_project . 'versions/')) {
                    mkdir($path_project . 'versions/');
                }

                if (!file_exists($path_project . 'versions/' . $ret['dir'])) {
                    mkdir($path_project . 'versions/' . $ret['dir']);
                }

                $file_arch = $path_project . 'versions/' . $ret['dir'] . '/' . $ret['dir'] . '.zip';

                if (!file_exists($path_project . 'versions/' . $ret['dir'] . '/' . $ret['dir'] . '.zip')) {
                    $this->ocs->get($this->ocs->container_projects, 'projects/' . $realProjectUID . '/' . $project_id . '/versions/' . $ret['dir'] . '/' . $ret['dir'] . '.zip', $file_arch);
                }

                
                $zip = new ZipArchive();
                $zip->open($file_arch);
                $zip->extractTo($path_project);
                $zip->close();

                unlink($path_project . 'versions/' . $ret['dir'] . '/' . $ret['dir'] . '.zip');
                rmdir($path_project . 'versions/' . $ret['dir']);
            }
        }
        
        // lista wszystki wersji
        private function version_list() {
            global $database;
            
            $project_id = $database->mysql_conn->real_escape_string($this->request['project_id']);
            
            $qu = $database->query("SELECT `project_version`.`id` as `id`, `project_version`.`date` as `date`, `project_version`.`description` as `description`, `project_version`.`size` as `size`, `users`.`login` as `login` FROM `project_version` LEFT JOIN `users` ON `project_version`.`user_id`=`users`.`user_id` WHERE `project_id`='$project_id' ORDER BY `date` DESC");
            
            $this->data['list'] = array();
            
            $i = 0;
            while ($ret = $qu->fetch_assoc()) {
                $this->data['list'][$i] = array();
                $this->data['list'][$i]['id'] = $ret['id'];
                $this->data['list'][$i]['date'] = $ret['date'];
                $this->data['list'][$i]['description'] = $ret['description'];
                $this->data['list'][$i]['size'] = $ret['size'];
                $this->data['list'][$i]['login'] = $ret['login'];
                $i++;
            }
        }
        
        private function get_project_id($id) {
            global $database;
            
            $project_id = 0;
            
            $_id = $database->mysql_conn->real_escape_string($id);
            $qu = $database->query("SELECT * FROM `project_version` WHERE `id`='$_id' LIMIT 1");
            while ($ret = $qu->fetch_assoc()) {
                $project_id = $ret['project_id'];
            }
            
            return $project_id;
        }
        
        private function send_data() {
            echo json_encode($this->data);
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
    
    $pversion = new PVersion($ocs_container_projects, $ocs_container_banners);

?>
