<?php namespace App\Modules\Mailer;

use DB;
use Auth;
use App\User;
use Mail;
use Lang;

class UserMailSender {

	public function __construct()
	{
		
	}

    public function sendProjectsCopiedMail($dataArray, $receiver){

    	$data = (object) $dataArray;

        Mail::send('emails.projects_copied.projects_copied', ['data' => $data], function($message) use ($data)
		{
		    $message->from('no-reply@darkan.eu', 'Darkan');
		    //$message->bcc($data->creatorMail, 'Darkan | Kopia wiadomości');
		    $message->to($data->email)->subject($data->title);
		});

    }
	
}