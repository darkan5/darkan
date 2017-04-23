<?php

namespace App\Http\Controllers\Lms\Mailing;

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
use App\Modules\Models\MailingGroups;
use App\Modules\Models\MailingGroupUser;
use App\Modules\Models\MailingUsers;
use App\Http\Requests\Lms\Mailing\ScormData\DeleteScormDataRequest;
use App\Http\Requests\Lms\Mailing\Users\EditUserRequest;
use App\Http\Requests\Lms\Mailing\Users\DeleteUserRequest;
use App\Http\Requests\Lms\Mailing\UsersToGroup\AddUserToGroupRequest;
use App\Http\Requests\Lms\Mailing\UsersToGroup\DeleteUserFromGroupRequest;



class LmsMailingUserByIdController extends LmsMailingController
{

    protected $redirectTo = 'lms/mailing/user/';

    public function mailingUserById($userId){

        $user = $this->checkAccessToUser($userId); 

        if(!$user){
            return view('lms.mailing.user_no_exist');
        }

        $user = MailingUsers::where('id', '=', $userId)->first();
    	$coursesList = $this->getPublications($userId);
        $groupsArray = $this->getGroupsArray();

        return view('lms.mailing.user')
                        ->with('user', $user)
                        ->with('coursesList', $coursesList)
		        		->with('groupsArray', $groupsArray);
    }

    protected function getPublications($userId)
    {
        return [];
    }

    protected function getGroupsArray()
    {
        $groupsArray = MailingGroups::select('mailing_groups.id', 'mailing_groups.name')
                    ->leftJoin('mailing_group_user', 'mailing_group_user.id_group', '=', 'mailing_groups.id')
                    ->where('mailing_groups.id_owner', '=', Auth::user()->id)
                    ->pluck('name', 'id');

        return $groupsArray;
    }

    public function addUserToGroup($userId, AddUserToGroupRequest $request)
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

        return redirect($this->redirectTo . $userId);
    }

    public function deleteUserFromGroup($userId, DeleteUserFromGroupRequest $request)
    {
        $group = $this->checkAccessToGroup($request->id_group);
        $user = $this->checkAccessToUser($request->id_user);

        if($group && $user){

            $groupUser = MailingGroupUser::where('id_group', '=', $request->id_group)->where('id_user', '=', $request->id_user);

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

            $user = MailingUsers::find($request->user_id);

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

            $user = MailingUsers::find($request->user_id);
            $user->delete();

            return redirect('lms/mailing/users');
        }

        return redirect($this->redirectTo . $userId);
    }

    protected function checkAccessToUser($userId)
    {
        return (MailingUsers::where('owner_id', '=', Auth::user()->id)
                ->where('id', '=', $userId)
                ->first()) || ($userId == Auth::user()->id);
    }

    protected function checkAccessToUserForDelete($userId)
    {
        return MailingUsers::where('owner_id', '=', Auth::user()->id)
                ->where('id', '=', $userId)
                ->first();

    }


  
}
