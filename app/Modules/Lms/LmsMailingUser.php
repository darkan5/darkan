<?php namespace App\Modules\Lms;

use DB;
use Auth;
use App\User;
use App\Modules\Models\ScormData;
use App\Modules\Models\Banners;
use App\Modules\Models\MailingUsers;
use App\Modules\Models\MailingGroups;
use App\Modules\Models\MailingGroupUser;


class LmsMailingUser extends LmsUser {


	public function getGroupsList() {

		$groupList = array();

		// $getGroupListQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id_owner`='$this->userID'");
		$groupsListQuery = MailingGroups::where('id_owner', '=', $this->userID)->get();
		foreach ($groupsListQuery as $groupsListRet) {

			$groupID = $groupsListRet['id'];

			// $usersInGroupQuery = $this->query("SELECT * FROM `mailing_group_user` WHERE `id_group`=$groupID");
			$usersInGroupQuery = MailingGroupUser::where('id_group', '=', $groupID)->count();

			$groupList[$groupID] = Array(
				'from' => 'mailing',
				'id' => $groupsListRet['id'],
				'name' => $groupsListRet['name'],
				"users" => $usersInGroupQuery
			);
		}

		$this->responseData['groupsList'] = $groupList; 

		return $this->responseData;
	}

	public function isGroupAdmin($groupID)
	{
		$checkGroupQuery = MailingGroups::where('id_owner', '=', $this->userID)
									->where('id', '=', $groupID)
									->first();
		if ($checkGroupQuery) return true;

		return false;
	}

