<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class LmsInfo extends Model {

    protected $table = 'lms_info';
    public $timestamps = false;
    protected $primaryKey = 'user_id';
    
    protected $fillable = array('user_id', 'state', 'login', 'savemail', 'passwd', 'price', 
    	'currency', 'expiration', 'max_accounts', 'business', 'paid', 'topmenuon', 'footeron', 'skin', 
    	'paypal_mail', 'redirect_url', 'custom_view', 'mail_template', 'portal_bought_mail_template', 'terms_link', 'force_lang');


    public function skindata()
    {
        return $this->hasOne('App\Modules\Models\PortalSkins', 'id', 'skin');
    }

}