<?php namespace App\Http\Requests\Admin\AplicationApis;

use App\Http\Requests\Request;

class EditAplicationApiRequest extends Request {

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
			'api_key' => "required|min:40|max:40|unique:aplication_api,api_key,$this->aplication_api_id",
		];
	}

}
