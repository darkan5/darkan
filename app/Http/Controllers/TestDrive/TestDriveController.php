<?php

namespace App\Http\Controllers\TestDrive;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\Users;
use App\Modules\Models\Groups;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\MailingGroups;
use App\Modules\Models\MailingUsers;

use App\Http\Foundation\Projects\ProjectCreator;
use App\Http\Foundation\Publications\PublicationCreator;

class TestDriveController extends Controller
{

	use ProjectCreator;
    use PublicationCreator;

	protected $redirectTo = '';
	protected $accessRolesLoginIds = [3];
	protected $QUEST_USER_ID = 6;

	public function testDrive(){

		return $this->loginAsTestDriveUser();
	}

	private function loginAsTestDriveUser()
	{
		$userId = $this->QUEST_USER_ID;

		$user = Users::find($userId);

		if($user){

			Auth::loginUsingId($userId);

			return redirect('projects');
		}
	}

	public function clearTestDriveUser(){

		$this->deleteTestDriveUserProjectsAndPublications();

		$this->deleteTestDriveUserLmsElearningGroups();
		$this->deleteTestDriveUserLmsElearningUsers();

		$this->deleteTestDriveUserLmsMailingGroups();
		$this->deleteTestDriveUserLmsMailingUsers();
	}

	private function deleteTestDriveUserLmsElearningGroups(){
		Groups::where('id_owner', '=', $this->QUEST_USER_ID)->delete();
	}

	private function deleteTestDriveUserLmsElearningUsers(){
		LmsUserPortal::where('portal_admin', '=', $this->QUEST_USER_ID)->delete();
	}

	private function deleteTestDriveUserLmsMailingGroups(){
		MailingGroups::where('id_owner', '=', $this->QUEST_USER_ID)->delete();
	}

	private function deleteTestDriveUserLmsMailingUsers(){
		MailingUsers::where('owner_id', '=', $this->QUEST_USER_ID)->delete();
	}

	private function deleteTestDriveUserProjectsAndPublications(){

		$userId = $this->QUEST_USER_ID;

		$user = Users::find($userId);

		if(!$user){
			return false;
		}

		$banners = $this->getProjectsByUser($userId);

		foreach ($banners as $banner) {
			$this->deletePublicationFiles($banner);
			$banner->delete();
		}

		$projects = $this->getPublicationsByUser($userId);

		foreach ($projects as $project) {
			$this->deleteProjectFiles($project);
			$project->delete();
		}

		$user->folders_structure = '';
		$user->save();

	}



}
