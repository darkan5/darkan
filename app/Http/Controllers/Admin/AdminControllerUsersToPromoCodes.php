<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\UsersToPromoCodes;
use App\Modules\Models\User;
use App\Modules\Models\PromoCodes;
use App\Http\Requests\Admin\UserToPromocode\AddUserToPromoCodeRequest;
use App\Http\Requests\Admin\UserToPromocode\EditUserToPromoCodeRequest;
use App\Http\Requests\Admin\UserToPromocode\DeleteUserToPromoCodeRequest;


class AdminControllerUsersToPromoCodes extends Controller
{
	protected $redirectTo = 'admin/userstopromocodeslist';
	protected $accessRolesIds = [7];

    public function getUsersToPromoCodesList(){

    	$usersToPromoCodes = $this->getUsersToPromoCodes();

    	$usersArray = $this->getUsersArray();
    	$promoCodesArray = $this->getPromoCodesArray();

        return view('admin.users_to_promo_codes.users_to_promo_codes_list')
		        		->with('usersToPromoCodes', $usersToPromoCodes)
		        		->with('usersArray', $usersArray)
		        		->with('promoCodesArray', $promoCodesArray);
    }

    protected function getUsersToPromoCodes()
	{
		//return UsersToPromoCodes::get();

		$result = DB::table('users_to_promo_codes')
						->select('users_to_promo_codes.id',
									'users.name as user_name', 
									'users.email as user_email', 
									'users_to_promo_codes.user_id as user_id', 
									'promo_codes.code as promo_code_name', 
									'users_to_promo_codes.promo_code_id as promo_code_id'
									)

						->leftJoin('users', 'users.id', '=', 'users_to_promo_codes.user_id')
						->leftJoin('promo_codes', 'promo_codes.id', '=', 'users_to_promo_codes.promo_code_id')
						->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
						->whereIn('role_user.role_id', $this->accessRolesIds)
						->get();

		return $result;
	}

	protected function getUsersArray()
	{

		$users = DB::table('users')
						->select('users.id',
								 'users.name',
								 DB::raw('CONCAT(users.name, " (", users.email, ")") AS full_name')
								 )

						->leftJoin('role_user', 'role_user.user_id', '=', 'users.id')
						->whereIn('role_user.role_id', $this->accessRolesIds)
						->orderBy('name')
						->pluck('full_name', 'id');

		return $users;
	}

	protected function getPromoCodesArray()
	{
		return PromoCodes::where('code', '<>', '*')->orderBy('code')->pluck('code', 'id');
	}

	public function addNewUserToPromocode(AddUserToPromoCodeRequest $request)
	{

		$input = Input::all();
		$usersToPromoCodes = new UsersToPromoCodes($input);
		$usersToPromoCodes->save();

		return redirect($this->redirectTo);
	}

	public function ediUserToPromocode(EditUserToPromoCodeRequest $request)
	{

		$usersToPromoCodes = UsersToPromoCodes::find($request->user_to_promo_code_id);

		if($usersToPromoCodes){

			$input = Input::all();
		    $usersToPromoCodes->fill($input);
		    $usersToPromoCodes->save();
		}

		return redirect($this->redirectTo);
	}

	public function deleteUserToPromocode(DeleteUserToPromoCodeRequest $request)
	{
		$usersToPromoCodes = UsersToPromoCodes::find($request->user_to_promo_code_id);
		$usersToPromoCodes->delete();

		return redirect($this->redirectTo);
	}
}
