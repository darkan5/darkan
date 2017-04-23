<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddNewUserRequest;
use App\Http\Requests\Admin\EditUserRequest;
use App\Http\Requests\Admin\DeleteUserRequest;
use App\Modules\Models\Roles;
use App\Modules\Models\Users;
use App\Modules\Models\RoleUser;
use App\Modules\Utils\Utils;
use App\Modules\User\NormalUserRepository;

use App\Http\Foundation\Projects\ProjectCreator;
use App\Http\Foundation\Publications\PublicationCreator;


class AdminUserByIdController extends Controller
{

	use ProjectCreator;
    use PublicationCreator;

	protected $redirectTo = 'admin/users/';
	protected $accessRolesIds = [3, 4, 5, 6, 7, 9, 10, 11, 12, 13];
	protected $accessRolesLoginIds = [2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13];

    public function getUsersById($userId){

    	$accessToUser = $this->checkAccessToUser($userId); 

        if(!$accessToUser){
            return view('admin.users.user_no_exist');
        }

    	$user =  Users::find($userId);

    	if(!$user){
            return view('admin.users.user_no_exist');
        }

    	$roleId = $user->roleUser->role_id;

		if(!$this->checkAccessToLoginAsOtherUser( $roleId )){
        	return $this->redirectoToRolesError();
        }

    	$rolesList = Roles::wherein('id', $this->accessRolesIds)
						->pluck('name', 'id');

        return view('admin.users.user')
		        		->with('user', $user)
		        		->with('roleId', $roleId)
		        		->with('rolesList', $rolesList)
		        		->with('addProjectsUrl', $this->getAddProjectsUrl($user) )
		        		->with('backToUserListUrl', $this->getBackToUserListUrl());
    }

    public function loginAsOtherUser($userId)
	{

		$user =  Users::find($userId);

		if(!$user){
            return view('admin.user.user_no_exist');
        }

		$roleId = $user->roleUser->role_id;

		if(!$this->checkAccessToLoginAsOtherUser( $roleId )){
        	return $this->redirectoToRolesError();
        }
    
		Session::set('loginasid', Auth::user()->id);

		Auth::loginUsingId($userId);
		Session::set('isAdmin', !Session::get('isAdmin'));
		return redirect('home');
	}

	public function editUser($userId, EditUserRequest $request)
	{
		if(!$this->checkAccessToRole($request->role_id)){
        	return $this->redirectoToRolesError();
        }

		$user = Users::find($request->user_id); 

		if(!$user){
            return $this->redirectoToNoUser();
        }

		if($user){
			$input = Input::all();
		    $user->fill($input);
		    $user->save();
		}

		return redirect($this->redirectTo . $userId);
	}

	public function deleteUser($userId, DeleteUserRequest $request)
	{
		$user = Users::find($request->user_id);

		if(!$user){
            return $this->redirectoToNoUser();
        }

		if(!$this->checkAccessToRole($user->roleUser->role_id)){
        	return $this->redirectoToRolesError();
        }


        $this->deleteUserFolders($request->user_id);

		$user->delete();

		return $this->getBackToUserListRedirect();
	}

    protected function checkAccessToRole($role_id) 
	{
		$rolesIdsArray = Roles::wherein('id', $this->accessRolesIds)->pluck('id')->toArray();

		if(!in_array($role_id, $rolesIdsArray)) {
            return false;
        }

        return true;
    }

    protected function checkAccessToLoginAsOtherUser($role_id) 
	{
		$rolesIdsArray = Roles::wherein('id', $this->accessRolesLoginIds)->pluck('id')->toArray();

		if(!in_array($role_id, $rolesIdsArray)) {
            return false;
        }

        return true;
    }

    protected function redirectoToRolesError() 
	{
		return Redirect::back()->withErrors(['Nie masz dostępu do tej roli użytkownika użytkownika!']);
    }

    protected function redirectoToNoUser() 
	{
		return Redirect::back()->withErrors(['Podany użytkownik nie istnieje!']);
    }

    protected function deleteUserFolders($userId) 
	{
		$banners = $this->getProjectsByUser($userId);

		foreach ($banners as $banner) {
			$this->deletePublicationFiles($banner);
		}

		$projects = $this->getPublicationsByUser($userId);

		foreach ($projects as $project) {
			$this->deleteProjectFiles($project);
		}
    }

    protected function checkAccessToUser($userId){

        return true;
    }

    public function getAddProjectsUrl($user){

    	return url('admin/addprojectstouser', $user->id);
	}

	public function getBackToUserListUrl(){

    	return url('admin/userslist');
	}

	public function getBackToUserListRedirect(){

    	return redirect('admin/userslist');
	}

}
