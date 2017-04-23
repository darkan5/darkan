<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class UsersToDistributors extends Model {

	protected $fillable = ['user_id', 'distributor_id'];

    protected $table = 'users_to_distributors';

    public $timestamps = false;

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    public function distributor()
    {
        return $this->hasOne('App\User', 'id', 'distributor_id');
    }


}