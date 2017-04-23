<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class ScormDataGuest extends Model {

    protected $table = 'scorm_data_guest';
    protected $primaryKey = 'id';
    public $timestamps = false;

}