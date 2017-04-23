<?php namespace App\Modules\Models;

use Illuminate\Database\Eloquent\Model;

class PromoCodesToUsers extends Model {

	protected $fillable = ['user_id', 'promo_code_id'];

    protected $table = 'promo_codes_to_users';

    public $timestamps = false;

    public function promoCode(){
         return $this->hasOne('App\Modules\Models\PromoCodes', 'id', 'promo_code_id');
    }

    public function user(){
        return $this->hasOne('App\User', 'id', 'user_id');
    }

}