<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class ProjectsDeleted extends Model {

    protected $table = 'projects_deleted';
    protected $primaryKey = 'id';
    public  $timestamps = true;


}