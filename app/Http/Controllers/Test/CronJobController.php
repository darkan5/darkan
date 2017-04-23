<?php namespace App\Http\Controllers\Test;

use Input;
use File;
use App\Http\Controllers\Controller;
use App\CronMailSender;
use App\PaymentMailSender;
use App\Http\Requests\Admin\CronTestEmailRequest;
use App\Http\Controllers\Cron\AfterRegisterationSendEmailController;
use App\Http\Controllers\Cron\UserPlanEndingSendEmailController;


class CronJobController extends Controller {


	protected $redirectTo = 'admin/adminecronjob';

    public function getPanel(){

    	$directory = base_path() . '/logs/cron';

    	$files = $files = File::allFiles($directory);

    	$filesArray = array();

    	foreach ($files as $file)
		{
			$name = basename($file);  
			$url = str_replace(base_path(), '', $file);  

		    array_push($filesArray, array('name' => $name, 'url' => $url));
		}

        return view('admin.test.admin_panel_cron_job')
        			->with('files', $filesArray);
    }

}