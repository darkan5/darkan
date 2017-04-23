<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use Input;

use App\Http\Requests\LmsRequest;

use App\Modules\Models\MailingGroups;
use App\Modules\Models\MailingGroupUser;
use App\Modules\Models\Banners;
use App\Modules\Models\ScormData;

use App\Modules\Lms\LmsUser;
use App\Modules\Lms\LmsAllUsers;
use App\Modules\Lms\LmsMailingUser;
use App\Modules\Lms\LmsNormalUser;

class LmsController extends Controller {

	private $responseData = array();
	private $data;
	private $userID;
	private $userType = "app";
	private $lmsUser;

	function run($data) {

		$this->data = json_decode($data['request']);

		$this->userID = Auth::user()->id;
		// $this->userID = 3;

		if(isset($this->data->userType)){
			$this->userType = $this->data->userType;
		}

		$this->lmsUser = LmsUser::create($this->userID, $this->data, $this->userType);

		// $this->lmsMailingUser = LmsUser::create($this->userID, $this->data, 'mu');
		// $this->lmsNormalUser = LmsUser::create($this->userID, $this->data, 'nu');

		$this->controller();

	}

	public function lmsRequest(LmsRequest $request)
	{
		$this->run(Input::all());
	}


	function __destruct() {
		echo json_encode($this->responseData);
	}

	private function controller() {

		switch ($this->data->request) {

			

			case 'getAllGroupsList':

				$this->getAllGroupsList();

				break;
				
			case 'deleteAttempt':

				$this->deleteAttempt();

				break;

			case 'getUsersFromAllGroups':

				$this->getUsersFromAllGroups();

				break;		
				

			case 'addUser':

				$this->addUser();

				break;

			case 'deleteUsers':

				$this->deleteUsers();

				break;

			case 'getNumberOfUsersAndCourses':

				$this->getNumberOfUsersAndCourses();

				break;

			case 'getCoursesList':

				$this->getCoursesList();

				break;

			case 'getUsersList':

				$this->getUsersList();

				break;

			case 'updateUsersLimitsData':

				$this->updateUsersLimitsData();

				break;

			case 'getGroupsList':

				$this->getGroupsList();

				break;

			case 'getGroupById':

				$this->getGroupById();

				break;

			case 'editGroup':

				$this->editGroup();

				break;



			case 'courseStatus':

				$this->courseStatus();

				break;

			case 'userStatus':

				$this->userStatus();

				break;

			case 'getUsersPageTimes':

				$this->getUsersPageTimes();

				break;

			case 'getUsersCompletionInfo':

				$this->getUsersCompletionInfo();

				break;	

			case 'getUsersDetailsInCourse':

				$this->getUsersDetailsInCourse();

				break;		

			case 'addNewGroup':

				$this->addNewGroup();

				break;

			case 'getUsersFromGroup':

				$this->getUsersFromGroup();

				break;



			case 'addUserToGroup':

				$this->addUserToGroup();

				break;

			case 'deleteUsersFromGroup':

				$this->deleteUsersFromGroup();

				break;

			case 'deleteGroup':

				$this->deleteGroup();

				break;

			case 'getPanelSettings':

				$this->getPanelSettings();

				break;

			case 'setPanelSettings':

				$this->setPanelSettings();

				break;

			case 'generateCertificate':

				$this->generateCertificate();

				break;

			case 'getAsignedCoursesToGroup':

				$this->getAsignedCoursesToGroup();

				break;	

			case 'addCoursesToGroup':

				$this->addCoursesToGroup();

				break;	

			case 'deleteCourseFromGroup':

				$this->deleteCourseFromGroup();

				break;	

			case 'editUser':

				$this->editUser();

				break;	

			case 'createGroup':

				$this->createGroup();

				break;		

			case 'getCourseQuestionsData':

				$this->getCourseQuestionsData();

				break;

			case 'getCourseQuestionsDataByUserId':

				$this->getCourseQuestionsDataByUserId();

				break;	

			case 'downloadChartPivotTableSingleCourse':

				$this->downloadChartPivotTableSingleCourse();

				break;	

			case 'markAsPaid':

				$this->markAsPaid();

				break;		


			default:

				$this->responseData['norequest'] = 'no request';

				break;

		}
	}

	private function getPanelSettings() {
		$this->responseData = $this->lmsUser->getPanelSettings();
	}

	private function getCourseQuestionsData() {
		$this->responseData['questiondata'] = $this->lmsUser->getCourseQuestionsData();
		$this->responseData['scormdata'] = $this->lmsUser->getCourseScormData();
	}

	private function getCourseQuestionsDataByUserId() {
		$this->responseData['questiondata'] = $this->lmsUser->getCourseQuestionsData();
		$this->responseData['scormdata'] = $this->lmsUser->getCourseScormDataByUserId();
	}

	private function downloadChartPivotTableSingleCourse() {

		$this->responseData['pivotTable'] = $this->lmsUser->downloadChartPivotTableSingleCourse();
	}

	private function markAsPaid() {

		$this->responseData['data'] = $this->lmsUser->markAsPaid();
	}


	private function setPanelSettings() {
		$this->responseData = $this->lmsUser->setPanelSettings($this->data);
	}

