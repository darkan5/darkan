<?php

namespace App\Http\Controllers\Lms;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\Banners;
use App\Modules\Models\ScormData;
use App\Modules\Models\Users;
use App\Modules\Models\LmsUserPortal;



class LmsPublicationUserScoreController extends Controller
{


    public function getUserScore($userId, $bannerId){

        if(!$this->checkAccessToUser($userId)){
            return view('lms.publications.user_score_not_exist');
        }

        if(!$this->checkAccessToCourse($bannerId)){
            return view('lms.publications.user_score_not_exist');
        }

        $course = $this->getPublication($userId, $bannerId);

        if(!$course){
           return view('lms.publications.user_score_not_exist');
        }

        $scoremData = $this->getScoremData($userId, $bannerId);

        if(!$scoremData){
           return view('lms.publications.user_score_not_exist');
        }

        $user = $this->getUser($userId, $bannerId);

        if(!$user){
           return view('lms.publications.user_score_not_exist');
        }

        return view('lms.publications.userscore')
                        ->with('course', $course)
                        ->with('user', $user)
                        ->with('scoremData', $scoremData);
    }

    protected function getPublication($userId, $bannerId)
    {

        return Banners::where('user_id', '=', Auth::user()->id)
                ->where('id_banner', '=', $bannerId)
                ->first();

    }

    protected function checkAccessToUser($userId)
    {
        return (LmsUserPortal::where('portal_admin', '=', Auth::user()->id)
                ->where('user', '=', $userId)
                ->first()) || ($userId == Auth::user()->id);

    }

    protected function checkAccessToCourse($courseId)
    {
        return Banners::where('user_id', '=', Auth::user()->id)
                ->where('id_banner', '=', $courseId)
                ->first();
    }

    protected function getScoremData($userId, $bannerId)
    {

        return ScormData::where('user_id', '=', Auth::user()->id)
                ->where('course_id', '=', $bannerId)
                ->first();

    }

    protected function getUser($userId, $bannerId)
    {

        return Users::where('id', '=', $userId)
                ->first();

    }
  
}
