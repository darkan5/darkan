<?php namespace App\Http\Requests\Admin\Project;

use App\Http\Requests\Request;

class AddProjectsToUserRequest extends Request {

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
			'user_id' => 'required|integer|exists:users,id',
			'demos_projects_ids' => 'array|exists:projects,project_id',
			'user_projects_ids' => 'array|exists:projects,project_id',
			'title' => 'required|max:255',
			'message' => 'required|max:50000',
		];
	}

}
