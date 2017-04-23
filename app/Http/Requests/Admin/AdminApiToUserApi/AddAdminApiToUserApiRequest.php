<?php namespace App\Http\Requests\Admin\AdminApiToUserApi;

use Lang;
use App\Http\Requests\Request;

class AddAdminApiToUserApiRequest extends Request {

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
			'admin_api_key_id' => 'required|integer|exists:aplication_api,id',
			'api_key_id' => 'required|integer|exists:aplication_api,id',
		];
	}

}
