<?php namespace App\Http\Requests\Admin\PlansOptions;

use App\Http\Requests\Request;

class AddNewPlanOptionRequest extends Request {

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
			'options' => 'required|json',
		];
	}

}
