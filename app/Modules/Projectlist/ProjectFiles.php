<?php namespace App\Modules\Projectlist;

use DB;
use Auth;
use App\User;
use File;
use App\Modules\Projectlist\Zbit\ZbitObject;
use App\Modules\Projectlist\Zbit\ZbitResult;
use App\Modules\Responce\ResponceFactory;
use App\Modules\Models\ProjectVersion;
use App\Modules\Ocs\OcsDownloader;
use App\Modules\Ocs\Ocs;
use App\Modules\Models\ProjectsDeleted;
use ZipArchive;

class EmptyClass {

}

class ProjectFiles {

	private $userId = 0;


	public function __construct()
	{
		$this->userId = $this->getUserId();
	}

	private function getUserId() 
	{
		return Auth::user()->id;
	}

	private function getDefaultProjectOptions()
	{
        return array(
                "files_zoom"                => 0,
                "number_of_pages"           => 0,
                "move_grid"                 => 1,
                "copy_grid"                 => 60,
                "snapping"                  => 0,
                "showsnaplines"             => 0,
                "show_titles"               => 0,
                "draggable_snaptolerance"   => 10,
                "scorm_score_required"      => 0,
                "require_score"             => false,
                "require_pages"             => true,
                "require_elements"          => false,
                "styles"                    => array(
                "icons"                     => array(
                                                "activeicon" => "sprite_btn3",
                                                "mappos"     => 0
                                            )
                ),
                "pages"                     => array()
           );
	}

    public function addProjectFiles($project)
    {

    	$userId = $project->user_id;
    	$projectId = $project->project_id;

    	$projectFolderPath = config('app.projects_folder') . $userId . '/' . $projectId . '/';

        if (!file_exists( config('app.projects_folder') . $userId . '/' ) ) {
            mkdir( config('app.projects_folder') . $userId . '/' );
        }
        if (!file_exists( $projectFolderPath ) ) {
            mkdir( $projectFolderPath );
        }
            
	    mkdir($projectFolderPath . 'pack');
	    mkdir($projectFolderPath . 'pdf');
	    mkdir($projectFolderPath . 'pre');
	    mkdir($projectFolderPath . 'sitemap');
	    mkdir($projectFolderPath . 'pre/js');
        file_put_contents($projectFolderPath . 'pre/js/lang.js', '');
	    mkdir($projectFolderPath . 'pre/exported');
        file_put_contents($projectFolderPath . 'pre/exported/thumbs', '');
	    mkdir($projectFolderPath . 'pre/exported_view');
        file_put_contents($projectFolderPath . 'pre/exported_view/thumbs', '');

        // tworzymy plik json z mapa szkolenia w sitemap/map.json
        file_put_contents($projectFolderPath . '/sitemap/map.json', json_encode($this->getDefaultProjectOptions()));
    }

    public function addProjectFilesWithSources($file)
    {

        $zbitResult = new ZbitResult();

        if($file->getClientOriginalExtension() != 'zbit'){
            $responce = ResponceFactory::createResponceFault();
            $responce->data = array('error' => 3, 'descriptiom' => 'Wrong extension');
            $zbitResult->status = false;
            $zbitResult->responce = $responce;

            return $zbitResult;
        }

        $userDirectory = storage_path( '/app/projects/' . Auth::user()->id );

        $exteractDir = $userDirectory  . '/tempzbit/';
        $exteractPath = $exteractDir  . 'zbit.zbit';

        if (!file_exists($userDirectory)) {
            mkdir($userDirectory);
        }
        if (!file_exists($userDirectory . '/tempzbit')) {
            mkdir($userDirectory . '/tempzbit');
        }

        File::deleteDirectory($exteractDir, true);

        copy($file, $exteractPath);

        $zip = new ZipArchive();
        $zip->open($exteractPath);
        $zip->extractTo($exteractDir);
        $zip->close();

        $isZbit = $this->checkDirIsZbit($exteractDir);

        if(!$isZbit){

            $responce = ResponceFactory::createResponceFault();
            $responce->data = array('error' => 1, 'descriptiom' => 'This is not zbit file format');
            $zbitResult->status = false;
            $zbitResult->responce = $responce;

            File::deleteDirectory($exteractDir);

            return $zbitResult;

        }else{
            $zbitObject = $this->getZbitObject($exteractDir);

            if($zbitObject){

                $zbitResult->status = true;
                $zbitResult->zbitObject = $zbitObject;
                $zbitResult->exteractPath = $exteractPath;
                $zbitResult->exteractDir = $exteractDir;

                File::delete($exteractPath);

                return $zbitResult;

            }else{

                $responce = ResponceFactory::createResponceFault();
                $responce->data = array('error' => 2, 'descriptiom' => 'Zbit format is wrong');
                $zbitResult->status = false;
                $zbitResult->responce = $responce;

                File::deleteDirectory($exteractDir);

                return $zbitResult;
            }
        }


        return false;
    }

    public function copyProjectFilesWithSources($zbitResult, $project){

        $projectId = $project->project_id;

        $exteractPath = $zbitResult->exteractPath;
        $exteractDir = $zbitResult->exteractDir;

        $userDirectory = storage_path( '/app/projects/' . Auth::user()->id );
        $destinationDir = $userDirectory  . '/' . $projectId;

        if (!file_exists($userDirectory)) {
            mkdir($userDirectory);
        }

        if (!file_exists($destinationDir)) {
            mkdir($destinationDir);
        }


        File::copyDirectory($exteractDir, $destinationDir);

        File::deleteDirectory($exteractDir);

        return true;
    }

