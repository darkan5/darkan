<?php
// require_once 'config.php';
// require_once 'utils.php';
// require_once 'database.php';

require_once '../../../config_login.php';

class Photopea {
	private $token;
	private $request;
	private $data = array();

	function __construct($act, $data) {
		global $database;

		switch ($act) {
			case 'new_token':
				$this->request = json_decode($data);

				switch ($this->request->request) {
					case 1:
						$this->generateNewToken();
						break;

					case 2:
						$this->checkMD5();
						break;
				}

				$this->sendData();
				break;

			case 'save_img':
				$this->token = $database->mysql_conn->real_escape_string($data);

				$this->saveImg();
				break;
		}
	}

	private function checkMD5() {
		global $database;

		//$user_id = (int)SESSION_METHOD::sessionGet('user_id');
		$user_id = (int)$this->request->userID;
		$project_id = $database->mysql_conn->real_escape_string($this->request->project);
		$page_id = $database->mysql_conn->real_escape_string($this->request->page);
		$actionkey = $database->mysql_conn->real_escape_string($this->request->actionkey);
		$filename = $database->mysql_conn->real_escape_string($this->request->filename);

		$path = '../../projects/' . $user_id . '/' . $project_id . '/pre/exported_view/' . $page_id . '/images/' . $actionkey . '/' . $filename;

		$this->data['md5'] = '';

		if (file_exists($path)) {
			$this->data['md5'] = md5_file($path);
		}
	}

	private function saveImg() {
		global $database;

		$token = $this->token;
		$searchPhotopeaQuery = $database->query("SELECT * FROM `photopea` WHERE `token`='$token'");
		if ($searchPhotopeaRet = $searchPhotopeaQuery->fetch_assoc()) {
			$user_id = $searchPhotopeaRet['user_id'];
			$project_id = $searchPhotopeaRet['project_id'];
			$page_id = $searchPhotopeaRet['page_id'];
			$actionkey = $searchPhotopeaRet['actionkey'];


			$path = '../projects/' . $user_id . '/' . $project_id . '/pre/exported_view/' . $page_id . '/images/' . $actionkey . '/';

			$p = json_decode( $_POST["p"] );	// parse JSON

			$new_txn = fopen('debug.txt', 'w');
			fwrite(print_r($searchPhotopeaRet) . "  |||  " . $path. "  |||  " . $p );
            fclose($new_txn);   



			// getting file name from "source";
			$fname = substr ($p->source, strrpos($p->source,"/")+1);	
			file_put_contents($path . $fname, base64_decode( $p->versions[0]->data ));

			$deletePhotopeaQuery = $database->query("DELETE FROM `photopea` WHERE `token`='$token'");
		}
	}

	private function generateNewToken() {
		global $database;

		//$user_id = (int)SESSION_METHOD::sessionGet('user_id');
		$user_id = (int)$this->request->userID;
		$project_id = $database->mysql_conn->real_escape_string($this->request->project);
		$page_id = $database->mysql_conn->real_escape_string($this->request->page);
		$actionkey = $database->mysql_conn->real_escape_string($this->request->actionkey);
		$filename = $database->mysql_conn->real_escape_string($this->request->filename);

		$token = md5(time() . '-' . rand(0, 10000));

		$this->data['token'] = $token;

		$insertPhotopeaQuery = $database->query("INSERT INTO `photopea` (`date`, `token`, `user_id`, `project_id`, `page_id`, `actionkey`) VALUES (NOW(), '$token', '$user_id', '$project_id', '$page_id', '$actionkey')");

		$path = '../../projects/' . $user_id . '/' . $project_id . '/pre/exported_view/' . $page_id . '/images/' . $actionkey . '/' . $filename;

		$this->data['md5'] = '';


		if (file_exists($path)) {
			$this->data['md5'] = md5_file($path);
		}
	}

    private function sendData() {
        echo json_encode($this->data);
    }
}

if (isset($_GET['t']) && $_GET['t'] !== '') {
	$photopea = new Photopea('save_img', $_GET['t']);
} else if (isset($_POST['request']) && $_POST['request'] !== '') {
	$photopea = new Photopea('new_token', $_POST['request']);
}

?>