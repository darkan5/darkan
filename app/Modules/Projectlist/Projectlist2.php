<?php namespace App\Modules\Projectlist;

use DB;
use Auth;
use App\User;
use App\Modules\Models\Projects;
use App\Modules\Models\Banners;
use App\Modules\Models\Share;
use App\Modules\Models\ShareNoExist;
use App\Modules\Utils\Utils;
use stdClass;
use App\Modules\Responce\ResponceFactory;
use App\Modules\Ocs\Ocs;
use App\Modules\Ocs\OcsDownloader;
use App\Modules\Projectlist\Zbit\ZbitObject;
use ZipArchive;
use File;
use Lang;


class Projectlist {

	private $userId = 0;


	public function __construct()
	{
		$this->userId = $this->getUserId();

        $this->projectFiles = new ProjectFiles();
	}

	private function getUserId() 
	{
		return Auth::user()->id;
	}

	public function getProjectList()
	{


		// $result = DB::table('users')
		// 		->select('users.folders_structure')
		// 		->where('users.user_id', $this->userId)
		// 		->first();

		$result = User::where('id', '=', $this->userId)->first();



        $foldersStructure = $result->folders_structure;

        if (!$result || $foldersStructure == '') {
            $foldersStructure = $this->prepareFirstFoldersStructure();
            $result->folders_structure = $foldersStructure;

            $result->save();
        }
		return $foldersStructure;
	}

	public function prepareFirstFoldersStructure()
	{
		$allProjects = new stdClass();
        $allProjects->lastFolderID = 0;
        $allProjects->lastVisitedFolderID = 0;
        $allProjects->objs = array( );
        $allProjects->folders = array();

        $allProjects->folders[0] = new stdClass();
        $allProjects->folders[0]->pType = "folder";
        $allProjects->folders[0]->name = "DARKAN_MAIN_PROJECTS_FOLDER_NAME";
        $allProjects->folders[0]->folder = -1;
        $allProjects->folders[0]->folderID = 0;


        $login_id = Auth::user()->id;



            
        $res1_1 = DB::select(DB::raw("SELECT 
        						`project_id`,
        						`date`,
        						`name`,
        						`date_modification`,
        						`size`,
        						`last_visit`,
        						`version` 
        						FROM  
        						`projects` AS p 
        						WHERE 
        						p.user_id = '$login_id' 
        						AND p.project_id 
        						NOT IN 
        						(SELECT project_id FROM `share`) 
        						AND p.project_id 
        						NOT IN (SELECT project_id FROM `share_noexists`) 
        						AND p.template=0 
        						ORDER BY `date` 
        						DESC"
        						));

        

        $res1_2 = DB::select(DB::raw("SELECT `project_id`,`date`,`name`,`date_modification`,`size`,`last_visit`,`version` FROM  `projects` AS p WHERE p.user_id = '$login_id' AND (p.project_id IN (SELECT project_id FROM `share`) OR p.project_id IN (SELECT project_id FROM `share_noexists`)) AND p.template=0 ORDER BY `date` DESC"));
        

        $res1_3 = DB::select(DB::raw("SELECT `project_id`,`date`,`name`,`date_modification`,`size`,`last_visit`,`version` FROM `projects` WHERE `user_id`='$login_id' AND `template`=1"));


        $res2 = DB::select(DB::raw("SELECT * FROM `share` WHERE `user_id`='$login_id'"));
        $res3 = DB::select(DB::raw("SELECT * FROM `users` WHERE `id`='$login_id'"));



        // <!-- User Projects -->
        foreach($res1_1 as $project) {
            $project->pType = "userProjects";
            $project->folder = 0;
            array_push($allProjects->objs, $project);
        }

        // User shared projects
        foreach($res1_2 as $sproject) {
            $sproject->pType = "userSharedProjects";
            $sproject->folder = 0;
            array_push($allProjects->objs, $sproject);
        }

        // Shared to user projects
        foreach($res2 as $shared) {
            $sharedProjects = DB::select(DB::raw("SELECT * FROM `projects` WHERE `project_id`='".$shared->project_id."'"));
                
            foreach ($sharedProjects as $dane_share_project) {
                $login_id_r = $dane_share_project->user_id;

                $res7 = DB::select(DB::raw("SELECT * FROM `users` WHERE `id`='$login_id_r'"))[0];
                $dane_user_name = $res7;

                $dane_share_project->fromuser = $dane_user_name->login;
                $dane_share_project->pType = "sharedToUserProjects";
                $dane_share_project->folder = 0;

                array_push($allProjects->objs, $dane_share_project);
            }
        }

        // Templates
        $template_opt = 'template_own';
        if (Auth::user()->email == 'template@rapsody.com.pl') {
            $template_opt = 'template_main';
        }
        foreach($res1_3 as $templateProject) {

            $templateProject->templateopt = $template_opt;
            $templateProject->pType = "templateProjects";
            $templateProject->folder = 0;

            array_push($allProjects->objs, $templateProject);
        }

        // DB::select(DB::raw("UPDATE `users` SET `folders_structure` = '".json_encode($allProjects)."' WHERE `user_id` = '".$uid."';"));

        return json_encode( $allProjects );
	}

