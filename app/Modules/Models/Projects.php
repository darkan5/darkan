<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model {

    protected $table = 'projects';
    protected $primaryKey = 'project_id';
    public  $timestamps = false;

    public function share(){

    	 return $this->hasMany('App\Modules\Models\Share', 'project_id', 'project_id');
    }

    public $fillable = [
                    'user_id',
                    'date',
                    'name',
                    'skin',
                    'dimentions',
                    'version',
                    'date_modification',
                    'size',
                    'template',
                    'last_visit',
                    'status',
                    'external',
                    'editor_id',
                    ];

    public function editor(){

         return $this->hasOne('App\Modules\Models\Editors', 'id', 'editor_id');
    }

    public function banners(){

         return $this->hasMany('App\Modules\Models\Banners', 'project_id', 'project_id');
    }

}