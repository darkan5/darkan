<?php namespace App;

use App\EmptyClass;
use Mail;
use Config;
use Auth;

class CronMailSender {


	public function sendTestEmail($dataArray) {

		if(!env('CRON_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.test.test_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Email testowy');
		});
    }


    public function sendEmailAfter15Minutes($dataArray) {

    	if(!env('CRON_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.after_registration.after_15_minutes_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Witamy! - ZdobywcyWiedzy.pl');
		});
    }

    public function sendEmailAfter3Days($dataArray) {

    	if(!env('CRON_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.after_registration.after_3_days_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Sięgnij po więcej');
		});
    }

    public function sendEmailAfter7Days($dataArray) {

    	if(!env('CRON_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.after_registration.after_7_days_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Upominek dla Twojej pociechy');
		});
    }

    public function sendEmailAfter14Days($dataArray) {

    	if(!env('CRON_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.after_registration.after_14_days_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Czekamy już tylko na Ciebie!');
		});
    }

    public function sendEmailToUsersWherePlanEndingFor7Days($dataArray) {

    	if(!env('CRON_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.plans_ending.before_7_days_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Zostańmy razem');
		});
    }

    public function sendEmailToUsersWherePlanEndingFor1Day($dataArray) {

    	if(!env('CRON_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.plans_ending.before_1_day_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Czy to naprawdę koniec?');
		});
    }

    public function sendEmailToUsersWherePlanEnding($dataArray) {

    	if(!env('CRON_MAILING_ENABLED')){
			return false;
		}

    	$data = (object) $dataArray;

        Mail::send('emails.plans_ending.plan_ending_mail', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject('Czy to naprawdę koniec?');
		});
    }

    
    
}
?>