    public function setLastVisitedFolderId($folder)
    {

        $lastVisitedFolderID = $folder->folderID;

        $user = User::where('id', '=', $this->userId)->first();
        
        $foldersStructure = json_decode($user->folders_structure);

        $foldersStructure->lastVisitedFolderID = $lastVisitedFolderID;

        $user->folders_structure = json_encode($foldersStructure);

        $user->save();

        return $user->folders_structure;
    }

	public function createNewFolder($folder, $lastFolderID)
	{

		$user = User::where('id', '=', $this->userId)->first();
		
		$foldersStructure = json_decode($user->folders_structure);

		$foldersStructure->lastFolderID = $lastFolderID;

		$folders = $foldersStructure->folders;

        $folderId = $folder->folderID;

        foreach ($folders as $key => $value) {
            if($value->folderID == $folderId){
                return false;
            }
        } 


		array_push($folders, $folder);

		$foldersStructure->folders = $folders;

		$user->folders_structure = json_encode($foldersStructure);

		$user->save();

		return $user->folders_structure;
	}

    public function isProjectLimitExceeded()
    {
        return Utils::isProjectLimitExceeded();
    }

	public function createNewProject($obj)
	{

		$project = new Projects();

        $project->dimentions = '860x500';
        $project->external = 0;
        $project->name = $obj->name;
        $project->skin = "sk00";
        $project->status = 0;
        $project->template = 0;
        $project->user_id = $this->userId;
        $project->version = env('app_version');
        $project->date = date('Y-m-d H:i:s');
        $project->last_visit = date('Y-m-d H:i:s');
        $project->date_modification = date('Y-m-d H:i:s');
		$project->save();

		$newProject = clone $project;
		$newProject->folder = $obj->folder;
		$newProject->pType = "userProjects";

		$user = User::where('id', '=', $this->userId)->first();
		
		$foldersStructure = json_decode($user->folders_structure);

		$objs = $foldersStructure->objs;

		array_push($objs, $newProject);

		$foldersStructure->objs = $objs;

		$user->folders_structure = json_encode($foldersStructure);

		$user->save();

        $this->addProjectFiles($newProject);

		return $newProject;
	}

    public function addProjectFiles($project){

        $this->projectFiles->addProjectFiles($project);
    }

	public function deleteFolder($folder)
	{

		$user = User::where('id', '=', $this->userId)->first();
		
		$foldersStructure = json_decode($user->folders_structure);

		// $folders = $foldersStructure->folders;

  //       //Remove 
		// foreach ($folders as $key => $value) {
		// 	if($value->folderID == $folder->folderID){
		// 		array_splice($folders, $key, 1);
		// 	}
		// }

		// $foldersStructure->folders = $folders;

		// $user->folders_structure = json_encode($foldersStructure);

  //       $this->deleteFoldersFiles($folder);

  //       $user->save();

		// return $user->folders_structure;

        $fArray = array();
        $pArray = array();

        $this->getFoldersById($foldersStructure, $folder, $fArray, $pArray);

        foreach ($pArray as $project) {
            $this->deleteProject($project);
        }



        $user = User::where('id', '=', $this->userId)->first();

        $foldersStructure = json_decode($user->folders_structure);
        $folders = $foldersStructure->folders;

        

        foreach ($folders as $key => $value) {

            foreach ($fArray as $folder) {

                if($value->folderID == $folder->folderID){
                    array_splice($folders, $key, 1);
                }
            }
        }

        $foldersStructure->folders = $folders;
        $user->folders_structure = json_encode($foldersStructure);
        $user->save();

        return $foldersStructure;
	}


