<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class PlansToPriceList extends Model {

	protected $fillable = ['version_id', 'price_type_id', 'price_period_id', 'plan_id'];

    protected $table = 'plans_to_price_list';

    public $timestamps = false;

    public function plan()
    {
        return $this->hasOne('App\Modules\Models\Plans', 'id', 'plan_id');
    }

    public function pricePeriods()
    {
        return $this->hasOne('App\Modules\Models\PricePeriods', 'id', 'price_period_id');
    }

}