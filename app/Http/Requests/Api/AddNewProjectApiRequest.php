<?php namespace App\Http\Requests\Api;

use App\Http\Requests\Request;

class AddNewProjectApiRequest extends Request {

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
			// 'dimentions' => 'required|max:255',
			// 'name' => 'required|max:255',
			// 'skin' => 'required|max:255',
			// 'autoScale' => 'required|max:255'
		];
	}

}
