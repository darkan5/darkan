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
use App\Modules\Models\Groups;
use App\Modules\Models\LmsGroupContent;

use App\Http\Requests\Lms\Elearning\ScormData\DeleteScormDataRequest;
use App\Http\Requests\Lms\Elearning\CoursesToGroup\AddCourseToGroupRequest;
use App\Http\Requests\Lms\Elearning\CoursesToGroup\DeleteCourseFromGroupRequest;

use App\Http\Requests\Lms\Publication\EditPublicationRequest;
use App\Http\Requests\Lms\Publication\DeletePublicationRequest;

use App\Http\Foundation\Publications\PublicationCreator;

class LmsPublicationByIdController extends LmsController
{

    use PublicationCreator;

    protected $redirectTo = 'lms/publication/';

    public function getPublicationById($bannerId, $userId = null){

        if($userId){
            if(Auth::user()->hasRole('admin') || Session::has('isAdmin')){
                $this->loginAsOtherUser($userId);
                return redirect($this->redirectTo . $bannerId);
            }
        }

        $course = $this->getPublication($bannerId);

        if(!$course){
           return view('lms.publications.publication_not_exist');
        }

    	$users = $this->getUsers($bannerId);

        $groupsArray = $this->getGroupsArray();

        $userTimes = $this->getPublicationUsersPageTimes($bannerId, $userId); 

        return view('lms.publications.publication')
                        ->with('course', $course)
		        		->with('users', $users)
                        ->with('groupsArray', $groupsArray)
                        ->with('userTimes', $userTimes);
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

    protected function getPublicationUserPageTimes($bannerId, $userId)
    {
        $userTimes = ScormData::select(['page_time'])->where('course_id', '=', $bannerId)->where('user_id', '=', $userId)
                    ->first(); 


        return json_decode($userTimes);

    }

    protected function getPublication($bannerId)
    {

        return Banners::where('user_id', '=', Auth::user()->id)
                ->where('id_banner', '=', $bannerId)
                ->first();

    }

    protected function getUsers($bannerId)
    {

        return DB::table('scorm_data')
                        ->select('scorm_data.id as scorm_data_id', 'users.id', 'users.name', 'users.email', 'users.photo', 'users.created_at', 'users.updated_at', 'scorm_data.course_status', 'scorm_data.user_score', 'scorm_data.score_max', 'scorm_data.modify_date', 'banners_projects.user_id as owner_id')
                        ->leftJoin('users', 'users.id', '=', 'scorm_data.user_id')
                        ->leftJoin('banners_projects', 'banners_projects.id_banner', '=', 'scorm_data.course_id')
                        ->where('banners_projects.user_id', '=', Auth::user()->id)
                        ->where('banners_projects.id_banner', '=', $bannerId)
                        ->get();

    }

    protected function getGroupsArray()
    {
        $groupsArray = Groups::select('groups.id', 'groups.name')
                    ->leftJoin('group_user', 'group_user.id_group', '=', 'groups.id')
                    ->where('groups.id_owner', '=', Auth::user()->id)
                    ->pluck('name', 'id');

        return $groupsArray;
    }

    public function deleteScormData($bannerId, DeleteScormDataRequest $request){ 

        $scoremData = $this->checkAccessToScormData($request->scorm_data_id);  

        if($scoremData){
           ScormData::where('id', '=', $request->scorm_data_id)
                    ->delete(); 
        }       

        return redirect($this->redirectTo . $bannerId);

    }

    public function addCourseToGroup(AddCourseToGroupRequest $request)
    {

        $group = $this->checkAccessToGroup($request->group_id);
        $course = $this->checkAccessToCourse($request->content_id);

        if($group && $course){

            $lmsGroupContent = LmsGroupContent::where('content_id', '=', $request->content_id)->where('group_id', '=', $request->group_id);

            if(!$lmsGroupContent->first()){
                $input = Input::all();
                $groupUser = new LmsGroupContent($input);
                $groupUser->save();
            }
        }

        return redirect($this->redirectTo . $request->content_id);
    }

    public function deleteCourseFromGroup(DeleteCourseFromGroupRequest $request)
    { 

        $group = $this->checkAccessToGroup($request->group_id);
        $course = $this->checkAccessToCourse($request->content_id);

        if($group && $course){

            $lmsGroupContent = LmsGroupContent::where('content_id', '=', $request->content_id)->where('group_id', '=', $request->group_id);

            if($lmsGroupContent->first()){
                $lmsGroupContent->delete();
            }
        }

        return redirect($this->redirectTo . $request->content_id);
    }

    public function editPublication(EditPublicationRequest $request)
    {
        $course = $this->checkAccessToCourse($request->id_banner); 

        if($course){

            $banner = Banners::find($request->id_banner);

            $input = Input::all();
            $banner->fill($input);
            $banner->save();
        }

        return redirect($this->redirectTo . $request->content_id);
    }

    public function deletePublication(DeletePublicationRequest $request)
    {
        $course = $this->checkAccessToCourse($request->id_banner);

        if($course){
            $banner = Banners::find($request->id_banner);

            $this->deletePublicationFiles($banner);

            $banner->delete();

        }

        return redirect('lms/publications');
    }

    private function loginAsOtherUser($userId)
    {
        $user =  Users::find($userId);
        Session::set('loginasid', Auth::user()->id);
        Auth::loginUsingId($userId);
        Session::set('isAdmin', !Session::get('isAdmin'));
    }

}
