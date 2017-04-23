<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class PortalSkins extends Model {

    protected $table = 'portal_skins';
    public $timestamps = false;
    protected $primaryKey = 'id';

}