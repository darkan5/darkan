<?php

namespace App\Http\Controllers\Lms\Elearning;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Lms\Elearning\Groups\AddNewGroupRequest;
use App\Http\Requests\Lms\Elearning\Groups\EditGroupRequest;
use App\Http\Requests\Lms\Elearning\Groups\DeleteGroupRequest;
use App\Http\Requests\Lms\Elearning\CoursesToGroup\AddCourseToGroupRequest;
use App\Http\Requests\Lms\Elearning\CoursesToGroup\DeleteCourseFromGroupRequest;
use App\Http\Requests\Lms\Elearning\UsersToGroup\AddUserToGroupRequest;
use App\Http\Requests\Lms\Elearning\UsersToGroup\DeleteUserFromGroupRequest;
use App\Modules\Models\GroupUser;
use App\Modules\Models\Roles;
use App\Modules\Models\Users;
use App\Modules\Models\Groups;
use App\Modules\Models\LmsGroupPortal;
use App\Modules\Models\Banners;
use App\Modules\Models\LmsGroupContent;
use App\Modules\Utils\Utils;


class LmsElearningGroupsController extends LmsElearningController
{
    protected $redirectTo = 'lms/elearning/groups';
    protected $accessRolesIds = [3];
    protected $accessRolesLoginIds = [];


    public function elearningGroups(){


        $groupsList = $this->getGroups();

        $bannersArray = $this->getBannersArray();

        $usersArray = $this->getUsersArray();


        return view('lms.elearnig.groups')
                        ->with('groupsList', $groupsList)
                        ->with('bannersArray', $bannersArray)
                        ->with('usersArray', $usersArray);
    }

    public function elearningGroup($groupId){


        $group = $this->getGroup($groupId);

        $bannersArray = $this->getBannersArray();

        $usersArray = $this->getUsersArray();


        return view('lms.elearnig.group')
                        ->with('group', $group)
                        ->with('bannersArray', $bannersArray)
                        ->with('usersArray', $usersArray);
    }


    protected function getGroups()
    {
        $groups = Groups::where('id_owner', '=', Auth::user()->id)
                    ->get();

        return $groups;
    }

    protected function getGroup($groupId)
    {
        $groups = Groups::where('id_owner', '=', Auth::user()->id)
                    ->where('id', '=', $groupId)
                    ->first();

        return $groups;
    }

    protected function getBannersArray()
    {
        $bannersArray = Banners::select('banners_projects.id_banner as id', 'banners_projects.name')
                    ->leftJoin('lms_group_content', 'lms_group_content.content_id', '=', 'banners_projects.id_banner')
                    ->where('banners_projects.user_id', '=', Auth::user()->id)
                    ->pluck('name', 'id');

        return $bannersArray;
    }

    protected function getUsersArray()
    {
        $usersArray = Users::select('users.id', 'users.name')
                    ->leftJoin('lms_user_portal', 'lms_user_portal.user', '=', 'users.id')
                    ->where('lms_user_portal.portal_admin', '=', Auth::user()->id)
                    ->pluck('name', 'id');

        return $usersArray;
    }

    public function addUserToGroup(AddUserToGroupRequest $request)
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

        return redirect($this->redirectTo);
    }

    public function deleteUserFromGroup(DeleteUserFromGroupRequest $request)
    {

        $group = $this->checkAccessToGroup($request->id_group);
        $user = $this->checkAccessToUser($request->id_user);

        if($group && $user){

            $groupUser = GroupUser::where('id_group', '=', $request->id_group)->where('id_user', '=', $request->id_user);

            if($groupUser->first()){
                $groupUser->delete();
            }

        }

        return redirect($this->redirectTo);
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

        return redirect($this->redirectTo);
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

        return redirect($this->redirectTo);
    }


    public function addNewGroup(AddNewGroupRequest $request)
    {

        $input = Input::all();
        $group = new Groups($input);
        $group->id_owner = Auth::user()->id;
        $group->status = 0;
        $group->save();


        return redirect($this->redirectTo);
    }

    public function editGroup(EditGroupRequest $request)
    {
        $group = $this->checkAccessToGroup($request->group_id);

        if($group){

            $group = Groups::find($request->group_id); 

            if($group){
                $input = Input::all();
                $group->fill($input);
                $group->save();
            }
        }

        return redirect($this->redirectTo);
    }

    public function deleteGroup(DeleteGroupRequest $request)
    {
        $group = $this->checkAccessToGroup($request->group_id);

        if($group){

            $group = Groups::find($request->group_id);
            $group->delete();
        }

        return redirect($this->redirectTo);
    }


}
