<?php namespace App\Http\Requests\Admin\UserToPromocode;

use App\Http\Requests\Request;

class DeleteUserToPromoCodeRequest extends Request {

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
		];
	}

}
