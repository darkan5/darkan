<?php namespace App\Modules\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;

class PlanOptionsCosts extends Model {

	protected $fillable = ['version_id', 'cost', 'price_plan_option_id', 'currency_id'];

    protected $table = 'plan_options_costs';

    public $timestamps = false;

    public function plansVersions()
    {
        return $this->hasOne('App\Modules\Models\PlansVersions', 'id', 'version_id');
    }

    public function currency()
    {
        return $this->hasOne('App\Modules\Models\Currency', 'id', 'currency_id');
    }
}