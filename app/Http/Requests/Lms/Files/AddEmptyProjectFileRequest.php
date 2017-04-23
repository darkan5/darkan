<?php namespace App\Http\Requests\Lms\Files;

use App\Http\Requests\Request;

class AddEmptyProjectFileRequest extends Request {

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
			//'project_file' => 'required|max:10000|mimes:zip'
			'project_file' => 'required|max:100000'
		];
	}

}
