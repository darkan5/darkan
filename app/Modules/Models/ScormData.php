<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class ScormData extends Model {

    protected $table = 'scorm_data';
    protected $primaryKey = 'id';
    public $timestamps = false;


    protected $fillable = array('course_id', 'mailing_login', 'user_id');

    public function banner()
    {
        return $this->hasOne('App\Modules\Models\Banners', 'id_banner', 'course_id');
    }

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
}