	private function getAllGroupsList() {

		$this->lmsNormalUser = LmsUser::create($this->userID, $this->data, 'app');
		$this->lmsMailingUser = LmsUser::create($this->userID, $this->data, 'mailing');


		$groupsNormalList = $this->lmsNormalUser->getGroupsList();
		$groupsMailngList = $this->lmsMailingUser->getGroupsList();

		$result = array_merge($groupsNormalList['groupsList'], $groupsMailngList['groupsList']);

		$this->responseData['groupsList'] = $result;
	}

	private function getUsersFromAllGroups() {

		$usersInGroup = array();

		$selectedGroups = $this->data->selectedGroups;

		foreach ($selectedGroups as $selectedGroup) {

			$this->data->groupID = $selectedGroup->groupId;
        	$from = $selectedGroup->from;

        	$lmsUser = LmsUser::create($this->userID, $this->data, $from);

        	array_push($usersInGroup, $lmsUser->getUsersFromGroup());
		}

		$this->responseData['usersInGroup'] = $usersInGroup;


		// TO DO: Zmienić metodę na pobieranie wszystkich grup
		//$this->responseData = $this->lmsUser->getUsersFromGroup();
	}

	
	// Method only for normal user
	private function deleteAttempt() {

		$this->responseData = $this->lmsUser->deleteAttempt();
	}


	// Normal user


	// Method only for normal user
	private function getCoursesList() {

		$this->responseData = $this->lmsUser->getCoursesList();
	}

	// Method only for normal user
	private function getUsersDetailsInCourse() {

		$this->responseData = $this->lmsUser->getUsersDetailsInCourse();
	}

	// Method only for normal user
	private function getNumberOfUsersAndCourses() {

		$this->responseData = $this->lmsUser->getNumberOfUsersAndCourses();
	}

	// Method only for normal user
	private function getUsersPageTimes() {

		$this->responseData = $this->lmsUser->getUsersPageTimes();
	}

	// Method only for normal user
	private function getUsersCompletionInfo() {

		$this->responseData = $this->lmsUser->getUsersCompletionInfo();
	}

	// Method only for normal user
	private function getUsersList() {

		$this->lmsNormalUser = LmsUser::create($this->userID, $this->data, 'app');
		$this->lmsMailingUser = LmsUser::create($this->userID, $this->data, 'mailing');

		// $this->responseData = $this

		$this->responseData['usersList'] = $this->lmsNormalUser->getUsersList();
		$this->responseData['usersMailingList'] = $this->lmsMailingUser->getUsersList();

		$this->responseData['groupsList'] = $this->lmsUser->getUserGroupsList();
	}

	// Method only for normal user
	private function courseStatus() {
		$this->responseData = $this->lmsUser->getCourseStatus();
	}

	// Method only for normal user
	private function userStatus() {
		$this->responseData = $this->lmsUser->getUserStatus();
	}


	

	private function addUserToGroup() {

		$this->responseData = $this->lmsUser->addUserToGroup();
	}

	private function addNewGroup() {

		$this->responseData = $this->lmsUser->addGroup();
	}

	private function updateUsersLimitsData() {

		$this->responseData = $this->lmsUser->updateUsersLimitsData();
	}

	private function addUser() {

	   $this->responseData = $this->lmsUser->addUser();		
	}

	private function deleteUsers() {

	   $this->responseData = $this->lmsUser->deleteUsers();		
	}

	private function deleteGroup() {

	   	$this->responseData = $this->lmsUser->deleteGroup();	
	}

	private function deleteUsersFromGroup() {

	   	$this->responseData = $this->lmsUser->deleteUserFromGroup();	
	}

	private function getGroupsList() {

	   	$this->responseData = $this->lmsUser->getGroupsList();	
	}

	private function getUsersFromGroup() {

		$this->responseData = $this->lmsUser->getUsersFromGroup();	
	}

	private function getGroupById() {

		$this->responseData = $this->lmsUser->getGroupById();	
	}

	private function editGroup() {

		$this->responseData = $this->lmsUser->editGroup();	
	}

	private function generateCertificate() {


		$this->lmsNormalUser = LmsUser::create($this->userID, $this->data, 'app');

		$this->responseData = $this->lmsUser->generateCertificate();	
	}

	private function getAsignedCoursesToGroup() {


		$this->lmsNormalUser = LmsUser::create($this->userID, $this->data, 'app');

		$this->responseData = $this->lmsUser->getAsignedCoursesToGroup();	
	}

	private function addCoursesToGroup() {


		$this->lmsNormalUser = LmsUser::create($this->userID, $this->data, 'app');

		$this->responseData = $this->lmsUser->addCoursesToGroup();	
	}

	private function deleteCourseFromGroup() {


		$this->lmsNormalUser = LmsUser::create($this->userID, $this->data, 'app');

		$this->responseData = $this->lmsUser->deleteCourseFromGroup();	
	}

	private function editUser() {


		$this->lmsNormalUser = LmsUser::create($this->userID, $this->data, 'app');

		$this->responseData = $this->lmsUser->editUser();	
	}

	private function createGroup() {

		$this->responseData = $this->lmsUser->createGroup();	
	}


	

	private function isJson($string) {
		json_decode($string);
		return (json_last_error() == JSON_ERROR_NONE);
	}

	

	private function convertCourseStatus($st) {

		$status = '';

		switch ($st) {

			case 'nc':
				$status = 'Nie ukończony';
				break;

			case 'f':
				$status = 'Nie zaliczony';
				break;

			case 'c':
				$status = 'Zaliczony';
				break;
		}

		return $status;
	}

}