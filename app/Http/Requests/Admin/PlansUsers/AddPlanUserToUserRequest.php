<?php namespace App\Http\Requests\Admin\PlansUsers;

use App\Http\Requests\Request;

class AddPlanUserToUserRequest extends Request {

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
			'user_id' => 'required|integer|min:1|exists:users,id',
			'plan_id' => 'required|integer|exists:plans,id',
			'currency_id' => 'required|integer|exists:currencies,id',
			'start_date' => 'required|date_format:Y-m-d H:i:s',
			'plan_cost_to_pay' => 'required|numeric|between:0,1000000.00',
		];
	}

}
