<?php namespace App\Http\Requests\Admin\AplicationApis;

use Lang;
use App\Http\Requests\Request;

class AddUserToAplicationApiRequest extends Request {

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
			'user_id' => 'required|integer|exists:users,id',
			'aplication_api_id' => 'required|integer|exists:aplication_api,id',
		];
	}

}
