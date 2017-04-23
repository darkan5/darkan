<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class UserLogin extends Model {

    protected $table = 'user_login';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = array('user_id');
}