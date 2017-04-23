<?php namespace App\Http\Controllers;


use Auth;
use App\Modules\Responce\ResponceFactory;
use App\Modules\Projectlist\Projectlist;
use App\Modules\Models\Projects;
use App\Http\Requests\ProjectListRequest;
use Input;
use App\Modules\Mailer\SharedProjectMail;

class ProjectListController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Home Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders your application's "dashboard" for users that
	| are authenticated. Of course, you are free to change or remove the
	| controller as you wish. It is just here to get your app started!
	|
	*/

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		// $this->middleware('auth');
	}

	public function launch()
	{
		
		if (Auth::check()) {
			$projectList = new Projectlist();

			$foldersStructure = $projectList->getProjectList();

			return view('web.pages.projects')
						->with('foldersStructure', $foldersStructure );
		} else {
			// die ('tu');
			return redirect()->guest('/login');

		}
	}

	

	public function setLastVisitedFolderId(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));
		$folder = $params->folder;

		$projectList = new Projectlist();

		$foldersStructure = $projectList->setLastVisitedFolderId($folder);

		if($foldersStructure != null){

			$responce = ResponceFactory::createResponceResult();

		}else{
			$responce = ResponceFactory::createResponceFault();
		}



		echo $responce->toJSON();
	}

	public function createNewFolder(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$folder = $params->folder;
		$lastFolderID = $params->lastFolderID;

		$projectList = new Projectlist();

		$foldersStructure = $projectList->createNewFolder($folder, $lastFolderID);

		if($foldersStructure != null){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('folder' => $folder, 'lastFolderID' => $lastFolderID);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function createNewProject(ProjectListRequest $request)
	{

		
		$params = json_decode(Input::get('params'));

		$project = $params->project;

		$projectList = new Projectlist();

		$canCreate = $projectList->isProjectLimitExceeded();

		if($canCreate){

			$newproject = $projectList->createNewProject($project);

			if($newproject != null){

				$responce = ResponceFactory::createResponceResult();
				$responce->data = array('project' => $newproject);

			}else{
				$responce = ResponceFactory::createResponceFault();
			}

		}else{
			$responce = ResponceFactory::createResponceFault();
			$responce->data = array('error' => 0, 'descriptiom' => 'Project limit exceeded');
		}

		

		echo $responce->toJSON();
		return;
	}

	public function deleteFolder(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$folder = $params->folder;

		$projectList = new Projectlist();
		$folders_structure = $projectList->deleteFolder($folder);

		if($folders_structure != null){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('foldersStructure' => $folders_structure);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function deleteProject(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$project = $params->project;


		$projectList = new Projectlist();
		$result = $projectList->deleteProject($project);

		if($result){

			$responce = ResponceFactory::createResponceResult();

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function copyProject(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$project = $params->project;

		$projectList = new Projectlist();
		$canCreate = $projectList->isProjectLimitExceeded();

		if($canCreate){

			$newproject = $projectList->copyProject($project);

			if($newproject){

				$responce = ResponceFactory::createResponceResult();
				$responce->data = array('project' => $newproject);

			}else{
				$responce = ResponceFactory::createResponceFault();
				$responce->data = array('error' => 1, 'descriptiom' => 'Copy fault');
			}

		}else{
			$responce = ResponceFactory::createResponceFault();
			$responce->data = array('error' => 0, 'descriptiom' => 'Project limit exceeded');
		}
		


		echo $responce->toJSON();
		return;
	}

	public function templateProject(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$project = $params->project;

		$projectList = new Projectlist();
		$newproject = $projectList->templateProject($project);

		if($newproject != null){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('project' => $newproject);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function shareProjectFromEditor(ProjectListRequest $request)
	{
		$project = Projects::find(Input::get('project'));
		$email = Input::get('email');
		if ($project) {
			$this->shareProject($project, $email);
		}
	}

	public function shareProjectFromProjectList(ProjectListRequest $request)
	{
		$params = json_decode(Input::get('params'));

		$project = $params->project;
		$email = $params->email;

		$this->shareProject($project, $email);
	}

	public function shareProject($project, $email)
	{
		$projectList = new Projectlist();
		$shareResult = $projectList->shareProject($project, $email);

		if($shareResult){
			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('result' => 'shared', 'project' => $project, 'email' => $email, 'pType' => 'userSharedProjects');
		}else{

			$shareNoExistresult = $projectList->shareProjectNoExist($project, $email);

			if($shareNoExistresult){
				$responce = ResponceFactory::createResponceResult();
				$responce->data = array('result' => 'sharedNoExist', 'project' => $project, 'email' => $email, 'pType' => 'userSharedProjects' );
			}else{
				$responce = ResponceFactory::createResponceFault();
			}
		}

		$sharingMailer = new SharedProjectMail();
		$sharingMailer->sendSharedMail($project, $email);


		echo $responce->toJSON();
		return;
	}

	public function unshareProject(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$user = $params->user;


		$projectList = new Projectlist();
		$unShareResult = $projectList->unshareProject($user);

		if($unShareResult){
			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('result' => 'unshared', '$user' => $user, 'pType' => $unShareResult);
		}else{

			$unShareNoExistresult = $projectList->unshareProjectNoExist($user);

			if($unShareNoExistresult){
				$responce = ResponceFactory::createResponceResult();
				$responce->data = array('result' => 'unsharedNoExist', '$user' => $user, 'pType' => $unShareNoExistresult);
			}else{
				$responce = ResponceFactory::createResponceFault();
			}
		}


		echo $responce->toJSON();
		return;
	}

	public function getShareProjectUsers(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$project = $params->project;

		$projectList = new Projectlist();
		$users = $projectList->getShareProjectUsers($project);

		if($users != null){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('users' => $users);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function updateProject(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$project = $params->project;

		$projectList = new Projectlist();
		$newProject = $projectList->updateProject($project);

		if($newProject != null){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('project' => $newProject);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function updateFolder(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$folder = $params->folder;

		$projectList = new Projectlist();
		$result = $projectList->updateFolder($folder);

		if($result != null){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('result' => $result, 'folder' => $folder);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function moveFolder(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$sourceFolder = $params->sourceFolder;
		$targetFolder = $params->targetFolder;

		$projectList = new Projectlist();
		$result = $projectList->moveFolder($sourceFolder, $targetFolder);

		if($result != null){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('result' => $result);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function moveProject(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$sourceProject = $params->sourceProject;
		$targetFolder = $params->targetFolder;

		$projectList = new Projectlist();
		$result = $projectList->moveProject($sourceProject, $targetFolder);

		if($result != null){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('result' => $result);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function checkSharedProjects(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));



		$projectList = new Projectlist();
		$result = $projectList->checkSharedProjects();

		if($result){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('result' => true, 'projects' => $result);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function disconectFromSharedProjects(ProjectListRequest $request)
	{
		
		$params = json_decode(Input::get('params'));

		$project = $params->project;

		$projectList = new Projectlist();
		$result = $projectList->disconectFromSharedProjects($project);

		if($result){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array();

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function uploadZbit(ProjectListRequest $request) 
	{

		$projectList = new Projectlist();

		$canCreate = $projectList->isProjectLimitExceeded();

		if($canCreate){
	
			$folderId = Input::get('folderid');

			if(!$folderId){
				$folderId = 0;
			}else{
				$folderId = (int)$folderId;
			}


			if (Input::hasFile('zbit')) {
		     	$file = Input::file('zbit');

				
				$result = $projectList->uploadZbit($file, $folderId);

				if($result){
		
					echo $result->toJSON();
					return;


				}else{
					$responce = ResponceFactory::createResponceFault();
					$responce->data = array('error' => 500, 'description' => 'uploadZbit failed');
				}

			}else{
				$responce = ResponceFactory::createResponceFault();
				$responce->data = array('error' => 500, 'description' => 'Zbit file not found');
			}

		}else{
			$responce = ResponceFactory::createResponceFault();
			$responce->data = array('error' => 0, 'description' => 'Project limit exceeded');
		}


		echo $responce->toJSON();
		return;
	}

	public function getSummaryUserProjects(ProjectListRequest $request) 
	{


		$projectList = new Projectlist();
		$result = $projectList->getSummaryUserProjects();

		if($result){

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('result' => $result);

		}else{
			$responce = ResponceFactory::createResponceFault();
		}


		echo $responce->toJSON();
		return;
	}

	public function downloadProject(ProjectListRequest $request) 
	{
		$params = json_decode(Input::get('params'));

		$project = $params->project;

		$projectList = new Projectlist();
		$result = $projectList->downloadProject($project);

		if($result == false){

			$responce = ResponceFactory::createResponceFault();

		}else{

			$responce = ResponceFactory::createResponceResult();
			$responce->data = array('link' => $result);
		}


		echo $responce->toJSON();
		return;
	}

	

	

	

	

	
	

	

	

	

	

	

	

	
}
