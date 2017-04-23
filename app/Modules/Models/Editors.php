<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class Editors extends Model {

	protected $fillable = ['name', 'description', 'active'];

    protected $table = 'editors';
    public $timestamps = false;
}