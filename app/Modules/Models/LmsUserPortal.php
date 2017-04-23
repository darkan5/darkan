<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class LmsUserPortal extends Model {

    protected $table = 'lms_user_portal';
    public $timestamps = false;
    protected $primaryKey = 'user';
    
    protected $fillable = array('user', 'portal_admin');

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user');
    }

    public function scorm()
    {
        return $this->hasMany('App\Modules\Models\ScormData', 'user_id', 'user');
    }

}