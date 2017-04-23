<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class ShareNoExist extends Model {

    protected $table = 'share_noexists';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = array('mail', 'project_id');

}