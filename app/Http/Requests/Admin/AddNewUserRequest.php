<?php namespace App\Http\Requests\Admin;

use Lang;
use App\Http\Requests\Request;

class AddNewUserRequest extends Request {

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
			'role_id' => 'required|integer|exists:roles,id',
			'email' => 'required|email|max:255|unique:users',
			'name' => 'required|max:255',
			'password' => 'confirmed|min:8',
		];
	}

	public function attributes()
	{
	    return[
	        'name' => Lang::get('validation.attributes.user_name')
	    ];

	}

}
