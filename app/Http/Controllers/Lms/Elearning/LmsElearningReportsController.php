<?php

namespace App\Http\Controllers\Lms\Elearning;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use Response;
use Lang;
use stdClass;
use App\Http\Controllers\Controller;
use App\Modules\Models\Groups;
use App\Modules\Models\Banners;
use App\Modules\Models\ScormData;
use App\Modules\Models\Users;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use App\Modules\Utils\Utils;

use App\Http\Requests\Lms\Elearning\Report\GenerateReaportRequest;

//http://stackoverflow.com/questions/3874840/csv-to-excel-conversion
//PHPExcel
// use PHPExcel; 
// use PHPExcel_IOFactory;
// use PHPExcel_Shared_Font;


use App\Http\Foundation\Files\FilesCreator;


class LmsElearningReportsController extends LmsElearningController
{
   use FilesCreator; 

    protected $redirectTo = 'lms/elearning/user/';

    public function getReportPanel(){

        $courses = $this->getPublications();
        $groups = $this->getGroups();

        return view('lms.elearnig.report')
                        ->with('courses', $courses)
                        ->with('groups', $groups);
    }

    public function genetateReport(GenerateReaportRequest $request){

        //return $request->all();

        $courses_ids = $this->stringArrayToIntArray($request->courses_ids);
        $groups_ids = $this->stringArrayToIntArray($request->groups_ids);

        $selectedCourses = $this->getPublicationsByIds($courses_ids);
        $selectedGroups = $this->getGroupsByGroupsIds($groups_ids);

        $start_date = $request->start_date or '';
        $end_date = $request->end_date or '';
        $use_dates = $request->use_dates;

        if($use_dates == 'yes'){
            
            Carbon::setLocale('pl');
            CarbonInterval::setLocale('pl');

            $timeAmount = Carbon::createFromFormat('Y-m-d H:i:s', $start_date)->diff(Carbon::createFromFormat('Y-m-d H:i:s', $end_date));
            $timeAmountForHumans = CarbonInterval::create($timeAmount->y, $timeAmount->m, 0,  $timeAmount->d, $timeAmount->h, $timeAmount->i, $timeAmount->s);  //2 years 5 weeks 1 day 1 hour 2 minutes 7 seconds
             
        }else{
            
            $timeAmountForHumans = '';
        }

        $users = $this->getUsers($selectedGroups, $selectedCourses, $request);

        return view('lms.elearnig.generated_report')
                        ->with('selectedCourses', $selectedCourses)
                        ->with('selectedGroups', $selectedGroups)
                        ->with('users', $users)
                        ->with('start_date', $start_date)
                        ->with('end_date', $end_date)
                        ->with('use_dates', $use_dates)
                        ->with('courses_ids', $courses_ids)
                        ->with('groups_ids', $groups_ids)
                        ->with('timeAmountForHumans', $timeAmountForHumans);
    }

    protected function getUsers($selectedGroups, $selectedCourses, $request)
    {
        $users = [];

        foreach ($selectedGroups as $group) {

            $groupUsers = $group->groupUsers;

            if($groupUsers){

                foreach($groupUsers as $groupUser){

                    $exist = false;


                    foreach ($users as $key => $u) {
                        if($u->id == $groupUser->id_user){

                            $exist = true;
                        }
                    }

                    if(!$exist){

                        $user = Users::select('id', 'name', 'email', 'created_at')
                                    ->where('id', $groupUser->id_user)->first();

                        //$groupUser->user;

                        $scormDatas = [];

                        foreach ($selectedCourses as  $course) {
                            
                            $scormData = $this->getUserCourseScoremData($user, $request);

                            $scormData->course_name = $course->name;

                            array_push($scormDatas, $scormData);
                        }

                        $user->scorm_datas = $scormDatas;

                        array_push($users, $user);
                    }
                }
            }
        }

        return $users;
    }

    protected function getUserCourseScoremData($user, $request)
    {
         $select = ['course_status', 'modify_date', 'page_time', 'lesson_location'];

        if(!$request->use_dates){

            $scormData = ScormData::select($select)
                                ->where('user_id', '=', $user->id)
                                ->first();
        }else{
             $scormData = ScormData::select($select)
                                ->where('user_id', '=', $user->id)
                                ->whereBetween('modify_date', [$request->start_date, $request->end_date])
                                ->first();
        }

        if(!$scormData){
            $scormData = new stdClass();
            $scormData->course_status = 'notstarted';
            $scormData->modify_date = '-';
            $scormData->page_time = '-';
            $scormData->lesson_location = '-';
        }

        return $scormData;
    }

    protected function getPublicationsByIds($courseIds = [])
    {

        return Banners::where('user_id', '=', Auth::user()->id)
                ->whereIn('id_banner', $courseIds)
                ->get();

    }

    protected function getPublications()
    {

        return Banners::where('user_id', '=', Auth::user()->id)
                ->get();

    }

    protected function getGroupsByGroupsIds($groupsIds = [])
    {
        $groups = Groups::where('id_owner', '=', Auth::user()->id)
                    ->whereIn('id', $groupsIds)
                    ->get();

        return $groups;
    }

    protected function getGroups()
    {
        $groups = Groups::where('id_owner', '=', Auth::user()->id)
                    ->get();

        return $groups;
    }

    protected function stringArrayToIntArray($stringArray) 
    {
        return Utils::stringArrayToIntArray($stringArray);
    }


    public function downloadFile(GenerateReaportRequest $request){

        
        $courses_ids = $this->stringArrayToIntArray($request->courses_ids);
        $groups_ids = $this->stringArrayToIntArray($request->groups_ids);

        $selectedCourses = $this->getPublicationsByIds($courses_ids);
        $selectedGroups = $this->getGroupsByGroupsIds($groups_ids);

        $collection = $this->getUsers($selectedGroups, $selectedCourses, $request);

        $headItems = [ 'Id', 'Imię i Nazwisko', 'Email', 'Utworzony'];

        $collectionArray = collect($collection)->map(function($x, $id){ 

            $rowArray = [ $id+1, $x->name, $x->email, $x->created_at];

            $userScormDatasStatuses = [];

            foreach($x->scorm_datas as $scormData){

                array_push($rowArray, Lang::get('darkanpanel.course_status_' . $scormData->course_status ));
                array_push($userScormDatasStatuses, $scormData->course_status);
            }

            if(in_array('passed', $userScormDatasStatuses, true)){
                $summary = Lang::get('darkanpanel.course_status_passed');
            }else{
                $summary = Lang::get('darkanpanel.course_status_failed');
            }

            array_push($rowArray, $summary);

            return $rowArray;

        })->toArray();


        foreach ($selectedCourses as $key => $course) {
            array_push($headItems, $course->name);
        }
        array_push($headItems, 'Wynik');

        return $this->createFile($request->file_type, Auth::user()->id, $headItems, $collection, $collectionArray);
    }

}
