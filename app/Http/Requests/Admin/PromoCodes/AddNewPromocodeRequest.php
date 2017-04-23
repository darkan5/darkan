<?php namespace App\Http\Requests\Admin\PromoCodes;

use App\Http\Requests\Request;

class AddNewPromocodeRequest extends Request {

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
			'code' => 'required|max:255|unique:promo_codes',
			'limit' => 'required|integer|min:0|max:10000',
			'rabat' => 'required|integer|min:0|max:100',
			'start_date' => 'required|date_format:Y-m-d H:i:s',
			'expiration_date' => 'required|date_format:Y-m-d H:i:s|after:start_date',
			'limit_enabled' => 'required|integer|exists:on_off_states,state',
			'date_enabled' => 'required|integer|exists:on_off_states,state',
			'active' => 'required|integer|exists:on_off_states,state'
		];
	}

}
