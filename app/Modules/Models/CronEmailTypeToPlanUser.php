<?php namespace App\Modules\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;

class CronEmailTypeToPlanUser extends Model {

    protected $table = 'cron_email_type_to_plan_user';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public  $fillable = ['plan_user_id', 'cron_email_type_id', 'email_sended'];

}