<?php namespace App\Http\Requests\Lms\Publication;

use App\Http\Requests\Request;

class DeletePublicationRequest extends Request {

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
			'id_banner' => 'required|integer|exists:banners_projects,id_banner',
		];
	}

}
