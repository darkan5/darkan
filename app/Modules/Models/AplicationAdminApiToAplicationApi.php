<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class AplicationAdminApiToAplicationApi extends Model {

	protected $fillable = array('admin_api_key_id', 'api_key_id');

    protected $table = 'aplication_admin_api_to_aplication_api';
    protected $primaryKey = 'id';
    public  $timestamps = false;


    public function adminApi()
    {
        return $this->hasOne('App\Modules\Models\AplicationApi', 'id', 'admin_api_key_id');
    }

    public function userApi()
    {
        return $this->hasOne('App\Modules\Models\AplicationApi', 'id', 'api_key_id');
    }
}