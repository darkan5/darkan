<?php

namespace App\Http\Controllers\Distributor;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\UsersToReselersRabats;
use App\Modules\Models\User;
use App\Modules\Models\Currency;
use App\Http\Requests\Distributor\UsersToReselerRabats\AddUserToReselerRabatRequest;
use App\Http\Requests\Distributor\UsersToReselerRabats\EditUserToReselerRabatRequest;
use App\Http\Requests\Distributor\UsersToReselerRabats\DeleteUserToReselerRabatRequest;


class DistributorControllerUsersToDistributorsRabats extends Controller
{
	protected $redirectTo = 'distributor/userstoreselersrabatslist';
	protected $accessRolesIds = [9];

    public function getUsersToReselersRabatList(){

    	$usersToReselersRabats = $this->getUsersToReselersRabats();

    	$usersArray = $this->getUsersArray();

    	$currencyArray = $this->getCurrency();

        return view('distributor.users_to_reseler_rabats.users_to_reseler_rabats_list')
		        		->with('usersToReselersRabats', $usersToReselersRabats)
		        		->with('currencyArray', $currencyArray)
		        		->with('usersArray', $usersArray);
    }

    protected function getUsersToReselersRabats()
	{
		//return UsersToReselersRabats::get();

		$result = DB::table('users_to_reselers_rabats')
						->select('users_to_reselers_rabats.id',
									'users.name as user_name', 
									'users.email as user_email', 
									'users_to_reselers_rabats.user_id as user_id', 
									'users_to_reselers_rabats.rabat as rabat',
									'users_to_reselers_rabats.start_date as start_date',
									'users_to_reselers_rabats.expiration_date as expiration_date',
									'users_to_reselers_rabats.active as active',
									'on_off_states.name as active_name',
									'users_to_reselers_rabats.amount as amount',
									'users_to_reselers_rabats.currency_id as currency_id'
									)

						->leftJoin('users', 'users.id', '=', 'users_to_reselers_rabats.user_id')
						->leftJoin('on_off_states', 'on_off_states.state', '=', 'users_to_reselers_rabats.active')
						->leftJoin('reselers_to_distributors', 'reselers_to_distributors.reseler_id', '=', 'users.id')
						->where('reselers_to_distributors.distributor_id', '=', Auth::user()->id)
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

	public function addNewUserToReselerRabat(AddUserToReselerRabatRequest $request)
	{

		$input = Input::all();
		$usersToReselersRabats = new UsersToReselersRabats($input);
		$usersToReselersRabats->save();

		return redirect($this->redirectTo);
	}

	public function ediUserToReselerRabat(EditUserToReselerRabatRequest $request)
	{

		$usersToReselersRabats = UsersToReselersRabats::find($request->user_to_reseler_rabat_id);

		if($usersToReselersRabats){

			$input = Input::all();
		    $usersToReselersRabats->fill($input);
		    $usersToReselersRabats->save();
		}

		return redirect($this->redirectTo);
	}

	public function deleteUserToReselerRabat(DeleteUserToReselerRabatRequest $request)
	{
		$usersToReselersRabats = UsersToReselersRabats::find($request->user_to_reseler_rabat_id);
		$usersToReselersRabats->delete();

		return redirect($this->redirectTo);
	}
}
