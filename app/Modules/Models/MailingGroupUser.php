<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class MailingGroupUser extends Model {

	public  $fillable = ['id_user', 'id_group'];

    protected $table = 'mailing_group_user';
    public $timestamps = false;

    public function user()
    {
        return $this->hasOne('App\Modules\Models\MailingUsers', 'id', 'id_user');
    }

    public function group()
    {
        return $this->hasOne('App\Modules\Models\MailingGroups', 'id', 'id_group');
    }
}