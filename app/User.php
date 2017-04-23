<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Zizaco\Entrust\Traits\EntrustUserTrait;

class User extends Authenticatable
{
    use Notifiable, EntrustUserTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'version', 'lang', 'hash', 'subdomain', 'subdomain_name', 'photo', 'active',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function roleUser(){
         return $this->hasOne('App\Modules\Models\RoleUser', 'user_id', 'id');
    }

    public function projects(){
         return $this->hasMany('App\Modules\Models\Projects', 'user_id', 'id');
    }

}