    public function copyProjectFiles($sourceProject, $destProject){

        $userDirectory = storage_path( '/app/projects/' . Auth::user()->id );

        $sourceDir = storage_path( '/app/projects/' . $sourceProject->user_id )  . '/' . $sourceProject->project_id;
        $destinationDir =  $userDirectory . '/' . $destProject->project_id;

        // echo "sourceProject: ";
        // print_r($sourceProject);
        // echo "sourceDir: ";
        // print_r($sourceDir);
        //  echo "<br/>";
        //  echo "destinationDir";
        // print_r($destinationDir);
        // return false;

        $downloaded = OcsDownloader::downloadProject($sourceProject);
        if (!$downloaded) {
            return false;
        }


        if (!file_exists($userDirectory)) {
            mkdir($userDirectory);
        }

        $copyResult = File::copyDirectory($sourceDir, $destinationDir);

        if($copyResult){
            $thumbProjectsPath = config('app.projects_thumb_folder');
            $thumbPath = $thumbProjectsPath . $sourceProject->project_id .'.jpg';
            $destinationThumbPath = $thumbProjectsPath . $destProject->project_id .'.jpg';

            if(File::exists($thumbPath)){
                File::copy($thumbPath, $destinationThumbPath);
            }   
        }

        return $copyResult;
    }

    public function deleteProjectTempFilesWithSources($zbitResult){

        $exteractDir = $zbitResult->exteractDir;

        if(!File::exists($exteractDir)) {
            File::deleteDirectory($exteractDir);
        }
    }

    public function deleteFoldersFiles($folder)
    {

    }

    public function makeOcsBackup($project)
    {
        $userId = $project->user_id;
        $projectId = $project->project_id;

        if (env('ocsCronsEnabled')) {
            $ocs = new Ocs(config('app.ocs_container_projects'), config('app.ocs_container_banners'));
            $ocs->copy_x(
                    config('app.ocs_container_projects'),
                    config('app.ocs_deleted_projects'),
                    'projects/' . $userId . '/' . $projectId . '/project.zip'
                    );
        }
        $projectDeletedRow = new ProjectsDeleted();
        $projectDeletedRow->project_id = $project->project_id;
        $projectDeletedRow->user_id = $project->user_id;
        $projectDeletedRow->name = $project->name;
        $projectDeletedRow->external = $project->external;
        $projectDeletedRow->save();
    }

    public function deleteFromOcs($project)
    {
        $userId = $project->user_id;
        $projectId = $project->project_id;

        if (env('ocsCronsEnabled')) {
            $ocs = new Ocs(config('app.ocs_container_projects'), config('app.ocs_container_banners'));
            
            $projectVersions = ProjectVersion::where('project_id', '=', $projectId)->get();
            foreach ($projectVersions as $projectVersion) {
                $ocs->delete(
                    $ocs->container_projects,  
                    'projects/'.$userId.'/'. $projectId .'/versions/'.$projectVersion->dir.'/'.$projectVersion->dir.'.zip');
            }

            $ocs->delete(
                $ocs->container_projects,  
                'projects/'.$userId.'/'. $projectId .'/project.zip');
        }

    }

    public function deleteProjectFiles($project)
    {
    	$userId = $project->user_id;
    	$projectId = $project->project_id;

    	if ($userId == Auth::user()->id) {

            $this->makeOcsBackup($project);
            $this->deleteFromOcs($project);

	    	$projectFolderPath = config('app.projects_folder') . $userId . '/' . $projectId . '/';

		    if (file_exists( $projectFolderPath ) ) {
		    	File::deleteDirectory($projectFolderPath);
		    }
    	}
    }

    private function checkDirIsZbit($dir){

        $isZbit = true;

        if (!file_exists($dir . '/pre')) {
            $isZbit = false;
        }

        if (!file_exists($dir . '/sitemap')) {
            $isZbit = false;
        }

        if (!file_exists($dir . '/pre/zbit')) {
            $isZbit = false;
        }

        return $isZbit;
    }

    private function getZbitObject($dir){

        $zbitPath = $dir . 'pre/zbit';

        $content = file_get_contents($zbitPath);

        if(!$content){
            return false;
        }

        $jsonObject = json_decode($content);
        $zbitObject = new ZbitObject();

        if($jsonObject->dimensions && $jsonObject->dimensions != ""){
            $zbitObject->dimensions = $jsonObject->dimensions;
        }

        if($jsonObject->skin && $jsonObject->skin != ""){
            $zbitObject->skin = $jsonObject->skin;
        }

        if($jsonObject->name && $jsonObject->name != ""){
            $zbitObject->name = $jsonObject->name;
        }

        if($jsonObject->version){
            
            switch ($jsonObject->version) {
                case '2.0.0':
                    $zbitObject->version = $jsonObject->version;
                    break;
                
                default:
                    return false;
                    break;
            }


        }else{
            return false;
        }



        return $zbitObject;
    }

    

	

	
}