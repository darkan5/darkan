<?php

namespace App\Http\Controllers\Distributor;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Admin\AdminControllerUsersToPromoCodes;
use App\Modules\Models\UsersToPromoCodes;
use App\Modules\Models\User;
use App\Modules\Models\PromoCodes;
use App\Http\Requests\Admin\UserToPromocode\AddUserToPromoCodeRequest;
use App\Http\Requests\Admin\UserToPromocode\EditUserToPromoCodeRequest;
use App\Http\Requests\Admin\UserToPromocode\DeleteUserToPromoCodeRequest;


class DistributorControllerUsersReselersToPromoCodes extends AdminControllerUsersToPromoCodes
{
	protected $redirectTo = 'distributor/usersreselerstopromocodeslist';
	protected $accessRolesIds = [9];

	public function getUsersToPromoCodesList(){

    	$usersToPromoCodes = $this->getUsersToPromoCodes();

    	$usersArray = $this->getUsersArray();
    	$promoCodesArray = $this->getPromoCodesArray();

        return view('distributor.users_reselers_to_promo_codes.users_reselers_to_promo_codes_list')
		        		->with('usersToPromoCodes', $usersToPromoCodes)
		        		->with('usersArray', $usersArray)
		        		->with('promoCodesArray', $promoCodesArray);
    }

    protected function getPromoCodesArray()
	{

		return DB::table('promo_codes')
    					->select('promo_codes.id', 'promo_codes.code')
						->leftJoin('promo_codes_to_users', 'promo_codes_to_users.promo_code_id', '=', 'promo_codes.id')
						->where('promo_codes_to_users.user_id', '=', Auth::user()->id)
						->where('promo_codes.code', '<>', '*')
						->pluck('code', 'id');
	}

}
