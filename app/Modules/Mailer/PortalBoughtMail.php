<?php namespace App\Modules\Mailer;

use DB;
use Auth;
use App\User;
use Mail;
use Lang;
use App\Modules\Models\LmsInfo;

class PortalBoughtMail {

	public function __construct()
	{
		
	}

    public function sendPortalBoughtMail($data, $receiver){

    	$data['login'] = $receiver;

    	$ownerId = $data['owner_id'];
    	$lmsInfoData = LmsInfo::where('user_id', '=', $ownerId)->first();

    	$loginBtnLink = url('/login');

    	if ($lmsInfoData) {
    		if ($lmsInfoData->redirect_url != '') {
    			$loginBtnLink = $lmsInfoData->redirect_url;
    		}
    	}

    	$data['loginBtnLink'] = $loginBtnLink;


        Mail::send($data['mail_template'], (array)$data, 
        	function($message) use ($receiver, $data)
		{
		    $message->from($data['sender'], $data['sender']);
		    $message->bcc('p.wiecaszek@rapsody.com.pl', 'Peter');
		    $message->to($receiver)->subject( 'Thank you for purchasing \'English for Dietetics and Nutrition\' e-learning course.' );
		});
    }

    

	

	
}