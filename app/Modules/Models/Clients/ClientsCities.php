<?php namespace App\Modules\Models\Clients;


use Illuminate\Database\Eloquent\Model;

class ClientsCities extends Model {

    protected $table = 'clients_cities';
    public  $timestamps = false;

    protected $fillable = ['city'];
}