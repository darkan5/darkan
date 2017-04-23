<?php namespace App\Http\Requests\Admin\SalesCoupons;

use App\Http\Requests\Request;

class EditSalesCouponRequest extends Request {

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
			'sales_coupon_id' => 'required|integer|exists:sales_coupons,id',
			'plan_id' => 'required|integer|exists:plans,id',
			'sales_coupon_group_id' => 'required|integer|exists:sales_coupons_groups,id',
			'description' => 'max:255',
			'cost' => 'required|numeric|between:0,1000000.00',
			'active' => 'required|integer|exists:on_off_states,state'
		];
	}

}
