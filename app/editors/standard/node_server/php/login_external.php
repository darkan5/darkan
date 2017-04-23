<?php

/**
 * @author mscislaw
 * @created 2014-06-12
 */

require_once '../../../config_login.php';
require_once '../../php/database.php';
require_once '../../php/session.php';

	class LoginExternal {
		private $request;

		private $data = array();

		function __construct($request) {
			$this->request = json_decode($request);

			switch ($this->request->request) {
				case 1:
					$this->loginExternal();
					break;
			}
		}

		function __destruct() {

			echo json_encode($this->data);
		}

		private function loginExternal() {

			$data = $this->request->data;
			$apikey = isset($data->apikey) ? $data->apikey : false;
			$projectId = isset($this->request->__meta__->projectID) ? $this->request->__meta__->projectID : false;

			if(!$apikey || !$projectId){
				$this->data['status'] = 'failed';
				return;
			}

			$user = $this->getUserIdByApiKey($apikey);

			$userId = (int)$user['user_id'];

			$project = $this->getProjectByUserId($userId, $projectId);

			if(!$user || !$project){
				$this->data['status'] = 'failed';
				return;
			}

			SESSION_METHOD::sessionInit();

			SESSION_METHOD::sessionSet('user_id', $user['user_id']);
			SESSION_METHOD::sessionSet('user_name', $user['login']);
			SESSION_METHOD::sessionSet('user_hash', $user['hash']);
			SESSION_METHOD::sessionSet('user_lang', $user['lang']);
			SESSION_METHOD::sessionSet('user_subdomain', $user['subdomain']);
			SESSION_METHOD::sessionSet('user_subdomain_name', $user['subdomain_name']);

			$this->data['status'] = 'success';
			$this->data['userId'] = $userId;
			$this->data['projectId'] = $projectId;
				

		}

		private function getUserIdByApiKey($apiKey){
			global $database, $address_db, $user_db, $passwd_db;

	    	if(strlen($apiKey) == 32){

		        $res = $database->query("SELECT * FROM `users` LEFT JOIN `aplication_api` ON `users`.`api_id`=`aplication_api`.`id`  WHERE `api_key`='$apiKey'");
		        
		        if ($user_data = $res->fetch_assoc()) {
		            return $user_data;
		        }
	        }

	    	return false;
	    }

	    private function getProjectByUserId($userId, $projectId){
	    	global $database, $address_db, $user_db, $passwd_db;

	        $project = false;


	        $res = $database->query("SELECT * FROM `projects` WHERE `user_id`='$userId' AND `project_id`='$projectId'");
	        
	        if ($project_data = $res->fetch_assoc()) {
	            $project = $project_data;
	        }

	        return $project;

	    }

	}

	if (isset($_POST['request'])) {
		$loginExternal = new LoginExternal($_POST['request']);
	}
?>