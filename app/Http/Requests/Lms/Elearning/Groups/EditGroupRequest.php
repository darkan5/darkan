<?php namespace App\Http\Requests\Lms\Elearning\Groups;

use App\Http\Requests\Request;

class EditGroupRequest extends Request {

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
			'group_id' => 'required|integer|exists:groups,id',
			'name' => 'required|max:255'
		];
	}

}
