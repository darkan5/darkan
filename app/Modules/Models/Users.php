<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model {

	protected $fillable = ['name', 'email', 'created_at', 'updated_at'];

	protected $guarded = [];

    protected $table = 'users';

    protected $hidden = ['password', 'remember_token'];

    public function roleUser(){
    	 return $this->hasOne('App\Modules\Models\RoleUser', 'user_id', 'id');
    }

    public function usersToPromoCodes()
    {
        return $this->hasMany('App\Modules\Models\UsersToPromoCodes', 'user_id', 'id' );
    }

    public function userLogin(){
         return $this->hasMany('App\Modules\Models\UserLogin', 'user_id', 'id');
    }

    public function groupUser(){
         return $this->hasMany('App\Modules\Models\GroupUser', 'id_user', 'id');
    }

    public function projects(){
         return $this->hasMany('App\Modules\Models\Projects', 'user_id', 'id');
    }

    // public function groupContents()
    // {
    //     return $this->hasMany('App\Modules\Models\LmsGroupContent', 'group_id', 'id');
    // }

    // public function groups(){
    //      return $this->hasMany('App\Modules\Models\Groups', 'id_owner', 'id');
    // }

    
}