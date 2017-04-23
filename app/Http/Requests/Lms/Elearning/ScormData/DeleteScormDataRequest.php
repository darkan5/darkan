<?php namespace App\Http\Requests\Lms\Elearning\ScormData;

use App\Http\Requests\Request;

class DeleteScormDataRequest extends Request {

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
			'scorm_data_id' => 'required|integer|exists:scorm_data,id',
		];
	}

}
