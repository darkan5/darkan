<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use Request;
use App\Http\Controllers\Controller;
use App\Modules\Models\PlansVersions;
use App\Modules\Models\Currency;
use App\Modules\Models\PlansToPriceList;
use App\Modules\Models\PlansCosts;
use App\Modules\Models\PriceTypes;
use App\Http\Requests\Admin\Diagnose\MakeDiagnoseRequest;


class AdminControllerDiagnose extends Controller
{

    public function getDiagnosePanel(){

    	$plansVersionsList = $this->getPlansVersions();
    	$currencyArray = $this->getCurrency();

        return view('admin.diagnose.diagnose_panel')
		        		->with('plansVersionsList', $plansVersionsList)
		        		->with('currencyArray', $currencyArray)
		        		->with('version_id', 1)
		        		->with('currency_id', 1);
    }

    public function makeDiagnose(MakeDiagnoseRequest $request){

    	$plansVersionsList = $this->getPlansVersions();
    	$currencyArray = $this->getCurrency();

    	$priceTypes = PriceTypes::get();

    	$errors = [];

    	foreach ($priceTypes as $priceType) {

    		if($priceType->name == 'Enterprise'){
    			continue;
    		}

    		$plansToPriceIds = PlansToPriceList::where('version_id', '=', $request->version_id)
                        ->where('price_type_id', '=', $priceType->id)
                        ->pluck('plan_id')->toArray();

            if(count($plansToPriceIds) != 3){
            	array_push($errors, 'Nie prawidłowa liczba planów dla typu ' . $priceType->name . ' wynosi '. count($plansToPriceIds) . ' a powinno 3' );
            }

            $plansCosts = PlansCosts::where('version_id', '=', $request->version_id)
            					->where('currency_id', '=', $request->currency_id)
            					->wherein('plan_id', $plansToPriceIds)->get();

            if(count($plansCosts) != 3){
            	array_push($errors, 'Nie prawidłowa liczba cen dla typu ' . $priceType->name . ' wynosi '. count($plansCosts) . ' a powinno 3' );
            }
    	}


        

        return view('admin.diagnose.diagnose_panel')
        				->with('plansVersionsList', $plansVersionsList)
		        		->with('currencyArray', $currencyArray)
		        		->with('version_id', $request->version_id)
		        		->with('currency_id', $request->currency_id)
		        		->withErrors($errors);
    }

    protected function getPlansVersions()
	{
		$plansVersionsList = PlansVersions::pluck('version', 'id');

		return $plansVersionsList;
	}

	protected function getCurrency()
	{
		$currencies = Currency::pluck('name', 'id');
		return $currencies;
	}

    

}
