<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class MailingUsers extends Model {

    protected $table = 'mailing_users';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = array('owner_id', 'email', 'name', 'create_date', 'data', 'fb_link');

    public function groupUser(){
         return $this->hasMany('App\Modules\Models\MailingGroupUser', 'id_user', 'id');
    }

}