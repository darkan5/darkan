<?php

namespace App\Http\Controllers\Admin;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Currencies\EditCurrencyRequest;
use App\Http\Requests\Admin\Currencies\AddNewCurrencyRequest;
use App\Http\Requests\Admin\Currencies\DeleteCurrencyRequest;
use App\Modules\Models\Currency;


class AdminControllerCurrencies extends Controller
{
	protected $redirectTo = 'admin/currencieslist';
	
    public function getCurrenciesList(){

    	$currencies = $this->getCurrencies();

		return view('admin.currencies.currencies_list')
						->with('currencies', $currencies);

    }

    protected function getCurrencies()
	{
		return Currency::get();
	}

	public function addNewCurrency(AddNewCurrencyRequest $request){

		$input = Input::all();

		$planOption = new Currency($input);
		$planOption->save();

		return redirect($this->redirectTo);
	}


	public function editCurrency(EditCurrencyRequest $request){

		$oneCurrency = Currency::find($request->currency_id); 

		if($oneCurrency){

			$input = Input::all();

		    $oneCurrency->fill($input);
		    $oneCurrency->save();
		}

		return redirect($this->redirectTo);
	}

	public function deleteCurrency(DeleteCurrencyRequest $request){

		Currency::find($request->currency_id)->delete(); 

		return redirect($this->redirectTo);

	}

}
