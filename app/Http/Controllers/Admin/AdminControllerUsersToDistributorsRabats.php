<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\UsersToDistributorsRabats;
use App\Modules\Models\User;
use App\Modules\Models\Currency;
use App\Http\Requests\Admin\UsersToDistributorRabats\AddUserToDistributorRabatRequest;
use App\Http\Requests\Admin\UsersToDistributorRabats\EditUserToDistributorRabatRequest;
use App\Http\Requests\Admin\UsersToDistributorRabats\DeleteUserToDistributorRabatRequest;


class AdminControllerUsersToDistributorsRabats extends Controller
{
	protected $redirectTo = 'admin/userstodistributorsrabatslist';
	protected $accessRolesIds = [6];

    public function getUsersToDistributorsRabatList(){

    	$usersToDistributorsRabats = $this->getUsersToDistributorsRabats();

    	$usersArray = $this->getUsersArray();

    	$currencyArray = $this->getCurrency();

        return view('admin.users_to_distributor_rabats.users_to_distributor_rabats_list')
		        		->with('usersToDistributorsRabats', $usersToDistributorsRabats)
		        		->with('currencyArray', $currencyArray)
		        		->with('usersArray', $usersArray);
    }

    protected function getUsersToDistributorsRabats()
	{
		//return UsersToDistributorsRabats::get();

		$result = DB::table('users_to_distributors_rabats')
						->select('users_to_distributors_rabats.id',
									'users.name as user_name', 
									'users.email as user_email', 
									'users_to_distributors_rabats.user_id as user_id', 
									'users_to_distributors_rabats.rabat as rabat',
									'users_to_distributors_rabats.start_date as start_date',
									'users_to_distributors_rabats.expiration_date as expiration_date',
									'users_to_distributors_rabats.active as active',
									'on_off_states.name as active_name',
									'users_to_distributors_rabats.amount as amount',
									'users_to_distributors_rabats.currency_id as currency_id'
									)

						->leftJoin('users', 'users.id', '=', 'users_to_distributors_rabats.user_id')
						->leftJoin('on_off_states', 'on_off_states.state', '=', 'users_to_distributors_rabats.active')
						->get();

		return $result;
	}

	protected function getCurrency()
	{
		$currencies = Currency::pluck('name', 'id');
		return $currencies;
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

	public function addNewUserToDistributorRabat(AddUserToDistributorRabatRequest $request)
	{

		$input = Input::all();
		$usersToDistributorsRabats = new UsersToDistributorsRabats($input);
		$usersToDistributorsRabats->save();

		return redirect($this->redirectTo);
	}

	public function ediUserToDistributorRabat(EditUserToDistributorRabatRequest $request)
	{

		$usersToDistributorsRabats = UsersToDistributorsRabats::find($request->user_to_distributor_rabat_id);

		if($usersToDistributorsRabats){

			$input = Input::all();
		    $usersToDistributorsRabats->fill($input);
		    $usersToDistributorsRabats->save();
		}

		return redirect($this->redirectTo);
	}

	public function deleteUserToDistributorRabat(DeleteUserToDistributorRabatRequest $request)
	{
		$usersToDistributorsRabats = UsersToDistributorsRabats::find($request->user_to_distributor_rabat_id);
		$usersToDistributorsRabats->delete();

		return redirect($this->redirectTo);
	}
}
