<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PromoCodes\EditPromocodeRequest;
use App\Http\Requests\Admin\PromoCodes\AddNewPromocodeRequest;
use App\Http\Requests\Admin\PromoCodes\DeletePromocodeRequest;
use App\Modules\Models\Roles;
use App\Modules\Models\Users;
use App\Modules\Models\RoleUser;
use App\Modules\Models\Plans;
use App\Modules\Models\PromoCodes;
use App\Modules\Utils\Utils;


class AdminControllerPromoCodes extends Controller
{
	protected $redirectTo = 'admin/promocodeslist';

	public function getPromoCodesList(){

		$promoCodes = $this->getPromoCodes();

		return view('admin.promo_codes.promo_codes_list')
						->with('promoCodes', $promoCodes);
	}

    protected function getPromoCodes()
	{
		$promoCodes = PromoCodes::where('code', '<>', '*')
									->get();

		return $promoCodes;
	}

	public function addNewPromoCode(AddNewPromocodeRequest $request){

		$input = Input::all();
		$input['created_by_user_id'] = Auth::user()->id;

		$promoCodes = new PromoCodes($input);
		$promoCodes->save();

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
