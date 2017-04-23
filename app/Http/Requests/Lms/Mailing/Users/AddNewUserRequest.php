<?php namespace App\Http\Requests\Lms\Mailing\Users;

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
			'email' => 'required|email|max:255|unique:mailing_users',
			'name' => 'required|max:255',
			'fb_link' => 'max:255'
		];
	}

	public function attributes()
	{
	    return[
	        'name' => Lang::get('validation.attributes.user_name')
	    ];

	}

}
