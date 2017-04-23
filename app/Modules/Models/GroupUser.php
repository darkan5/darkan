<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class GroupUser extends Model {
    protected $table = 'group_user';
    public $timestamps = false;
    
    protected $fillable = array('id_user', 'id_group');

    public function group()
    {
        return $this->hasOne('App\Modules\Models\Groups', 'id', 'id_group');
    }

    public function user()
    {
        return $this->hasOne('App\Modules\Models\Users', 'id', 'id_user');
    }

}