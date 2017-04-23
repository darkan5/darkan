<?php namespace App\Http\Requests\Lms\Download;

use App\Http\Requests\Request;

class DownloadFileRequest extends Request {

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
			'file_type'  => 'required|in:csv,xls,json',
		];
	}

}
