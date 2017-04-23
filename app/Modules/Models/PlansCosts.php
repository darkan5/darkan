<?php namespace App\Modules\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;

class PlansCosts extends Model {

	protected $fillable = ['version_id', 'cost', 'plan_id', 'currency_id'];

    protected $table = 'plans_costs';

    public $timestamps = false;

    public function plansVersions()
    {
        return $this->hasOne('App\Modules\Models\PlansVersions', 'id', 'version_id');
    }
}