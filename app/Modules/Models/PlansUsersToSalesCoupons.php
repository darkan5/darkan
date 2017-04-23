<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class PlansUsersToSalesCoupons extends Model {

	protected $fillable = ['plan_user_id', 'sales_coupon_id'];

    protected $table = 'plans_users_to_sales_coupons';

    public $timestamps = false;

    public function salesCoupon(){
         return $this->hasOne('App\Modules\Models\SalesCoupon', 'id', 'sales_coupon_id');
    }

}