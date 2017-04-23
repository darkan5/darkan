<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class PriceOptionTypes extends Model {

	protected $fillable = ['name'];

    protected $table = 'price_option_types';
    public $timestamps = false;
}