    private function getFoldersById(&$foldersStructure, $folder, &$fArray, &$pArray){

        array_push($fArray, $folder);

        $this->getProjectsById($foldersStructure, $folder, $pArray);

        $folders = $foldersStructure->folders;

        foreach ($folders as $key => $oneFolder) {
            if($oneFolder->folder == $folder->folderID){
    
                $this->getFoldersById($foldersStructure, $oneFolder, $fArray, $pArray);
                
            }
        }
    }

    private function getProjectsById(&$foldersStructure, $folder, &$pArray){

        
        $objs = $foldersStructure->objs;

        foreach ($objs as $key => $oneProject) {
            if($oneProject->folder == $folder->folderID){

                array_push($pArray, $oneProject);
            }
        }
    }

    public function deleteFoldersFiles($folder){

        $this->projectFiles->deleteFoldersFiles($folder);
    }

    public function deleteProject($obj)
    {

        if(!$obj){
            return false;
        }

        $projectId = (int)$obj->project_id;

        $project = Projects::where('user_id', '=', Auth::user()->id)
                                ->where('project_id', '=', $projectId)
                                ->first();


        if($project){

            $shared = Share::where('project_id', '=', $projectId)->delete();
            $sharedNoExist = ShareNoExist::where('project_id', '=', $projectId)->delete();

            $user = User::where('id', '=', $this->userId)->first();
        
            $foldersStructure = json_decode($user->folders_structure);

            $objs = $foldersStructure->objs;

            foreach ($objs as $key => $value) {
                if($value->project_id == $project->project_id){
                    array_splice($objs, $key, 1);
                }
            }

            $foldersStructure->objs = $objs;

            $user->folders_structure = json_encode($foldersStructure);

            $this->deleteProjectFiles($project);

            $user->save();

            $project->delete();

            return true;

        }else{

            return false;
        }
  
    }

    public function deleteProjectFiles($project){
    
        return $this->projectFiles->deleteProjectFiles($project);
    }

    

    public function copyProject($obj)
    {
        if(!isset($obj->project_id)){
            return false;
        }

        if(!isset($obj->name)){
            return false;
        }

        if(!isset($obj->name)){
            return false;
        }

        $canRead = Utils::canReadProject($obj->project_id);

        if(!$canRead){
            return false;
        }

        $sourceProject = Projects::find($obj->project_id);


        $project = new Projects();

        $project->dimentions = $sourceProject->dimentions;
        $project->external = 0;
        $project->name = $obj->name . Lang::get('projects.projectCopy');
        $project->size = $sourceProject->size;
        $project->status = 0;
        $project->user_id = $this->userId;
        $project->version = env('app_version');
        $project->save();

        $newProject = clone $project;
        $newProject->folder = $obj->folder;
        $newProject->pType = "userProjects";

        $user = User::where('id', '=', $this->userId)->first();
        
        $foldersStructure = json_decode($user->folders_structure);

        $objs = $foldersStructure->objs;

        array_push($objs, $newProject);

        $foldersStructure->objs = $objs;

        $user->folders_structure = json_encode($foldersStructure);

        $isCopiedFiles = $this->copyProjectFiles($sourceProject, $newProject);

        if($isCopiedFiles){

            $user->save();
            return $newProject;

        }else{

            $project->delete();
            return false;
        }
    }

    public function templateProject($obj)
    {
        $projectId = (int)$obj->project_id;

        $project = Projects::where('user_id', '=', Auth::user()->id)
                                ->where('project_id', '=', $projectId)
                                ->first();

        if ($project) {

            $project->template = $project->template == 0 ? 1: 0;
            $project->save();

            $user = User::where('id', '=', $this->userId)->first();
        
            $foldersStructure = json_decode($user->folders_structure);

            $objs = $foldersStructure->objs;

            foreach ($objs as $key => $value) {
                if($value->project_id == $projectId){
                    $value->template = $project->template;
                }
            } 

            $foldersStructure->objs = $objs;

            $user->folders_structure = json_encode($foldersStructure);

            $user->save();
        }

        return $project;
    }

