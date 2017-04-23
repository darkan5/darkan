<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class MailingGroups extends Model {

	public  $fillable = ['name', 'id_owner', 'status'];

    protected $table = 'mailing_groups';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public function groupUsers()
    {
        return $this->hasMany('App\Modules\Models\MailingGroupUser', 'id_group', 'id');
    }

}