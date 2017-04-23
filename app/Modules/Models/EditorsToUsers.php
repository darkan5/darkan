<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class EditorsToUser extends Model {

	protected $fillable = ['user_is', 'editor_id'];

    protected $table = 'editors_to_users';
    public $timestamps = false;
}