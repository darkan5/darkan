<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model {

    protected $table = 'payments';
    protected $primaryKey = 'id';

	private $userId = 0;

    protected $guarded = array();

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
}