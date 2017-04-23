<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SalesCouponsGroups\EditSalesCouponGroupRequest;
use App\Http\Requests\Admin\SalesCouponsGroups\AddNewSalesCouponGroupRequest;
use App\Http\Requests\Admin\SalesCouponsGroups\DeleteSalesCouponGroupRequest;
use App\Modules\Models\SalesCouponsGroups;


class AdminControllerSalesCouponsGroups extends Controller
{
    protected $redirectTo = 'admin/salescouponsgroups';

    public function getSalesCouponsGroupsList(){

        $salesCouponsGroups = $this->getSalesCouponsGroups();

        return view('admin.sales_coupons_groups.sales_coupons_groups_list')
                        ->with('salesCouponsGroups', $salesCouponsGroups);
    }

    protected function getSalesCouponsGroups()
    {
        $salesCouponsGroups = SalesCouponsGroups::get();

        return $salesCouponsGroups;
    }


    public function addNewSalesCouponGroup(AddNewSalesCouponGroupRequest $request){

        $input = Input::all();

        $salesCouponsGroups = new SalesCouponsGroups($input);
        $salesCouponsGroups->save();

        return redirect($this->redirectTo);
    }

    public function editSalesCouponGroup(EditSalesCouponGroupRequest $request){

        $salesCouponsGroups = SalesCouponsGroups::find($request->sales_coupon_group_id); 

        if($salesCouponsGroups){

            $input = Input::all();

            $salesCouponsGroups->fill($input);
            $salesCouponsGroups->save();
        }

        return redirect($this->redirectTo);
    }

    public function deleteSalesCouponGroup(DeleteSalesCouponGroupRequest $request){

        SalesCouponsGroups::find($request->sales_coupon_group_id)->delete(); ; 

        return redirect($this->redirectTo);
    }


}
