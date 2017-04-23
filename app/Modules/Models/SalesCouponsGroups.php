<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class SalesCouponsGroups extends Model {

	protected $fillable = ['name', 'description'];

    protected $table = 'sales_coupons_groups';

    public  $timestamps = false;

}