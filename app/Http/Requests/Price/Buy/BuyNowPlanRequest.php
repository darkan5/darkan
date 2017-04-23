<?php namespace App\Http\Requests\Price\Buy;

use App\Http\Requests\Request;

class BuyNowPlanRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{

		return [
			'plan_id' => 'required|integer|exists:plans,id',
			'promo_code' => 'required|string|min:1|max:255|exists:promo_codes,code',

			'client' => 'required|string|max:50',
			'email' => 'required|email|max:50',
			'address' => 'required|string|max:80',
			'zip' => 'required|string|max:10|regex:/^[0-9]{2}(?:-[0-9]{3})?$/',
			'city' => 'required|string|max:50',
			'rules' => 'required'
		];
	}

}
