<?php namespace App\Http\Requests\Admin\UserToPromocode;

use Lang;
use App\Http\Requests\Request;

class EditUserToPromoCodeRequest extends Request {

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
			'user_to_promo_code_id' => 'required|integer|exists:users_to_promo_codes,id',
			'user_id' => 'required|integer|exists:users,id',
			'promo_code_id' => 'required|integer|exists:promo_codes,id',
		];
	}
}
