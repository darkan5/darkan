<?php namespace App\Modules\Lms;

use App\Modules\Models\Banners;
use App\Modules\Mailer\ContentMailing;

class Mailing {
	private $request;
	private $responseData = array();

    private $_salt = '824a2dd094c1c16cfbb0af6776d0b0ff';

	function runMailingRequest($post) {

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

		return $this->responseData;
	}



	private function checkBanner() {

		$publicationId = (int)$this->request->bannerID;

		$returnLink = '';

		$publicationData = Banners::find($publicationId);
		if ( $publicationData ) {
			$returnLink = $publicationData->path;
		}

		return $returnLink;
	}

	private function setLinkInMessage($message, $bannerHash, $mail) {

		$bannerLink = str_replace('http://', '', config('app.contentLink')) . $bannerHash . '/mailing';
		
		$linkGet = $bannerLink . '?mh=' . $mail;//$this->encryptMail();

		return str_replace('{LINK}', $linkGet, $message);
	}

	private function sendMail() {

        $bannerHash = $this->checkBanner();


        $contentMailing = new ContentMailing();

        foreach ($this->request->mails as $address => $name) {

		    $mailData = array(
		    	'subject' => $this->request->title,
		    	'mailContent' => $this->setLinkInMessage($this->request->message, $bannerHash, $name)
			);

			$contentMailing->sendMailing($mailData, $name);

		}

        
  //       $message = Swift_Message::newInstance()
  //               ->setSubject($this->request->title)
  //               ->setFrom(array('no-reply@darkan.eu' => 'Darkan'));
        
  //       $type = $message->getHeaders()->get('Content-Type');
  //       $type->setValue('text/html');
  //       $type->setParameter('charset', 'utf-8');

  //       $transport = Swift_SmtpTransport::newInstance('localhost', 25);

  //       $mailer = Swift_Mailer::newInstance($transport);

  //       $iterator = 1;
		// $sentMails = fopen('sentmails.txt', 'w');

		
  //       foreach ($this->request->mails as $address => $name) {

		// 	$message->setTo($name)
		// 			->setBody($this->setLinkInMessage($this->request->message, $bannerHash, $name));


		// 	$result = $mailer->send($message);

		// 	$alreadySentMails = file_get_contents('sentmails.txt');

		// 	$alreadySentMails .= "\n";
		// 	$alreadySentMails .= $iterator . ". " . $name;

		// 	file_put_contents('sentmails.txt', $alreadySentMails);



		// 	$iterator++;
		// }

  //       fclose($sentMails);  

        //$result = $mailer->send($message);
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
}