<?php namespace App\Http\Requests\Admin\AdminApiToUserApi;

use Lang;
use App\Http\Requests\Request;

class EditAdminApiToUserApiRequest extends Request {

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
			'aplication_admin_api_to_aplication_api_id' => 'required|integer|exists:aplication_admin_api_to_aplication_api,id',
			'admin_api_key_id' => 'required|integer|exists:aplication_api,id',
			'api_key_id' => 'required|integer|exists:aplication_api,id',
		];
	}
}
