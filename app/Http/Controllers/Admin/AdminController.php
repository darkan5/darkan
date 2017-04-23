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
use App\Role;
use App\Modules\Models\Users;
use App\Modules\Models\RoleUser;
use App\Modules\Utils\Utils;
use App\Modules\User\UserRepository;

use App\Http\Foundation\Projects\ProjectCreator;
use App\Http\Foundation\Publications\PublicationCreator;


class AdminController extends Controller
{

	use ProjectCreator;
    use PublicationCreator;

	protected $redirectTo = 'admin/userslist';
	protected $accessRolesIds = [3, 4, 5, 6, 7, 9, 10, 11, 12, 13];
	protected $accessCreateRolesIds = [3, 6, 7, 10, 12];
	protected $accessRolesLoginIds = [2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13];

	public function getPanel(){

		$this->loginAsAdmin();

        return view('admin.panel.admin_panel');
    }

    public function getUsersList(){

    	$rolesList = Roles::wherein('id', $this->accessRolesIds)
    					->where('active', '=', true)
						->pluck('name', 'id');

    	$createRolesList = Roles::wherein('id', $this->accessCreateRolesIds)
    					->where('active', '=', true)
						->pluck('name', 'id');

    	$users = $this->getUsers();

        return view('admin.users.users_list')
		        		->with('users', $users)
		        		->with('rolesList', $rolesList)
		        		->with('createRolesList', $createRolesList);
    }

    protected function getUsers()
	{
		return DB::table('users')
    					->select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.updated_at', 'role_user.role_id', 'roles.name as role_name')
						->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
						->leftJoin('roles', 'roles.id', '=', 'role_user.role_id')
						->whereIn('role_user.role_id', $this->accessRolesIds)
						->get();
	}

    public function loginAsOtherUser($userId, $redirect = true)
	{
		$roleId = Users::find($userId)->roleUser->role_id;
		if(!$this->checkAccessToLoginAsOtherUser( $roleId )){
        	return $this->redirectoToRolesError();
        }

        if(!Session::get('loginasid')){
        	Session::set('loginasid', Auth::user()->id);
        }
		
		Auth::loginUsingId($userId);
		Session::set('isAdmin', true);

		if($redirect){
			return redirect('home');
		}
	}

	public function loginAsAdmin()
	{
		$userId = Session::get('loginasid');
		$user = Users::find($userId);

		if($user){
			//Session::set('loginasid', $userId );
			//Session::set('loginasdistributorid', $userId );
			//Session::set('loginasreselerid', $userId );
			
			Session::set('isAdmin', false);
			Session::set('isDistributor', false);
			Session::set('isReseler', false);

			Auth::loginUsingId($userId);

			return redirect('home');
		}
	}

	public function addNewUser(AddNewUserRequest $request)
	{
        if(!$this->checkAccessToRole($request->role_id)){
        	return $this->redirectoToRolesError();
        }

		$input = Input::all();

		switch ($request->role_id) {
			case 3:

				$user = UserRepository::getInstance()->createNormalUser($input);
				
				break;

			case 6:

				$user = UserRepository::getInstance()->createDistributorUser($input);
				
				break;

			case 7:

				$user = UserRepository::getInstance()->createPartnerUser($input);
				
				break;

			case 9:

				$user = UserRepository::getInstance()->createReselerUser($input);
				
				break;

			case 10:

				$user = UserRepository::getInstance()->createRegistredUser($input);
				
				break;

			case 12:

				$user = UserRepository::getInstance()->createApiUser($input);
				
				break;
			
			default:
				# code...
				break;
		}

		
		// $user = new Users($input);

		// $password = $request->password or $this->generatePassword();
		// $user->password = bcrypt($password);
		// $user->save();

		// $roleUser = RoleUser::firstOrNew(['user_id' => $user->id, 'role_id' => $request->role_id]);
		// $roleUser->user_id = $user->id;
		// $roleUser->role_id = $request->role_id;
		// $roleUser->save();

		if($user){
			return redirect('admin/user/' . $user->id );
		}

		return redirect($this->redirectTo);		
	}

	public function editUser(EditUserRequest $request)
	{
		if(!$this->checkAccessToRole($request->role_id)){
        	return $this->redirectoToRolesError();
        }

		$user = Users::find($request->user_id); 

		if($user){
			$input = Input::all();
		    $user->fill($input);
		    $user->save();
		}

		return redirect($this->redirectTo);
	}

	public function deleteUser(DeleteUserRequest $request)
	{
		$user = Users::find($request->user_id);

		if(!$this->checkAccessToRole($user->roleUser->role_id)){
        	return $this->redirectoToRolesError();
        }

        $this->deleteUserFolders($request->user_id);

		$user->delete();

		return redirect($this->redirectTo);
	}

	protected function generatePassword() 
	{
		return Utils::generatePassword();
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

}
