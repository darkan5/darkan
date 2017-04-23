<?php namespace App\Http\Requests\Admin\SalesCouponsGroups;

use App\Http\Requests\Request;

class DeleteSalesCouponGroupRequest extends Request {

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
			'sales_coupon_group_id' => 'required|integer|exists:sales_coupons_groups,id',
		];
	}

}
