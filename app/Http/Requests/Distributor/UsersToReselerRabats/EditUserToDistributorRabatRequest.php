<?php namespace App\Http\Requests\Distributor\UsersToReselerRabats;

use App\Http\Requests\Request;

class EditUserToReselerRabatRequest extends Request {

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
			'user_to_reseler_rabat_id' => 'required|integer|exists:users_to_reselers_rabats,id',
			'user_id' => 'required|integer|exists:users,id',
			'rabat' => 'required|integer|min:0|max:100',
			'amount' => 'required|integer|min:0',
			'currency_id' => 'required|integer|exists:currencies,id',
			'start_date' => 'required|date_format:Y-m-d H:i:s',
			'expiration_date' => 'required|date_format:Y-m-d H:i:s|after:start_date',
			'active' => 'required|integer|exists:on_off_states,state'
		];
	}

}
