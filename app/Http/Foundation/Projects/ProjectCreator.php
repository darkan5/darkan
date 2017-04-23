<?php

namespace App\Http\Foundation\Projects;

use Auth;
use File;
use ZipArchive;

use App\Modules\Models\Projects;

trait ProjectCreator
{

    protected function getProjectsByUser($userId){

        return Projects::where('user_id', '=', $userId)
                ->get();

    }

    protected function getUserDirectory(){

        return storage_path('app/projects/') . Auth::user()->id;
    }

    protected function getProjectDirectory($userDirectory, $project){
        
        return $userDirectory . '/' . $project->project_id;
    }

    protected function deleteProjectFiles($project)
    {
        $userDirectory = $this->getUserDirectory();
        $projectDirectory = $this->getProjectDirectory($userDirectory, $project);

        if($projectDirectory){
            File::deleteDirectory($projectDirectory, false);
            return true;
        }

        return false;
    }

    protected function checkAccessToProject($projectId){

        return Projects::where('user_id', '=', Auth::user()->id)
                ->where('project_id', '=', $projectId)
                ->first();
    }

    public function extractProjectFiles($projectFile, $project){

        $userDirectory = $this->getUserDirectory();
        $projectDirectory = $this->getProjectDirectory($userDirectory, $project);

        if (!file_exists($userDirectory)) {
            mkdir($userDirectory);
        }

        if (!file_exists($projectDirectory)) {
            mkdir($projectDirectory);
        }

        File::deleteDirectory($projectDirectory, true);

        copy($projectFile, $projectDirectory . '/'. 'project.zip' );

        $zip = new ZipArchive();
        $zip->open($projectDirectory . '/project.zip');
        $zip->extractTo($projectDirectory);
        $zip->close();

        $notAllowedExtensions = ['bat','exe','cmd','sh','php','pl','cgi','386','dll','com','torrent','app','jar','pif','vb','vbscript','wsf','asp','cer','csr','jsp','drv','sys','ade','adp','bas','chm','cpl','crt','csh','fxp','hlp','hta','inf','ins','isp','jse','htaccess','htpasswd','ksh','lnk','mdb','mde','mdt','mdw','msc','msi','msp','mst','ops','pcd','prg','reg','scr','sct','shb','shs','url','vbe','vbs','wsc','wsf','wsh'];


        File::delete($projectDirectory . '/project.zip');

        $files = File::allFiles($projectDirectory);

        foreach ($files as $file) {

            $fileExtension = File::extension($file);
            $result = in_array($fileExtension, $notAllowedExtensions);

            if($result){

                File::deleteDirectory($projectDirectory, true);
                return false;
            }
        }

        return true;
    }

    protected function getProjectFiles($project){

        $userDirectory = $this->getUserDirectory();
        $projectDirectory = $this->getProjectDirectory($userDirectory, $project);

        $files = File::files($projectDirectory);

        return $files;
    }

    protected function getAllProjectFiles($project){

        $userDirectory = $this->getUserDirectory();
        $projectDirectory = $this->getProjectDirectory($userDirectory, $project);

        $files = File::allFiles($projectDirectory);

        return $files;
    }

    public function addProjectFiles($project)
    {

        if(!in_array($project->editor_id, [2, 3, 4, 5])){
            return false;
        }

        $userDirectory = $this->getUserDirectory();
        $projectDirectory = $this->getProjectDirectory($userDirectory, $project);

        if (!file_exists($userDirectory)) {
            mkdir($userDirectory);
        }

        if (!file_exists($projectDirectory)) {
            mkdir($projectDirectory);
        }
            
        mkdir($projectDirectory . '/pack');
        mkdir($projectDirectory . '/pdf');
        mkdir($projectDirectory . '/pre');
        mkdir($projectDirectory . '/sitemap');
        mkdir($projectDirectory . '/pre/js');
        file_put_contents($projectDirectory . '/pre/js/lang.js', '');
        mkdir($projectDirectory . '/pre/exported');
        file_put_contents($projectDirectory . '/pre/exported/thumbs', '');
        mkdir($projectDirectory . '/pre/exported_view');
        file_put_contents($projectDirectory . '/pre/exported_view/thumbs', '');

        // tworzymy plik json z mapa szkolenia w sitemap/map.json
        //file_put_contents($projectDirectory . '/sitemap/map.json', json_encode($this->getDefaultProjectOptions()));

        return true;
    }

}
