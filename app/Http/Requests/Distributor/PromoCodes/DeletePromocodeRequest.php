<?php namespace App\Http\Requests\Distributor\PromoCodes;

use App\Http\Requests\Request;

class DeletePromocodeRequest extends Request {

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
			'promo_code_id' => 'required|integer|exists:promo_codes,id'
		];
	}

}
