<?php namespace App\Http\Requests\Admin\UsersToDistributorRabats;

use App\Http\Requests\Request;

class DeleteUserToDistributorRabatRequest extends Request {

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
			'user_to_distributor_rabat_id' => 'required|integer|exists:users_to_distributors_rabats,id'
		];
	}

}
