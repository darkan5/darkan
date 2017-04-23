<?php namespace App\Modules\Mailer;

use DB;
use Auth;
use App\User;
use Mail;
use Lang;

class PaymentCompletedMail {

	public function __construct()
	{
		
	}

    public function sendConfirmationMail($data, $receiver){

    	$data['login'] = $receiver;

        Mail::send('emails.planbought', (array)$data, 
        	function($message) use ($receiver, $data)
		{
		    $message->from('no-reply@darkan.eu', 'Darkan');
		    $message->attach($data['pdf'], array('as' => 'invoice.pdf', 'mime' => 'application/pdf'));
		    $message->bcc('p.wiecaszek@rapsody.com.pl', 'Peter');
		    $message->to($receiver)->subject( Lang::get('mails.INVOICE_SUBJECT') );
		});
    }

    

	

	
}