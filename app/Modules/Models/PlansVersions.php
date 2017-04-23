<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class PlansVersions extends Model {

	protected $fillable = ['name', 'description', 'version'];

    protected $table = 'plans_versions';
}