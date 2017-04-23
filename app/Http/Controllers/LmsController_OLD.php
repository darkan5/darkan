<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use Input;
use App\Http\Requests\LmsRequest;
use App\Modules\Models\MailingGroups;
use App\Modules\Models\MailingGroupUser;
use App\Modules\Models\Banners;
use App\Modules\Models\ScormData;
// use App\Modules\Models\ScormDataGuest;
// use App\Modules\Models\GroupBanner;
// use File;

// require_once 'database.php';
// require_once 'LZString.php';

class LmsController_OLD extends Controller {

	private $responseData = array();
	private $data;
	private $userID;

	function run($data) {

		// parent::__construct();

		$this->data = json_decode($data['request']);

		$this->userID = Auth::user()->user_id;
		// $this->userID = 3;

		$this->controller();

	}

	function __destruct() {

		//parent::__destruct();

		echo json_encode($this->responseData);

	}

	public function lmsRequest(LmsRequest $request)
	{

		$this->run(Input::all());
	}

	private function controller() {


		switch ($this->data->request) {

			case 'addUser':

				$this->addUser();

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

			case 'getGroupsList':

				$this->getGroupsList();

				break;

			case 'getGroupById':

				$this->getGroupById($this->data->groupId);

				break;

			case 'getMailingGroupById':

				$this->getMailingGroupById($this->data->groupId);

				break;

			case 'editGroup':

				$this->editGroup();

				break;

			case 'editMailingGroup':

				$this->editMailingGroup();

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

			case 'getUsersFromMailingGroup':

				$this->getUsersFromMailingGroup();

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

			case 'mailingAddGroup':

				$this->mailingAddGroup();

				break;

			case 'mailingDeleteGroup':

				$this->mailingDeleteGroup();

				break;

			case 'mailingAddUser':

				$this->mailingAddUser();

				break;

			case 'mailingAddUserToGroup':

				$this->mailingAddUserToGroup();

				break;

			case 'mailingDeleteUserFromGroup':

				$this->mailingDeleteUserFromGroup();

				break;

			case 'mailingGroupList':

				$this->mailingGroupList();

				break;
				

			default:

				$this->responseData['norequest'] = 'no request';

				break;

		}
	}

	private function mailingGroupList() {

		$groupList = Array();

		// $groupList = $this->query("SELECT * FROM `mailing_groups` WHERE `id_owner`='$this->userID'");
		$groupListData = MailingGroups::where('id_owner', '=', $this->userID)->get();
		foreach ($groupListData as $group) {
			$groupID = $group['id'];
			$numberOfUsersInGroup = MailingGroupUser::where('id_group', '=', $groupID)->count();

			$groupList[$groupID] = Array(
				'id' => $getGroupListRet['id'],
				'name' => $getGroupListRet['name'],
				"users" => $numberOfUsersInGroup
			);
		}

		$this->responseData['groupsList'] = $groupList;
	}

	private function mailingDeleteUserFromGroup() {

		$users = $this->data->users;
		$group = (int)$this->data->group;

		if (is_array($users) && !empty($users)) {

			$checkGroup = MailingGroups::where('id', '=', $group)
											->where('id_owner', '=', $this->userID)
											->first();
			if ($checkGroup) {
				foreach ($users as $user) {
					$deleteUserFromGroupQuery = MailingGroupUser::where('id_group', '=', $group)	
																	->where('id_user', '=', $user)
																	->delete();
				}
			}
		}
	}

	private function mailingAddUserToGroup() {

		$users = $this->data->users;
		$group = (int)$this->data->group;

		if (is_array($users) && !empty($users)) {

			$checkGroup = MailingGroups::where('id', '=', $group)
											->where('id_owner', '=', $this->userID)
											->first();
			if ($checkGroup) {

				foreach ($users as $user) {
					$addUserToGroup = new MailingGroupUser();
					$addUserToGroup->id_group = $group;
					$addUserToGroup->id_user = $user;
					$addUserToGroup->save();
				}
			}
		}
	}

