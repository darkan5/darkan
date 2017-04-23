<?php namespace App\Modules\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;

class PricePlanOptions extends Model {

	protected $fillable = ['name', 'description', 'value', 'price_option_type_id', 'version_id'];

    protected $table = 'price_plan_options';

    public $timestamps = false;

    public function planOptionCosts()
    {
        return $this->hasOne('App\Modules\Models\PlanOptionsCosts', 'price_plan_option_id', 'id');
    }

    public function priceOptionType()
    {
        return $this->hasOne('App\Modules\Models\PriceOptionTypes', 'id', 'price_option_type_id');
    }

}