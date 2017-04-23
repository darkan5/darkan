<?php

namespace App\Http\Controllers\Lms\Mailing;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Lms\Mailing\Groups\AddNewGroupRequest;
use App\Http\Requests\Lms\Mailing\Groups\EditGroupRequest;
use App\Http\Requests\Lms\Mailing\Groups\DeleteGroupRequest;
use App\Http\Requests\Lms\Mailing\CoursesToGroup\AddCourseToGroupRequest;
use App\Http\Requests\Lms\Mailing\CoursesToGroup\DeleteCourseFromGroupRequest;
use App\Http\Requests\Lms\Mailing\UsersToGroup\AddUserToGroupRequest;
use App\Http\Requests\Lms\Mailing\UsersToGroup\DeleteUserFromGroupRequest;
use App\Modules\Models\MailingGroupUser;
use App\Modules\Models\Roles;
use App\Modules\Models\MailingUsers;
use App\Modules\Models\MailingGroups;
use App\Modules\Models\LmsGroupPortal;
use App\Modules\Models\Banners;
use App\Modules\Models\LmsGroupContent;
use App\Modules\Utils\Utils;


class LmsMailingGroupsController extends LmsMailingController
{
    protected $redirectTo = 'lms/mailing/groups';
    protected $accessRolesIds = [3];
    protected $accessRolesLoginIds = [];


    public function mailingGroups(){

        $groupsList = $this->getGroups();

        $bannersArray = $this->getBannersArray();

        $usersArray = $this->getUsersArray();

        return view('lms.mailing.groups')
                        ->with('groupsList', $groupsList)
                        ->with('bannersArray', $bannersArray)
                        ->with('usersArray', $usersArray);
    }

    public function mailingGroup($groupId){


        $group = $this->getGroup($groupId);

        $bannersArray = $this->getBannersArray();

        $usersArray = $this->getUsersArray();


        return view('lms.mailing.group')
                        ->with('group', $group)
                        ->with('bannersArray', $bannersArray)
                        ->with('usersArray', $usersArray);
    }


    protected function getGroups()
    {
        $groups = MailingGroups::where('id_owner', '=', Auth::user()->id)->get();

        return $groups;
    }

    protected function getGroup($groupId)
    {
        $groups = MailingGroups::where('id_owner', '=', Auth::user()->id)
                    ->where('id', '=', $groupId)
                    ->first();

        return $groups;
    }

    protected function getBannersArray()
    {
        return [];
    }

    protected function getUsersArray()
    {
        $usersArray = MailingUsers::where('owner_id', '=', Auth::user()->id)
                    ->pluck('name', 'id');

        return $usersArray;
    }

    public function addUserToGroup(AddUserToGroupRequest $request)
    {

        $group = $this->checkAccessToGroup($request->id_group);
        $user = $this->checkAccessToUser($request->id_user);

        if($group && $user){

            $groupUser = MailingGroupUser::where('id_group', '=', $request->id_group)->where('id_user', '=', $request->id_user);

            if(!$groupUser->first()){
                $input = Input::all();
                $groupUser = new MailingGroupUser($input);
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

            $groupUser = MailingGroupUser::where('id_group', '=', $request->id_group)->where('id_user', '=', $request->id_user);

            if($groupUser->first()){
                $groupUser->delete();
            }

        }

        return redirect($this->redirectTo);
    }

    // public function addCourseToGroup(AddCourseToGroupRequest $request)
    // {

    //     $group = $this->checkAccessToGroup($request->group_id);
    //     $course = $this->checkAccessToCourse($request->content_id);

    //     if($group && $course){

    //         $lmsGroupContent = LmsGroupContent::where('content_id', '=', $request->content_id)->where('group_id', '=', $request->group_id);

    //         if(!$lmsGroupContent->first()){
    //             $input = Input::all();
    //             $groupUser = new LmsGroupContent($input);
    //             $groupUser->save();
    //         }
    //     }

    //     return redirect($this->redirectTo);
    // }

    // public function deleteCourseFromGroup(DeleteCourseFromGroupRequest $request)
    // {

    //     $group = $this->checkAccessToGroup($request->group_id);
    //     $course = $this->checkAccessToCourse($request->content_id);

    //     if($group && $course){

    //         $lmsGroupContent = LmsGroupContent::where('content_id', '=', $request->content_id)->where('group_id', '=', $request->group_id);

    //         if($lmsGroupContent->first()){
    //             $lmsGroupContent->delete();
    //         }
    //     }

    //     return redirect($this->redirectTo);
    // }


    public function addNewGroup(AddNewGroupRequest $request)
    {

        $input = Input::all();
        $group = new MailingGroups($input);
        $group->id_owner = Auth::user()->id;
        $group->save();


        return redirect($this->redirectTo);
    }

    public function editGroup(EditGroupRequest $request)
    {
        $group = $this->checkAccessToGroup($request->group_id);

        if($group){

            $group = MailingGroups::find($request->group_id); 

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

            $group = MailingGroups::find($request->group_id);
            $group->delete();
        }

        return redirect($this->redirectTo);
    }


}