	public function deleteUserFromGroup() {

		$groupID = (int)$this->data->groupID;
		$usersToDel = $this->data->users;

		if (is_array($usersToDel) && !empty($usersToDel)) {


			if ($this->isGroupAdmin($groupID)) {

				foreach ($usersToDel as $userID) {

					$uID = (int)$userID;

					// $deleteUserQuery = $this->query("DELETE FROM `group_user` WHERE `id_group`='$groupID' AND `id_user`='$uID'");

					MailingGroupUser::where('id_group', '=', $groupID)
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
		$users = $this->data->users;
		$group = (int)$this->data->groupID;

		if (is_array($users) && !empty($users)) {

			// $checkGroupQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id`='$group' AND `id_owner`='$this->userID' LIMIT 1");
			if ($this->isGroupAdmin($group)) {

				foreach ($users as $user) {

					// $addUserToGroupQuery = $this->query("INSERT INTO `group_user` (`id_group`, `id_user`) VALUES ('$groupID', '$uID')");
					$addUserToGroupQuery = new MailingGroupUser();
					$addUserToGroupQuery->id_group = $group;
					$addUserToGroupQuery->id_user = $user;
					$addUserToGroupQuery->save();


					// $checkGroupUserQuery = $this->query("SELECT * FROM `mailing_group_user` WHERE `id_group`='$group' AND `id_user`='$user' LIMIT 1");

					// if (!$checkGroupUserRet = $checkGroupUserQuery->fetch_assoc()) {
					// 	$addUserToGroupQuery = $this->query("INSERT INTO `mailing_group_user` (`id_group`, `id_user`) VALUES ('$group', '$user')");
					// }

				}

			}
		}

		return $this->responseData;
	}

	public function addUser() {
		$users = $this->data->userData;
		$group = (int)$this->data->groupId;

		$addToGroup = false;

		$addedUsers = array();

		// if (is_array($users) && !empty($users)) {

			// $checkGroupQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id`='$group' AND `id_owner`='$this->userID' LIMIT 1");
			$checkGroupQuery = MailingGroups::where('id', '=', $group)
											->where('id_owner', '=', $this->userID)
											->first();
			if ($checkGroupQuery) {
				$addToGroup = true;
			}

			foreach ($users as $user) {

				$email = $user->mail;
				$name = trim($user->username);

				// $checkUserQuery = $this->query("SELECT * FROM `mailing_users` WHERE `email`='$email' AND `owner_id` = '$this->userID' LIMIT 1");
				$checkUserQuery = MailingUsers::where('email', '=', $email)
												->where('owner_id', '=', $this->userID)
												->first();

				if (!$checkUserQuery) {

					// $addUserQuery = $this->query("INSERT INTO `mailing_users` (`email`, `name`, `owner_id`, `create_date`) VALUES ('$email', '$name', '$this->userID', NOW())");
					$addUserQuery = new MailingUsers();
					$addUserQuery->email = $email;
					$addUserQuery->name = $name;
					$addUserQuery->owner_id = $this->userID;
					$addUserQuery->save();

					$lastUserID = $addUserQuery->id;

					array_push($addedUsers, $email);

					if ($addToGroup) {
						// $addUserToGroupQuery = $this->query("INSERT INTO `mailing_group_user` (`id_group`, `id_user`) VALUES ('$group', '$lastUserID')");
						$addUserToGroupQuery = new MailingGroupUser();
						$addUserToGroupQuery->id_group = $group;
						$addUserToGroupQuery->id_user = $lastUserID;
						$addUserToGroupQuery->save();
					}
				} else {
					if ($addToGroup) {
						$userID = $checkUserQuery['id'];

						// $checkGroupUserQuery = $this->query("SELECT * FROM `mailing_group_user` WHERE `id_group`='$group' AND `id_user`='$userID' LIMIT 1");
						// if (!$checkGroupUserRet = $checkGroupUserQuery->fetch_assoc()) {
						// 	$addUserToGroupQuery = $this->query("INSERT INTO `mailing_group_user` (`id_group`, `id_user`) VALUES ('$group', '$userID')");
						// }	

						$addUserToGroupQuery = new MailingGroupUser();
						$addUserToGroupQuery->id_group = $group;
						$addUserToGroupQuery->id_user = $userID;
						$addUserToGroupQuery->save();
					}
				}
			}
			// }
		// }

		$this->responseData['addedusers'] = $addedUsers;

		return $this->responseData;
	}

	public function addGroup() {	
		$groupName = trim($this->data->groupName);

		$this->responseData['groupName'] = $groupName;

		// $checkNameQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id_owner`='$this->userID' AND `name`='$groupName' LIMIT 1");
		$checkNameData = MailingGroups::where('id_owner', '=', $this->userID)
										->where('name', '=', $groupName)
										->first();

		if ($checkNameData) {

			$this->responseData['groupExists'] = true;
			$this->responseData['groupID'] = $checkNameData['id'];
		} else {
			// $addNewGroupQuery = $this->query("INSERT INTO `mailing_groups` (`id_owner`, `name`) VALUES ('$this->userID', '$groupName')");
			$addNewGroupQuery = new MailingGroups();
			$addNewGroupQuery->id_owner = $this->userID;
			$addNewGroupQuery->name = $groupName;
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

				// $checkGroupQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id_owner`='$this->userID' AND `id`='$gID' LIMIT 1");
				$groupToDelete = MailingGroups::where('id_owner', '=', $this->userID)
											->where('id', '=', $gID)
											->first();

				if ($groupToDelete) {

					// $deleteUsersFromGroupQuery = $this->query("DELETE FROM `mailing_group_user` WHERE `id_group`='$gID'");
					MailingGroupUser::where('id_group', '=', $gID)
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

	public function getUsersFromGroup() {
		$groupID = (int)$this->data->groupID;
		$users = Array();
		$groupName = '';

		// $checkGroupQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id`='$groupID' AND `id_owner`='$this->userID' LIMIT 1");
		$checkGroupData = MailingGroups::where('id_owner', '=', $this->userID)
							->where('id', '=', $groupID)
							->first();

		if ($checkGroupData) {

			// $getUsersFromGroupQuery = $this->query("SELECT 
			// 											`mailing_users`.`id` as `id`, 
			// 											`mailing_users`.`email` as `email`, 
			// 											`mailing_users`.`name` as `username` 
			// 											FROM `mailing_group_user` 
			// 											LEFT JOIN `mailing_users` 
			// 											ON `mailing_group_user`.`id_user`=`mailing_users`.`id` 
			// 											WHERE `id_group`='$groupID'");

			$getUsersFromGroupData = MailingGroupUser::where('id_group', '=', $groupID)->get();

			foreach ($getUsersFromGroupData as $getUsersFromGroupRet) {

				$users[$getUsersFromGroupRet->user->id] = Array(
					"login" => $getUsersFromGroupRet->user->email,
					"username" => $getUsersFromGroupRet->user->username,
					"userID" => $getUsersFromGroupRet->user->id,
					"photo" => '0'
				);
			}

			$groupName = $checkGroupData['name'];

			$this->responseData['groupExists'] = true;
		} else {

			$this->responseData['groupExists'] = false;
		}

		$this->responseData['groupUsers'] = $users;
		$this->responseData['groupName'] = $groupName;

		return $this->responseData;
	}

	public function getGroupById() {
		$id = $this->data->groupID;
		// $groupDataQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id`='$id'");
		$groupData = MailingGroups::find($id);

		if ($groupData) {
			$this->responseData['groupData'] = $groupData;
		}

		return $this->responseData;
	}

	public function editGroup() {

		$id = $this->data->groupID;
		$groupName = trim($this->data->groupName);

		// $groupDataQuery = $this->query("UPDATE `mailing_groups` SET `name` = '$groupName' WHERE `id`='$id';");
		$groupData = MailingGroups::find($id);
		$groupData->name = $groupName;
		$groupData->save();

		$this->responseData['status'] = 'success';

		return $this->responseData;
	}

	public function getCourseScormDataByUserId() {

		$courseId = $this->data->courseID;
		$userId = $this->data->userID;

		$scormData = [ ];

		$mailingUserData = $this->getMailingUserById($userId);

		$mailingUserMail = $mailingUserData->email;

		$coursesQuery = ScormData::where('course_id', '=', $courseId)
									->where('mailing_login', '=', $mailingUserMail)
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

		$coursesQuery = Banners::where('user_id', '=', $this->userID)
									->where('id_banner', '=', $courseId)
									->first();

		$questiondata = '';
		if ($coursesQuery) {
			$questiondata = $this->isJson($coursesQuery['questiondata']) ? json_decode($coursesQuery['questiondata']) : '';
		}

		return $questiondata;
	}

	public function getCoursesList() {

		$coursesList = array();

		// $coursesQuery = $this->query("SELECT * FROM `banners_projects` WHERE `user_id`='$this->userID'");
		$coursesQuery = Banners::where('user_id', '=', $this->userID)
								->orWhere('primary', '=', 1)
								->get();
		foreach ($coursesQuery as $coursesRet) {

			$bannerID = $coursesRet['id_banner'];

			// $numberOfUsersQuery = $this->query("SELECT `user_id` FROM `scorm_data` WHERE `course_id`='$bannerID' AND `user_id` = -1");
			$numberOfUsersQuery = ScormData::where('course_id', '=', $bannerID)
												->where('user_id', '=', -1)
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

		$userMailingData = $this->getMailingUserById($userID);

		// if (!empty($userMailingData)) {
			$mailingLogin = $userMailingData['email'];
			$this->responseData['userMail'] = $mailingLogin;
			$this->responseData['username'] = $userMailingData['name'];

			// $coursesQuery = $this->query("SELECT 
			// 								`scorm_data`.`course_id` as `course_id`, 
			// 								`scorm_data`.`course_status` as `course_status`, 
			// 								`scorm_data`.`modify_date` as `modify_date`, 
			// 								`banners_projects`.`name` as `name`,
			// 								`banners_projects`.`thumb` as `thumb`,
			// 								`scorm_data`.`user_score` as `score` ,
			// 								`scorm_data`.`id` as `attempt_id` 
			// 								FROM `scorm_data` 
			// 								LEFT JOIN `banners_projects` 
			// 								ON `scorm_data`.`course_id`=`banners_projects`.`id_banner` 
			// 								WHERE `scorm_data`.`mailing_login`='$mailingLogin' 
			// 								AND `banners_projects`.`id_banner` 
			// 								IN (" . implode(',', $ownerCourses) . ")"
			// 							);

			$scormData = ScormData::where('mailing_login', '=', $mailingLogin)
										->get();



			foreach ($scormData as $scorm) {
				$bannerData = Banners::find($scorm['course_id']);

				$userCourses[] = array(
					'courseID' 					=> $scorm['course_id'],
					'attempt_id' 				=> $scorm['id'],
					'courseName' 				=> $bannerData['name'],
					'photo' 					=> $bannerData['thumb'],
					'courseStatus' 				=> $scorm['course_status'],
					'coursePoints' 				=> $scorm['user_score'],
					'courseLastVisit' 			=> $scorm['modify_date']
				);
			}
		// }

		$this->responseData['userCourses'] = $userCourses;

		return $this->responseData;
	}

	public function getUsersDetailsInCourse() {

		$courseID = (int)$this->data->courseID;
		$userID = (int)$this->data->userID;

		$userLogin = '';
		$photo = '';
		$username = '';
		
		// $userQuery = $this->query("SELECT * FROM `mailing_users` WHERE `id`='$userID' LIMIT 1");
		$userData = $this->getMailingUserById($userID);

		if ($userData) {

			$userLogin = $userData['email'];
			$username = $userData['name'];
			$photo = 'default';
		}

		$courseName = '';
		$courseLink = '';
		$requirements = '';
		$thumb = '';
		// $courseQuery = $this->query("SELECT `name`, `iframe`, `requirements`, `thumb`  FROM `banners_projects` WHERE `id_banner`='$courseID'");
		$courseData= Banners::find($courseID);

		if ($courseData) {
			$courseName = $courseData['name'];
			$courseLink = $courseData['iframe'];
			$thumb = $courseData['thumb'];
			$requirements = $this->isJson($courseData['requirements']) ? json_decode($courseData['requirements']) : '';;
		}

		// $usersDetailsInCourseQuery = $this->query("SELECT * 
		// 												FROM `scorm_data` 
		// 												WHERE `course_id`='$courseID' 
		// 												AND (`mailing_login` = '$userLogin') 
		// 												LIMIT 1");
		$userDetails = ScormData::where('course_id', '=', $courseID)
									->where('mailing_login', '=', $userLogin)
									->first();

		if ($userDetails) {
			$usersDetailsInCourse = array(
					'data' => json_decode($userDetails['data']),
					'page_time' => json_decode( $userDetails['page_time']),
					'lesson_location' => $userDetails['lesson_location'],
					'user_score' => $userDetails['user_score'],
					'course_status' => $userDetails['course_status'],
					'userMail' => $userLogin,
					'username' => $username,
					'create_date' => $userDetails['create_date'],
					'modify_date' => $userDetails['modify_date'],
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

	public function getCourseStatus() {

		$courseUsers = array();
		$this->responseData['courseUsers'] = $courseUsers;
		$this->responseData['status'] = 'success';
		$this->responseData['message'] = 'No course status in mailing user';
		
		return $this->responseData;
	}

	public function getNumberOfUsersAndCourses() {

		$this->responseData['numberOfUsers'] = 0;
		$this->responseData['numberOfUsers'] = 0;
		$this->responseData['status'] = 'success';
		$this->responseData['message'] = 'No number of users and courses in mailing user';

		return $this->responseData;
	}

	public function getUsersPageTimes() {

		$pageTimesArray = array();
		$this->responseData['userTimes'] = $pageTimesArray;
		$this->responseData['status'] = 'success';
		$this->responseData['message'] = 'No users page times in mailing user';
		
		return $this->responseData;
	}

	public function getUsersCompletionInfo() {

		$ownerCourses = $this->getOwnerCourses();
		
		if (count($ownerCourses) > 0) {
			$complitionInfo = array();

			// $complitionInfoQuery = $this->query("SELECT `course_status` FROM `scorm_data` WHERE `course_id` IN (" . implode(',', $ownerCourses) . ") AND `user_id` = '-1'");
			$complitionInfoQuery = ScormData::whereIn('course_id', $ownerCourses)
												->where('user_id', '=', -1)
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

	// public function create_account($mail) {
 //    	// To override
 //    }

 //    // tworzenie nazwy dla subdomeny uzytkownika
 //    public function create_subdomain($mail) {
 //        // To override
 //    }

 //    // wysylanie maila z loginem i haslem zalozonego konta
	// public function registration_mail($mail, $pass) {
	// 	// To override
	// }

	// public function sendMail($mail, $message) {
	// 	// To override
	// }

	public function getUsersList() {

		$ownerCourses = $this->getOwnerCourses();

		$usersList = array();

		

		if (!empty($ownerCourses)) {

			// $usersQuery = $this->query("SELECT 
			// 								`mailing_users`.`id` as `id`,
			// 								`mailing_users`.`email` as `email`,
			// 								`mailing_users`.`name` as `username`,
			// 								`mailing_users`.`fb_link` as `fb_link`,
			// 								0 as `courses`,
			// 								1 as `photo`
			// 								FROM `mailing_users`
			// 								WHERE `mailing_users`.`owner_id`= '$this->userID'");


			$usersList = MailingUsers::where('owner_id', '=', $this->userID)
											->get();


			// $usersList = $this->createArrayOfQueryWithKey($usersQuery, 'id');


			foreach ($usersList as $user) {
				$user->courses = 0;
				$user->photo = 1;

				// $coursesUserLoginQuery = $this->query("SELECT `mailing_users`.`id` FROM `scorm_data` LEFT JOIN `mailing_users` ON `scorm_data`.`mailing_login`=`mailing_users`.`email` WHERE `course_id` IN (" . implode(',', $ownerCourses) . ") AND `mailing_login` IN ('" . implode(',', $_users) . "')");
				$userCoursesCount = ScormData::whereIn('course_id', $ownerCourses)
													->where('mailing_login', '=', $user->email)
													->count();

				if ($userCoursesCount) {
					$user->courses = $userCoursesCount;
				}
			}
			
		}

		return $usersList;
	}

	public function deleteUsers() {

		$usersToDelete = $this->data->users;

		if (is_array($usersToDelete) && !empty($usersToDelete)) {

			foreach ($usersToDelete as $userId) {

				$uID = (int)$userId;

				// $checkUserQuery = $this->query("SELECT * FROM `mailing_users` WHERE `owner_id`='$this->userID' AND `id`='$uID' LIMIT 1");
				$checkUserQuery = MailingUsers::where('owner_id', '=', $this->userID)
													->where('id', '=', $uID)
													->first();

				if ($checkUserQuery) {

					// $deleteUserFromGroups = $this->query("DELETE FROM `mailing_group_user` WHERE `id_user`='$uID'");
					MailingGroupUser::where('id_user', '=', $uID)->delete();

					$mailingLogin = $checkUserQuery['email'];
					// $deleteUserScormDataQuery = $this->query("DELETE FROM `scorm_data` WHERE `user_id`='-1' AND `mailing_login` = '$mailingLogin'");
					ScormData::where('user_id', '=', '-1')
								->where('mailing_login', '=', $mailingLogin)
								->delete();

					$this->responseData['userDeleted'] = true;

					// $deleteUserFromLmsQuery = $this->query("DELETE FROM `mailing_users` WHERE `owner_id`='$this->userID' AND `id`='$uID' LIMIT 1");
					$checkUserQuery->delete();
				}
			}


		} else {

			$this->responseData['userDeleted'] = false;
		}

		return $this->responseData;
	}

	// public function createGroup() {



	// 	$groupName = $this->real_escape_string( trim( $this->data->groupName ) );
	// 	$users = $this->data->users;
	// 	$addToExistingGroup = $this->data->addToExistingGroup;

	// 	$responseData['groupCreateed'] = false;

	// 	if($groupName != ""){
			

	// 		if (is_array($users) && !empty($users)) {

	// 			$responce = $this->addGroup();

	// 			if(!$response['groupExists']){
			
	// 				$groupID = $this->get_last_insert_id();

	// 				$this->data->groupID = $groupID;

	// 				$this->addUserToGroup();

	// 				$this->responseData['groupCreateed'] = true;


	// 			}else{
	// 				if(!$addToExistingGroup){

	// 					$groupID = $response['groupID'];

	// 					$this->data->groupID = $groupID;

	// 					$this->addUserToGroup();

	// 					$this->responseData['groupCreateed'] = true;
	// 				}
	// 			}
	// 		}
	// 	}

	// 	return $this->responseData;

	// }

	 public function createGroup() {

		  $users = $this->data->users;
		  $addToExistingGroup = $this->data->addToExistingGroup;


		  if (is_array($users) && !empty($users)) {

		   

		   $responce = $this->addGroup();
		   $groupName = $responce['groupName'];
		   $this->responseData['addedGroupsCount'] = count($users);

		   if($responce['groupExists'] == true){
		    $this->responseData['groupCreateed'] = false;
		    $this->responseData['groupExists'] = true;


		    if($addToExistingGroup){
		     
		     $this->responseData['groupCreateed'] = true;

		  

		     $groupID = $responce['groupID'];

		     $this->data->groupID = $groupID;

		     $this->addUserToGroup();
		    }


		   }else{
		    

		    $this->responseData['groupCreateed'] = true;

		    $groupID = $this->get_last_insert_id();

		    $this->data->groupID = $groupID;

		    $this->addUserToGroup();
		   }


		  } else {

		   $this->responseData['groupCreateed'] = false;
		   
		  }

		  return $this->responseData;
		 }


}

?>