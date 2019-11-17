<?php namespace App\Modules\Mailer;

use DB;
use Auth;
use App\User;
use Mail;
use Lang;
use App\Modules\Models\LmsInfo;

class RegistrationMail {

	public function __construct()
	{
		
	}

    public function sendRegistrationMail($data, $receiver){
        Mail::send('emails.registration', $data, function($message) use ($receiver)
		{
		    //$message->from('no-reply@darkan.eu', 'Darkan');
		    //$message->to($receiver)->subject(Lang::get('mails.registrationSubject'));
		});
    }

    public function sendSubdomainRegistrationMail($data, $receiver, $lmsInfoData){

    	$mailTemplate = 'emails.registrationsubdomain';
    	$sender = 'no-reply@darkan.eu';
    	$loginBtnLink = url('/login');

    	if ($lmsInfoData) {
    		if ($lmsInfoData->mail_template != '') {
    			$mailTemplate = $lmsInfoData->mail_template;
    		}
    		if ($lmsInfoData->mail_template != '') {
    			$sender = $lmsInfoData->paypal_mail;
    		}
    		if ($lmsInfoData->redirect_url != '') {
    			$loginBtnLink = $lmsInfoData->redirect_url;
    		}
    	}

    	$data['loginBtnLink'] = $loginBtnLink;

        Mail::send($mailTemplate, $data, function($message) use ($receiver, $sender)
		{
		    $message->from($sender, $sender);
		    $message->to($receiver)->subject(Lang::get('mails.registrationSubjectCustom'));
		});
    }

    

	

	
}