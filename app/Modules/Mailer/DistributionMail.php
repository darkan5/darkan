<?php namespace App\Modules\Mailer;

use DB;
use Auth;
use App\User;
use Mail;
use Lang;

class DistributionMail {

	public function __construct()
	{
		
	}

    public function sendRegistrationMail($data, $receiver){
        Mail::send('emails.registration.distributor.distributor_registration', $data, function($message) use ($receiver, $data)
		{
		    $message->from('no-reply@darkan.eu', 'Darkan');
		    $message->to($receiver)->subject(Lang::get('mails.registrationSubject'));
		});
    }
	
}