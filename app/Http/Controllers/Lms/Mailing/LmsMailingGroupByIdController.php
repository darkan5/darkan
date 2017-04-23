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


class LmsMailingGroupByIdController extends LmsMailingController
{
    protected $redirectTo = 'lms/mailing/group/';
    protected $accessRolesIds = [3];
    protected $accessRolesLoginIds = [];


    public function mailingGroup($groupId){


        $group = $this->getGroup($groupId);

        $bannersArray = $this->getBannersArray();

        $usersArray = $this->getUsersArray();


        return view('lms.mailing.group')
                        ->with('group', $group)
                        ->with('bannersArray', $bannersArray)
                        ->with('usersArray', $usersArray);
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

    public function addUserToGroup($groupId, AddUserToGroupRequest $request)
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

        return redirect($this->redirectTo . $groupId);
    }

    public function deleteUserFromGroup($groupId, DeleteUserFromGroupRequest $request)
    {
        $group = $this->checkAccessToGroup($request->id_group);
        $user = $this->checkAccessToUser($request->id_user);

        if($group && $user){

            $groupUser = MailingGroupUser::where('id_group', '=', $request->id_group)->where('id_user', '=', $request->id_user);

            if($groupUser->first()){
                $groupUser->delete();
            }

        }

        return redirect($this->redirectTo . $groupId);
    }

    // public function addCourseToGroup($groupId, AddCourseToGroupRequest $request)
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

    //     return redirect($this->redirectTo . $groupId);
    // }

    // public function deleteCourseFromGroup($groupId, DeleteCourseFromGroupRequest $request)
    // {

    //     $group = $this->checkAccessToGroup($request->group_id);
    //     $course = $this->checkAccessToCourse($request->content_id);

    //     if($group && $course){

    //         $lmsGroupContent = LmsGroupContent::where('content_id', '=', $request->content_id)->where('group_id', '=', $request->group_id);

    //         if($lmsGroupContent->first()){
    //             $lmsGroupContent->delete();
    //         }
    //     }

    //     return redirect($this->redirectTo . $groupId);
    // }


    public function addNewGroup($groupId, AddNewGroupRequest $request)
    {
        // if(!$this->checkAccessToRole($request->role_id)){
        //     return $this->redirectoToRolesError();
        // }

        $input = Input::all();
        $group = new MailingGroups($input);
        $group->id_owner = Auth::user()->id;
        $group->status = 0;
        $group->save();


        return redirect($this->redirectTo . $groupId);
    }

    public function editGroup($groupId, EditGroupRequest $request)
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

        return redirect($this->redirectTo . $groupId);
    }

    public function deleteGroup($groupId, DeleteGroupRequest $request)
    {
        $group = $this->checkAccessToGroup($request->group_id);

        if($group){

            $group = MailingGroups::find($request->group_id);
            $group->delete();
        }

        return redirect('lms/mailing/groups');
    }

}
