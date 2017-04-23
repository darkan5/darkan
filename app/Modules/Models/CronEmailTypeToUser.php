<?php namespace App\Modules\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;

class CronEmailTypeToUser extends Model {

    protected $table = 'cron_email_type_to_user';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public  $fillable = ['user_id', 'cron_email_type_id', 'email_sended'];

}