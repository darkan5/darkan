<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class ProjectVersion extends Model {

    protected $table = 'project_version';
    protected $primaryKey = 'id';
    public  $timestamps = false;

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
}