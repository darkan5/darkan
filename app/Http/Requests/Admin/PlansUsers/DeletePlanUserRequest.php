<?php namespace App\Http\Requests\Admin\PlansUsers;

use App\Http\Requests\Request;

class DeletePlanUserRequest extends Request {

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
			'user_plan_id' => 'required|integer|exists:plans_users,id'
		];
	}

}
