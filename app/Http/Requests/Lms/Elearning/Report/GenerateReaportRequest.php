<?php namespace App\Http\Requests\Lms\Elearning\Report;

use App\Http\Requests\Request;

class GenerateReaportRequest extends Request {

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
			'use_dates'  => 'required|in:yes,no',
			'start_date' => 'required_if:use_dates,yes|date_format:Y-m-d H:i:s',
			'end_date' => 'required_if:use_dates,yes|date_format:Y-m-d H:i:s|after:start_date',
			// 'start_date' => 'required|date_format:Y-m-d H:i:s',
			// 'end_date' => 'required|date_format:Y-m-d H:i:s|after:start_date',
			'groups_ids' => 'required|array|exists:groups,id',
			'courses_ids' => 'required|array|exists:banners_projects,id_banner',
		];
	}

}
