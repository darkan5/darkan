<?php namespace App\Http\Requests\Lms\Elearning\Message;

use Lang;
use App\Http\Requests\Request;

class SendMessageToGroupsRequest extends Request {

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
			'title' => 'required|max:255',
			'message' => 'required|max:50000',
		];
	}

	public function attributes()
	{
	    return[
	        'name' => Lang::get('validation.attributes.user_name')
	    ];

	}

}
