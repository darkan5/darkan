<?php namespace App\Modules\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;

class CronEmailsTypes extends Model {

	protected $table = 'cron_emails_types';

    protected $primaryKey = 'id';
    public $timestamps = false;

}