<?php namespace App\Http\Requests\Admin\PlansCosts;

use App\Http\Requests\Request;

class AddNewPlanCostRequest extends Request {

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
			'version_id' => 'required|integer|exists:plans_versions,id',
			'plan_id' => 'required|integer|exists:plans,id',
			'currency_id' => 'required|integer|exists:currencies,id',
			'cost' => 'required|numeric|between:0,1000000.00',
		];
	}

}
