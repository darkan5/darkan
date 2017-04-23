<?php namespace App\Modules\Mailer;

use DB;
use Auth;
use App\User;
use Mail;
use Lang;

class SharedProjectMail {

	public function __construct()
	{
		
	}

    public function sendSharedMail($project, $receiver){

    	$projectId = $project->project_id;
    	$projectName = $project->name;

    	$project = (array)$project;
    	$project['login'] = Auth::user()->email;
    	$project['project_id'] = $projectId;
    	$project['name'] = $projectId;

        Mail::send('emails.projectsharing', (array)$project, 
        	function($message) use ($receiver, $project, $projectName)
		{
		    $message->from('no-reply@darkan.eu', 'Darkan');
		    $message->to($receiver)->subject(Lang::get('mails.projectSharedSubject') . ' | ' . $projectName);
		});
    }

    

	

	
}