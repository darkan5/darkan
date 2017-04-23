<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class UsersToPromoCodes extends Model {

	protected $fillable = ['user_id', 'promo_code_id'];

    protected $table = 'users_to_promo_codes';

    public $timestamps = false;

    public function promoCode(){
         return $this->hasOne('App\Modules\Models\PromoCodes', 'id', 'promo_code_id');
    }

}