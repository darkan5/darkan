<?php namespace App\Modules\Lms;

use DB;
use Auth;
use App\User;
use App\Modules\Lms\LmsUser;
use Lang;

use App\Modules\Utils\Utils;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\LmsUserPortalPaid;
use App\Modules\Models\ScormData;
use App\Modules\Models\Banners;
use App\Modules\Models\Groups;
use App\Modules\Models\GroupUser;
use App\Modules\Models\LmsInfo;
use App\Modules\Models\LmsGroupContent;
use App\Modules\Mailer\PortalBoughtMail;
use DateTime;
use App\Modules\Mailer\RegistrationLmsMail;

// require_once '../../../../assets/php/excel/PHPExcel.php'; 


class LmsNormalUser extends LmsUser {

	private $registeredUsers = array();
	private $alreadyRegisteredUsers = array();
	private $notRegisteredUsers = array();

	public function getGroupsList() {

		$groupsList = array();

		// $groupsListQuery = $this->query("SELECT * FROM `groups` WHERE `id_owner`='$this->userID'");
		$groupsListQuery = Groups::where('id_owner', '=', $this->userID)->get();
		foreach ($groupsListQuery as $groupsListRet) {

			$groupID = $groupsListRet['id'];

			// $usersInGroupQuery = $this->query("SELECT * FROM `group_user` WHERE `id_group`=$groupID");
			$usersInGroupQuery = GroupUser::where('id_group', '=', $groupID)->count();

			$groupsList[$groupID] = Array(
				'from' => 'app',
				'id' => $groupsListRet['id'],
				"name" => $groupsListRet['name'],
				"users" => $usersInGroupQuery
			);
		}

		$this->responseData['groupsList'] = $groupsList;

		return $this->responseData;
	}

	public function getCourseScormDataByUserId() {

		$courseId = $this->data->courseID;
		$userId = $this->data->userID;

		$scormData = [ ];

		// $coursesQuery = $this->query("SELECT `data` FROM `scorm_data` WHERE `course_id`='$courseId' AND `user_id`='$userId'");

		$coursesQuery = ScormData::where('course_id', '=', $courseId)
									->where('user_id', '=', $userId)
									->get();

		foreach ($coursesQuery as $coursesRet) {
			if ($this->isJson($coursesRet['data'])) {
				array_push( $scormData, json_decode($coursesRet['data']) );
			}
		}

		return $scormData;
	}

	
	public function getCourseQuestionsData() {

		$courseId = $this->data->courseID;

		// $coursesQuery = $this->query("SELECT `questiondata` FROM `banners_projects` WHERE `user_id`='$this->userID' AND `id_banner`='$courseId' LIMIT 1");
		$coursesQuery = Banners::where('user_id', '=', $this->userID)
									->where('id_banner', '=', $courseId)
									->first();

		if ($coursesQuery) {
			$questiondata = $this->isJson($coursesQuery['questiondata']) ? json_decode($coursesQuery['questiondata']) : '';
		}

		return $questiondata;
	}

	public function deleteUserFromGroup() {

		$groupID = (int)$this->data->groupID;
		$usersToDel = $this->data->users;

		if (is_array($usersToDel) && !empty($usersToDel)) {


			if ($this->isGroupAdmin($groupID)) {

				foreach ($usersToDel as $userID) {

					$uID = (int)$userID;

					// $deleteUserQuery = $this->query("DELETE FROM `group_user` WHERE `id_group`='$groupID' AND `id_user`='$uID'");

					GroupUser::where('id_group', '=', $groupID)
						->where('id_user', '=', $uID)
						->delete();
				}

				$this->responseData['groupExists'] = true;
			} else {

				$this->responseData['groupExists'] = false;
			}
		} else {

			$this->responseData['groupExists'] = false;
		}

		return $this->responseData;
	}

	public function addUserToGroup() {

		$groupID = (int)$this->data->groupID;
		$usersIDToGroupID = $this->data->users;

		return $this->addUserToGroupWithArg($groupID, $usersIDToGroupID);
	}

	public function isGroupAdmin($groupID)
	{
		$checkGroupQuery = Groups::where('id_owner', '=', $this->userID)
									->where('id', '=', $groupID)
									->first();
		if ($checkGroupQuery) return true;

		return false;
	}

	public function addUserToGroupWithArg($groupID, $usersIDToGroupID) {

		if (is_array($usersIDToGroupID) && !empty($usersIDToGroupID)) {

			if ($this->isGroupAdmin($groupID)) {

				foreach ($usersIDToGroupID as $userID) {

					$uID = (int)$userID;

					// $checkUserQuery = $this->query("SELECT * FROM `users` WHERE `user_id`='$uID' LIMIT 1");
					$checkUserQuery = User::find($uID);
					if ($checkUserQuery) {

						// $addUserToGroupQuery = $this->query("INSERT INTO `group_user` (`id_group`, `id_user`) VALUES ('$groupID', '$uID')");
						$addUserToGroupQuery = GroupUser::firstOrNew(['id_group' => $groupID, 'id_user' => $uID]);
						$addUserToGroupQuery->id_group = $groupID;
						$addUserToGroupQuery->id_user = $uID;
						$addUserToGroupQuery->save();

					}

				}

				$this->responseData['groupExists'] = true;
			} else {

				$this->responseData['groupExists'] = false;
			}
		} else {

			$this->responseData['groupExists'] = false;
		}

		return $this->responseData;
	}

