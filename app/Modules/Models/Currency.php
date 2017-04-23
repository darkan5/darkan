<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model {

	protected $fillable = ['name'];

    protected $table = 'currencies';
    public $timestamps = false;
}