<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class UsersToDistributorsRabats extends Model {

	protected $fillable = ['user_id', 'rabat', 'amount', 'currency_id', 'start_date', 'expiration_date', 'active'];

    protected $table = 'users_to_distributors_rabats';

    public function activeOnOffStates()
    {
        return $this->hasOne('App\Modules\Models\OnOffStates', 'state', 'active');
    }

    public function currency()
    {
        return $this->hasOne('App\Modules\Models\Currency', 'id', 'currency_id');
    }
}