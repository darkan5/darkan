<?php namespace App\Http\Requests\Admin\PlanToPlanOptions;

use App\Http\Requests\Request;

class EditPlanToPlanOptionsRequest extends Request {

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
			'plan_to_plan_option_id' => 'required|integer|exists:plans_to_plans_options,id',
			'plan_id' => 'required|integer|exists:plans,id',
			'plan_id' => 'required|integer|exists:plans,id',
		];
	}
}
