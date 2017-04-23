<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class PlansToPlansOptions extends Model {

	protected $fillable = ['plan_id', 'plan_option_id'];

    protected $table = 'plans_to_plans_options';

    public $timestamps = false;


    public function plansOptions()
    {
        return $this->hasOne('App\Modules\Models\PlansOptions', 'id', 'plan_option_id');
    }

}