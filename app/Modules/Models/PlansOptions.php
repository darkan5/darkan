<?php namespace App\Modules\Models;

use Auth;
use Illuminate\Database\Eloquent\Model;

class PlansOptions extends Model {

	protected $fillable = ['name', 'description', 'version_id', 'options'];

    protected $table = 'plans_options';

    public $timestamps = false;

    public function plansVersions()
    {
        return $this->hasOne('App\Modules\Models\PlansVersions', 'id', 'version_id');
    }
}