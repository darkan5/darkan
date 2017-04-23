<?php namespace App\Http\Requests\Admin\AplicationApis;

use App\Http\Requests\Request;

class DeleteAplicationApiRequest extends Request {

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
			'aplication_api_id' => 'required|integer|exists:aplication_api,id',
		];
	}

}
