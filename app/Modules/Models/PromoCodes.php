<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class PromoCodes extends Model {

	protected $fillable = ['code', 'limit', 'rabat', 'start_date', 'expiration_date', 'used', 'active', 'date_enabled', 'limit_enabled'];

    protected $table = 'promo_codes';

    public  $timestamps = true;

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'created_by_user_id');
    }

    public function limitOnOffStates()
    {
        return $this->hasOne('App\Modules\Models\OnOffStates', 'state', 'limit_enabled');
    }

    public function dateOnOffStates()
    {
        return $this->hasOne('App\Modules\Models\OnOffStates', 'state', 'date_enabled');
    }

    public function activeOnOffStates()
    {
        return $this->hasOne('App\Modules\Models\OnOffStates', 'state', 'active');
    }

    public function plansUsers()
    {
        return $this->hasMany('App\Modules\Models\PlansUsers', 'promo_code_id', 'id');
    }

    public function promoCodeToUser()
    {
        return $this->hasOne('App\Modules\Models\PromoCodesToUsers', 'promo_code_id', 'id');
    }
}