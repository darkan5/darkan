<?php namespace App\Modules\Lms;

use DB;
use Auth;
use App\User;
use App\Modules\Models\Banners;
use App\Modules\Models\GroupUser;
use App\Modules\Models\Groups;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\MailingUsers;


class LmsUser {

	protected $responseData = array();
	protected $data;
	protected $userID;

	function __construct($userID, $data) {

		$this->userID = Auth::user()->id;
		$this->data = $data;

	}

	function __destruct() {


	}

	public static function create($userID, $data, $userType) {
		
		switch ($userType) {
			case 'app':
				return new LmsNormalUser($userID, $data);
				break;

			case 'mailing':
				return new LmsMailingUser($userID, $data);
				break;

			case 'all':
				return new LmsAllUsers($userID, $data);
				break;
			
			default:
				return new LmsNormalUser($userID, $data);
				break;
		}

	}

	public function markAsPaid() {	
		// To override
	}

	public function updateUsersLimitsData() {	
		// To override
	}
	
	public function getGroupsList() {
		// To override
	}

	public function deleteUserFromGroup() {
		// To override
	}

	public function addUserToGroup() {
		// To override
	}

	public function addUser() {
		// To override
	}

	public function deleteUsers() {
		// To override
	}

	public function addGroup() {	
		// To override
	}

	public function deleteGroup() {
		// To override
	}

	public function getUsersFromGroup() {
		// To override
	}

	public function getUserGroupsList() {
	

		// $userData = array();

		// $userGroupsQuery = $this->query("SELECT name FROM `groups` WHERE `id_owner` = '$this->userID'");
		$userGroupsQuery = Groups::where('id_owner', '=', $this->userID)->get();
		return $userGroupsQuery;

		// foreach ($userGroupsData = $userGroupsQuery->fetch_assoc()) {

		// 	$userData[] = $userGroupsData;
		// }

		// return $userData;
	}

	

	public function getUserGroups($userID) {

		$userGroups = array();

		// $userGroupsQuery = $this->query("SELECT id, name FROM `group_user` LEFT JOIN `groups` ON `id` = `id_group` WHERE `id_user` = '$userID'");
		$userGroupsQuery = GroupUser::where('id_user', '=', $userID)->get();

		foreach ($userGroupsQuery as $userGroupsData) {
			$groupRow = array(
						'id' => $userGroupsData->group->id, 
						'name' => $userGroupsData->group->name, 
						);
			$userGroups[] = $groupRow;
		}

		return $userGroups;
	}

	protected function getMailingUserById($id) {

		// $userData = array();

		// $userMailingQuery = $this->query("SELECT * FROM `mailing_users` WHERE `id` = '$id' LIMIT 1");

		// if ($userMailingData = $userMailingQuery->fetch_assoc()) {
		// 	foreach ($userMailingData as $key => $value) {
		// 		$userData[$key] = $value;
		// 	}
		// }

		// return $userData;

		$userData = MailingUsers::find($id);

		return $userData;



	}

	protected function getNormalUserById($id) {

		// $userDataArray = array();

		// $userQuery = $this->query("SELECT * FROM `lms_user_portal` WHERE `user` = '$id' AND (`portal_admin` = '$this->userID' OR `portal_admin` = '0') LIMIT 1");
		$userData = LmsUserPortal::where('user', '=', $id)
									->where(function($query) {
										$query->where('portal_admin', '=', $this->userID)
												->orWhere('portal_admin', '=', 0);
									})->first();

		return $userData;

		// if ($userData = $userQuery->fetch_assoc()) {

		// 	foreach ($userData as $key => $value) {
		// 		$userDataArray[$key] = $value;
		// 	}
		// }

		// return $userDataArray;
	}

