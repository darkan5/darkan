<?php namespace App\Modules\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;

class PlansUsers extends Model {

    protected $table = 'plans_users';
    protected $fillable = ['user_id', 'plan_id', 'currency_id', 'promo_code_id', 'plan_cost_to_pay', 'plan_cost_to_pay_with_rabat', 'plan_options', 'session_id', 'start_date', 'expiration_date', 'active', 'paying_user_id', 'created_by_user_id', 'client_address_id', 'payment_verified', 'register_complete', 'paid'];

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    public function payingUser()
    {
        return $this->hasOne('App\User', 'id', 'paying_user_id');
    }

    public function createdByUser()
    {
        return $this->hasOne('App\User', 'id', 'created_by_user_id');
    }


    public function plan()
    {
        return $this->hasOne('App\Modules\Models\Plans', 'id', 'plan_id');
    }

    public function transaction()
    {
        return $this->hasOne('App\Modules\Models\Transactions', 'id', 'transaction_id');
    }

    public function clientAddress()
    {
        return $this->hasOne('App\Modules\Models\Clients\ClientsAddresses', 'id', 'client_address_id');
    }

    public function activeOnOffStates()
    {
        return $this->hasOne('App\Modules\Models\OnOffStates', 'state', 'active');
    }

    public function promoCode()
    {
        return $this->hasOne('App\Modules\Models\PromoCodes', 'id', 'promo_code_id');
    }

    public function plansUsers()
    {
        return $this->hasMany('App\Modules\Models\PlansUsers', 'plan_id', 'id');
    }

    public function currency()
    {
        return $this->hasOne('App\Modules\Models\Currency', 'id', 'currency_id');
    }

    
}