<?php namespace App\Http\Requests\Lms\Mailing\CoursesToGroup;

use App\Http\Requests\Request;

class AddCourseToGroupRequest extends Request {

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
			'content_id' => 'required|integer|exists:banners_projects,id_banner',
			'group_id' => 'required|integer|exists:groups,id',
		];
	}

}
