<?php namespace App\Http\Requests\Admin\SalesCouponsFiles;

use App\Http\Requests\Request;

class DownloadSalesCouponsFileRequest extends Request {

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
			'sales_coupon_ids' => 'required|array|exists:sales_coupons,id',
		];
	}

}
