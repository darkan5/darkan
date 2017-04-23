<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class DemosProjects extends Model {

    protected $table = 'projects_demos';
    protected $primaryKey = 'id';
    public  $timestamps = true;

    // public function user(){

    // 	 return $this->hasOne('App\User', 'user_id', 'user_id');
    // }

    // public function userLogin(){

    // 	 return $this->hasMany('App\Modules\Models\UserLogin', 'user_id', 'user_id');
    // }


}