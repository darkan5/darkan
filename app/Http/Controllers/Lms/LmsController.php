<?php

namespace App\Http\Controllers\Lms;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;

use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\Groups;
use App\Modules\Models\Roles;
use App\Modules\Models\Banners;

use App\Modules\Utils\Utils;


class LmsController extends Controller
{
    protected $redirectTo = '';
    protected $accessRolesIds = [];
    protected $accessRolesLoginIds = [];


    protected function checkAccessToUser($userId)
    {
        return LmsUserPortal::where('portal_admin', '=', Auth::user()->id)
                ->where('user', '=', $userId)
                ->first();
    }

    protected function checkAccessToGroup($groupId)
    {
        return Groups::where('id_owner', '=', Auth::user()->id)
                ->where('id', '=', $groupId)
                ->first();
    }

    protected function checkAccessToCourse($courseId)
    {
        return Banners::where('user_id', '=', Auth::user()->id)
                ->where('id_banner', '=', $courseId)
                ->first();
    }

    protected function checkAccessToRole($role_id) 
    {
        $rolesIdsArray = Roles::wherein('id', $this->accessRolesIds)->pluck('id')->toArray();

        if(!in_array($role_id, $rolesIdsArray)) {
            return false;
        }

        return true;
    }

    protected function checkAccessToScormData($scormDataId)
    {
       return DB::table('scorm_data')
                        ->select('scorm_data.id')
                        ->leftJoin('banners_projects', 'banners_projects.id_banner', '=', 'scorm_data.course_id')
                        ->where('banners_projects.user_id', '=', Auth::user()->id)
                        ->where('scorm_data.id', '=', $scormDataId)
                        ->first();         

    }

    protected function redirectoToRolesError() 
    {
        return Redirect::back()->withErrors(['Nie masz dostępu do tej roli użytkownika użytkownika!']);
    }
}
