<?php namespace App\Http\Requests\Lms\Settings;

use App\Http\Requests\Request;

class EditSettingsRequest extends Request {

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
			'topmenuon' => 'in:0,1',
			'footeron' => 'in:0,1',
			'login' => 'in:0,1',
			'state' => 'in:0,1',
			'paid' => 'in:0,1',
			'currency' => 'in:EUR,PLN',
			'price' => 'numeric|between:0,1000000.00',
		];
	}

}