	private function mailingAddUser() {

		$users = $this->data->users;
		$group = (int)$this->data->group;

		if (is_array($users) && !empty($users)) {

			$checkGroupQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id`='$group' AND `id_owner`='$this->userID' LIMIT 1");
			if ($checkGroupRet = $checkGroupQuery->fetch_assoc()) {

				foreach ($users as $user) {

					$email = $user->email;
					$name = $user->name;
					$lastName = $user->lastName;

					$checkUserQuery = $this->query("SELECT * FROM `mailing_users` WHERE `email`='$email' LIMIT 1");
					if (!$checkUserRet = $checkUserQuery->fetch_assoc()) {

						$addUserQuery = $this->query("INSERT INTO `mailing_users` (`email`, `name`, `lastname`, `create_date`) VALUES ('$email', '$name', '$lastName', NOW())");

						$lastUserID = $this->mysql_conn->insert_id;

						$addUserToGroupQuery = $this->query("INSERT INTO `mailing_group_user` (`id_group`, `id_user`) VALUES ('$group', '$lastUserID')");
					} else {

						$userID = $checkUserRet['id'];

						$checkGroupUserQuery = $this->query("SELECT * FROM `mailing_group_user` WHERE `id_group`='$group' AND `id_user`='$userID' LIMIT 1");
						if (!$checkGroupUserRet = $checkGroupUserQuery->fetch_assoc()) {

							$addUserToGroupQuery = $this->query("INSERT INTO `mailing_group_user` (`id_group`, `id_user`) VALUES ('$group', '$userID')");
						}
					}
				}
			}
		}		
	}

	private function mailingAddGroup() {

		$groupName = $this->real_escape_string(trim($this->data->groupName));

		$checkNameQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id_owner`='$this->userID' AND `name`='$groupName' LIMIT 1");
		if ($checkNameRet = $checkNameQuery->fetch_assoc()) {

			$this->responseData['groupExists'] = true;
		} else {

			$addNewGroupQuery = $this->query("INSERT INTO `mailing_groups` (`id_owner`, `name`) VALUES ('$this->userID', '$groupName')");
			$this->responseData['groupExists'] = false;
		}
	}

	private function mailingDeleteGroup() {

		$groupsToDel = $this->data->groups;

		if (is_array($groupsToDel) && !empty($groupsToDel)) {

			foreach ($groupsToDel as $groupID) {

				$gID = (int)$groupID;

				$checkGroupQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id_owner`='$this->userID' AND `id`='$gID' LIMIT 1");
				if ($checkGroupRet = $checkGroupQuery->fetch_assoc()) {

					$deleteUsersFromGroupQuery = $this->query("DELETE FROM `mailing_group_user` WHERE `id_group`='$gID'");

					$deleteGroupQuery = $this->query("DELETE FROM `mailing_groups` WHERE `id`='$gID'");
				}
			}

			$this->responseData['groupExists'] = true;

		} else {

			$this->responseData['groupExists'] = false;
		}
	}

    private function create_account($mail) {
    	global $salt;

        $own_user_id = SESSION_METHOD::sessionGet('user_id');
        
        $subdomain = $this->create_subdomain($mail);
        
        $hash_login = $this->generate_hash($mail);
        
        $password = trim($this->generate_pass(8));
        $pass = hash_hmac('sha256', $password, $salt);

        $new_user = $this->query("INSERT INTO `users` 
        							( `date`, `login`, `password`, `subdomain`, `max_projects`, `max_published`, `active`, `hash`, `owner_id`) 
        							VALUES 
        							( NOW(), '$mail', '$pass', '$subdomain', 3, 3, 0, '$hash_login', '$own_user_id')");
        
        $last_user_id = $this->mysql_conn->insert_id;
        mkdir('../../../app/2.0.0/projects/' . $last_user_id);

        $this->registration_mail($mail, $password);
        
        return $last_user_id;
    }

    // tworzenie nazwy dla subdomeny uzytkownika
    private function create_subdomain($mail) {
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
            
            $user = $this->query("SELECT * FROM `users` WHERE `subdomain`='$sub'");

            if (!$row = $user->fetch_assoc()) {
                break;
            }
            $i++;
        }
        
        return $sub;
    }

    // wysylanie maila z loginem i haslem zalozonego konta
	private function registration_mail($mail, $pass) {
		global $server_link;

        $message = '';
        
        $message .= '<h1>Zarejestrowano konto.</h1>' . "\n";
        $message .= "<hr />";
        $message .= '<h4></h4>' . "\n";
        $message .= '<p><strong>Login: </strong> ' . $mail . '</p>' . "\n";
        $message .= '<p><strong>Password: </strong> ' . $pass . '</p><br/>' . "\n";
        $message .= '<p><a href="http://'. $server_link .'/page.php?l=login">Zaloguj się</a></p>';
        $message .= "<hr />";
        $message .= '<p></p>' . "\n";

        $this->sendMail($mail, $message);
	}


	private function sendMail($mail, $message) {
		require_once 'swiftmailer/lib/swift_required.php';

		$arrayTo = array();
		$arrayTo[] = $mail;

        $mailData = Swift_Message::newInstance()
                ->setSubject('Rejestracja')
                ->setFrom(array($mail => 'Darkan'))
                ->setTo($arrayTo)
                ->setBody($message, 'text/html');

        $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
                ->setUsername('i.zieba@rapsody.com.pl')
                ->setPassword('raps1357');

        $mailer = Swift_Mailer::newInstance($transport);

        $result = $mailer->send($mailData);

        $this->responseData['mail'] = 'mail powinien byc wyslany';
	}


    private function generate_pass($amount) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $amount; $i++) {
                $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }
    
    private function generate_hash($login) {
        return hash('md5', $login . time());
    }

	private function addUser() {

        $mail = $this->data->userData->mail;

        $mails = explode(';', $mail);

        $active_actual = 1;

        $own_user_id = SESSION_METHOD::sessionGet('user_id');

	    if ($mail != '') {
	        $this->responseData['users'] = array();
	        // dodawanie nowych kont
	        foreach ($mails as $mailToCreate) {

	            $user = $this->query("SELECT * FROM `users` WHERE `login`='$mailToCreate'");

	            $this->responseData['request'] = 14;
	            $this->responseData['mail'] = $mailToCreate;

	            // konto jest w systemie
	            if ($ret = $user->fetch_assoc()) {
	                $user_mail_id = $ret['user_id'];

	                // nie mozna dodac samego siebie
	                if ($user_mail_id != $own_user_id) {
	                    // sprawdzenie czy nie ma juz tego uzytkownika w bazie
	                    $check = $this->query("SELECT * FROM `lms_user_portal` WHERE `portal_admin`='$own_user_id' AND `user`='$user_mail_id'");
	                    if (!$ret_check = $check->fetch_assoc()) {
	                        $add = $this->query("INSERT INTO `lms_user_portal` (`portal_admin`, `user`, `active_actual`, `active_future`) VALUES ('$own_user_id', '$user_mail_id', '$active_actual', '$active_actual')");
	                    }

	                    $u_login = $this->query("SELECT * FROM `users` WHERE `user_id`='$user_mail_id'");
	                    if ($ret_u_login = $u_login->fetch_assoc()) {
	                        $this->responseData['users'][] = $ret_u_login['login'];
	                    }
	                }
	            } else {
	                // nie ma konta, zakladam
	                $user_mail_id = $this->create_account($mailToCreate);

	                $add = $this->query("INSERT INTO `lms_user_portal` (`portal_admin`, `user`, `active_actual`, `active_future`) VALUES ('$own_user_id', '$user_mail_id', '$active_actual', '$active_actual')");

	                $u_login = $this->query("SELECT * FROM `users` WHERE `user_id`='$user_mail_id'");
	                if ($ret_u_login = $u_login->fetch_assoc()) {
	                    $this->responseData['users'][] = $ret_u_login['login'];
	                }
	            }
	        }
	    }
	}

	private function deleteGroup() {

		$groupsToDel = $this->data->groups;

		if (is_array($groupsToDel) && !empty($groupsToDel)) {

			foreach ($groupsToDel as $groupID) {

				$gID = (int)$groupID;

				$checkGroupQuery = $this->query("SELECT * FROM `groups` WHERE `id_owner`='$this->userID' AND `id`='$gID' LIMIT 1");
				if ($checkGroupRet = $checkGroupQuery->fetch_assoc()) {

					$deleteUsersFromGroupQuery = $this->query("DELETE FROM `group_user` WHERE `id_group`='$gID'");

					$deleteGroupQuery = $this->query("DELETE FROM `groups` WHERE `id`='$gID'");
				}
			}

			$this->responseData['groupExists'] = true;

		} else {

			$this->responseData['groupExists'] = false;
		}
	}

	private function deleteUsersFromGroup() {

		$groupID = (int)$this->data->groupID;
		$usersToDel = $this->data->users;

		if (is_array($usersToDel) && !empty($usersToDel)) {

			$checkGroupQuery = $this->query("SELECT * FROM `groups` WHERE `id_owner`='$this->userID' AND `id`='$groupID' LIMIT 1");
			if ($checkGroupRet = $checkGroupQuery->fetch_assoc()) {

				foreach ($usersToDel as $userID) {

					$uID = (int)$userID;

					$deleteUserQuery = $this->query("DELETE FROM `group_user` WHERE `id_group`='$groupID' AND `id_user`='$uID'");
				}

				$this->responseData['groupExists'] = true;
			} else {

				$this->responseData['groupExists'] = false;
			}
		} else {

			$this->responseData['groupExists'] = false;
		}

	}

	private function addUserToGroup() {

		$groupID = (int)$this->data->groupID;
		$usersIDToGroupID = $this->data->users;

		if (is_array($usersIDToGroupID) && !empty($usersIDToGroupID)) {

			$checkGroupQuery = $this->query("SELECT * FROM `groups` WHERE `id_owner`='$this->userID' AND `id`='$groupID' LIMIT 1");
			if ($checkGroupRet = $checkGroupQuery->fetch_assoc()) {

				foreach ($usersIDToGroupID as $userID) {

					$uID = (int)$userID;

					$checkUserQuery = $this->query("SELECT * FROM `users` WHERE `user_id`='$uID' LIMIT 1");
					if ($checkUserRet = $checkUserQuery->fetch_assoc()) {

						$addUserToGroupQuery = $this->query("INSERT INTO `group_user` (`id_group`, `id_user`) VALUES ('$groupID', '$uID')");
					}

				}

				$this->responseData['groupExists'] = true;
			} else {

				$this->responseData['groupExists'] = false;
			}
		} else {

			$this->responseData['groupExists'] = false;
		}

	}

	private function addNewGroup() {

		$groupName = $this->real_escape_string(trim($this->data->groupName));

		$checkNameQuery = $this->query("SELECT * FROM `groups` WHERE `id_owner`='$this->userID' AND `name`='$groupName' LIMIT 1");
		if ($checkNameRet = $checkNameQuery->fetch_assoc()) {

			$this->responseData['groupExists'] = true;
		} else {

			$addNewGroupQuery = $this->query("INSERT INTO `groups` (`id_owner`, `name`, `status`) VALUES ('$this->userID', '$groupName', 0)");
			$this->responseData['groupExists'] = false;
		}
	}

	private function getUsersFromGroup() {

		$groupID = (int)$this->data->groupID;
		$users = Array();
		$groupName = '';

		$checkGroupQuery = $this->query("SELECT * FROM `groups` WHERE `id`='$groupID' AND `id_owner`='$this->userID' LIMIT 1");
		if ($checkGroupRet = $checkGroupQuery->fetch_assoc()) {

			$getUsersFromGroupQuery = $this->query("SELECT `users`.`user_id` as `user_id`, `users`.`login` as `login`, `users`.`photo` as `photo` FROM `group_user` LEFT JOIN `users` ON `group_user`.`id_user`=`users`.`user_id` WHERE `id_group`='$groupID'");
			while ($getUsersFromGroupRet = $getUsersFromGroupQuery->fetch_assoc()) {

				$users[$getUsersFromGroupRet['user_id']] = Array(
					"login" => $getUsersFromGroupRet['login'],
					"userID" => $getUsersFromGroupRet['user_id'],
					"photo" => $getUsersFromGroupRet['photo']
				);
			}

			$groupName = $checkGroupRet['name'];

			$this->responseData['groupExists'] = true;
		} else {

			$this->responseData['groupExists'] = false;
		}

		$this->responseData['groupUsers'] = $users;
		$this->responseData['groupName'] = $groupName;
	}

	private function getUsersFromMailingGroup() {

		$groupID = (int)$this->data->groupID;
		$users = Array();
		$groupName = '';

		$checkGroupQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id`='$groupID' AND `id_owner`='$this->userID' LIMIT 1");
		if ($checkGroupRet = $checkGroupQuery->fetch_assoc()) {

			$getUsersFromGroupQuery = $this->query("SELECT 
														`mailing_users`.`id` as `id`, 
														`mailing_users`.`email` as `email` 
														FROM `mailing_group_user` 
														LEFT JOIN `mailing_users` 
														ON `mailing_group_user`.`id_user`=`mailing_users`.`id` 
														WHERE `id_group`='$groupID'");
			while ($getUsersFromGroupRet = $getUsersFromGroupQuery->fetch_assoc()) {

				$users[$getUsersFromGroupRet['id']] = Array(
					"login" => $getUsersFromGroupRet['email'],
					"userID" => $getUsersFromGroupRet['id']
				);
			}

			$groupName = $checkGroupRet['name'];

			$this->responseData['groupExists'] = true;
		} else {

			$this->responseData['groupExists'] = false;
		}

		$this->responseData['groupUsers'] = $users;
		$this->responseData['groupName'] = $groupName;
	}

	private function userStatus() {

		$userID = $this->data->userID;

		$ownerCourses = $this->getOwnerCourses();

		$userCourses = array();

		if (is_numeric($userID)) {

			$userID = (int)$userID;


			$coursesQuery = $this->query("SELECT 
											`scorm_data`.`course_id` as `course_id`, 
											`scorm_data`.`course_status` as `course_status`, 
											`scorm_data`.`modify_date` as `modify_date`, 
											`banners_projects`.`name` as `name`,
											`banners_projects`.`thumb` as `thumb`,
											`scorm_data`.`user_score` as `score` 
											FROM `scorm_data` 
											LEFT JOIN `banners_projects` 
											ON `scorm_data`.`course_id`=`banners_projects`.`id_banner` 
											WHERE `scorm_data`.`user_id`='$userID' 
											AND `banners_projects`.`id_banner` 
											IN (" . implode(',', $ownerCourses) . ")"
										);


			$userQuery = $this->query("SELECT * FROM `users` WHERE `user_id`='$userID' LIMIT 1");
			if ($userRet = $userQuery->fetch_assoc()) {
					$this->responseData['userMail'] = $userRet['login'];
					$this->responseData['photo'] = $userRet['photo'];
			}

		} else {

			$userID = substr($userID, 1);



			$userMailingQuery = $this->query("SELECT * FROM `mailing_users` WHERE `id` = '$userID' LIMIT 1");

			if ($userMailingData = $userMailingQuery->fetch_assoc()) {

				$mailingLogin = $userMailingData['email'];
				$this->responseData['userMail'] = $mailingLogin;

				$coursesQuery = $this->query("SELECT 
												`scorm_data`.`course_id` as `course_id`, 
												`scorm_data`.`course_status` as `course_status`, 
												`scorm_data`.`modify_date` as `modify_date`, 
												`banners_projects`.`name` as `name`,
												`banners_projects`.`thumb` as `thumb`,
												`scorm_data`.`user_score` as `score` 
												FROM `scorm_data` 
												LEFT JOIN `banners_projects` 
												ON `scorm_data`.`course_id`=`banners_projects`.`id_banner` 
												WHERE `scorm_data`.`mailing_login`='$mailingLogin' 
												AND `banners_projects`.`id_banner` 
												IN (" . implode(',', $ownerCourses) . ")"
											);
			}

		}


		while ($coursesRet = $coursesQuery->fetch_assoc()) {

			$userCourses[] = array(
				'courseID' 					=> $coursesRet['course_id'],
				'courseName' 				=> $coursesRet['name'],
				'photo' 					=> $coursesRet['thumb'],
				'courseStatus' 				=> $coursesRet['course_status'],
				'coursePoints' 				=> $coursesRet['score'],
				'courseLastVisit' 			=> $coursesRet['modify_date']
			);
		}

		$this->responseData['userCourses'] = $userCourses;
	}

	private function getMailingUserById($id) {
		$mailingUserID = substr($id, 1);

		$userData = array();

		$userMailingQuery = $this->query("SELECT * FROM `mailing_users` WHERE `id` = '$mailingUserID' LIMIT 1");

		if ($userMailingData = $userMailingQuery->fetch_assoc()) {
			foreach ($userMailingData as $key => $value) {
				$userData[$key] = $value;
			}
		}

		return $userData;
	}

	private function getMailingUserByMail($mail) {
		$userData = array();

		$userMailingQuery = $this->query("SELECT * FROM `mailing_users` WHERE `email` = '$mail' LIMIT 1");

		if ($userMailingData = $userMailingQuery->fetch_assoc()) {
			foreach ($userMailingData as $key => $value) {
				$userData[$key] = $value;
			}
		}

		return $userData;
	}

	private function courseStatus() {

		$courseID = (int)$this->data->courseID;

		$courseUsers = array();

		$usersQuery = $this->query("SELECT `scorm_data`.`user_id` as `user_id`, 
										`scorm_data`.`course_status`, `scorm_data`.`data` as `data`, 
										`scorm_data`.`modify_date` as `modify_date`, 
										`scorm_data`.`user_score` as `score`,
										`scorm_data`.`mailing_login` as `mailing_login`,
										`users`.`login` as `login`,
										`users`.`photo` as `photo` 
										FROM `scorm_data` 
										LEFT JOIN `users` 
										ON `scorm_data`.`user_id`=`users`.`user_id` 
										WHERE `course_id`='$courseID'"
									);
		while ($usersRet = $usersQuery->fetch_assoc()) {

			$scormData = array();

			$userId = $usersRet['user_id'];
			$userMail = $usersRet['login'];

			if ($usersRet['user_id'] == -1) {
				$mailingUserData = $this->getMailingUserByMail($usersRet['mailing_login']);
				$userId = $mailingUserData['id'];
				$userMail = $usersRet['mailing_login'];
			} 

			$courseUsers[] = array(
				'userID' 				=> $userId,
				'userMail' 				=> $userMail,
				'courseStatus' 			=> $usersRet['course_status'],
				'from' 					=> $usersRet['user_id'] != -1 ? 'app' : 'mailing',
				'photo' 				=> $usersRet['photo'],
				'coursePoints' 			=> $usersRet['score'],
				'courseLastVisit' 		=> $usersRet['modify_date']
			);
		}

		$this->responseData['courseName'] = '';

		$courseQuery = $this->query("SELECT * FROM `banners_projects` WHERE `id_banner`='$courseID' LIMIT 1");
		if ($courseRet = $courseQuery->fetch_assoc()) {
			$this->responseData['courseName'] = $courseRet['name'];
			$this->responseData['courseLink'] = $courseRet['iframe'];
			$this->responseData['thumb'] = $courseRet['thumb'];
		}

		$this->responseData['courseUsers'] = $courseUsers;
	}

	private function getOwnerAccountsResource() {
		// $usersQuery = $this->query("SELECT *
		// 							FROM `users`
		// 							WHERE `owner_id` = '$this->userID'");
		
		$usersQuery = User::where('owner_id', '=', $this->userID)->get();

		return $usersQuery;
	}

	private function getUsersList() {


		$ownerCourses = $this->getOwnerCourses();

		$ownerAccountsRes = $this->getOwnerAccountsResource();

		$usersList = array();
		$usersLoginList = array();
		$usersMailingList = array();


		foreach ($ownerAccountsRes as $ownerAccounts) {

			$usersList[(string)$ownerAccounts['user_id']] = array(
				'userID' 			=> $ownerAccounts['user_id'],
				'userMail' 			=> $ownerAccounts['login'],
				'from'				=> 'app',
				'photo'				=> $ownerAccounts['photo'],
				'courses'			=> 0
			);
		}



		if (!empty($ownerCourses)) {

			// $usersQuery = $this->query("SELECT 
			// 								`users`.`user_id` as `user_id`, 
			// 								`users`.`photo` as `photo`, 
			// 								`users`.`login` as `login`, 
			// 								`scorm_data`.`mailing_login` as `mailing_login` 
			// 								FROM `scorm_data`
			// 								LEFT JOIN `users`
			// 								ON `scorm_data`.`user_id`=`users`.`user_id` 
			// 								WHERE `course_id` IN (" . implode(',', $ownerCourses) . ")");

			$scormDataRows = ScormData::where('course_id', 'IN', "(" . implode(',', $ownerCourses) . ")")->get();


			foreach ( $scormDataRows as $scormData ) {

				$userData = User::where('user_id', '=', $scormData['user_id'])->first();

				if ($scormData['user_id'] != -1) {

					$usersList[(string)$scormData['user_id']] = array(
						'userID' 			=> $scormData['user_id'],
						'userMail' 			=> $userData['login'],
						'from'				=> 'app',
						'photo'				=> $userData['photo'],
						'courses'			=> 0
					);

					$usersLoginList[(string)$scormData['user_id']] = array(
						'userID' 			=> $scormData['user_id'],
						'userMail' 			=> $userData['login'],
						'courses'			=> 0
					);
				} else {


						$usersList[$scormData['mailing_login']] = array(
							'userID' 			=> $scormData['mailing_login'],
							'userMail' 			=> $scormData['mailing_login'],
							'from'				=> 'mailing',
							'photo'				=> $userData['photo'],
							'courses'			=> 0
						);

						$usersMailingList[$scormData['mailing_login']] = array(
							'userID' 			=> $scormData['mailing_login'],
							'userMail' 			=> $scormData['mailing_login'],
							'courses'			=> 0
						);


				}
			}
		}

		// zalogowani
		if (!empty($usersLoginList)) {

			$_users = array();
			foreach ($usersLoginList as $user) {
				$_users[] = $user['userID'];
			}

			// $coursesUserLoginQuery = $this->query("SELECT * FROM `scorm_data` WHERE `course_id` IN (" . implode(',', $ownerCourses) . ") AND `user_id` IN (" . implode(',', $_users) . ")");
			$coursesUserLogin = ScormData::where('course_id', 'IN', "(" . implode(',', $ownerCourses) . ")")
												->where('user_id', 'IN', "(" . implode(',', $_users) . ")")
												->get();
			foreach ($coursesUserLogin as $coursesLoginUserRet) {
				$usersList[(string)$coursesLoginUserRet['user_id']]['courses']++;
			}

		}

		// z mailingu
		if (!empty($usersMailingList)) {

			$_users = array();
			foreach ($usersMailingList as $user) {
				$_users[] = $user['userID'];
			}

			$coursesUserMailingQuery = ScormData::where('course_id', 'IN', "(" . implode(',', $ownerCourses) . ")")
												->where('user_id', 'IN', "(" . implode(',', $_users) . ")")
												->get();
			foreach ($coursesUserMailingQuery as $coursesMailingUserRet) {

				$usersList[$coursesMailingUserRet['mailing_login']]['courses']++;
			}

		}

		$this->responseData['usersList'] = $usersList;
	}

	private function getGroupsList() {

		$groupsList = Array();

		$groupsListQuery = $this->query("SELECT * FROM `groups` WHERE `id_owner`='$this->userID'");
		while ($groupsListRet = $groupsListQuery->fetch_assoc()) {

			$groupID = $groupsListRet['id'];

			$usersInGroupQuery = $this->query("SELECT * FROM `group_user` WHERE `id_group`=$groupID");

			$groupsList[$groupID] = Array(
				"name" => $groupsListRet['name'],
				"users" => $usersInGroupQuery->num_rows
			);
		}

		$this->responseData['groupsList'] = $groupsList;
	}

	private function getGroupById($id) {

		$groupDataQuery = $this->query("SELECT * FROM `groups` WHERE `id`='$id'");
		if ($groupData = $groupDataQuery->fetch_assoc()) {

			$this->responseData['groupData'] = $groupData;

		}
	}

	private function getMailingGroupById($id) {
		$groupDataQuery = $this->query("SELECT * FROM `mailing_groups` WHERE `id`='$id'");
		if ($groupData = $groupDataQuery->fetch_assoc()) {
			$this->responseData['groupData'] = $groupData;
		}
	}

	private function editGroup() {
		$id = $this->data->groupId;
		$groupName = $this->real_escape_string(trim($this->data->groupName));

		$groupDataQuery = $this->query("UPDATE `groups` SET `name` = '$groupName' WHERE `id`='$id';");
		$this->responseData['status'] = 'success';
	}

	private function editMailingGroup() {
		$id = $this->data->groupId;
		$groupName = $this->real_escape_string(trim($this->data->groupName));

		$groupDataQuery = $this->query("UPDATE `mailing_groups` SET `name` = '$groupName' WHERE `id`='$id';");
		$this->responseData['status'] = 'success';
	}

	private function getCoursesList() {

		$coursesList = array();

		$coursesQuery = Banners::where('user_id', '=', $this->userID)->get();
		foreach ($coursesQuery as $coursesRet) {

			$bannerID = $coursesRet->id_banner;

			$numberOfUsersQuery = ScormData::where('course_id', '=', $bannerID)->count();

			$requirements = $this->isJson($coursesRet->requirements) ? json_decode($coursesRet->requirements) : '';

			$coursesList[] = array(
				'courseID' 			=> (int)$coursesRet->id_banner,
				'name' 				=> $coursesRet->name,
				'size' 				=> (int)$coursesRet->size_project,
				'photo' 			=> $coursesRet->thumb,
				'users' 			=> $numberOfUsersQuery,
				'requirements' 		=> $requirements
			);

		}

		$this->responseData['coursesList'] = $coursesList;
	}

	private function isJson($string) {
		json_decode($string);
		return (json_last_error() == JSON_ERROR_NONE);
	}

	private function getNumberOfUsersAndCourses() 
	{

		$ownerCourses = $this->getOwnerCourses();

		$this->responseData['numberOfUsers'] = 0;

		if (!empty($ownerCourses)) {

			$users = array();

			// $numberOfUsersQuery = $this->query("SELECT * FROM `scorm_data` WHERE `course_id` IN (" . implode(',', $ownerCourses) . ")");
			$numberOfUsersQuery = ScormData::where('course_id', 'IN', "(" . implode(',', $ownerCourses) . ")")->get();
			foreach ($numberOfUsersQuery as $numberOfUsersRet) {

				if ($numberOfUsersRet['user_id'] != -1) {

					// zalogowani
					if (!isset($users[(string)$numberOfUsersRet['user_id']])) {
						$users[(string)$numberOfUsersRet['user_id']] = 1;
					}
				} else {

					// z mailingu
					if (!isset($users[(string)$numberOfUsersRet['mailing_login']])) {
						$users[(string)$numberOfUsersRet['mailing_login']] = 1;
					}
				}
			}

			// $this->responseData['numberOfUsers'] = $numberOfUsersQuery->num_rows;
			$this->responseData['numberOfUsers'] = count($users);
		}

		$this->responseData['numberOfCourses'] = count($ownerCourses);
	}

	private function getUsersPageTimes() {
		$courseID = (int)$this->data->courseID;

		$userTimesQuery = $this->query("SELECT `page_time` FROM `scorm_data` WHERE `course_id` = $courseID");

		$pageTimesArray = array();

		while ($userTimes = $userTimesQuery->fetch_assoc()) {
			$pageTimesArray[] = json_decode( $userTimes['page_time'] );
		}

		$this->responseData['userTimes'] = $pageTimesArray;
	}

	private function getUsersCompletionInfo() {

		$ownerCourses = $this->getOwnerCourses();
		

		// $complitionInfoQuery = $this->query("SELECT `course_status` FROM `scorm_data` WHERE `course_id` IN (" . implode(',', $ownerCourses) . ")");
		$complitionInfoQuery = ScormData::where('course_id', 'IN', "(" . implode(',', $ownerCourses) . ")")->get();

		$complitionInfo = array();

		foreach ($complitionInfoQuery as $userTimes) {

			if(isset($complitionInfo[$userTimes['course_status']])){
				$complitionInfo[$userTimes['course_status']]++;
			}else{
				$complitionInfo[$userTimes['course_status']] = 1;
			}
		}

		$this->responseData['complitionInfo'] = $complitionInfo;
	}

	private function getUsersDetailsInCourse() {

		$courseID = (int)$this->data->courseID;
		$userID = $this->data->userID;
		

		$userLogin = '';
		$photo = '';

		$mailing_login = '-1';

		if(is_numeric($this->data->userID)) {
			$userQuery = $this->query("SELECT * FROM `users` WHERE `user_id`='$userID' LIMIT 1");
			if ($userRet = $userQuery->fetch_assoc()) {
					$userLogin = $userRet['login'];
					$photo = $userRet['photo'];
			}
		} else {
			$mailingUserID = substr($userID, 1);

			$userMailingQuery = $this->query("SELECT * FROM `mailing_users` WHERE `id` = '$mailingUserID' LIMIT 1");

			if ($userMailingData = $userMailingQuery->fetch_assoc()) {
				$mailing_login = $userMailingData['email'];
			}
		}

		$courseName = '';
		$courseLink = '';
		$requirements = '';
		$thumb = '';
		$courseQuery = $this->query("SELECT `name`, `iframe`, `requirements`, `thumb`  FROM `banners_projects` WHERE `id_banner`='$courseID'");
		if ($courseRet = $courseQuery->fetch_assoc()) {
			$courseName = $courseRet['name'];
			$courseLink = $courseRet['iframe'];
			$thumb = $courseRet['thumb'];
			$requirements = $this->isJson($courseRet['requirements']) ? json_decode($courseRet['requirements']) : '';;
		}


		$usersDetailsInCourseQuery = $this->query("SELECT * 
														FROM `scorm_data` 
														WHERE `course_id`='$courseID' 
														AND (`user_id`='$userID' OR `mailing_login` = '$mailing_login') 
														LIMIT 1");


		if ($userDetails = $usersDetailsInCourseQuery->fetch_assoc()) {
			$usersDetailsInCourse = array(
					'data' => json_decode($userDetails['data']),
					'page_time' => json_decode( $userDetails['page_time']),
					'lesson_location' => $userDetails['lesson_location'],
					'user_score' => $userDetails['user_score'],
					'course_status' => $userDetails['course_status'],
					'userMail' => $userLogin,
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
	}

	

	private function getOwnerCourses() {

		$coursesIDArray = array();

		$ownerCourses = Banners::where('user_id', '=', $this->userID)->get();

		foreach ($ownerCourses as $course) {

			$coursesIDArray[] = $course->id_banner;

		}

		return $coursesIDArray;
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