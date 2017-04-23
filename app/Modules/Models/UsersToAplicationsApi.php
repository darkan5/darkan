<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class UsersToAplicationsApi extends Model {

	protected $fillable = array('user_id', 'aplication_api_id');

    protected $table = 'users_to_aplications_api';
    protected $primaryKey = 'id';
    public  $timestamps = false;


    public function user()
    {
        return $this->hasOne('App\Modules\Models\Users', 'id', 'user_id');
    }

    public function aplicationApi()
    {
        return $this->hasOne('App\Modules\Models\AplicationApi', 'id', 'aplication_api_id');
    }
}