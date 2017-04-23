<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class TestDrive extends Model {
    protected $table = 'testdrive';
    protected $primaryKey = 'email';
    public $timestamps = false;

    protected $fillable = array('email');

}