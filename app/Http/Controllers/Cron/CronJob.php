<?php namespace App\Http\Controllers\Cron;

use App\Http\Controllers\Controller;
use App\CronMailSender;
use DB;
use App\Modules\Models\CronEmailTypeToUser;
use Carbon\Carbon;
use App\Modules\Utils\Utils;


class CronJob extends Controller {

    public function changeCronLogFileName(){

        $date = date("d-m-y H_i_s"); 

        rename(base_path() . '/logs/cron/cronjob.log', base_path() . '/logs/cron/cronjob ' . $date . '.log');   
    }

    public function printDate(){

    	$date = date("d-m-y H:i:s"); 

        print_r($date);
        print_r('/n');
    }

}