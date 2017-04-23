<?php namespace App\Modules\Models\Clients;


use Illuminate\Database\Eloquent\Model;

class ClientsAddresses extends Model {

    protected $table = 'clients_addresses';
    public  $timestamps = false;

    protected $fillable = ['user_id', 'city_id', 'zip_code_id', 'address', 'email'];

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    public function city()
    {
        return $this->hasOne('App\Modules\Models\Clients\ClientsCities', 'id', 'city_id');
    }

    public function zipCode()
    {
        return $this->hasOne('App\Modules\Models\Clients\ClientsZipCodes', 'id', 'zip_code_id');
    }
}