    public function shareProject($obj, $email)
    {

        $projectId = (int)$obj->project_id;

        $project = Projects::where('user_id', '=', Auth::user()->id)
                                ->where('project_id', '=', $projectId)
                                ->first();

        if (!$project) {
            return false;
        }

        $sharedUser = User::where('email', '=', $email)->first();

        if($sharedUser){
            $shared = Share::firstOrNew([ 'user_id' => $sharedUser->user_id, 'project_id' => $project->project_id ]);
            $shared->user_id = $sharedUser->id;
            $shared->project_id = $project->project_id;
            $shared->save();   


            $user = User::where('id', '=', $this->userId)->first();
        
            $foldersStructure = json_decode($user->folders_structure);

            $objs = $foldersStructure->objs;

            foreach ($objs as $key => $value) {
                if($value->project_id == $project->project_id){
                    $value->pType = 'userSharedProjects';
                }
            } 

            $foldersStructure->objs = $objs;

            $user->folders_structure = json_encode($foldersStructure);

            $user->save();          

            return true;

        }else{
            return false;
        }
    }

    public function shareProjectNoExist($obj, $email)
    {
        $projectId = (int)$obj->project_id;

        $project = Projects::where('user_id', '=', Auth::user()->id)
                                ->where('project_id', '=', $projectId)
                                ->first();

        if (!$project) {
            return false;
        }


        $sharedNoExist = ShareNoExist::firstOrNew([ 'mail' => $email, 'project_id' => $project->project_id ]);
        $sharedNoExist->mail = $email;
        $sharedNoExist->project_id = $project->project_id;
        $sharedNoExist->save();

        $user = User::where('id', '=', $this->userId)->first();
        
        $foldersStructure = json_decode($user->folders_structure);

        $objs = $foldersStructure->objs;

        foreach ($objs as $key => $value) {
            if($value->project_id == $project->project_id){
                $value->pType = 'userSharedProjects';
            }
        } 

        $foldersStructure->objs = $objs;

        $user->folders_structure = json_encode($foldersStructure);

        $user->save(); 

        return true;

    }

    public function unshareProject($user)
    {

        $userId = $user->id;
        $projectId = $user->project_id;
        $email = $user->mail;

        $shared = Share::where('user_id', '=', $userId)->where('project_id', '=', $projectId)->first();

        if($shared){
           
            $shared->delete();

            $shared = Share::where('project_id', '=', $projectId)->get();

            if(count($shared) == 0){

                $user = User::where('id', '=', $this->userId)->first();
        
                $foldersStructure = json_decode($user->folders_structure);

                $objs = $foldersStructure->objs;

                foreach ($objs as $key => $value) {
                    if($value->project_id == $projectId){
                        $value->pType = 'userProjects';
                    }
                } 

                $foldersStructure->objs = $objs;

                $user->folders_structure = json_encode($foldersStructure);

                $user->save(); 

                return 'userProjects';

            }else{
                return 'userSharedProjects';
            }


        }else{
            return false;
        }
    }

    public function unshareProjectNoExist($user)
    {
        $userId = $user->id;
        $projectId = $user->project_id;
        $email = $user->mail;

        $sharedNoExist = ShareNoExist::where('mail', '=', $email)->where('project_id', '=', $projectId)->first();

        if($sharedNoExist){
           
            $sharedNoExist->delete();

            $sharedNoExistToUsers = ShareNoExist::where('project_id', '=', $projectId)->get();
            $sharedToUsers = Share::where('project_id', '=', $projectId)->get();

            if(count($sharedNoExistToUsers) == 0 && count($sharedToUsers) == 0){

                $user = User::where('id', '=', $this->userId)->first();
        
                $foldersStructure = json_decode($user->folders_structure);

                $objs = $foldersStructure->objs;

                foreach ($objs as $key => $value) {
                    if($value->project_id == $projectId){
                        $value->pType = 'userProjects';
                    }
                } 

                $foldersStructure->objs = $objs;

                $user->folders_structure = json_encode($foldersStructure);

                $user->save(); 

                return 'userProjects';

            }else{
                return 'userSharedProjects';
            }

        }else{
            return false;
        }
    }

