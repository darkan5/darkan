<?php namespace App\Http\Requests\Admin;

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
			'user_id' => 'required|integer|exists:users,id',
			'role_id' => 'required|integer|exists:roles,id',
			'email' => "required|unique:users,email,$this->user_id",
			'name' => 'required|max:255'
		];
	}

}
