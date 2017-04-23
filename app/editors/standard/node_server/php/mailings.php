<?php

// require_once 'session.php';
require_once 'config.php';
require_once '../../php/database.php';

// $ff = 'yy';
// ${'f' . 'f'} = 'ttt';
// $ff - 'ttt'

class Mailing {
	private $request;
	private $responseData = array();

	private $mail = 'i.zieba@rapsody.com.pl';
	private $password = 'raps1357';


    private $_salt = '824a2dd094c1c16cfbb0af6776d0b0ff';

	function __construct($post) {

		$this->request = json_decode($post);

		switch($this->request->request) {
			case 1:
				$this->sendMail();
				break;

			case 2:
				$this->getUsersAndGroup();
				break;

			case 3:
				$this->getUsersFromGroup();
				break;
		}
	}

	function __destruct() {
		$this->sendData();
	}

	private function checkBanner() {
		global $database;

		$banerID = (int)$this->request->bannerID;

		$returnLink = '';

		$bannerQuery = $database->query("SELECT * FROM `banners_projects` WHERE `id_banner`='$banerID' LIMIT 1");
		while ($ret = $bannerQuery->fetch_assoc()) {
			$returnLink = $ret['path'];
		}

		return $returnLink;
	}

	private function setLinkInMessage($message, $bannerHash, $mail) {
		global $server_link;

		$bannerLink = $server_link . '/c/' . $bannerHash;
		
		$linkGet = $bannerLink . '/' . $mail;//$this->encryptMail();

		return str_replace('{LINK}', $linkGet, $message);
	}

	private function sendMail() {

        require_once 'swiftmailer/lib/swift_required.php';

        $bannerHash = $this->checkBanner();
        
        $message = Swift_Message::newInstance()
                ->setSubject($this->request->title)
                ->setFrom(array('no-reply@darkan.eu' => 'Darkan'));
                //->setBcc($this->request->mails)
                //->setBody($this->request->message);
        
        $type = $message->getHeaders()->get('Content-Type');
        $type->setValue('text/html');
        $type->setParameter('charset', 'utf-8');

        $transport = Swift_SmtpTransport::newInstance('localhost', 25);

        // $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
        //         ->setUsername($this->mail)
        //         ->setPassword($this->password);

        $mailer = Swift_Mailer::newInstance($transport);

        $iterator = 1;
		$sentMails = fopen('sentmails.txt', 'w');

		foreach ($this->request->mails as $address => $name) {

			$message->setTo($name)
					->setBody($this->setLinkInMessage($this->request->message, $bannerHash, $name));


			$result = $mailer->send($message);

			$alreadySentMails = file_get_contents('sentmails.txt');

			$alreadySentMails .= "\n";
			$alreadySentMails .= $iterator . ". " . $name;

			file_put_contents('sentmails.txt', $alreadySentMails);



			$iterator++;
		}

        fclose($sentMails);  

        //$result = $mailer->send($message);
	}

	private function getUsersAndGroup() {
		global $database;
		$ownUserID = SESSION_METHOD::sessionGet('user_id');

		$this->responseData['users'] = array();
		$this->responseData['groups'] = array();

		$usersQuery = $database->query("SELECT * FROM `lms_user_portal` LEFT JOIN `users` ON `lms_user_portal`.`user`=`users`.`user_id` WHERE `portal_admin`='$ownUserID'");
		while ($ret = $usersQuery->fetch_assoc()) {
			$this->responseData['users'][] = $ret['login'];
		}

		$usersQuery = $database->query("SELECT * FROM `groups` WHERE `id_owner`='$ownUserID' AND `status`=0");
		while ($ret = $usersQuery->fetch_assoc()) {
			$this->responseData['groups'][$ret['id']] = $ret['name'];
		}
	}

	private function getUsersFromGroup() {
		global $database;

		$this->responseData['users'] = array();
		$groupID = (int)$this->request->group;

		$groupQuery = $database->query("SELECT * FROM `group_user` LEFT JOIN `users` ON `group_user`.`id_user`=`users`.`user_id` WHERE `id_group`='$groupID'");
		while ($ret = $groupQuery->fetch_assoc()) {
			$this->responseData['users'][] = $ret['login'];
		}
	}

	private function encryptMail($text) {
		
		$b64 = trim(base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $this->_salt, $text, MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND))));
		$b64_1 = str_replace('+', '-', $b64);
		$b64_2 = str_replace('/', '_', $b64_1);
		$b64_3 = str_replace('=', '', $b64_2);
		
        return $b64_3;
    }
	
    private function decryptMail($text) {
		
		$b64_1 = str_replace('-', '+', $text);
		$b64_2 = str_replace('_', '/', $b64_1);
        $textDecrypted = trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $this->_salt, base64_decode($b64_2), MCRYPT_MODE_ECB, mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB), MCRYPT_RAND)));

		return $textDecrypted;
    }

	private function sendData() {
		echo json_encode($this->responseData);
	}
}

if (isset($_POST['request']) && $_POST['request'] !== '') {
	$mailing = new Mailing($_POST['request']);
}

?>