<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class AplicationApiRoles extends Model {

    protected $table = 'aplication_api_roles';
    protected $primaryKey = 'id';
    public  $timestamps = false;


}