    public function getShareProjectUsers($obj)
    {

        $projectId = (int)$obj->project_id;

        $project = Projects::where('user_id', '=', Auth::user()->id)
                                ->where('project_id', '=', $projectId)
                                ->first();

        if (!$project) {
            return false;
        }


        $shared = Share::where('project_id', '=', $project->project_id)->get();

        foreach ($shared as $shareKey => $share) {
            if ($share->user) {
                $share->mail = $share->user->email;
            } else {
                $share->delete();
                unset($shared[$shareKey]);
            }
        }

        $sharedNoExist = ShareNoExist::where('project_id', '=', $project->project_id)->get();

        return ['shared' => $shared, 'sharedNoExist' => $sharedNoExist];
    }

    
    public function updateProject($obj)
    {
        $projectId = (int)$obj->project_id;
        $name = $obj->name;

        $project = Projects::where('user_id', '=', Auth::user()->id)
                                ->where('project_id', '=', $projectId)
                                ->first();

        if ($project) {

            $project->name = $name;
            $project->save();

            $user = User::where('id', '=', $this->userId)->first();
        
            $foldersStructure = json_decode($user->folders_structure);

            $objs = $foldersStructure->objs;

            foreach ($objs as $key => $value) {
                if($value->project_id == $projectId){
                    $value->name = $project->name;
                }
            } 

            $foldersStructure->objs = $objs;

            $user->folders_structure = json_encode($foldersStructure);

            $user->save();
        }

        return $project;
    }

    public function updateFolder($folder)
    {
        $folderId = $folder->folderID;
        $name = $folder->name;

        $user = User::where('id', '=', $this->userId)->first();
    
        $foldersStructure = json_decode($user->folders_structure);

        $folders = $foldersStructure->folders;

        $newFolder;

        foreach ($folders as $key => $value) {
            if($value->folderID == $folderId){
                $value->name = $name;
            }
        } 

        $foldersStructure->folders = $folders;

        $user->folders_structure = json_encode($foldersStructure);

        $user->save();


        return true;
    }

    public function moveFolder($sourceFolder, $targetFolder)
    {
        $sourceFolderId = $sourceFolder->folderID;
        $targetFolderId = $targetFolder->folderID;
  

        $user = User::where('id', '=', $this->userId)->first();
    
        $foldersStructure = json_decode($user->folders_structure);

        $folders = $foldersStructure->folders;

        foreach ($folders as $key => $value) {
            if($value->folderID == $sourceFolderId){
                $value->folder = $targetFolderId;
            }
        } 

        $foldersStructure->folders = $folders;

        $user->folders_structure = json_encode($foldersStructure);

        $user->save();

        return true;
    }

    public function moveProject($sourceFolder, $targetFolder)
    {
        $sourceProjectId = $sourceFolder->project_id;
        $targetFolderId = $targetFolder->folderID;
  

        $user = User::where('id', '=', $this->userId)->first();
    
        $foldersStructure = json_decode($user->folders_structure);

        $objs = $foldersStructure->objs;

        foreach ($objs as $key => $value) {
            if($value->project_id == $sourceProjectId){
                $value->folder = $targetFolderId;
            }
        } 

        $foldersStructure->objs = $objs;

        $user->folders_structure = json_encode($foldersStructure);

        $user->save();

        return true;
    }

