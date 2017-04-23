<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class Banners extends Model {

    protected $table = 'banners_projects';
    protected $primaryKey = 'id_banner';
    public $timestamps = false;

    public  $fillable = [
                    'project_id',
                    'user_id',
                    'path',
                    'iframe',
                    'name',
                    'summary',
                    'date_create',
                    'date_expiry',
                    'modified',
                    'view_count',
                    'max_view_count',
                    'dimensions',
                    'questions',
                    'index_file',
                    'requirements',
                    'questiondata' 
                    ];

    //protected $fillable = array('path');
    
    public function user(){
    	 return $this->hasOne('App\User', 'id', 'user_id');
    }


    public function scormData()
    {
        return $this->hasMany('App\Modules\Models\ScormData', 'id', 'id_banner');
    }

    public function groupContents()
    {
        return $this->hasMany('App\Modules\Models\LmsGroupContent', 'content_id', 'id_banner');
    }

    public function project()
    {
        return $this->hasOne('App\Modules\Models\Projects', 'project_id', 'project_id');
    }

}