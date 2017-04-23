<?php namespace App\Modules\Mailer;

use DB;
use Auth;
use App\User;
use Mail;
use Lang;

class ContentMailing {

	public function __construct()
	{
		
	}

    public function sendMailing($data, $receiver){


        Mail::send('emails.contentmailing', $data, 
        	function($message) use ($receiver, $data)
		{
		    $message->from('no-reply@darkan.eu', 'Darkan');
		    $message->to($receiver)->subject( $data['subject'] );
		});
    }

    

	

	
}