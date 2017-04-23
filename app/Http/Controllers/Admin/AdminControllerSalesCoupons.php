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


class AdminControllerSalesCoupons extends Controller
{
    protected $redirectTo = 'admin/salescoupons';

    public function getSalesCouponsList(){

        $salesCoupons = $this->getSalesCoupons();
        $plansArray = $this->getPlansArray();
        $salesCouponGroupsArray = $this->getSalesCouponsGroupsArray();

        $selectedGroupId = 0;

        return view('admin.sales_coupons.sales_coupons_list')
                        ->with('salesCoupons', $salesCoupons)
                        ->with('plansArray', $plansArray)
                        ->with('salesCouponGroupsArray', $salesCouponGroupsArray)
                        ->with('selectedGroupId', $selectedGroupId);
    }

    protected function getSalesCoupons()
    {
        $salesCoupons = SalesCoupons::get();

        return $salesCoupons;
    }

    protected function getPlansArray()
    {
        return Plans::pluck('description', 'id');
    }

    protected function getSalesCouponsGroupsArray()
    {
        return SalesCouponsGroups::pluck('name', 'id');
    }

    // public function addNewSalesCoupon(AddNewSalesCouponRequest $request){

    //     $salesCouponCounts = (int)$request->sales_coupon_counts;
    //     $prefix = $request->prefix or '';

    //     $input = Input::all();

    //     foreach ($salesCouponCounts as $key => $value) {
            
    //         $salesCoupon = new SalesCoupons($input);
    //         $salesCoupon->code = Utils::generateSalesCupon('jarek_');
    //         $salesCoupon->save();
    //     }

    //     return redirect($this->redirectTo);
    // }

    public function editSalesCoupon(EditSalesCouponRequest $request){

        $oneSalesCoupon = SalesCoupons::find($request->sales_coupon_id); 

        if($oneSalesCoupon){

            $input = Input::all();

            $oneSalesCoupon->fill($input);
            $oneSalesCoupon->save();
        }

        return redirect('admin/salescouponsgenerated');
    }

    public function deleteSalesCoupon(DeleteSalesCouponRequest $request){

        SalesCoupons::find($request->sales_coupon_id)->delete(); ; 

        return redirect($this->redirectTo);
    }


}
