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
        $questiondata = $this->getCourseQuestionsData($userId, $bannerId);
        $scormdata = $this->getCourseScormData($bannerId);
        $userTimes = $this->getPublicationUsersPageTimes($bannerId, $userId);
        $vars = $this->showVariables($scoremData);

        return view('lms.publications.userscore')
            ->with('course', $course)
            ->with('user', $user)
            ->with('scoremData', $scoremData)
            ->with('questiondata', $questiondata)
            ->with('scormdata', $scormdata)
            ->with('userTimes', $userTimes)
            ->with('vars', $vars)
            ->with('courseId', $bannerId);

    }
    public function showVariables($scoremData)
    {
        $variablearray = [];
        $variables = json_decode($scoremData->data,true);

        foreach ($variables as $k => $v)
        {
            if (is_array($v))
            {
                if (isset($v['p']))
                {
                    foreach (($v['p']) as $var)
                    {
                        $variablearray[] = $var;
                    }
                }


            }


            // print_r($k);



        }

        return $variablearray;

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

        return ScormData::where('user_id', '=', $userId)
            ->where('course_id', '=', $bannerId)
            ->first();

    }

    protected function getUser($userId, $bannerId)
    {

        return Users::where('id', '=', $userId)
            ->first();

    }
    public function getCourseQuestionsData($userId, $courseId) {


        $coursesQuery = Banners::where('user_id', '=', Auth::user()->id)
            ->where('id_banner', '=', $courseId)
            ->first();

        $questiondata = '';
        if ($coursesQuery) {
            $questiondata = $this->isJson($coursesQuery['questiondata']) ? json_decode($coursesQuery['questiondata']) : '';
        }


        return $questiondata;
    }

    public function getCourseScormData($courseId) {

        $scormData = [];

        $coursesQuery = ScormData::where('course_id', '=', $courseId)->get();

        foreach ($coursesQuery as $coursesRet) {
            if ($this->isJson($coursesRet['data'])) {
                array_push( $scormData, json_decode($coursesRet['data']) );
            }
        }

        return $scormData;
    }

    protected function getPublicationUsersPageTimes($bannerId)
    {
        $userTimes = ScormData::select(['page_time'])->where('course_id', '=', $bannerId)
            ->get();

        $ut = [];

        foreach ($userTimes as $userTime) {
            array_push($ut, json_decode(json_decode($userTime)->page_time));

        }

        return $ut;

    }

    private function isJson($string) {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }


}