    public function checkSharedProjects()
    {

        $allShare = Share::where('user_id', '=', Auth::user()->id)->get();

        $newProjectsIds = array();
        $userProjectsIds = array();

        $projectsToRemove = array();
        $projectsToAdd = array();
        $projectsNotShared = array();

        foreach ($allShare as $share) {
            array_push($newProjectsIds, (int)$share->project_id);
        }

        $user = User::where('id', '=', $this->userId)->first();
    
        $foldersStructure = json_decode($user->folders_structure);

        if(!$foldersStructure || $foldersStructure == ''){
            return false;
        }


        $objs = $foldersStructure->objs;

 
        foreach ($objs as $key => $value) {
            if($value->pType == 'sharedToUserProjects'){
                array_push($userProjectsIds, (int)$value->project_id);
            }
        }


        $differenceRemove = array_values(array_diff($userProjectsIds, $newProjectsIds));


        foreach ($differenceRemove as $projectId ) {

            foreach ($objs as $key => $value) {

                if($value->pType == 'sharedToUserProjects'){

                    if($value->project_id == $projectId){

                        array_push($projectsToRemove, $projectId);
                        array_splice($objs, $key, 1);
                    }
                }
            }
        }

       

        $differenceAdd = array_values(array_diff($newProjectsIds, $userProjectsIds));

        foreach ($differenceAdd  as $projectId) {

            $exist = false;

            foreach ($objs as $key => $value) {

                if($value->pType == 'sharedToUserProjects'){

                    if($value->project_id == $projectId){

                        $exist = true;
                    }
                }
            }

            if(!$exist){

                
                
                $project = Projects::where('project_id', '=', $projectId)
                                ->first();

                if($project){

                    $fromUser = User::where('id', '=', $project->user_id)->first();

                    $newProject = clone $project;
                    $newProject->folder = 0;
                    $newProject->pType = 'sharedToUserProjects';
                    $newProject->fromuser = $fromUser->email;
                    $newProject->project_id = (int)$project->project_id;
                    $newProject->user_id = (int)$project->user_id;
                    $newProject->template = (int)$project->template;

                    array_push($projectsToAdd, $newProject);
                    array_push($objs, $newProject);
                }
            }
        }

        foreach ($objs as $key => $value) {

            if($value->pType == 'userSharedProjects'){

                $projectId = $value->project_id;

                $project = Projects::where('project_id', '=', $projectId)
                                ->first();

                if($project){

        
                    if($project->share->count() == 0){
                        $value->pType = 'userProjects';
                        unset($value->fromuser);

                        array_push($projectsNotShared, $value->project_id);
                    }
                } 
            }
        }

        

        $foldersStructure->objs = $objs;

        $user->folders_structure = json_encode($foldersStructure);

        $user->save();

        return ['projectsToRemove' => $projectsToRemove, 
                'projectsToAdd' => $projectsToAdd, 
                // 'userProjectsIds' => $userProjectsIds, 
                // 'newProjectsIds' => $newProjectsIds,
                // 'differenceAdd' => $differenceAdd,
                // 'differenceRemove' => $differenceRemove,
                'projectsNotShared' => $projectsNotShared
                ];
    }

    public function disconectFromSharedProjects($obj)
    {

        $projectId = $obj->project_id;
        $userId = $obj->user_id;

        $shared = Share::where('user_id', '=', Auth::user()->id)->where('project_id', '=', $projectId)->first();

        if($shared){
           
            $shared->delete();

            $user = User::where('id', '=', $this->userId)->first();
    
            $foldersStructure = json_decode($user->folders_structure);

            $objs = $foldersStructure->objs;

            foreach ($objs as $key => $value) {
                if($value->project_id == $projectId){
                    array_splice($objs, $key, 1);
                    break;
                }
            } 

            $foldersStructure->objs = $objs;

            $user->folders_structure = json_encode($foldersStructure);

            $user->save(); 

            return true;

        }else{
            return false;
        }
    }

    public function uploadZbit($file, $folderId)
    {



        $zbitResult = $this->addProjectFilesWithSources($file);

        //return $obj;

        if (!$zbitResult->status) {

            return $zbitResult->responce;
        }

        $zbitObject = $zbitResult->zbitObject;


        $project = new Projects();

        //$project->date = "",
        //$project->date_modification = "",
        $project->dimentions = $zbitObject->dimensions;
        $project->external = 0;
        //$project->folder = $zbitObject->folder;
        //$project->last_visit = "";
        $project->name = $zbitObject->name;
        //$project->pType = "userProjects";
        //$project->project_id = "";
        //$project->size = "";
        $project->skin = "sk00";
        $project->status = 0;
        $project->template = 0;
        $project->user_id = $this->userId;
        $project->version = env('app_version');

        $project->save();


        $isCopied = $this->copyProjectFilesWithSources($zbitResult, $project);

        if(!$isCopied){
            $project->delete();

            $this->deleteProjectTempFilesWithSources($zbitResult);
            return false;
        }

        $this->deleteProjectTempFilesWithSources($zbitResult);


        $newProject = clone $project;
        $newProject->folder = $folderId;
        $newProject->pType = "userProjects";

        $user = User::where('id', '=', $this->userId)->first();
        
        $foldersStructure = json_decode($user->folders_structure);

        $objs = $foldersStructure->objs;

        array_push($objs, $newProject);

        $foldersStructure->objs = $objs;

        $user->folders_structure = json_encode($foldersStructure);

        $user->save();

        $responce = ResponceFactory::createResponceResult();
        $responce->data = array('project' => $newProject);

        return $responce;
    }

