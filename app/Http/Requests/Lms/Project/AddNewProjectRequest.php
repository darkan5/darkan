<?php namespace App\Http\Requests\Lms\Project;

use Lang;
use App\Http\Requests\Request;

class AddNewProjectRequest extends Request {

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
			'editor_id' => 'required|integer|exists:editors,id',
		];
	}

	public function attributes()
	{
	    return[
	        'name' => Lang::get('validation.attributes.user_name')
	    ];

	}

}
