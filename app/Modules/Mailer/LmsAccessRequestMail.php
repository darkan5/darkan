<?php namespace App\Modules\Mailer;

use DB;
use Auth;
use App\User;
use Mail;
use Lang;

class LmsAccessRequestMail {

	public function __construct()
	{
		
	}

    public function sendLmsAccessRequest($accessId, $receiver){

    	$sender = Auth::user()->email;

        Mail::send('emails.portalaccessrequest', ['sender' => $sender, 'accessId' => $accessId], 
        	function($message) use ($receiver, $sender)
		{
		    $message->from('no-reply@darkan.eu', 'Darkan');
		    $message->to($receiver)->subject(Lang::get('mails.accessRequestMailSubject'));
		});
    }


    public function sendLmsAccessGranted($subdomainUrl, $receiver){
        Mail::send('emails.portalaccessgranted', ['subdomainUrl' => $subdomainUrl], 
        	function($message) use ($receiver)
		{
		    $message->from('no-reply@darkan.eu', 'Darkan');
		    $message->to($receiver)->subject(Lang::get('mails.accessRequestMailSubject'));
		});
    }
	

	
}