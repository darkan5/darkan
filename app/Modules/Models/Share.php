<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class Share extends Model {

    protected $table = 'share';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = array('user_id', 'project_id');

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    public function project()
    {
        return $this->hasOne('App\Modules\Models\Projects', 'project_id', 'project_id');
    }

}