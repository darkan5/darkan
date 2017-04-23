<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class ReselersToDistributors extends Model {

	protected $fillable = ['reseler_id', 'distributor_id'];

    protected $table = 'reselers_to_distributors';

    public $timestamps = false;

    public function reseler()
    {
        return $this->hasOne('App\User', 'id', 'reseler_id');
    }

    public function distributor()
    {
        return $this->hasOne('App\User', 'id', 'distributor_id');
    }

}