<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class LmsUserPortalPaid extends Model {

    protected $table = 'lms_user_portal_paid';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = ['user', 'portal_admin'];

}