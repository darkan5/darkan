<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class LmsInvitationRequests extends Model {

    protected $table = 'lms_invitation_requests';
    protected $primaryKey = 'id';
    

    // public function user()
    // {
    //     return $this->hasOne('App\User', 'user_id', 'user_id');
    // }

}