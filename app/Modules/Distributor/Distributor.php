<?php namespace App\Modules\Distributor;

use DB;
use Auth;
use File;
use App\User;
use App\Modules\Utils\Utils;
use App\Modules\Models\DealerUsers;
use App\Modules\User\DealerUserRepository;
use stdClass;
use App\Modules\Models\DemosProjects;
use App\Modules\Models\Projects;
use App\Modules\Ocs\OcsDownloader;


class Distributor {


	public function __construct()
	{
	
	}

	public function getDealerUsers()
	{
		
		$users = array();

		$dealerUsers = DealerUsers::where('dealer_id', '=', Auth::user()->id)->get();

		foreach ($dealerUsers as $dealerRow) {

			$user = new StdClass();

			$user->user_id = $dealerRow->user->id;
			$user->login = $dealerRow->user->email;
			$user->photo = $dealerRow->user->photo;
			$user->date_last_login = $dealerRow->user->date_last_login;
			$user->created_at = $dealerRow->user->created_at;
			$user->updated_at = $dealerRow->user->updated_at;
			$user->loginCounts = count($dealerRow->userLogin);

			array_push($users, $user);
		}

		return $users;
	}

	public function getAllUsers()
	{
		$users = User::all();
		foreach ($users as $user) {
			$user->loginCounts = count($user->userLogin);
			if ($user->owner_id != 0) {
				$user->ownerData = User::find($user->owner_id);
			}
		}
		return $users;
	}

	public function getAllOwners()
	{
		$users = User::all();
		$owners = array();
		$ownersInserted = array();

		foreach ($users as $user) {
			if ($user->owner_id != 0) {
				if (array_search($user->owner_id, $ownersInserted) === false) {
					array_push($ownersInserted, $user->owner_id);
					array_push($owners, User::find($user->owner_id));
				}
			}
		}
		return $owners;
	}


	public function addNewUser($login, $title, $message, $demosProjectsIds, $userProjectsIds)
	{
		$password = Utils::generateRandomPassword();

		$userArray = array('login' => trim($login),
						   'password' => $password,
						   'title' => $title,
						   'message' => $message
						   );

		$dealerUserRepository = new DealerUserRepository();
		$newUser = $dealerUserRepository->createUser($userArray);
		
		$distributorUsers = new DealerUsers();
		$distributorUsers->dealer_id = Auth::user()->id;
		$distributorUsers->user_id = $newUser->id;

		$distributorUsers->save();
		// print_r($demosProjectsIds);
		// print_r($userProjectsIds);

		$dpids = $demosProjectsIds;//$this->createImplodeArray($demosProjectsIds);
		$pids = $userProjectsIds;//$this->createImplodeArray($userProjectsIds);

		// print_r($dpids);
		// print_r($pids);


		$demosProjects = DemosProjects::where('user_id', '=', '0')->whereIn('project_id', $dpids)->get();
		// print_r($demosProjects);
		// die();
		$userProjects = Projects::where('user_id', '=', Auth::user()->id)->whereIn('project_id', $pids)->get();

		// print_r($demosProjects);
		// print_r($userProjects);
		// die();

		$this->addDemoProjects($newUser, $demosProjects, 'demo');
		$this->addDemoProjects($newUser, $userProjects, 'user');


		// return $newUser;
	}

	public function addDemoProjects($newUser, $demosProjects, $projectType)
	{
		if(!$newUser){ return; }
		if(!$demosProjects){ return; }


		$demoProjectsPath = config('app.demos_projects_folder');
		$userProjectsPath = config('app.projects_folder');
		$thumbProjectsPath = config('app.projects_thumb_folder');

		switch ($projectType) {
			case 'demo':
				$projectsPath = $demoProjectsPath;
				break;

			case 'user':
				$projectsPath = $userProjectsPath;
				break;
			
			default:
				return;
				break;
		}

		foreach ($demosProjects as $demoProject) {

			$sourceDir = $projectsPath . $demoProject->user_id . '/' . $demoProject->project_id;

			$newProject = $this->copyDemoProjectToUserProjects($newUser, $demoProject);

			if($newProject){

				$userId = $newUser->id;
				$projectId = $newProject->project_id;

				if ($projectType == 'user') {
					$downloaded = OcsDownloader::downloadProject($demoProject);
					if (!$downloaded) { continue; }	
				}

				$destinationDir = $userProjectsPath . $userId . '/' . $projectId;
				$copied = File::copyDirectory($sourceDir, $destinationDir);
				if (!$copied) { continue; }

				$thumbPath = $thumbProjectsPath . $demoProject->project_id .'.jpg';
				$destinationThumbPath = $thumbProjectsPath . $projectId .'.jpg';

				if(File::exists($thumbPath)){
					File::copy($thumbPath, $destinationThumbPath);
				}

				// $tempPath = $destinationDir . '/temp';
				// File::deleteDirectory($tempPath);
			}
		}
	}

	public function copyDemoProjectToUserProjects($newUser, $demoProject)
	{

		$newProject = new Projects();

        $newProject->dimentions = $demoProject->dimentions;
        $newProject->external = 0;
        $newProject->name = $demoProject->name;
        $newProject->skin = $demoProject->skin;
        $newProject->size = $demoProject->size;
        $newProject->status = 0;
        $newProject->template = 0;
        $newProject->user_id = $newUser->id;
        $newProject->version = env('app_version');
		$newProject->save();

        return $newProject;
	}

}
