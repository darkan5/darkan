<?php namespace App\Modules\Models;


use Illuminate\Database\Eloquent\Model;

class Transactions extends Model {

    protected $table = 'transactions';
    public  $timestamps = true;

    protected $fillable = ['merchant_id', 'pos_id', 'session_id', 'amount', 'currency', 'order_id', 'statement', 'sign', 'transaction_id'];


    public function planUser()
    {
        return $this->hasOne('App\Modules\Models\PlansUsers', 'id', 'transaction_id');
    }
}