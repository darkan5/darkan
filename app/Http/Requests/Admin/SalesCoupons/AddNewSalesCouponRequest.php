<?php namespace App\Http\Requests\Admin\SalesCoupons;

use App\Http\Requests\Request;

class AddNewSalesCouponRequest extends Request {

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
			'plan_id' => 'required|integer|exists:plans,id',
			'sales_coupon_group_id' => 'required|integer|exists:sales_coupons_groups,id',
			'description' => 'max:255',
			'cost' => 'required|numeric|between:0,1000000.00',
			'sales_coupon_counts' => 'required|numeric|between:1,10000',
			'prefix' => 'max:20',
			'active' => 'required|integer|exists:on_off_states,state'
		];
	}

	// public function attributes()
	// {
	//     return[
	//         'sales_coupon_group_id' => Lang::get('validation.attributes.sales_coupon_group_id')
	//     ];

	// }

}
