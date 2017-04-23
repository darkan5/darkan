<?php namespace App\Modules\Models\Clients;


use Illuminate\Database\Eloquent\Model;

class ClientsZipCodes extends Model {

    protected $table = 'clients_zip_codes';
    public  $timestamps = false;

    protected $fillable = ['zip_code'];

}