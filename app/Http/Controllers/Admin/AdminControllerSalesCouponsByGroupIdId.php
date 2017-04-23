<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SalesCoupons\EditSalesCouponRequest;
use App\Http\Requests\Admin\SalesCoupons\AddNewSalesCouponRequest;
use App\Http\Requests\Admin\SalesCoupons\DeleteSalesCouponRequest;
use App\Modules\Models\SalesCoupons;
use App\Modules\Models\Plans;
use App\Modules\Models\SalesCouponsGroups;
use App\Modules\Utils\Utils;


class AdminControllerSalesCouponsByGroupIdId extends Controller
{
    protected $redirectTo = 'admin/salescouponsbygroup/';

    public function getSalesCouponsList($groupId){

        $salesCoupons = $this->getSalesCoupons($groupId);
        $plansArray = $this->getPlansArray();
        $salesCouponGroupsArray = $this->getSalesCouponsGroupsArray($groupId);

        return view('admin.sales_coupons.sales_coupons_list')
                        ->with('salesCoupons', $salesCoupons)
                        ->with('plansArray', $plansArray)
                        ->with('salesCouponGroupsArray', $salesCouponGroupsArray)
                        ->with('selectedGroupId', $groupId);
    }

    protected function getSalesCoupons($groupId)
    {
        $salesCoupons = SalesCoupons::where('sales_coupon_group_id', '=', $groupId)
                            ->get();

        return $salesCoupons;
    }

    protected function getPlansArray()
    {
        return Plans::pluck('description', 'id');
    }

    protected function getSalesCouponsGroupsArray($groupId)
    {
        return SalesCouponsGroups::where('id', '=', $groupId)->pluck('name', 'id');
    }


    public function editSalesCoupon($groupId, EditSalesCouponRequest $request){

        $oneSalesCoupon = SalesCoupons::find($request->sales_coupon_id); 

        if($oneSalesCoupon){

            $input = Input::all();

            $oneSalesCoupon->fill($input);
            $oneSalesCoupon->save();
        }

        return redirect($this->redirectTo . $groupId);
    }

    public function deleteSalesCoupon($groupId, DeleteSalesCouponRequest $request){

        SalesCoupons::find($request->sales_coupon_id)->delete(); ; 

        return redirect($this->redirectTo . $groupId);
    }


}
