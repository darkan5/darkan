<?php namespace App\Http\Requests\Price\Buy;

use App\Http\Requests\Request;

class BuyNowPlanSummaryRequest extends Request {

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
		];
	}

}
