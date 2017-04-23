<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class SalesCoupons extends Model {

	protected $fillable = ['plan_id', 'sales_coupon_group_id', 'description', 'cost', 'active'];

    protected $table = 'sales_coupons';

    public  $timestamps = true;


    public function activeOnOffStates()
    {
        return $this->hasOne('App\Modules\Models\OnOffStates', 'state', 'active');
    }

    public function plansUsersToSalesCoupons(){
         return $this->hasMany('App\Modules\Models\PlansUsersToSalesCoupons', 'sales_coupon_id', 'id');
    }

    public function plan(){
         return $this->hasOne('App\Modules\Models\Plans', 'id', 'plan_id');
    }

    public function group(){
         return $this->hasOne('App\Modules\Models\SalesCouponsGroups', 'id', 'sales_coupon_group_id');
    }

}