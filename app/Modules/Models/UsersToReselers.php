<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class UsersToReselers extends Model {

	protected $fillable = ['user_id', 'reseler_id'];

    protected $table = 'users_to_reselers';

    public $timestamps = false;

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    public function reseler()
    {
        return $this->hasOne('App\User', 'id', 'reseler_id');
    }


}