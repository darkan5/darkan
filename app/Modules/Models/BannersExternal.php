<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class BannersExternal extends Model {

    protected $table = 'banners_projects_external';
    protected $primaryKey = 'id_banner';
    public $timestamps = true;

    protected $fillable = array('path');

}