<?php namespace App;

use App\EmptyClass;
use Mail;
use Config;
use Auth;

class AccountMailSender {

    public function sendEmail() {
        // ...
    }

    public function sendEmailToDirector($dataArray, $password) {

    	$data = (object) $dataArray;

		// $data = new EmptyClass();
		// $data->email = $data->email;
		$data->password = $password;

        Mail::send('emails.new_director', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject(Config::get('mail.from.subject'));
		});
    }

    public function sendEmailToParent($dataArray, $password) {

    	$data = (object) $dataArray;

		//$data = new EmptyClass();
		// $data->email = $data->email;
		$data->password = $password;

        Mail::send('emails.new_parent', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject(Config::get('mail.from.subject'));
		});
    }

    public function sendEmailToTeacher($dataArray, $password) {

    	$data = (object) $dataArray;

		// $data = new EmptyClass();
		// $data->email = $data->email;
		$data->password = $password;

        Mail::send('emails.new_teacher', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject(Config::get('mail.from.subject'));
		});
    }

    public function sendEmailToStudent($dataArray, $password) {

    	$data = (object) $dataArray;

		// $data = new EmptyClass();
		// $data->email = $data->email;
		$data->password = $password;

        Mail::send('emails.new_account', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject(Config::get('mail.from.subject'));
		});
    }

    public function sendEmailToPortalFromSchool($dataArray) {

        $data = (object) $dataArray;
        
        Mail::send('emails.director_form', ['data' => $data], function($message) use ($data) {

            $message->from($data->email, $data->name . $data->surname);
            $message->to('marek@euro-forum.lublin.pl', 'info')->subject('Kupno konta dla szkoły');

            // $message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
            // $message->to('dyrektor@euro-forum.com.pl', 'info')->subject(Config::get('mail.from.subject'));

        });
    }

     public function sendEmailToRegistered($dataArray, $password) {

    	$data = (object) $dataArray;

		// $data = new EmptyClass();
		// $data->email = $data->email;
		$data->password = $password;

        Mail::send('emails.new_registered', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to($data->email, $data->name)->subject(Config::get('mail.from.subject'));
		});
    }


    public function sendEmailToStudentParent($dataArray, $password) {

    	$data = (object) $dataArray;

		// $data = new EmptyClass();
		// $data->email = $data->email;
		$data->password = $password;

        Mail::send('emails.new_student_parent', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to(Auth::user()->email, $data->name)->subject(Config::get('mail.from.subject'));
		});
    }

    public function sendEmailToStudentTeacherDirector($dataArray, $password) {

    	$data = (object) $dataArray;

		// $data = new EmptyClass();
		// $data->email = $data->email;
		$data->password = $password;

        Mail::send('emails.new_student_teacher_director', ['data' => $data], function($message) use ($data)
		{
			$message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
			$message->to(Auth::user()->email, $data->name)->subject(Config::get('mail.from.subject'));
		});
    }


    public function sendEmailAfter15($dataArray) {

        $data = (object) $dataArray;


        Mail::send('emails.after_register.mail_after_register_15_minutes', ['data' => $data], function($message) use ($data)
        {
            $message->from(Config::get('mail.from.address'), Config::get('mail.from.name'));
            $message->to($data->email, $data->name)->subject(Config::get('mail.from.subject'));
        });
    }

    
}
?>