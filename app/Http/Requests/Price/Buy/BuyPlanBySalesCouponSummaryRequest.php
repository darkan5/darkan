<?php namespace App\Http\Requests\Price\Buy;

use App\Http\Requests\Request;

class BuyPlanBySalesCouponSummaryRequest extends Request {

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
			'code' => 'required|integer|exists:sales_coupons,id',
			'plan_option_value' => 'required',
		];
	}

}
