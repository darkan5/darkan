<?php

namespace App\Http\Controllers\Price;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\PlansOptions;
use App\Modules\Models\PricePlanOptions;

use App\Modules\Plans\UserPlanModule;

class PriceOptionsController  extends Controller
{
    protected $version_id = 1;
    protected $currency_id = 1;
	protected $accessRolesBuyPlanIds = [3];

    public function rules(){

        return view('pricing.pl.pricing_rules');
    }

	
    public function pricingOptionsPage(){

        $pricePlansOptions = $this->getPricePlansOptions();

        if(!$pricePlansOptions){
            return view('pricing.pl.no_acces_to_price_options');
        }

        $userPricePlansOptions = $this->getUserPricePlansOptions();


        $avaliablePricePlansOptions = $this->comparePricePlansOptions($pricePlansOptions, $userPricePlansOptions);

		return view('pricing.pl.pricing_options_page')
                    ->with('avaliablePricePlansOptions', $avaliablePricePlansOptions);
    }

    public function pricingOptionPage($planOptionId){

        $userPlan = UserPlanModule::getUserPlan();

        if(!$userPlan){
            return view('pricing.pl.no_acces_to_price_option');
        }

        $planOption = $this->checkAccessToPlansOption($planOptionId);

        if(!$planOption){
            return view('pricing.pl.no_acces_to_price_option');
        }

        $planOptionName = $planOption->name;
        $planOptionValue = $this->getPlanOptionValue($planOptionName, $userPlan);

        return view('pricing.pl.pricing_option_page')
                    ->with('planOption', $planOption)
                    ->with('planOptionName', $planOptionName)
                    ->with('planOptionValue', $planOptionValue);
    }

    protected function getPlanOptionValue($planOptionName, $userPlan){

        $planOptions = json_decode($userPlan->plan_options);

        return isset($planOptions->{$planOptionName}) ? $planOptions->{$planOptionName} : false;
    }

    protected function getPricePlansOptions(){

        return PricePlanOptions::where('version_id', '=', $this->version_id)
                                ->where('show', '=', true)
                                ->get();
    }

    protected function getUserPricePlansOptions(){

        $userPlan = UserPlanModule::getUserPlan();

        if(!$userPlan){
            return false;
        }

        $planOptions = json_decode($userPlan->plan_options);

        return $planOptions;
    }

    protected function comparePricePlansOptions($pricePlansOptions, $userPricePlansOptions){

        $avaliablePricePlansOptions = [];

        if(!$userPricePlansOptions || !$pricePlansOptions){
            return $avaliablePricePlansOptions;
        }

        foreach ($pricePlansOptions as $key => $pricePlanOption) {

            $priceOptionValue = $userPricePlansOptions->{$pricePlanOption->name};

            if(is_numeric($priceOptionValue)){

                if((int)$priceOptionValue < (int)$pricePlanOption->value){

                    array_push($avaliablePricePlansOptions, $pricePlanOption);
                }
            }

            if(is_bool(filter_var($priceOptionValue, FILTER_VALIDATE_BOOLEAN))){
                if( filter_var($priceOptionValue, FILTER_VALIDATE_BOOLEAN) != filter_var($pricePlanOption->value, FILTER_VALIDATE_BOOLEAN) ){

                    array_push($avaliablePricePlansOptions, $pricePlanOption);
                }
            }
        }

        return $avaliablePricePlansOptions;
    }

    

    protected function checkAccessToPlansOption($planOptionId){

        return PricePlanOptions::where('version_id', '=', $this->version_id)
                                ->where('id', '=', $planOptionId)
                                ->first();
    }

    // protected function getPlanOptionValue($planOptionName){

    //     $planOption = PlansOptions::where('name', '=', 'profesional')->first();

    //     if(!$planOption){
    //         return false;
    //     }

    //     $options = json_decode($planOption->options);

    //     return isset($options->{$planOptionName}) ? $options->{$planOptionName} : null;
    // }

    // protected function getPlansOptions(){

    //     $planOption = PlansOptions::where('name', '=', 'profesional')->first();

    //     if(!$planOption){
    //         return false;
    //     }

    //     return isset($options) ? $options : null;
    // }


}
