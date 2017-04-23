<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class ApiTokens extends Model {

    protected $table = 'api_tokens';
    protected $primaryKey = 'id';
    public  $timestamps = true;

    protected $fillable = array('api_key', 'token');

    public function aplicationApi()
    {
        return $this->hasOne('App\Modules\Models\AplicationApi', 'id', 'api_key_id');
    }

}