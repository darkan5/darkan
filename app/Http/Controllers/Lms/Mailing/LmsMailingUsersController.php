<?php

namespace App\Http\Controllers\Lms\Mailing;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Lms\Mailing\Users\AddNewUserRequest;
use App\Http\Requests\Lms\Mailing\Users\EditUserRequest;
use App\Http\Requests\Lms\Mailing\Users\DeleteUserRequest;
use App\Http\Requests\Lms\Mailing\UsersToGroup\AddUserToGroupRequest;
use App\Http\Requests\Lms\Mailing\UsersToGroup\DeleteUserFromGroupRequest;
use App\Modules\Models\Roles;
use App\Modules\Models\Users;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\MailingGroups;
use App\Modules\Models\MailingUsers;
use App\Modules\Models\MailingGroupUser;
use App\Modules\Utils\Utils;


class LmsMailingUsersController extends LmsMailingController
{
    protected $redirectTo = 'lms/mailing/users';
    protected $accessRolesIds = [3];
    protected $accessRolesLoginIds = [];

    public function getUsersList(){


        $usersList = $this->getUsers();

        //$usersList = [];
        $lmsInfo = $this->getLmsInfo();
        $groupsArray = $this->getGroupsArray();
       

        return view('lms.mailing.users')
                        ->with('usersList', $usersList)
                        ->with('lmsInfo', $lmsInfo)
                        ->with('groupsArray', $groupsArray);
    }

    protected function getLmsInfo()
    {
        return false;
    }

    protected function getGroupsArray()
    {
        $groupsArray = MailingGroups::select('mailing_groups.id', 'mailing_groups.name')
                    ->leftJoin('mailing_group_user', 'mailing_group_user.id_group', '=', 'mailing_groups.id')
                    ->where('mailing_groups.id_owner', '=', Auth::user()->id)
                    ->pluck('name', 'id');

        return $groupsArray;
    }


    protected function getUsers()
    {
         $mailingUsers = MailingUsers::where('owner_id', '=', Auth::user()->id)
                    ->get();

        return $mailingUsers;
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


    public function addNewUser(AddNewUsersFromJsonRequest $request)
    {
        // if(!$this->checkAccessToRole($request->role_id)){
        //     return $this->redirectoToRolesError();
        // }

        $input = Input::all();
        $user = new MailingUsers($input);

        $user->create_date = date('Y-m-d H:i:s');
        $user->data = '';
        $user->owner_id = Auth::user()->id;
        $user->save();


        return redirect($this->redirectTo);
    }

    public function editUser(EditUserRequest $request)
    {
        $user = $this->checkAccessToUser($request->user_id); 

        if($user){

            $user = MailingUsers::find($request->user_id);

            $input = Input::all();
            $user->fill($input);
            $user->save();
        }

        return redirect($this->redirectTo);
    }

    public function deleteUser(DeleteUserRequest $request)
    {

        $user = $this->checkAccessToUser($request->user_id);

        if($user){
            $user = MailingUsers::find($request->user_id);
            $user->delete();
        }

        return redirect($this->redirectTo);
    }
}
