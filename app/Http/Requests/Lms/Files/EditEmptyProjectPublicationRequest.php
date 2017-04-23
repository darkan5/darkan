<?php namespace App\Http\Requests\Lms\Files;

use App\Http\Requests\Request;

class EditEmptyProjectPublicationRequest extends Request {

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
			'project_id' => 'required|integer|exists:projects,project_id',
			'id_banner' => 'required|integer|exists:banners_projects,id_banner',
			'name' => 'required|max:255',
			'summary' => 'max:255',
		];
	}

}
