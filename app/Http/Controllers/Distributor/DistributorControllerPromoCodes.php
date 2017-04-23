<?php

namespace App\Http\Controllers\Distributor;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Distributor\PromoCodes\EditPromocodeRequest;
use App\Http\Requests\Distributor\PromoCodes\AddNewPromocodeRequest;
use App\Http\Requests\Distributor\PromoCodes\DeletePromocodeRequest;
use App\Modules\Models\Roles;
use App\Modules\Models\Users;
use App\Modules\Models\RoleUser;
use App\Modules\Models\Plans;
use App\Modules\Models\PromoCodes;
use App\Modules\Models\PromoCodesToUsers;
use App\Modules\Utils\Utils;


class DistributorControllerPromoCodes extends Controller
{
	protected $redirectTo = 'distributor/promocodeslist';

	public function getPromoCodesList(){

		$promoCodes = $this->getPromoCodes();

		return view('distributor.promo_codes.promo_codes_list')
						->with('promoCodes', $promoCodes);
	}

    protected function getPromoCodes()
	{

		$accesssPromoCodesIds = [];

		$promoCodesToUsers = PromoCodesToUsers::where('user_id', '=', Auth::user()->id)->get();

		foreach ($promoCodesToUsers as $promoCodeToUser) {
			array_push($accesssPromoCodesIds, $promoCodeToUser->promo_code_id);
		}

		$promoCodes = PromoCodes::where('code', '<>', '*')
									->whereIn('id', $accesssPromoCodesIds)
									->get();

		return $promoCodes;
	}

	public function addNewPromoCode(AddNewPromocodeRequest $request){

		$input = Input::all();
		$input['created_by_user_id'] = Auth::user()->id;

		$promoCodes = new PromoCodes($input);
		$promoCodes->save();

		$promoCodesToUsers = PromoCodesToUsers::firstOrNew(['user_id' => Auth::user()->id, 'promo_code_id' => $promoCodes->id]);
		$promoCodesToUsers->user_id =  Auth::user()->id;
		$promoCodesToUsers->promo_code_id = $promoCodes->id;
		$promoCodesToUsers->save();

		return redirect($this->redirectTo);
	}

	public function editPromoCode(EditPromocodeRequest $request){

		$onePromoCode = PromoCodes::find($request->promo_code_id); 

		if($onePromoCode){

			$input = Input::all();

		    $onePromoCode->fill($input);
		    $onePromoCode->save();
		}

		return redirect($this->redirectTo);
	}

	public function deletePromoCode(DeletePromocodeRequest $request){

		PromoCodes::find($request->promo_code_id)->delete(); ; 

		return redirect($this->redirectTo);
	}


}
