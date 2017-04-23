<?php

namespace App\Http\Controllers\Lms\Elearning;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\Banners;
use App\Modules\Models\Users;
use App\Modules\Models\ScormData;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\Groups;
use App\Modules\Models\GroupUser;
use App\Http\Requests\Lms\Elearning\ScormData\DeleteScormDataRequest;
use App\Http\Requests\Lms\Elearning\Users\EditUserRequest;
use App\Http\Requests\Lms\Elearning\Users\DeleteUserRequest;
use App\Http\Requests\Lms\Elearning\UsersToGroup\AddUserToGroupRequest;
use App\Http\Requests\Lms\Elearning\UsersToGroup\DeleteUserFromGroupRequest;



class LmsElearningUserByIdController extends LmsElearningController
{

    protected $redirectTo = 'lms/elearning/user/';

    public function elearningUserById($userId){

        $user = $this->checkAccessToUser($userId); 

        if(!$user){
            return view('lms.elearnig.user_no_exist');
        }

        $user = Users::where('id', '=', $userId)->first();
    	$coursesList = $this->getPublications($userId);
        $groupsArray = $this->getGroupsArray();

        return view('lms.elearnig.user')
                        ->with('user', $user)
                        ->with('coursesList', $coursesList)
		        		->with('groupsArray', $groupsArray);
    }

    protected function getPublications($userId)
    {

        return DB::table('scorm_data')
                        ->select('scorm_data.id as scorm_data_id', 'banners_projects.id_banner as banner_project_id', 'banners_projects.name',
                            'scorm_data.course_status', 'scorm_data.user_score', 'scorm_data.score_max', 'scorm_data.modify_date', 'banners_projects.requirements', 'banners_projects.thumb')
                        ->leftJoin('banners_projects', 'banners_projects.id_banner', '=', 'scorm_data.course_id')
                        ->where('scorm_data.user_id', '=', $userId)
                        ->where('banners_projects.user_id', '=', Auth::user()->id)
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

    public function addUserToGroup($userId, AddUserToGroupRequest $request)
    {
        $group = $this->checkAccessToGroup($request->id_group);
        $user = $this->checkAccessToUser($request->id_user);

        if($group && $user){

            $groupUser = GroupUser::where('id_group', '=', $request->id_group)->where('id_user', '=', $request->id_user);

            if(!$groupUser->first()){
                $input = Input::all();
                $groupUser = new GroupUser($input);
                $groupUser->save();
            }

        }

        return redirect($this->redirectTo . $userId);
    }

    public function deleteUserFromGroup($userId, DeleteUserFromGroupRequest $request)
    {
        $group = $this->checkAccessToGroup($request->id_group);
        $user = $this->checkAccessToUser($request->id_user);

        if($group && $user){

            $groupUser = GroupUser::where('id_group', '=', $request->id_group)->where('id_user', '=', $request->id_user);

            if($groupUser->first()){
                $groupUser->delete();
            }

        }

        return redirect($this->redirectTo . $userId);
    }

    public function deleteScormData($userId, DeleteScormDataRequest $request){ 

        $scoremData = $this->checkAccessToScormData($request->scorm_data_id);  

        if($scoremData){         
            ScormData::where('id', '=', $request->scorm_data_id)
                        ->delete();
        }


        return redirect($this->redirectTo . $userId);

    }

    public function editUser($userId, EditUserRequest $request)
    {
        $user = $this->checkAccessToUser($request->user_id); 

        if($user){

            $user = Users::find($request->user_id);

            $input = Input::all();
            $user->fill($input);
            $user->save();
        }

        return redirect($this->redirectTo . $userId);
    }

    public function deleteUser($userId, DeleteUserRequest $request)
    {

        $user = $this->checkAccessToUserForDelete($request->user_id);

        if($user){

            $user = Users::find($request->user_id);
            $user->delete();

            return redirect('lms/elearning/users');
        }

        return redirect($this->redirectTo . $userId);
    }

    protected function checkAccessToUser($userId)
    {
        return (LmsUserPortal::where('portal_admin', '=', Auth::user()->id)
                ->where('user', '=', $userId)
                ->first()) || ($userId == Auth::user()->id);

    }

    protected function checkAccessToUserForDelete($userId)
    {
        return LmsUserPortal::where('portal_admin', '=', Auth::user()->id)
                ->where('user', '=', $userId)
                ->first();

    }


  
}
