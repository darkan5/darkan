<?php namespace App\Http\Requests\Lms\Elearning\AddNewUsers;

use Lang;
use App\Http\Requests\Request;

class AddNewUsersFromJsonRequest extends Request {

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
			'users_json' => 'required|json',
			'group_id' => 'required|integer|exists:groups,id',
		];
	}

	public function attributes()
	{
	    return[
	        'name' => Lang::get('validation.attributes.user_name')
	    ];

	}

}
