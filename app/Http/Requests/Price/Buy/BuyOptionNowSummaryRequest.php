<?php namespace App\Http\Requests\Price\Buy;

use App\Http\Requests\Request;

class BuyOptionNowSummaryRequest extends Request {

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
			'plan_option_id' => 'required|integer|exists:price_plan_options,id',
			'plan_option_value' => 'required',
		];
	}

}