    private function addProjectFilesWithSources($file){

        return $this->projectFiles->addProjectFilesWithSources($file);
    }

    private function copyProjectFilesWithSources($zbitResult, $project){

        return $this->projectFiles->copyProjectFilesWithSources($zbitResult, $project);
    }

     private function copyProjectFiles($sourceProject, $destProject){

        return $this->projectFiles->copyProjectFiles($sourceProject, $destProject);
    }

    private function deleteProjectTempFilesWithSources($zbitResult){

        return $this->projectFiles->deleteProjectTempFilesWithSources($zbitResult);
    }

    public function getSummaryUserProjects(){

        $etdClass = new stdClass();
        $etdClass->userMaxProjects = (int)Utils::getPlanMaxValue('projects');
        $etdClass->maxPublications = (int)Utils::getPlanMaxValue('banners');
        $etdClass->maxUsedSpace = (int)Utils::getPlanMaxValue('diskspace');
        $etdClass->userPublications = Banners::where('user_id', '=', Auth::user()->id)->count();


        $user = User::where('id', '=', $this->userId)->first();
        
        $foldersStructure = json_decode($user->folders_structure);

        $objs = $foldersStructure->objs;

        $userUsedSpace = 0;

        foreach ($objs as $key => $value) {
                if($value->pType == 'userProjects'){

                   if(isset($value->size)){
                        $userUsedSpace += (int)$value->size; 
                   }
                }
            } 

        $etdClass->userUsedSpace = $userUsedSpace;

        return $etdClass;
    }


    public function downloadProject($obj){

        $projectId = (int)$obj->project_id;

        $projectData = Projects::where('user_id', '=', Auth::user()->id)
                                ->where('project_id', '=', $projectId)
                                ->first();


        if(!$projectData){
            return false;
        }

        $projectDownloaded = OcsDownloader::downloadProject($projectData);
    
        if ($projectDownloaded) {

            $ownerId = $projectData->user_id;
            $pID = $projectData->project_id;

            $projectsDir = config('app.projects_folder');
            $projectDir = $projectsDir . $ownerId . '/' . $pID . '/';
            $projectZbitFilePath = $projectDir . 'pre/zbit';

            $tempDirectory = storage_path('/app/temp/');

            File::deleteDirectory($projectDir . 'pack');
    
            $zipFileName = $this->getFileName($tempDirectory, $projectData->name, 'zbit');
            $zipFilePath = $tempDirectory . $zipFileName . '.zbit';

            $zbitObject = new ZbitObject();
            $zbitObject->dimensions = $projectData->dimentions;
            $zbitObject->skin = $projectData->skin;
            $zbitObject->name = $projectData->name;
            $zbitObject->version = env('app_version');

            $content = json_encode($zbitObject);

            File::put($projectZbitFilePath, $content);

            $zip = new ZipArchive();
            if ($zip->open($zipFilePath, ZIPARCHIVE::CREATE) !==TRUE) {
                exit ("nie mogę zrobić pliku archiwum project.zip");
        
            }

            Utils::zipDir($zip, $projectDir);
            $zip->close();

            File::delete($projectZbitFilePath);

            $downloadZipFilePath = config('app.storageTempLink') . $zipFileName . '.zbit';

            return $downloadZipFilePath;

        } else {
             return false;
        }

    }
    
    private function getFileName($dir, $fileName, $ext){

        $index = 0;
        $newFileName = Utils::replaceSpecialChars($fileName);

        while(file_exists($dir . $newFileName . '.' . $ext)){
        
            $index++;
            $newFileName = $fileName . '_' . $index;
        }

        return $newFileName;

    }

    


    

	

	
}