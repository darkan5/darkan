<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class LmsGroupContent extends Model {

	public  $fillable = ['group_id', 'content_id'];

    protected $table = 'lms_group_content';
    public $timestamps = false;

    public function banner()
    {
        return $this->hasOne('App\Modules\Models\Banners', 'id_banner', 'content_id');
    }

    public function group()
    {
        return $this->hasOne('App\Modules\Models\Groups', 'id', 'group_id');
    }

}