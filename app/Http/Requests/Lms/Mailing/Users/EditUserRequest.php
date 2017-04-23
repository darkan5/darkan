<?php namespace App\Http\Requests\Lms\Mailing\Users;

use App\Http\Requests\Request;

class EditUserRequest extends Request {

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
			'user_id' => 'required|integer|exists:mailing_users,id',
			'email' => "required|unique:mailing_users,email,$this->user_id",
			'name' => 'required|max:255'
		];
	}

}
