<?php namespace App\Http\Requests\Admin\Currencies;

use App\Http\Requests\Request;

class EditCurrencyRequest extends Request {

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
			'currency_id' => 'required|integer|exists:currencies,id',
			'name' => 'required|max:255',
		];
	}

}
