<?php namespace App\Modules\Models;

use DB;
use Auth;
use Illuminate\Database\Eloquent\Model;

class BannersCategories extends Model {

    protected $table = 'banners_categories';
    public $timestamps = false;
    protected $primaryKey = 'id';

}