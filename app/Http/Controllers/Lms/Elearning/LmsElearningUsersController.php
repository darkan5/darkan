<?php

namespace App\Http\Controllers\Lms\Elearning;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Lms\Elearning\Users\AddNewUserRequest;
use App\Http\Requests\Lms\Elearning\Users\EditUserRequest;
use App\Http\Requests\Lms\Elearning\Users\DeleteUserRequest;
use App\Http\Requests\Lms\Elearning\UsersToGroup\AddUserToGroupRequest;
use App\Http\Requests\Lms\Elearning\UsersToGroup\DeleteUserFromGroupRequest;
use App\Http\Requests\Lms\Elearning\AddNewUsers\AddNewUsersFromJsonRequest;
use App\Modules\Models\Roles;
use App\Modules\Models\Users;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\Groups;
use App\Modules\Models\GroupUser;
use App\Modules\Models\LmsGroupContent;
use App\Modules\Models\RoleUser;
use App\Modules\Utils\Utils;

use App\Modules\User\UserRepository;

use App\Http\Requests\Lms\Download\DownloadFileRequest;

use App\Http\Foundation\Files\FilesCreator;


class LmsElearningUsersController extends LmsElearningController
{
    use FilesCreator; 

    protected $redirectTo = 'lms/elearning/users';
    protected $accessRolesIds = [11];
    protected $role_id = 11;

    public function getUsersList(){


        $usersList = $this->getUsers();
        //$usersList = [];
        $lmsInfo = $this->getLmsInfo();
        $groupsArray = $this->getGroupsArray();
       

        return view('lms.elearnig.users')
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
        $groupsArray = Groups::select('groups.id', 'groups.name')
                    ->leftJoin('group_user', 'group_user.id_group', '=', 'groups.id')
                    ->where('groups.id_owner', '=', Auth::user()->id)
                    ->pluck('name', 'id');

        return $groupsArray;
    }


    protected function getUsers()
    {

        $users = Users::select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.updated_at', 'users.photo')
                    ->leftJoin('lms_user_portal', 'lms_user_portal.user', '=', 'users.id')
                    ->where('lms_user_portal.portal_admin', '=', Auth::user()->id)
                    ->get();

        // print_r(json_encode($users));
        // die();

        return $users;

        // return DB::table('users')
        //                 ->select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.updated_at', 'users.photo', 'role_user.role_id', 'roles.name as role_name')
        //                 ->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
        //                 ->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
        //                 ->whereIn('role_user.role_id', $this->accessRolesIds)
        //                 ->get();
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


    public function addNewUser(AddNewUserRequest $request)
    {

        $input = Input::all();
        // $user = new Users($input);

        // $password = $request->password or $this->generatePassword();
        // $user->password = bcrypt($password);
        // $user->save();

        // $roleUser = RoleUser::firstOrNew(['user_id' => $user->id, 'role_id' => $this->role_id]);
        // $roleUser->user_id = $user->id;
        // $roleUser->role_id = $this->role_id;
        // $roleUser->save();

        // $lmsUserPortal = LmsUserPortal::firstOrNew(['user' => $user->id, 'portal_admin' => Auth::user()->id]);
        // $lmsUserPortal->user = $user->id;
        // $lmsUserPortal->portal_admin = Auth::user()->id;
        // $lmsUserPortal->save();

        $user = UserRepository::getInstance()->createLmsElearningUser($input);

        $this->registerUserToPortal($user);

        return redirect($this->redirectTo);
    }

     public function registerUserToPortal($user)
    {
        $lmsUserPortal = LmsUserPortal::firstOrNew(['user' => $user->id, 'portal_admin' => Auth::user()->id]);
        $lmsUserPortal->user = $user->id;
        $lmsUserPortal->portal_admin = Auth::user()->id;
        $lmsUserPortal->save();
    }

    public function editUser(EditUserRequest $request)
    {
        if(!$this->checkAccessToRole($request->role_id)){
            return $this->redirectoToRolesError();
        }

        $user = $this->checkAccessToUser($request->user_id); 

        if($user){

            $user = Users::find($request->user_id);

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
            $user = Users::find($request->user_id);
            $user->delete();
        }

        return redirect($this->redirectTo);
    }

    public function addNewUserFromJson(AddNewUsersFromJsonRequest $request)
    {

        $group = $this->checkAccessToGroup($request->group_id);

        if(!$group){
            return Redirect::back()->withErrors(['Nie masz dostępu do tej grupy!']);
        }

        $usersJson = json_decode($request->users_json);
        $usersEmails = [];

        foreach ($usersJson as $key => $userJson) {

            array_push($usersEmails, $userJson->email); 
        }

        $usersExistModel = Users::whereIn('email', $usersEmails);
        $usersExist = $usersExistModel->get();
        $usersEmailsExist = $usersExistModel->pluck('email')->toArray();

        $addedUsersToGroup = [];
        $createdUsers = [];

        foreach ($usersJson as $key => $userJson) {

            if(in_array($userJson->email, $usersEmailsExist)) {

                $user = Users::where('email', '=', $userJson->email)->first();

                if($user){
                    $this->registerUserToPortal($user);
                    $this->addUserToGroupFunction($request->group_id, $user->id);
 
                    array_push($addedUsersToGroup, $user);
                }

            }else{

                $input = ['email' => $userJson->email, 'name' => $userJson->name];

                $user = UserRepository::getInstance()->createLmsElearningUser($input);
                $this->registerUserToPortal($user);

                if($user){
                    $this->addUserToGroupFunction($request->group_id, $user->id);
                }

                array_push($createdUsers, $user);
            }

            
        }

        return view('lms.elearnig.add_new_users_from_file_summary')
                        ->with('addedUsersToGroup', $addedUsersToGroup)
                        ->with('createdUsers', $createdUsers)
                        ->with('group', $group);
    }

    public function addUserToGroupFunction($id_group, $id_user)
    {

        $user = $this->checkAccessToUser($id_user);

        if($user){

            $groupUser = GroupUser::where('id_group', '=', $id_group)->where('id_user', '=', $id_user);

            if(!$groupUser->first()){
                $input = Input::all();
                $groupUser = new GroupUser(['id_group' => $id_group, 'id_user' => $id_user]);
                $groupUser->save();
            }
        }
    }
  

    protected function generatePassword() 
    {
        return Utils::generatePassword();
    }

    protected function redirectoToRolesError() 
    {
        return Redirect::back()->withErrors(['Nie masz dostępu do tej roli użytkownika użytkownika!']);
    }

    public function downloadFile(DownloadFileRequest $request){

        $collection = $this->getUsers();

        $headItems = [ 'Id', 'Imię i Nazwisko', 'Email', 'Utworzony', 'Grupy'];

        $collectionArray = collect($collection)->map(function($x, $id){ 

            $rowArray = [ $id+1, $x->name, $x->email, $x->created_at];

            $groups = [];

            if($x->groupUser){
                foreach($x->groupUser  as $groupUser){

                    $lmsGroup = $groupUser->group;
                    array_push($groups, $lmsGroup->name);
                }   
            }

            array_push($rowArray, implode(", ", $groups) );
   

            return $rowArray;

        })->toArray();


        return $this->createFile($request->file_type, Auth::user()->id, $headItems, $collection, $collectionArray);
    }
}