	public function validateEmail($email) {
		if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
			return true;
		} else {
			return false;
		}
	}

	public function addUser() {

		$usersToCreate = $this->data->userData;
		$groupID = $this->data->groupId;

		$addedUsersId = array();

        $active_actual = 1;


        $own_user_id = Auth::user()->id;

        $actualNumberOfUsers = count($this->getUsersList());
    	$maxLmsUsers = Utils::getPlanMaxValue('lms_users');

        $this->responseData['addedusers'] = array();
        // dodawanie nowych kont
        foreach ($usersToCreate as $singleUserData) {
        	$mailToCreate = $singleUserData->mail;
        	$userNameToCreate = trim($singleUserData->username);

        	// if email is not valid - continue
        	if (!$this->validateEmail($mailToCreate)) { 
        		$this->notRegisteredUsers[] = array('mail' => $mailToCreate, 'msg' => Lang::get('mails.NEW_ACCOUNTS_REGISTERED_ACCOUNT_EMAIL_NOTVALID'), 'username' => $userNameToCreate);
        		continue; 
        	}

            // $user = $this->query("SELECT * FROM `users` WHERE `login`='$mailToCreate'");
            $user = User::where('email', '=', $mailToCreate)->first();

            $this->responseData['mail'] = $mailToCreate;

            // konto jest w systemie
            if ($user) {
                $user_mail_id = $user['id'];

                array_push($addedUsersId, $user_mail_id);

                // zabezpieczenie - nie mozna dodac samego siebie
                if ($user_mail_id != $own_user_id) {
                    // sprawdzenie czy nie ma juz tego uzytkownika w bazie
                    // $check = $this->query("SELECT * FROM `lms_user_portal` WHERE `portal_admin`='$own_user_id' AND `user`='$user_mail_id'");
                    $check = LmsUserPortal::where('portal_admin', '=', $own_user_id)
                    						->where('user', '=', $user_mail_id)
                    						->first();

                    if (!$check) {
                        // $add = $this->query("INSERT INTO `lms_user_portal` (`portal_admin`, `user`, `active_actual`, `active_future`, `user_name`) VALUES ('$own_user_id', '$user_mail_id', '$active_actual', '$active_actual', '$userNameToCreate')");
                        $add = new LmsUserPortal();
                        $add->portal_admin = $own_user_id;
                        $add->user = $user_mail_id;
                        $add->active_actual = $active_actual;
                        $add->active_future = $active_actual;
                        $add->user_name = $userNameToCreate;
                        $add->save();
                    }

                    // $u_login = $this->query("SELECT * FROM `users` WHERE `user_id`='$user_mail_id'");
                    $u_login = User::where('id', '=', $user_mail_id)->first();
                    if ($u_login) {
                        $this->responseData['addedusers'][] = $u_login['email'];
                        $this->alreadyRegisteredUsers[] = array('mail' => $u_login['email'], 'username' => $userNameToCreate);
                    }


                }
            } else {
                // nie ma konta, zakladam
                $user_mail_id = $this->create_account($mailToCreate, $userNameToCreate);

                array_push($addedUsersId, $user_mail_id);

                // $add = $this->query("INSERT INTO `lms_user_portal` (`portal_admin`, `user`, `active_actual`, `active_future`, `user_name`) VALUES ('$own_user_id', '$user_mail_id', '$active_actual', '$active_actual', '$userNameToCreate')");

                $add = new LmsUserPortal();
                $add->portal_admin = $own_user_id;
                $add->user = $user_mail_id;
                $add->active_actual = $active_actual;
                $add->active_future = $active_actual;
                $add->user_name = $userNameToCreate;
                $add->save();


                // $u_login = $this->query("SELECT * FROM `users` WHERE `user_id`='$user_mail_id'");
                $u_login = User::where('id', '=', $user_mail_id)->first();
                if ($u_login) {
                    $this->responseData['addedusers'][] = $u_login['email'];
                    $actualNumberOfUsers++;
                }
            }
        }

        $this->addUserToGroupWithArg($groupID, $addedUsersId);

        $this->updateUsersLimitsData();
	    $own_user_email = Auth::user()->email;
	    $this->sendMailWithUserData( $own_user_email );

	    return $this->responseData;
	}

	public function sendMailWithUserData($email_to) {
        $mailData = array( 'usersTable' => $this->getHtmlTableWithUsersData());

        $mailer = new RegistrationLmsMail();
        $mailer->sendMailWithNewUsersData($mailData, $email_to);
        
	}

	private function getHtmlTableWithUsersData() {

		$table = '<table>';
			$table .= '<thead>';
				$table .= '<th></th>';
				$table .= '<th>'.Lang::get('mails.NEW_ACCOUNTS_REGISTERED_NAME').'</th>';
				$table .= '<th>'.Lang::get('mails.NEW_ACCOUNTS_REGISTERED_EMAIL').'</th>';
				$table .= '<th>'.Lang::get('mails.NEW_ACCOUNTS_REGISTERED_PASS').'</th>';
			$table .= '</thead>';
			$table .= '<tbody>';
				$i = 1;
				foreach ($this->registeredUsers as $key => $userData) {
					$table .= '<tr>';
						$table .= '<td>'.$i.'</td>';
						$table .= '<td>'.$userData['username'].'</td>';
						$table .= '<td>'.$userData['mail'].'</td>';
						$table .= '<td>'.$userData['password'].'</td>';
					$table .= '</tr>';
					$i++;
				}
				foreach ($this->alreadyRegisteredUsers as $key => $registeredUserData) {
					$table .= '<tr>';
						$table .= '<td>'.$i.'</td>';
						$table .= '<td>'.$registeredUserData['username'].'</td>';
						$table .= '<td>'.$registeredUserData['mail'].'</td>';
						$table .= '<td>'. Lang::get('mails.NEW_ACCOUNTS_REGISTERED_ACCOUNT_ALREADY_REGISTERED') .'</td>';
					$table .= '</tr>';
					$i++;
				}
				foreach ($this->notRegisteredUsers as $key => $notRegisteredUserData) {
					$table .= '<tr>';
						$table .= '<td>'.$i.'</td>';
						$table .= '<td>'.$notRegisteredUserData['username'].'</td>';
						$table .= '<td>'.$notRegisteredUserData['mail'].'</td>';
						$table .= '<td>'.$notRegisteredUserData['msg'].'</td>';
					$table .= '</tr>';
					$i++;
				}
			$table .= '</tbody>';

		$table .= '</table>';

		return $table;
	}

	public function addGroup() {	


		$groupName = trim($this->data->groupName);

		// $checkNameQuery = $this->query("SELECT * FROM `groups` WHERE `id_owner`='$this->userID' AND `name`='$groupName' LIMIT 1");
		$checkNameQuery = Groups::where('id_owner', '=', $this->userID)
									->where('name', '=', $groupName)
									->first();
		if ($checkNameQuery) {

			$this->responseData['groupExists'] = true;
		} else {

			// $addNewGroupQuery = $this->query("INSERT INTO `groups` (`id_owner`, `name`, `status`) VALUES ('$this->userID', '$groupName', 0)");

            $addNewGroupQuery = new Groups();
            $addNewGroupQuery->id_owner = $this->userID;
            $addNewGroupQuery->name = $groupName;
            $addNewGroupQuery->status = 0;
            $addNewGroupQuery->save();

			$this->responseData['groupExists'] = false;
		}

		return $this->responseData;
	}

	public function deleteGroup() {


		$groupsToDel = $this->data->groups;

		if (is_array($groupsToDel) && !empty($groupsToDel)) {

			foreach ($groupsToDel as $groupID) {

				$gID = (int)$groupID;

				// $checkGroupQuery = $this->query("SELECT * FROM `groups` WHERE `id_owner`='$this->userID' AND `id`='$gID' LIMIT 1");
				$groupToDelete = Groups::where('id_owner', '=', $this->userID)
											->where('id', '=', $gID)
											->first();

				if ($groupToDelete) {

					// $deleteUsersFromGroupQuery = $this->query("DELETE FROM `group_user` WHERE `id_group`='$gID'");
					GroupUser::where('id_group', '=', $gID)
									->delete();

					$groupToDelete->delete();
				}
			}

			$this->responseData['groupExists'] = true;

		} else {

			$this->responseData['groupExists'] = false;
		}

		return $this->responseData;
	}

	public function getStudentUsername($userId) 
	{
		$user = LmsUserPortal::where('user', '=', $userId)
						->where('portal_admin', '=', $this->userID)
						->first();

		if ($user) {
			return $user->user_name;
		}

		return '';
	}

	public function getStudentLimitExceeded($userId) 
	{
		$user = LmsUserPortal::where('user', '=', $userId)
						->where('portal_admin', '=', $this->userID)
						->first();

		if ($user) {
			return $user->limit_exceeded;
		}

		return 0;
	}

	public function getUsersFromGroupWithArgs($groupID) {
		
		$responce = array();

		$users = Array();
		$groupName = '';

		// $checkGroupQuery = $this->query("SELECT * FROM `groups` WHERE `id`='$groupID' AND `id_owner`='$this->userID' LIMIT 1");
		if ($this->isGroupAdmin($groupID)) {

			// $getUsersFromGroupQuery = $this->query("SELECT 
			// 										`users`.`user_id` as `user_id`, 
			// 										`users`.`login` as `login`, 
			// 										`users`.`photo` as `photo`,
			// 										`lms_user_portal`.`user_name` as `username`
			// 										FROM `group_user` 
			// 										LEFT JOIN `users` 
			// 										ON `group_user`.`id_user`=`users`.`user_id` 
			// 										LEFT JOIN `lms_user_portal` 
			// 										ON `lms_user_portal`.`user`=`users`.`user_id` 
			// 										WHERE `id_group`='$groupID'");

			$usersInGroup = GroupUser::where('id_group', '=', $groupID)->get();


			foreach ( $usersInGroup as $user ) {

				$username = $this->getStudentUsername($user['id_user']);
				$userTableData = User::find($user['id_user']);

				$users[$user['id_user']] = Array(
					"login" => $userTableData->email,
					"username" => $username,
					"userID" => $user['id_user'],
					"photo" => $userTableData->photo
				);
			}

			$groupData = Groups::where('id_owner', '=', $this->userID)
										->where('id', '=', $groupID)
										->first();
			$groupName = $groupData['name'];

			$responce['groupExists'] = true;
		} else {

			$responce['groupExists'] = false;
		}

		$responce['groupUsers'] = $users;
		$responce['groupName'] = $groupName;

		return $responce;
	}

	public function getUsersFromGroup() {

		$groupID = (int)$this->data->groupID;

		$this->responseData = $this->getUsersFromGroupWithArgs($groupID);

		return $this->responseData;

	}

	public function getGroupById() {
		$id = $this->data->groupID;

		// $groupDataQuery = $this->query("SELECT * FROM `groups` WHERE `id`='$id'");
		$groupData = Groups::find($id);
		if ($groupData) {

			$this->responseData['groupData'] = $groupData;

		}

		return $this->responseData;
	}

	public function editGroup() {

		$id = $this->data->groupID;
		$groupName = trim($this->data->groupName);

		$groupData = Groups::find($id);
		$groupData->name = $groupName;
		$groupData->save();


		// $groupDataQuery = $this->query("UPDATE `groups` SET `name` = '$groupName' WHERE `id`='$id';");
		$this->responseData['status'] = 'success';

		return $this->responseData;
	}

	public function getCoursesList() {

		$coursesList = array();

		// $coursesQuery = $this->query("SELECT * FROM `banners_projects` 
		// 							WHERE `user_id`='$this->userID' OR `primary`='1'");

		$coursesQuery = Banners::where('user_id', '=', $this->userID)
								->orWhere('primary', '=', 1)
								->get();

		foreach ( $coursesQuery as $coursesRet ) {

			$bannerID = $coursesRet['id_banner'];

			$numberOfUsersQuery = ScormData::where('course_id', '=', $bannerID)
												->where('user_id', '<>', -1)
												->count();

			$requirements = $this->isJson($coursesRet['requirements']) ? json_decode($coursesRet['requirements']) : '';

			$coursesList[] = array(
				'courseID' 			=> (int)$coursesRet['id_banner'],
				'name' 				=> $coursesRet['name'],
				'size' 				=> (int)$coursesRet['size_project'],
				'photo' 			=> $coursesRet['thumb'],
				'users' 			=> $numberOfUsersQuery,
				'requirements' 		=> $requirements
			);

		}

		$this->responseData['coursesList'] = $coursesList;

		return $this->responseData;
	}

	public function getUserStatus() {

		$userID = $this->data->userID;

		$ownerCourses = $this->getOwnerCourses();

		$userCourses = array();

		$userID = (int)$userID;

		$coursesData = ScormData::whereIn('course_id', $ownerCourses)
									->where('user_id', '=', $userID)
									->get();

		$userData = User::find($userID);
		if ($userData) {
				$this->responseData['userMail'] = $userData['email'];
				$this->responseData['photo'] = $userData['photo'];
				$this->responseData['username'] = $this->getStudentUsername($userID);
				$this->responseData['limit_exceeded'] = $this->getStudentLimitExceeded($userID);
		}

		foreach ($coursesData as $course) {
			$bannerData = Banners::find($course['course_id']);

			$userCourses[] = array(
				'courseID' 					=> $course['course_id'],
				'attempt_id' 				=> $course['id'],
				'courseName' 				=> $bannerData['name'],
				'photo' 					=> $bannerData['thumb'],
				'courseStatus' 				=> $course['course_status'],
				'coursePoints' 				=> $course['user_score'],
				'courseLastVisit' 			=> $course['modify_date']
			);
		}

		$this->responseData['userCourses'] = $userCourses;

		return $this->responseData;
	}

	public function getUsersDetailsInCourse() {


		$courseID = (int)$this->data->courseID;
		$userID = (int)$this->data->userID;
		

		$userLogin = '';
		$photo = '';
		$username = '';

		// $userQuery = $this->query("SELECT * 
		// 								FROM `users` 
		// 								LEFT JOIN `lms_user_portal`
		// 								ON `lms_user_portal`.`user` = `users`.`user_id`
		// 								WHERE `users`.`user_id`='$userID'
		// 								AND 
		// 								(`lms_user_portal`.`portal_admin` = '$this->userID' OR `lms_user_portal`.`portal_admin` = '0')
		// 								LIMIT 1");

		$userData = User::find($userID);
		$userDataLms = LmsUserPortal::where('portal_admin', '=', $this->userID)
										->where('user', '=', $userID)
										->first();

		if ($userData && $userDataLms) {
			$userLogin = $userData['email'];
			$username = $userDataLms['user_name'];
			$photo = $userData['photo'];
		}

		$courseName = '';
		$courseLink = '';
		$requirements = '';
		$thumb = '';
		// $courseQuery = $this->query("SELECT `name`, `iframe`, `requirements`, `thumb`  FROM `banners_projects` WHERE `id_banner`='$courseID'");
		$courseData = Banners::find($courseID);
		if ( $courseData ) {
			$courseName = $courseData['name'];
			$courseLink = $courseData['iframe'];
			$thumb = $courseData['thumb'];
			$requirements = $this->isJson($courseData['requirements']) ? json_decode($courseData['requirements']) : '';;
		}


		// $usersDetailsInCourseQuery = $this->query("SELECT * 
		// 												FROM `scorm_data` 
		// 												WHERE `course_id`='$courseID' 
		// 												AND (`user_id`='$userID') 
		// 												LIMIT 1");
		$usersDetailsInCourseData = ScormData::where('course_id', '=', $courseID)
												->where('user_id', '=', $userID)
												->first();


		if ($usersDetailsInCourseData) {
			$usersDetailsInCourse = array(
					'data' => json_decode($usersDetailsInCourseData['data']),
					'page_time' => json_decode( $usersDetailsInCourseData['page_time']),
					'lesson_location' => $usersDetailsInCourseData['lesson_location'],
					'user_score' => $usersDetailsInCourseData['user_score'],
					'course_status' => $usersDetailsInCourseData['course_status'],
					'userMail' => $userLogin,
					'username' => $username,
					'create_date' => $usersDetailsInCourseData['create_date'],
					'modify_date' => $usersDetailsInCourseData['modify_date'],
					'course_name' => $courseName,
					'courseLink' => $courseLink,
					'thumb' => $thumb,
					'photo' => $photo,
					'requirements' => $requirements
				);

			$this->responseData['usersDetailsInCourse'] = $usersDetailsInCourse;
		}

		return $this->responseData;
	}

	public function getCourseStatusWithArgs($courseID) {

		$responce = array();

		$courseUsers = array();


		// $usersQuery = $this->query("SELECT DISTINCT(`scorm_data`.`user_id`) as `user_id`,
		// 								`scorm_data`.`course_status`, `scorm_data`.`data` as `data`, 
		// 								`scorm_data`.`modify_date` as `modify_date`, 
		// 								`scorm_data`.`user_score` as `score`,
		// 								`scorm_data`.`mailing_login` as `mailing_login`,
		// 								`scorm_data`.`id` as `attempt_id`,
		// 								`users`.`login` as `login`,
		// 								`users`.`photo` as `photo`
		// 								FROM `scorm_data` 
		// 								LEFT JOIN `users` 
		// 								ON `scorm_data`.`user_id`=`users`.`user_id` 
		// 								WHERE `course_id`='$courseID'"
		// 							);

		$scormData = ScormData::where('course_id', '=', $courseID)
									->get();

		foreach ($scormData as $scormRow) {

			$userId = $scormRow['user_id'];
			$userMail = $scormRow->user->email;
			$username = "";
			$fbLink = "";
			$limitExceeded = 0;

			if ($scormRow['user_id'] == -1) {
				$mailingUserData = $this->getMailingUserByMail($scormRow['mailing_login'], $this->userID);

				if(count($mailingUserData) > 0){

					$userId = $mailingUserData['id'];
					$userMail = $scormRow['mailing_login'];
					$username = $mailingUserData['name'];
					$fbLink = $mailingUserData['fb_link'];
					$limitExceeded = 0;//$mailingUserData['limit_exceeded'];

				}

			} else {
				$normalUserData = $this->getNormalUserById($scormRow['user_id']);

				if(count($normalUserData) > 0){

					$userId = $scormRow['user_id'];
					$userMail = $scormRow->user->email;
					$username = $normalUserData['user_name'];
					$fbLink = '';
					$limitExceeded = $normalUserData['limit_exceeded'];
				}
			}

			$courseUsers[] = array(
				'userID' 				=> $userId,
				'attemptId' 			=> $scormRow['id'],
				'userMail' 				=> $userMail,
				'username' 				=> $username,
				'courseStatus' 			=> $scormRow['course_status'],
				'from' 					=> $scormRow['user_id'] != -1 ? 'app' : 'mailing',
				'fb_link'				=> $fbLink,
				'photo' 				=> $scormRow->user->photo,
				'coursePoints' 			=> $scormRow['user_score'],
				'limit_exceeded' 		=> $limitExceeded,
				'courseLastVisit' 		=> $scormRow['modify_date']
			);
			
		}

		$responce['courseName'] = '';

		// $courseQuery = $this->query("SELECT * FROM `banners_projects` WHERE `id_banner`='$courseID' LIMIT 1");
		$courseData = Banners::find($courseID);
		if ($courseData) {
			$responce['courseName'] = $courseData['name'];
			$responce['courseLink'] = $courseData['iframe'];
			$responce['requirements'] = json_decode( $courseData['requirements'] );
			$responce['thumb'] = $courseData['thumb'];
		}

		$responce['courseUsers'] = $courseUsers;

		return $responce;
	}

	public function getUserCourseStatusWithArgs($courseID, $userID) {

		$responce = array();

		$courseUsers = array();


		$usersQuery = $this->query("SELECT DISTINCT(`scorm_data`.`user_id`) as `user_id`,
										`scorm_data`.`course_status`, `scorm_data`.`data` as `data`, 
										`scorm_data`.`modify_date` as `modify_date`, 
										`scorm_data`.`user_score` as `score`,
										`scorm_data`.`mailing_login` as `mailing_login`,
										`scorm_data`.`id` as `attempt_id`,
										`users`.`email` as `login`,
										`users`.`photo` as `photo`,
										`banners_projects`.`name` as `courseName`
										FROM `scorm_data` 
										LEFT JOIN `users` 
										ON `scorm_data`.`user_id`=`users`.`id` 
										LEFT JOIN `banners_projects` 
										ON `scorm_data`.`course_id`=`banners_projects`.`id_banner` 
										WHERE `course_id`='$courseID' AND `users`.`id`='$userID'"  
									);

		while ($usersRet = $usersQuery->fetch_assoc()) {

			$scormData = array();

			$normalUserData = $this->getNormalUserById($usersRet['user_id']);
			$userId = $usersRet['user_id'];
			$userMail = $usersRet['login'];
			$username = $normalUserData['user_name'];
			$fbLink = '';
			$limitExceeded = $normalUserData['limit_exceeded'];


			$courseUsers[] = array(
				'userID' 				=> $userId,
				'attemptId' 			=> $usersRet['attempt_id'],
				'userMail' 				=> $userMail,
				'username' 				=> $username,
				'courseStatus' 			=> $usersRet['course_status'],
				'from' 					=> $usersRet['user_id'] != -1 ? 'app' : 'mailing',
				'fb_link'				=> $fbLink,
				'photo' 				=> $usersRet['photo'],
				'coursePoints' 			=> $usersRet['score'],
				'limit_exceeded' 		=> $limitExceeded,
				'courseLastVisit' 		=> $usersRet['modify_date'],
				'courseName' 			=> $usersRet['courseName']
			);
		}

		$responce['courseUsers'] = $courseUsers;

		return $responce;
	}

	public function getCourseStatus() {

		$courseID = (int)$this->data->courseID;


		$this->responseData = $this->getCourseStatusWithArgs($courseID);

		return $this->responseData;	
	}

	public function getNumberOfUsersAndCourses() {


		$ownerCourses = $this->getOwnerCourses();

		$this->responseData['numberOfUsers'] = 0;
		$maxLmsUsers = Utils::getPlanMaxValue('lms_users');
		$maxMailingUsers = Utils::getPlanMaxValue('mailing_users');
		$maxPublication = Utils::getPlanMaxValue('banners');

		if (!empty($ownerCourses)) {

			$users = array();
			$usersMailing = array();

			$numberOfUsersQuery = ScormData::whereIn('course_id', $ownerCourses)
												->get();

			foreach ( $numberOfUsersQuery as $numberOfUsersRet ) {


				if ($numberOfUsersRet['user_id'] != -1) {

					// zalogowani
					if (!isset($users[(string)$numberOfUsersRet['user_id']])) {
						$users[(string)$numberOfUsersRet['user_id']] = 1;
					}
				} else {

					// z mailingu
					if (!isset($users[(string)$numberOfUsersRet['mailing_login']])) {
						$usersMailing[(string)$numberOfUsersRet['mailing_login']] = 1;
					}
				}
			}

			// $this->responseData['numberOfUsers'] = $numberOfUsersQuery->num_rows;
			$this->responseData['numberOfUsers'] = count($users);
			$this->responseData['numberOfMailingUsers'] = count($usersMailing);
		}

		$this->responseData['numberOfCourses'] = count($ownerCourses);
		$this->responseData['maxCourses'] = $maxPublication;
		$this->responseData['maxUsers'] = $maxLmsUsers;
		$this->responseData['maxMailingUsers'] = $maxMailingUsers;

		return $this->responseData;
	}

	public function getUsersPageTimes() {

		$courseID = (int)$this->data->courseID;

		// $userTimesQuery = $this->query("SELECT `page_time` FROM `scorm_data` WHERE `course_id` = $courseID");
		$userTimes = ScormData::where('course_id', '=', $courseID)->get();

		$pageTimesArray = array();

		foreach ($userTimes as $time) {
			$pageTimesArray[] = json_decode( $time['page_time'] );
		}

		$this->responseData['userTimes'] = $pageTimesArray;

		return $this->responseData;
	}

	public function getUsersCompletionInfo() {

		$ownerCourses = $this->getOwnerCourses();
		
		if (count($ownerCourses) > 0) {
			$complitionInfo = array();

			// $complitionInfoQuery = $this->query("SELECT `course_status`, `user_id` FROM `scorm_data` WHERE `course_id` IN (" . implode(',', $ownerCourses) . ") AND `user_id` <> -1");
			$complitionInfoQuery = ScormData::whereIn('course_id', $ownerCourses)
												->where('user_id', '<>', -1)
												->get();


			foreach ($complitionInfoQuery as $userTimes) {

				if(isset($complitionInfo[$userTimes['course_status']])){
					$complitionInfo[$userTimes['course_status']]++;
				}else{
					$complitionInfo[$userTimes['course_status']] = 1;
				}
			}

			$this->responseData['complitionInfo'] = $complitionInfo;
		}

		return $this->responseData;
	}

	

	protected function create_account($mail, $username) {
        $own_user_id = Auth::user()->id;
        
        $subdomain = Utils::createSubdomain($mail);
        
        $hash_login = $this->generate_hash($mail);
        
        $password = trim($this->generate_pass(8));

        $userPlans = $this->getTrialUserPlans();

        // $new_user = $this->query("INSERT INTO `users` 
        // 							( `date`, `login`, `password`, `subdomain`, `subdomain_name`, `max_projects`, `max_published`, `active`, `hash`, `owner_id`, `user_plans`) 
        // 							VALUES 
        // 							( NOW(), '$mail', '$pass', '$subdomain', '$subdomain', 3, 3, 0, '$hash_login', '$own_user_id', '$userPlans')");
    	
        $new_user = new User();
        $new_user->date = date('Y-m-d');
        $new_user->email = $mail;
        $new_user->password = bcrypt($password);
        $new_user->subdomain = $subdomain;
        $new_user->subdomain_name = $subdomain;
        $new_user->active = 0;
        $new_user->hash = $hash_login;
        $new_user->owner_id = $own_user_id;
        $new_user->user_plans = $userPlans;
        $new_user->version = env('app_version');
        $new_user->save();

        $last_user_id = $new_user->id;

        mkdir(config('app.projects_folder') . $last_user_id );

        $newUserInfo = array(
        	'username'	=> $username,
        	'mail' 		=> $mail,
        	'password' 	=> $password
    	);

        $this->registeredUsers[] = $newUserInfo;
        $this->sendRegistrationMail($newUserInfo, $mail);
        
        return $last_user_id;
    }

    // tworzenie nazwy dla subdomeny uzytkownika
    protected function create_subdomain($mail) {
        $mail_explode = explode('@', $mail);
        $subdomain = $mail_explode[0];
        $subdomain = str_replace('_', '', $subdomain);
        $subdomain = str_replace('.', '', $subdomain);
        $subdomain = str_replace('-', '', $subdomain);
        
        $i = - 0;
        for (;;) {
            if ($i === 0)
                $sub = $subdomain;
            else
                $sub = $subdomain.$i;
            
            // $user = $this->query("SELECT * FROM `users` WHERE `subdomain`='$sub'");
            $user = User::where('subdomain', '=', $sub)->first();

            if (!$user) {
                break;
            }
            $i++;
        }
        
        return $sub;
    }

    // wysylanie maila z loginem i haslem zalozonego konta
	protected function sendRegistrationMail($registrationData, $receiver) {

        $mailer = new RegistrationLmsMail();
        $mailer->sendRegistrationMail($registrationData, $receiver);


		// global $server_link, $lang;


		// $mailMessage = '';

		// $mailMessage .= '<div style="width: 600px;margin: 20px auto;" class="main"><div class="header"><a style="text-decoration: none;" target="_blank" href="http://'. $server_link .'/">';
		// $mailMessage .= '<img class="logo" src="http://darkan.eu/assets/img/logo.png" alt="logo" />';
		// $mailMessage .= '<span style="position: relative;top: -10px;padding: 0;font-family: \'Calibri\';font-size: 31px;margin: 9px;font-weight: bold;line-height: 70px;width: 217px;color: #363636;-webkit-transition: background-position 100ms ease-in-out;-moz-transition: background-position 100ms ease-in-out;-o-transition: background-position 100ms ease-in-out;transition: background-position 100ms ease-in-out;" class="appname">Darkan</span></a></div>';
		// $mailMessage .= '<div style="box-shadow: 0px 0px 10px #000;border-radius: 4px;box-sizing: border-box;padding: 30px 30px 60px 30px;" class="content">';
		// $mailMessage .= '<p>'.$lang['REGISTER_MAIL_HEADER'].'</p><p>'.$lang['REGISTER_MAIL_CONTENT_FROM_LMS'] .'</p>';
		// $mailMessage .= '<p>' . $lang['REGISTER_MAIL_CONTENT_FROM_LMS_2'] . '</p>';
		// $mailMessage .= '<p><strong>' . $lang['REGISTER_MAIL_LOGIN'] . '</strong> ' . $mail . '</p>';
		// $mailMessage .= '<p><strong>' . $lang['REGISTER_MAIL_PASSWORD'] . '</strong> ' . $pass . '</p>';

		// $mailMessage .= '<p><a href="http://'. $server_link .'/page.php?l=login&fr=home&a=l">' . $lang['REGISTER_MAIL_CONTENT_FROM_LMS_3'] . '</a></p>';

		// $mailMessage .= '<hr/>';
		// $mailMessage .= '<p><i>' . $lang['REGISTER_MAIL_CONTENT_NOREPLY'] . '</i></p>';

		// // footer!
		// $mailMessage .= '</div></div><div class="footer" style="width: 100%;height: 90px;background-color: #7FA1B7;margin-top: 20px;"><div style="width:700px;margin:0px auto;" class="footer-inner"><div style="margin:7px;display:inline-block;" class="darkantitlewrapper"><img src="http://darkan.eu/assets/img/frontpage/main-header_'.$lang['LANG_VERSION'].'.png" alt="title"></div><div style="display:inline-block;float:right;right:30px;background-color:#EEEEEE;height:100%;width:255px;position:relative;" class="socialiconswrapper"><a style="text-decoration: none;border: none;" target="_blank" href="http://darkan.eu/blog/?lang='.$lang['LANG_VERSION'].'"><img style="padding: 20px 17px;" src="http://darkan.eu/assets/img/social/wp.png"></a><a style="text-decoration: none;border: none;" target="_blank" href="https://www.facebook.com/pages/Darkan/675324632508995?ref=ts&fref=ts"><img style="padding: 20px 17px;" src="http://darkan.eu/assets/img/social/fb_oval.png"></a><a style="text-decoration: none;border: none;" target="_blank" href="https://www.youtube.com/channel/UCCpw1swP1Lyq3LLLNi_4F0w"><img style="padding: 20px 17px;" src="http://darkan.eu/assets/img/social/yt_oval.png"></a></div></div></div>';
		
  //       return $this->sendMail($mail, $mailMessage);
	}

	public function deleteUsers() {

		$usersToDelete = $this->data->users;

		if (is_array($usersToDelete) && !empty($usersToDelete)) {

			foreach ($usersToDelete as $userId) {

				$uID = (int)$userId;

				// $checkUserQuery = $this->query("SELECT * FROM `lms_user_portal` WHERE `portal_admin`='$this->userID' AND `user`='$uID' LIMIT 1");
				$checkUserData = LmsUserPortal::where('portal_admin', '=', $this->userID)
												->where('user', '=', $uID)
												->first();

				if ($checkUserData) {

					// $deleteUserFromLmsQuery = $this->query("DELETE FROM `lms_user_portal` WHERE `portal_admin`='$this->userID' AND `user`='$uID'");

					// $deleteUserFromGroups = $this->query("DELETE FROM `group_user` WHERE `id_user`='$uID'");
					GroupUser::where('id_user', '=', $uID)->delete();

					// $deleteUserScormDataQuery = $this->query("DELETE FROM `scorm_data` WHERE `user_id`='$uID'");
					ScormData::where('user_id', '=', $uID)->delete();

					$checkUserData->delete();

					$this->responseData['userDeleted'] = true;
				}
			}


		} else {

			$this->responseData['userDeleted'] = false;
		}

		$this->updateUsersLimitsData();

		return $this->responseData;
	}

	// protected function sendMail($mail, $message) {
	// 	global $lang;

	// 	// require_once '../swiftmailer/lib/swift_required.php';

	// 	$arrayTo = array();
	// 	$arrayTo[] = $mail;

 //        $mailData = Swift_Message::newInstance()
 //                ->setSubject($lang['REGISTER_MAIL_SUBJECT_LMS'])
 //                ->setFrom(array('noreply@darkan.eu' => 'Darkan'))
 //                ->setTo($arrayTo)
 //                ->setBody($message, 'text/html');

 //        $transport = Swift_SmtpTransport::newInstance('localhost', 25);


 //        $mailer = Swift_Mailer::newInstance($transport);

 //        $result = $mailer->send($mailData);

 //        return $this->responseData['mail'] = 'mail powinien byc wyslany';
	// }

	public function updateUsersLimitsData() {
		$usersList = $this->getUsersList();
		
		$usersLimit = (int)Utils::getPlanMaxValue('lms_users');

		$updatedAccounts = array();

		$i = 0;
		foreach ($usersList as $userData) {
			$userId = $userData['id'];

			if ((int)$userData['courses'] > 0) {
				if ($i >= $usersLimit) {
					$limitExceeded = 1;
				} else {
					$limitExceeded = 0;
				}

				$updatedAccounts[] = array(
						'login' => $userData['login'],
						'courses' => (int)$userData['courses'],
						'limit' => $limitExceeded
					);

				// $this->query("UPDATE `lms_user_portal` SET `limit_exceeded` = '$limitExceeded' WHERE `user` = '$userId' AND `portal_admin` = '$this->userID'");
				$userToUpdate = LmsUserPortal::where('user', '=', $userId)
												->where('portal_admin', '=', $this->userID)
												->first();
				if($userToUpdate){
					$userToUpdate->limit_exceeded = $limitExceeded;
					$userToUpdate->save();
				}
				$i++;
			} else {

				$updatedAccounts[] = array(
						'login' => $userData['login'],
						'courses' => (int)$userData['courses'],
						'limit' => 0
					);

				$userToUpdate = LmsUserPortal::where('user', '=', $userId)
												->where('portal_admin', '=', $this->userID)
												->first();
				if($userToUpdate){
					$userToUpdate->limit_exceeded = 0;
					$userToUpdate->save();
				}

			}
		}

		// $this->responseData['UPDATING'] = $updatedAccounts;
		$this->responseData['usersLimit'] = $usersLimit;
	}

	public function getUsersList() {

		$ownerCourses = $this->getOwnerCourses();

		$limit = Utils::getPlanMaxValue('lms_users');

		$usersList = array();

		$usersList = LmsUserPortal::where('portal_admin', '=', $this->userID)
										->orWhere('portal_admin', '=', 0)
										->get();

		$lmsOptions = LmsInfo::where('user_id', '=', Auth::user()->id)->first();
		$lmsPayable = false;


		if($lmsOptions){
			$lmsPayable = $lmsOptions->paid && $lmsOptions->price > 0;
		}


		$_users = array();
		foreach ($usersList as $user) {

			$userID = $user['user'];

			$userTableData = User::find($user->user);

			$scormCoursesCount = ScormData::whereIn('course_id', $ownerCourses)
											->where('user_id', '=', $user->user)
											->count();

			$user->login = $userTableData->login;
			$user->photo = $userTableData->photo;
			$user->id = $userTableData->user_id;
			$user->courses = $scormCoursesCount;
			$user->username = $user->user_name;
			$user->payment = false;

			if ($lmsPayable) {
				$userPayment = LmsUserPortalPaid::where('portal_admin', '=', Auth::user()->id)
													->where('user', '=', $user->id)
													->first();
				if ($userPayment && $userPayment->paid == 1) {
					$user->payment = true;
				}
			}
			
			$groups = $this->getUserGroups($userID);

			$user->groups = $groups;
		}


		return $usersList;
	}

	private function getTrialUserPlans() {
		$expirationDate = new DateTime(date('Y-m-d') . ' + 14 day');
		$expirationDate = $expirationDate->format('Y-m-d');
		$userPlans = array(
			"cc" => array("Darkan_standard" => $expirationDate),
			"lms" => array("Darkan_lmslight" => $expirationDate)
			// "mp" => array("Darkan_marketinglight" => $expirationDate),
		);
		return json_encode( $userPlans );
	}

	// public function _getUsersList() {



	// 	$ownerCourses = $this->getOwnerCourses();

	// 	$ownerAccountsRes = $this->getOwnerAccountsResource();

	// 	$usersList = array();
	// 	$usersLoginList = array();
	// 	$usersMailingList = array();


	// 	while ($ownerAccounts = $ownerAccountsRes->fetch_assoc()) {

	// 		$usersList[(string)$ownerAccounts['user_id']] = array(
	// 			'userID' 			=> $ownerAccounts['user_id'],
	// 			'userMail' 			=> $ownerAccounts['login'],
	// 			'from'				=> 'app',
	// 			'photo'				=> $ownerAccounts['photo'],
	// 			'courses'			=> 0
	// 		);
	// 	}



	// 	if (!empty($ownerCourses)) {

	// 		$usersQuery = $this->query("SELECT 
	// 										`users`.`user_id` as `user_id`, 
	// 										`users`.`photo` as `photo`, 
	// 										`users`.`login` as `login`, 
	// 										`scorm_data`.`mailing_login` as `mailing_login` 
	// 										FROM `scorm_data`
	// 										LEFT JOIN `users`
	// 										ON `scorm_data`.`user_id`=`users`.`user_id` 
	// 										WHERE `course_id` IN (" . implode(',', $ownerCourses) . ")");

	// 		$this->responseData['usersQuery'] = "SELECT `users`.`user_id` as `user_id`, `users`.`photo` as `photo`, `users`.`login` as `login`, `scorm_data`.`mailing_login` as `mailing_login` FROM `scorm_data` LEFT JOIN `users` ON `scorm_data`.`user_id`=`users`.`user_id` WHERE `course_id` IN (" . implode(',', $ownerCourses) . ")";

	// 		while ($usersRet = $usersQuery->fetch_assoc()) {


	// 			if ($usersRet['user_id'] != -1) {

	// 				$usersList[(string)$usersRet['user_id']] = array(
	// 					'userID' 			=> $usersRet['user_id'],
	// 					'userMail' 			=> $usersRet['login'],
	// 					'from'				=> 'app',
	// 					'photo'				=> $usersRet['photo'],
	// 					'courses'			=> 0
	// 				);

	// 				$usersLoginList[(string)$usersRet['user_id']] = array(
	// 					'userID' 			=> $usersRet['user_id'],
	// 					'userMail' 			=> $usersRet['login'],
	// 					'courses'			=> 0
	// 				);
	// 			} else {


	// 					$usersList[$usersRet['mailing_login']] = array(
	// 						'userID' 			=> $usersRet['mailing_login'],
	// 						'userMail' 			=> $usersRet['mailing_login'],
	// 						'from'				=> 'mailing',
	// 						'photo'				=> $usersRet['photo'],
	// 						'courses'			=> 0
	// 					);

	// 					$usersMailingList[$usersRet['mailing_login']] = array(
	// 						'userID' 			=> $usersRet['mailing_login'],
	// 						'userMail' 			=> $usersRet['mailing_login'],
	// 						'courses'			=> 0
	// 					);


	// 			}
	// 		}
	// 	}

	// 	// zalogowani
	// 	if (!empty($usersLoginList)) {

	// 		$_users = array();
	// 		foreach ($usersLoginList as $user) {
	// 			$_users[] = $user['userID'];
	// 		}

	// 		$coursesUserLoginQuery = $this->query("SELECT * FROM `scorm_data` WHERE `course_id` IN (" . implode(',', $ownerCourses) . ") AND `user_id` IN (" . implode(',', $_users) . ")");
	// 		while ($coursesLoginUserRet = $coursesUserLoginQuery->fetch_assoc()) {

	// 			$usersList[(string)$coursesLoginUserRet['user_id']]['courses']++;
	// 		}

	// 	}

	// 	// z mailingu
	// 	if (!empty($usersMailingList)) {

	// 		$_users = array();
	// 		foreach ($usersMailingList as $user) {
	// 			$_users[] = $user['userID'];
	// 		}

	// 		$coursesUserMailingQuery = $this->query("SELECT * FROM `scorm_data` WHERE `course_id` IN (" . implode(',', $ownerCourses) . ") AND `mailing_login` IN ('" . implode("','", $_users) . "')");
	// 		while ($coursesMailingUserRet = $coursesUserMailingQuery->fetch_assoc()) {

	// 			$usersList[$coursesMailingUserRet['mailing_login']]['courses']++;
	// 		}

	// 	}

	// 	$this->responseData['usersList'] = $usersList;


	// 	return $this->responseData;
	// }

	public function getAsignedCoursesToGroup() {

		$groupID = (int)$this->data->groupID;

		$coursesInGroup = array();

		// $coursesInGroupQuery = $this->query("SELECT `banners_projects`.`id_banner` as `id`, `banners_projects`.`name` as `name`,  `banners_projects`.`thumb` as `photo` 
		// 									FROM `lms_group_content` 
		// 									LEFT JOIN `banners_projects` 
		// 									ON `lms_group_content`.`content_id`=`banners_projects`.`id_banner` 
		// 									WHERE `lms_group_content`.`group_id`='$groupID'");

		$coursesInGroupQuery = LmsGroupContent::where('group_id', '=', $groupID)->get();

		foreach ($coursesInGroupQuery as $course) {
			$course->id = $course->banner->id_banner;
			$course->name = $course->banner->name;
			$course->thumb = $course->banner->thumb;
		}


		// $coursesInGroup = $this->createArrayOfQuery($coursesInGroupQuery);

		return array('coursesInGroup' => $coursesInGroupQuery);
	}

	public function addCoursesToGroup() {
		$groupID = (int)$this->data->groupID;
		$courses = $this->data->courses;


		if(is_array($courses)){
			foreach ($courses as $courseID) {
				// $addCoursesToGroupQuery = $this->query("INSERT INTO `lms_group_content` (`group_id`, `content_id`) VALUES ('$groupID', '$courseID')");
				$addCoursesToGroup = new LmsGroupContent();
				$addCoursesToGroup->group_id = $groupID;
				$addCoursesToGroup->content_id = $courseID;
				$addCoursesToGroup->save();
			}

			return $this->responseData['added'] = true;

		}else{
			return $this->responseData['added'] = false;
		}
	}

	public function deleteCourseFromGroup() {

		$groupID = (int)$this->data->groupID;
		$courseID = (int)$this->data->courseID;

		// $deleteCourseFromGroupQuery = $this->query("DELETE FROM `lms_group_content` WHERE `group_id`='$groupID' AND `content_id`='$courseID'");
		$deleteCourseFromGroupQuery = LmsGroupContent::where('group_id', '=', $groupID)
														->where('content_id', '=', $courseID)
														->delete();

		$this->responseData['deleted'] = true;

		return $this->responseData;
	}

	public function editUser() {

		//AND `portal_admin`='$this->userID'

		$userID = $this->data->userID;
		$userName = trim($this->data->userName);
											// echo "id: " . $userID;

		// $editUserDataQuery = $this->query("UPDATE `lms_user_portal` SET `user_name` = '$userName' WHERE `user`='$userID'");
		$editUserDataQuery = LmsUserPortal::where('user', '=', $userID)
											->where(function($q) {
												$q->where('portal_admin', '=', Auth::user()->id)
													->orWhere('portal_admin', '=', 0);
											})
											->first();

											// print_r($editUserDataQuery);
		if ($editUserDataQuery) {
			$editUserDataQuery->user_name = $userName;
			$editUserDataQuery->save();	
		}

		$this->responseData['saved'] = $editUserDataQuery;

		return $this->responseData;
	}

	public function generateCertificate() {

		global $server_link;

		$this->deleteOutputPackage();

		if (!file_exists('certyficate')){
                mkdir('certyficate');
        }

        if (!file_exists('certyficate/html')){
                mkdir('certyficate/html');
        }

        if (!file_exists('certyficate/html/' . $this->userID)){
                mkdir('certyficate/html/' . $this->userID);
        }

        if (!file_exists('certyficate/output')){
                mkdir('certyficate/output');
        }

        if (!file_exists('certyficate/output/' . $this->userID)){
                mkdir('certyficate/output/' . $this->userID);
        }

        if (!file_exists('certyficate/zip')){
                mkdir('certyficate/zip');
        }

        if (!file_exists('certyficate/zip/' . $this->userID)){
                mkdir('certyficate/zip/' . $this->userID);
        }


        $generateStatuses = array();

        $noNameUsers = array();
		$allOutoputFilesPath = array();
		$allUsers = array();

		$objPHPExcel = new PHPExcel();

		$xml = new SimpleXMLElement('<xml/>');


		//$courseID = (int)$this->data->courseID;

		$coursesIDS = $this->data->coursesIDS;
		$groupsIDS = $this->data->groupsIDS;
		$courseDate = $this->data->courseDate;

		$certificateTitle = $this->mysql_conn->real_escape_string( $this->data->certificateTitle );

		foreach ($groupsIDS as $groupID) {
			$usersInGroup = $this->getUsersFromGroupWithArgs($groupID);

			// print_r(json_encode($usersInGroup));
			// die();

			foreach ($usersInGroup["groupUsers"] as $user) {

				
				$userID = $user["userID"];

				// print_r(json_encode($user));
				// continue;


				$courseStatusesPassed = array();
				$courseStatuses = array();
				$coursesUsers = array();

				foreach ($coursesIDS as $courseID) {
					$courseStatus = $this->getUserCourseStatusWithArgs($courseID, $userID);

					$courseUsers = $courseStatus['courseUsers'];

					foreach ($courseUsers as $key => $courseUser) {
						$from = $courseUser['from'];

						if($from == 'app'){
							$status = $courseUser['courseStatus'];

							array_push($courseStatuses, $courseStatus);
							array_push($courseUsers, $courseUsers);

							if($status == 'passed'){
								array_push($courseStatusesPassed, true);
								
							}else{
								break;
							}
						}else{
							break;
						}
					}	
				}

				//print_r(json_encode($user));


				$arrayUniqueValues = array_unique($courseStatusesPassed);

				if(count($courseStatusesPassed) == count($coursesIDS) && count($arrayUniqueValues) == 1 && $arrayUniqueValues[0] == true){

					$generateStatus = $this->generateScormUserCertificate($courseStatuses, $user, $certificateTitle, $courseDate, $noNameUsers, $allOutoputFilesPath);

					array_push($generateStatuses, $generateStatus);
				}

				$this->addCelsToExcelFile($objPHPExcel, $courseStatuses, $user, $certificateTitle, $courseDate, $allUsers, $xml);



			}

		}

		

		

		// $courseStatus = $this->getCourseStatusWithArgs($courseID);

		// $courseUsers = $courseStatus['courseUsers'];


		

		
		// foreach ($courseUsers as $key => $courseUser) {

		// 	$from = $courseUser['from'];

		// 	if($from == 'app'){
		// 		$status = $courseUser['courseStatus'];

		// 		if($status == 'passed'){
		// 			$this->generateScormUserCertificate($courseStatus, $courseUser, $noNameUsers, $allOutoputFilesPath);
		// 		}
		// 	}
		// }






		$arrayUniqueGenerateStatusValues = array_unique($generateStatuses);

		//if(count($arrayUniqueGenerateStatusValues) == 1 && $arrayUniqueGenerateStatusValues[0] == true){

			$this->copyDatabase();
			$this->saveExcelFile($objPHPExcel, $xml);

			$zipFilePath = $this->makePackage();


			$responce = array(
				'status' => 'success',
				'zipFilePath' => 'http://' . $server_link . '/darkanpanel/server/php/lms_controller/' .  $zipFilePath
			);

		// }else{
		// 	$responce = array(
		// 		'status' => 'error',
		// 		'zipFilePath' => ''
		// 	);
		// }


		

		$this->rrmdir('certyficate/html/' . $this->userID);
		$this->rrmdir('certyficate/output/' . $this->userID);


		



		$this->responseData['responce'] = $responce;



		return $this->responseData;
	}

	// public function getCoursesStatus(coursesIDS) {

	// 	// $passed = false;

	// 	// foreach ($coursesIDS as $key => $courseID) {

	// 	// 	$courseStatus = $this->getCourseStatusWithArgs($courseID);

	// 	// 	$courseUsers = $courseStatus['courseUsers'];
	// 	// }
	// }

	public function generateScormUserCertificate($courseStatuses, $user, $certificateTitle, $courseDate, &$noNameUsers, &$allOutoputFilesPath) {

		$username = $user['username'];

		if($username == ""){
			array_push($noNameUsers, "no-name");
			$username = 'bez_nazwy_' . count($noNameUsers);
		}

		$prefix = urlencode(str_replace(" ", "_", $username));

		$templateFileName = 'certyficate/templates/template_1/certyficate_template.html';
		$outputHtmlFileName = 'certyficate/html/'. $this->userID .'/certyficate.html';
		$outputPdfFilePath = 'certyficate/output/'. $this->userID .'/certyficate_' .$prefix;


		$key = array_search($outputPdfFilePath, $allOutoputFilesPath); // $key = 2;

		if($key != -1){
			$outputPdfFilePath . '_' . count($allOutoputFilesPath);
		}

		array_push($allOutoputFilesPath, $outputPdfFilePath);


		$outputPdfFileName  = $outputPdfFilePath .'.pdf';


		$wpTemplate = fopen($templateFileName, 'r');
		$wpOutput = fopen($outputHtmlFileName, 'w');

		$fileContent = fread($wpTemplate, filesize($templateFileName));

		$fileContent = $this->repalceCertificateContent($fileContent, $courseStatuses, $user, $certificateTitle, $courseDate);

	
		fwrite($wpOutput, $fileContent);
		fclose( $wpTemplate);
		fclose( $wpOutput);




		exec("wkhtmltopdf $outputHtmlFileName $outputPdfFileName");

		return true;
	}

	public function repalceCertificateContent($fileContent, $courseStatuses, $user, $certificateTitle, $courseDate) {

		// $courseLink = $courseStatus['courseLink'];
		// $courseName = $courseStatus['courseName'];
		// $thumb = $courseStatus['thumb'];

		// $courseLastVisit = $courseUser['courseLastVisit'];
		// $coursePoints = $courseUser['coursePoints'];
		// $photo = $courseUser['photo'];
		// $userMail = $courseUser['userMail'];
		 $userName = $user['username'];

		// $fileContent = str_replace('<%courseLink%>', $courseLink, $fileContent);
		// $fileContent = str_replace('<%courseName%>', $courseName, $fileContent);
		// $fileContent = str_replace('<%thumb%>', $thumb, $fileContent);

		// $fileContent = str_replace('<%courseLastVisit%>', $courseLastVisit, $fileContent);
		// $fileContent = str_replace('<%coursePoints%>', $coursePoints, $fileContent);
		// $fileContent = str_replace('<%photo%>', $photo, $fileContent);
		// $fileContent = str_replace('<%userMail%>', $userMail, $fileContent);
		$fileContent = str_replace('<%certificateTitle%>', $certificateTitle, $fileContent);
		$fileContent = str_replace('<%username%>', $userName, $fileContent);
		$fileContent = str_replace('<%courseDate%>', $courseDate, $fileContent);

		$genderPrefix = 'ukończył(a)';

		if($userName != ""){
			$gender = 'male';
			$userNameArray = explode(" ", $userName);
			$onlyName = strtolower($userNameArray[0]);



			$lastLetter = $onlyName[count($onlyName) - 1];


			if($lastLetter == "a"){
				$gender = 'female';
			}


			if($gender == 'female'){
				$genderPrefix = 'ukończyła';
			}else{
				$genderPrefix = 'ukończył';
			}

			
		}

		$fileContent = str_replace('<%genderPrefix%>', $genderPrefix, $fileContent);

		


		return $fileContent;
	}

	private function deleteOutputPackage(){
		$outputFolder = 'certyficate/zip/' . $this->userID;

		$this->rrmdir($outputFolder);
	}

	private function makePackage(){

		$zipFilePath = 'certyficate/zip/'. $this->userID .'/certyficates.zip';
		$outputFolder = 'certyficate/output/' . $this->userID;

        $zip = new ZipArchive();

        if ($zip->open($zipFilePath, ZIPARCHIVE::CREATE) !==TRUE) {
            exit ("nie mogę zrobić pliku archiwum certyficates.zip");
        }

        $this->zipDir($zip, $outputFolder);

        $zip->close();

        return $zipFilePath; 
	}

	private function getCellNameByIndex($index) {
		$arrayalphabet = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

		$value = $arrayalphabet[$index];

		return $value;
	}

	private function addCelsToExcelFile($objPHPExcel, $courseStatuses, $user, $certificateTitle, $courseDate, &$allUsers, &$xml) {

		
		$objPHPExcel->setActiveSheetIndex(0);

		array_push($allUsers, $user);

		$allUsersCount = count($allUsers) + 1;


		$userName = $user['username'];
		$login = $user['login'];

		$objPHPExcel->getActiveSheet()->SetCellValue('A' . $allUsersCount, $userName);
		$objPHPExcel->getActiveSheet()->SetCellValue('B' . $allUsersCount, $login);

		$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20);
		$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(30);
		$objPHPExcel->getActiveSheet()->getStyle('A1:B1')->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_WHITE);
		$objPHPExcel->getActiveSheet()->getStyle('A1:B1')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
    	$objPHPExcel->getActiveSheet()->getStyle('A1:B1')->getFill()->getStartColor()->setARGB(PHPExcel_Style_Color::COLOR_BLUE);	

    	$objPHPExcel->getActiveSheet()->getStyle('A1:B1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    	$objPHPExcel->getActiveSheet()->getStyle('A1:B1')->getFont()->setBold(true);


    	//print_r(json_encode($courseStatuses));

    	if(count($courseStatuses) == 0){
			$track = $xml->addChild('uzytkownik');
			$track->addChild('id', $allUsersCount - 1);
		    $track->addChild('nazwa', $userName != '' ? $userName :  'brak danych');
		    $track->addChild('email', $login != '' ? $login : 'brak danych');
		    $track->addChild('punkty', 'brak danych');
		    $track->addChild('status','brak danych');
		    $track->addChild('kurs', 'brak danych');
		    $track->addChild('data', 'brak danych');
		    $track->addChild('czas', 'brak danych');
		    $track->addChild('suma', 1);
		}

		foreach ($courseStatuses as $key => $courseStatus) {

			$courseUsers = $courseStatus['courseUsers'];

			$cellName = $this->getCellNameByIndex($key);
			//$objPHPExcel->getActiveSheet()->getColumnDimension($cellName)->setWidth(40);

			$objPHPExcel->getActiveSheet()->SetCellValue($this->getCellNameByIndex(0) . '1', "Imię i nazwisko");
			$objPHPExcel->getActiveSheet()->SetCellValue($this->getCellNameByIndex(1) . '1', "Email");


			foreach ($courseUsers as $key2 => $courseUser) {
				$from = $courseUser['from'];



				if($from == 'app'){
					switch($courseUser['courseStatus']) {
						case 'passed':
							$status = 'Zaliczony';
							break;
						case 'incomplete':
							$status = 'Niezakończony';
							break;
						case 'failed':
							$status = 'Niezaliczony';
							break;
						case '':
							$status = 'Nierozpoczęty';
							break;
						default:
							$status = 'Nierozpoczęty';
							break;
					}
					$courseName = $courseUser['courseName'];
					$courseLastVisit = $courseUser['courseLastVisit'];
					$coursePoints = $courseUser['coursePoints'];

					$objPHPExcel->getActiveSheet()->SetCellValue($this->getCellNameByIndex($key+ 2) . '1', $courseName);

					$objPHPExcel->getActiveSheet()->SetCellValue($this->getCellNameByIndex($key + 2) . $allUsersCount, $status);

					$track = $xml->addChild('uzytkownik');
					$track->addChild('id', $allUsersCount - 1);
				    $track->addChild('nazwa', $userName != '' ? $userName :  'brak danych');
				    $track->addChild('email', $login != '' ? $login : 'brak danych');
				    $track->addChild('punkty', $coursePoints != '' ? $coursePoints : 'brak danych');
				    $track->addChild('status', $status != '' ? $status : 'brak danych');
				    $track->addChild('kurs', $courseName != '' ? $courseName : 'brak danych');
				    $track->addChild('data', $courseLastVisit != '' ?  explode(" ", $courseLastVisit)[0] : 'brak danych');
				    $track->addChild('czas', $courseLastVisit != '' ?  explode(" ", $courseLastVisit)[1] : 'brak danych');
				    $track->addChild('suma', 1);
				}


			}

			$cn = $this->getCellNameByIndex($key+2);

			$objPHPExcel->getActiveSheet()->getColumnDimension($cn)->setWidth(20);
			$objPHPExcel->getActiveSheet()->getStyle($cn .'1')->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_WHITE);
			$objPHPExcel->getActiveSheet()->getStyle($cn .'1')->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
    		$objPHPExcel->getActiveSheet()->getStyle($cn .'1')->getFill()->getStartColor()->setARGB(PHPExcel_Style_Color::COLOR_BLUE);	

    		$objPHPExcel->getActiveSheet()->getStyle($cn .'1')->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
    		$objPHPExcel->getActiveSheet()->getStyle($cn .'1')->getFont()->setBold(true);

		}

		//$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(20);
		//$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(20);
		//$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(20);
		//$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(20);

		// $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(10);
		// $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setWidth(40);
		// $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setWidth(20);
		// $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth(15);
		// $objPHPExcel->getActiveSheet()->getColumnDimension('I')->setWidth(15);

		
	}

	public function markAsPaid() {
		$payMethod = $this->data->payMethod;
		$userId = $this->data->userID;
		$user = User::find($userId);



        $lmsInfo = LmsInfo::where('user_id', '=', Auth::user()->id)->first();
        if ($lmsInfo && $lmsInfo->portal_bought_mail_template != '') {
            $mailer = new PortalBoughtMail();

			$userPortalData = LmsUserPortal::where('user', '=', $userId)
										->where('portal_admin', '=', Auth::user()->id)
										->first();

			$lmsPaidRow = LmsUserPortalPaid::firstOrNew(['user' => $userId, 'portal_admin' => Auth::user()->id]);
			$lmsPaidRow->user = $userId;
			$lmsPaidRow->portal_admin = Auth::user()->id;
			$lmsPaidRow->paid = 1;
			$lmsPaidRow->save();


            $username = "";
            if ($userPortalData) {
                $username = $userPortalData->user_name;
            }

            $mailData = array(
                "username" => $username,
                "owner_id" => Auth::user()->id,
                "paymentMethodPl" => Lang::get('mails.' . $payMethod . '-pl'),
                "paymentMethodEn" => Lang::get('mails.' . $payMethod . '-en'),
                "mail_template" => $lmsInfo->portal_bought_mail_template,
                "sender" => $lmsInfo->paypal_mail
            );
            $mailer->sendPortalBoughtMail( $mailData, $user->login );

        }


		return array('payMethod' => $payMethod);
	}

	private function copyDatabase() {
		$file = 'certyficate/database/courses.accdb';
		$newfile = 'certyficate/output/' . $this->userID  .'/courses.accdb';

		copy($file, $newfile);
	}

	private function saveExcelFile($objPHPExcel, &$xml) {

		$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);

	    $file = 'certyficate/output/' . $this->userID  .'/courses.xlsx';
	    
	    $objWriter->save($file);


	    $xmlFile = 'certyficate/output/' . $this->userID  .'/courses.xml';
	    $wpXmlOutput = fopen($xmlFile, 'w');
	
		fwrite($wpXmlOutput, $xml->asXML());
		fclose( $wpXmlOutput);
	}
 

	private function zipDir($zip, $dir) {

        foreach (
            $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir),
            RecursiveIteratorIterator::SELF_FIRST) as $item
        ) {
            if ($item->isDir()) {
            } else {

                $zip->addFile($dir . DIRECTORY_SEPARATOR . $iterator->getSubPathName(), $iterator->getSubPathName());

            }
        }
    }

    private function rrmdir($dir)
    {
        if (is_dir($dir))
        {
            $objects = scandir($dir);
            foreach ($objects as $object)
            {
                if ($object != "." && $object != "..") {
                    if (filetype($dir."/".$object) == "dir")
                    	$this->rrmdir($dir."/".$object);
                    else
                    	unlink($dir."/".$object);
                }
            }
            reset($objects);
            rmdir($dir);
        }
    }
}