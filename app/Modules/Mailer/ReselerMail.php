<?php namespace App\Modules\Mailer;

use DB;
use Auth;
use App\User;
use Mail;
use Lang;

class ReselerMail {

	public function __construct()
	{
		
	}

    public function sendRegistrationMail($data, $receiver){
        Mail::send('emails.registration.reseler.reseler_registration', $data, function($message) use ($receiver, $data)
		{
		    $message->from('no-reply@'.env('APP_URL'), 'Darkan');
		    $message->to($receiver)->subject(Lang::get('mails.registrationSubject'));
		});
    }
	
}