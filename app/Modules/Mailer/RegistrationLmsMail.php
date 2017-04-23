<?php namespace App\Modules\Mailer;

use DB;
use Auth;
use App\User;
use Mail;
use Lang;

class RegistrationLmsMail {

	public function __construct()
	{
		
	}

    public function sendRegistrationMail($data, $receiver){
        Mail::send('emails.registrationlms', $data, function($message) use ($receiver)
		{
		    $message->from('no-reply@darkan.eu', 'Darkan');
		    $message->to($receiver)->subject(Lang::get('mails.registrationSubject'));
		});
    }


    public function sendMailWithNewUsersData($data, $receiver){
        Mail::send('emails.registrationlmsowner', $data, function($message) use ($receiver)
		{
		    $message->from('no-reply@darkan.eu', 'Darkan');
		    $message->to($receiver)->subject(Lang::get('mails.registrationSubject'));
		});
    }

    

	

	
}