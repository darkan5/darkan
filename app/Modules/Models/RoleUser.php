<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class RoleUser extends Model {

	protected $fillable = ['user_id', 'role_id'];

    protected $table = 'role_user';

    public  $timestamps = false;

    public function role()
    {
        return $this->hasOne('App\Modules\Models\Roles', 'id', 'role_id');
    }
}