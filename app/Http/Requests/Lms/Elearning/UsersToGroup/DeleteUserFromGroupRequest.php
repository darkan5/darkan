<?php namespace App\Http\Requests\Lms\Elearning\UsersToGroup;

use App\Http\Requests\Request;

class DeleteUserFromGroupRequest extends Request {

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
			'id_user' => 'required|integer|exists:users,id',
			'id_group' => 'required|integer|exists:groups,id',
		];
	}

}
