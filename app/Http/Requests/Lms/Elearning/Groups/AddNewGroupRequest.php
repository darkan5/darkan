<?php namespace App\Http\Requests\Lms\Elearning\Groups;

use Lang;
use App\Http\Requests\Request;

class AddNewGroupRequest extends Request {

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
			'name' => 'required|max:255',
		];
	}

	public function attributes()
	{
	    return[
	        'name' => Lang::get('validation.attributes.group_name')
	    ];

	}

}
