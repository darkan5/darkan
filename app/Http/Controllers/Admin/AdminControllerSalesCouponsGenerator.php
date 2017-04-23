<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use Response;
use Lang;
use Request;
use stdClass;
use App\Http\Controllers\Controller;
use App\Modules\Models\SalesCoupons;
use App\Modules\Models\SalesCouponsGroups;
use App\Modules\Models\Plans;
use App\Modules\Utils\Utils;

use App\Http\Requests\Admin\SalesCoupons\AddNewSalesCouponRequest;
use App\Http\Requests\Admin\SalesCouponsFiles\DownloadSalesCouponsFileRequest;

use App\Http\Foundation\Files\FilesCreator;


class AdminControllerSalesCouponsGenerator extends Controller
{

    use FilesCreator; 

    protected $redirectTo = 'admin/salescouponsgenerated';

    public function getGeneratedSalesCouponsList(){


        $salesCoupons = [];

        $plansArray = $this->getPlansArray();
        $salesCouponGroupsArray = $this->getSalesCouponsGroupsArray();

        return view('admin.sales_coupons.sales_coupons_generated_list')
                        ->with('salesCoupons', $salesCoupons)
                        ->with('plansArray', $plansArray)
                        ->with('salesCouponGroupsArray', $salesCouponGroupsArray);
    }

    protected function getPlansArray()
    {
        return Plans::pluck('description', 'id');
    }

    protected function getSalesCouponsGroupsArray()
    {
        return SalesCouponsGroups::pluck('name', 'id');
    }

    protected function getSalesCouponsGroup($groupId)
    {
        return SalesCouponsGroups::where('id', '=', $groupId)->first();
    }
  

    public function addNewSalesCoupon(AddNewSalesCouponRequest $request){

        $salesCouponCounts = (int)$request->sales_coupon_counts;
        $prefix = $request->prefix or '';

        $input = Input::all();

        $salesCoupons = [];

        for ($i=0; $i < $salesCouponCounts; $i++) { 
  
            $salesCoupon = new SalesCoupons($input);
            $salesCoupon->code = Utils::generateSalesCupon($prefix);
            $salesCoupon->save();

            array_push($salesCoupons, $salesCoupon);
        }

        $plansArray = $this->getPlansArray();
        $salesCouponGroupsArray = $this->getSalesCouponsGroupsArray();

        return view('admin.sales_coupons.sales_coupons_generated_list')
                        ->with('salesCoupons', $salesCoupons)
                        ->with('plansArray', $plansArray)
                        ->with('salesCouponGroupsArray', $salesCouponGroupsArray);
    }

    protected function stringArrayToIntArray($stringArray){
        return Utils::stringArrayToIntArray($stringArray);
    }

    protected function getSalesCouponsByIds($sales_coupon_ids = []){

        return SalesCoupons::whereIn('id', $sales_coupon_ids)
                ->get();
    }

    public function downloadFile(DownloadSalesCouponsFileRequest $request){

        $sales_coupon_ids = $this->stringArrayToIntArray($request->sales_coupon_ids);
        $salesCoupons = $this->getSalesCouponsByIds($sales_coupon_ids);

        $headItems = [ 'Id', 'Kod' ];

        $collectionArray = collect($salesCoupons)->map(function($x, $id){ 

            $rowArray = [ $id+1, $x->code ];

            return $rowArray;

        })->toArray();

        $responce = $this->createFile($request->file_type, Auth::user()->id, $headItems, $salesCoupons, $collectionArray);

        foreach ($salesCoupons as $key => $salesCoupon) {
            $salesCoupon->downloaded = true;
            $salesCoupon->save();
        }

        return $responce;
    }

}
