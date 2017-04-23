<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class Groups extends Model {

	public  $fillable = ['name', 'id_owner', 'status'];

    protected $table = 'groups';
    public $timestamps = false;

    public function groupContents()
    {
        return $this->hasMany('App\Modules\Models\LmsGroupContent', 'group_id', 'id');
    }

    public function groupUsers()
    {
        return $this->hasMany('App\Modules\Models\GroupUser', 'id_group', 'id');
    }


}