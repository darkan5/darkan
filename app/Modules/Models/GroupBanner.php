<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class GroupBanner extends Model {
    protected $table = 'group_banner';
    public $timestamps = false;
}