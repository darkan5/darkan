<?php namespace App\Modules\Models;


use Illuminate\Database\Eloquent\Model;

class Plans extends Model {

    protected $table = 'plans';
    public  $timestamps = true;

    protected $fillable = ['name', 'description', 'version_id', 'period', 'limit', 'start_date', 'expiration_date', 'used', 'active', 'date_enabled', 'limit_enabled', 'for_admin_only', 'plans_period_type_id', 'form_of_payment_id'];

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

    public function forAdminOnOffStates()
    {
        return $this->hasOne('App\Modules\Models\OnOffStates', 'state', 'for_admin_only');
    }

    public function activeOnOffStates()
    {
        return $this->hasOne('App\Modules\Models\OnOffStates', 'state', 'active');
    }

    public function plansUsers()
    {
        return $this->hasMany('App\Modules\Models\PlansUsers', 'plan_id', 'id');
    }

    public function formOfPayment()
    {
        return $this->hasOne('App\Modules\Models\FormsOfPayment', 'id', 'form_of_payment_id');
    }

    public function plansToPlansOptions()
    {
        return $this->hasMany('App\Modules\Models\PlansToPlansOptions', 'plan_id', 'id');
    }

    public function plansVersions()
    {
        return $this->hasOne('App\Modules\Models\PlansVersions', 'id', 'version_id');
    }

}