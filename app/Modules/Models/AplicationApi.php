<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class AplicationApi extends Model {

    protected $fillable = array('api_key', 'role_id');

    protected $table = 'aplication_api';
    protected $primaryKey = 'id';
    public  $timestamps = false;

    public function user()
    {
        return $this->hasOne('App\User', 'api_id', 'id');
    }

    public function userToAplicationApi()
    {
        return $this->hasOne('App\Modules\Models\UsersToAplicationsApi', 'aplication_api_id', 'id');
    }
    
    public function roleApi(){
    	 return $this->hasOne('App\Modules\Models\AplicationApiRoles', 'id', 'role_id');
    }

    public function isActive()
    {

        if($this->roleApi->id > 0){
            return true;
        }else{
            return false;
        }
    }

    public function isAdmin()
    {

        if($this->roleApi->id == 1){
            return true;
        }else{
            return false;
        }
    }

    public function isUser()
    {

        if($this->roleApi->id == 2){
            return true;
        }else{
            return false;
        }
    }

}