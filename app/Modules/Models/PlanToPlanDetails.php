<?php namespace App\Modules\Models;


use Illuminate\Database\Eloquent\Model;

class PlanToPlanDetails extends Model {

    protected $table = 'plan_to_plan_details';

    public function plansDetails()
    {
        return $this->hasOne('App\Modules\Models\PlansDetails', 'id', 'plan_id' );
    }
}