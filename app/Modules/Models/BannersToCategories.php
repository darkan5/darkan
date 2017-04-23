<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class BannersToCategories extends Model {

    protected $table = 'banners_to_categories';
    public $timestamps = false;
    protected $primaryKey = 'id';


    public function category()
    {
        return $this->hasOne('App\Modules\Models\BannersCategories', 'id', 'category_id');
    }

}