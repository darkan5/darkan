<?php namespace App\Http\Requests\Admin\Plans;

use App\Http\Requests\Request;

class AddNewPlanRequest extends Request {

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
			'name' => 'required|max:255',
			'description' => 'required|max:255',
			'version_id' => 'required|integer|exists:plans_versions,id',
			'form_of_payment_id' => 'required|integer|exists:forms_of_payment,id',
			'limit' => 'required|integer|min:0',
			'start_date' => 'required|date_format:Y-m-d H:i:s',
			'expiration_date' => 'required|date_format:Y-m-d H:i:s|after:start_date',
			'limit_enabled' => 'required|integer|exists:on_off_states,state',
			'date_enabled' => 'required|integer|exists:on_off_states,state',
			'for_admin_only' => 'required|integer|exists:on_off_states,state',
			'active' => 'required|integer|exists:on_off_states,state',
			'period' => 'required|integer|min:1|max:10000',
			'plans_period_type_id' => 'required|integer|exists:plans_period_types,id'
		];
	}

}