	protected function getMailingUserByMail($mail, $owner_id) {
		// $userData = array();

		// $userMailingQuery = $this->query("SELECT * FROM `mailing_users` WHERE `email` = '$mail' AND `owner_id` = '$owner_id' LIMIT 1");
		$userMailingData = MailingUsers::where('email', '=', $mail)
											->where('owner_id', '=', $owner_id)
											->first();
		return $userMailingData;

		// if ($userMailingData = $userMailingQuery->fetch_assoc()) {
		// 	foreach ($userMailingData as $key => $value) {
		// 		$userData[$key] = $value;
		// 	}
		// }

		// return $userData;
	}

	public function getGroupById() {
		// To override
	}

	public function editGroup() {
		// To override
	}

	protected function isJson($string) {
		json_decode($string);
		return (json_last_error() == JSON_ERROR_NONE);
	}

	public function getCoursesList() {
		// To override
	}

	public function getUserStatus() {
		// To override
	}

	protected function getOwnerCourses() {

		$coursesIDArray = array();

		// $numberOfCoursesQuery = $this->query("SELECT `id_banner` FROM `banners_projects` WHERE `user_id`='$this->userID'");
		$allMyCourses = Banners::where('user_id', '=', $this->userID)->get();
		foreach ($allMyCourses as $course) {

			$coursesIDArray[] = $course['id_banner'];

		}

		return $coursesIDArray;
	}

	public function getUsersDetailsInCourse() {
		// To override
	}

	public function getCourseStatus() {
		// To override
	}

	protected function generate_pass($amount) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $amount; $i++) {
                $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }
    
    protected function generate_hash($login) {
        return hash('md5', $login . time());
    }

    public function getNumberOfUsersAndCourses() {
		// To override
	}

	public function getUsersPageTimes() {
		// To override
	}

	public function getUsersCompletionInfo() {
		// To override
	}

	protected function create_account($mail, $username) {
    	// To override
    }

    // tworzenie nazwy dla subdomeny uzytkownika
    protected function create_subdomain($mail) {
        // To override
    }

    // wysylanie maila z loginem i haslem zalozonego konta
	protected function registration_mail($mail, $pass) {
		// To override
	}

	protected function sendMail($mail, $message) {
		// To override
	}

	public function getUsersList() {
		// To override
	}


	public function generateCertificate() {
		// To override
	}

	public function getAsignedCoursesToGroup() {
		// To override
	}

	public function addCoursesToGroup() {
		// To override
	}

	public function deleteCourseFromGroup() {
		// To override
	}

	public function editUser() {
		// To override
	}

	public function createGroup() {
		// To override
	}

	public function downloadChartPivotTableSingleCourse() {
		// To override
	}

	



	


	

	

	

	// protected function getOwnerAccountsResource() {
	// 	$usersQuery = $this->query("SELECT `user_id`, `login`, `user_name` as `username`, `photo`, 0 as `courses`
	// 								FROM `users`
	// 								WHERE `owner_id` = '$this->userID'");

	// 	$ownerUsers = array();

	// 	while ($usersRet = $usersQuery->fetch_assoc()) {

	// 		$_array = array();

	// 		foreach ($usersRet as $key => $value) {

	// 			$_array[$key] = $value;
	// 		}

	// 		$ownerUsers[] = $_array;
	// 	}

	// 	return $ownerUsers;
	// }

	public function createArrayOfQuery($query) {

		$_array = array();

		if (!empty($query)) {

			foreach ($query as $ret) {

				$_arrayTmp = array();

				foreach ($ret as $key => $value) {

					$_arrayTmp[$key] = $value;
				}

				$_array[] = $_arrayTmp;
			}
		}

		return $_array;
	}

	public function createArrayOfQueryWithKey($query, $qKey) {

		$_array = array();

		if (!empty($query)) {

			foreach ($query as $ret) {

				$_arrayTmp = array();
				$_qKey = 0;

				foreach ($ret as $key => $value) {

					$_arrayTmp[$key] = $value;

					if ($key == $qKey) {
						$_qKey = $value;
					}
				}

				$_array[$_qKey] = $_arrayTmp;
			}
		}

		return $_array;
	}

	
	


	

    

	

	

	

	

	

	

	

	
}

?>