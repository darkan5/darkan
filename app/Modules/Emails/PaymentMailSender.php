<?php namespace App;

use App\EmptyClass;
use Mail;
use Config;
use Auth;

class PaymentMailSender {


    public function paymentFinishedParent($dataArray) {

    	if(!env('PAYMENT_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.payment.payment_finished_parent_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Witamy w drużynie!');
		});
    }

    public function paymentFinishedTeacher($dataArray) {

    	if(!env('PAYMENT_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.payment.payment_finished_teacher_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Witamy w drużynie!');
		});
    }

    public function paymentFinishedDirector($dataArray) {

    	if(!env('PAYMENT_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.payment.payment_finished_director_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Witamy w drużynie!');
		});
    }

    public function paymentFinished($dataArray) {

    	if(!env('PAYMENT_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.payment.payment_finished_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			//$message->to($data->email, $data->name)->subject('Witamy w drużynie!');
			$message->to('kutynajarek@gmail.com', 'Kutyna Jarek')->subject('Witamy w drużynie!');
		});
    }
    
}
?>