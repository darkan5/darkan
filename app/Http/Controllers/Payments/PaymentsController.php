<?php namespace App\Http\Controllers\Payments;

use Auth;
use App\Http\Controllers\Controller;
use App\Modules\Models\Payments;
use App\Http\Requests\SavePaymentRequest;
use App\Http\Requests\DefaultRequest;
use App\Modules\Models\PromoCode;
use App\Modules\Models\PromoCodeUses;
use App\Modules\Utils\Utils;
use Input;
use Lang;


class PaymentsController extends Controller {

	public function pricingPage()
	{			

		$userPricingLanguage = \Config::get('app.pricing_locale');
		$uniqueHash = md5(uniqid(rand(), true));

		$pricingData = config('prices.' . $userPricingLanguage);
		return view('web.pages.pricing')
					->with('pricingData', $pricingData)
					->with('paypalLive', env('paypalLive'))
					->with('uniqueHash', $uniqueHash);	
	}

	public function paymentCompletedPage(DefaultRequest $request)
	{			
		$postData = Input::all();

		$paymentData = Payments::where('txn_id', '=', $postData['txn_id'])->first();

		if ($paymentData) {
			return view('web.pages.payment.paymentcompleted')
						->with('paymentData', $paymentData)
						->with('postData', $postData);
	
		} else {
	
			return view('web.pages.payment.paymentcompletednodata');		
		}

		
		// $userPricingLanguage = \Config::get('app.pricing_locale');

		// $pricingData = config('prices.' . $userPricingLanguage);
		// return view('web.pages.pricing')
		// 			->with('pricingData', $pricingData);
	}

	public function pricingStandardPage()
	{
		if (Auth::check()) {

			$uniqueHash = md5(uniqid(rand(), true));

			$userPricingLanguage = \Config::get('app.pricing_locale');

			$pricingData = config('prices.' . $userPricingLanguage);
			return view('web.pages.plans.standard')
					->with('paypalLive', env('paypalLive'))
					->with('pricingData', $pricingData)
					->with('uniqueHash', $uniqueHash);	

		} else {

			return redirect('/pricing');

		}
	}

	public function pricingProPage()
	{
		if (Auth::check()) {

			$uniqueHash = md5(uniqid(rand(), true));

			$userPricingLanguage = \Config::get('app.pricing_locale');

			$pricingData = config('prices.' . $userPricingLanguage);
			return view('web.pages.plans.pro')
					->with('paypalLive', env('paypalLive'))
					->with('pricingData', $pricingData)
					->with('uniqueHash', $uniqueHash);	
		} else {

			return redirect('/pricing');

		}
	}

	public function pricingElearningPage()
	{
		if (Auth::check()) {

			$uniqueHash = md5(uniqid(rand(), true));

			$userPricingLanguage = \Config::get('app.pricing_locale');

			$pricingData = config('prices.' . $userPricingLanguage);
			return view('web.pages.plans.elearning')
					->with('paypalLive', env('paypalLive'))
					->with('pricingData', $pricingData)
					->with('pricingDataObject', json_encode($pricingData))
					->with('uniqueHash', $uniqueHash);	
		} else {

			return redirect('/pricing');

		}
	}

	private function getPromoCodeLocale($hash)
	{
        $hashArray = explode('_', $hash);
        if ( count($hashArray) == 3 ) {
            $promoCode = $hashArray[2];
            $promoCodeData = PromoCode::where('code', '=', $promoCode)->first();
            if ($promoCodeData) {
            	return $promoCodeData->locale;
            }
        }

        return false;
	}

	public function savePayment(SavePaymentRequest $request)
	{
		$payment = new Payments();

		$formData = json_decode($request->params);

		$paymentLocale = $this->getPromoCodeLocale($formData->hash);

		if (!$paymentLocale) {
			$paymentLocale = config('app.pricing_locale');
		}

        $payment->user_id = Auth::user()->id;
        $payment->product = $formData->product;
        $payment->hash = $formData->hash;
        $payment->invoice_data = json_encode( $formData->invoiceData );
        $payment->payment_status = 'started';
        $payment->price = $formData->price;
        $payment->currency = $formData->currency;
        $payment->locale = $paymentLocale;

        $payment->save();

        echo '{}';
	}



    public function checkDiscountCode(DefaultRequest $request) {

        $input = Input::all();
        $data = json_decode( $input['params'] );

        $userInputCode = trim($data->code);

        $promoCode = PromoCode::where('code', '=', $userInputCode)->first();

        $returnData = array(
        				'success' => false,
        				'message' => Lang::get('pricing.discountCodeNotFound'),
        				'expired' => ''
        				);

        if ($promoCode) {
            if ($promoCode->code == $userInputCode) {

            	$promoCodeUses = PromoCodeUses::where('code_id', '=', $promoCode->id)->count();

            	if (Utils::isDateExpired($promoCode->expired_date)) {
	            	$returnData['message'] = Lang::get('pricing.discountCodeExpired');
	            	$returnData['expired'] = Utils::getDaysToExpiry($promoCode->expired_date);

            	} elseif($promoCodeUses >= $promoCode->max_uses) {
	            	$returnData['message'] = Lang::get('pricing.discountCodeUsesExceedeed');
            	} else {

					$discountLocale = $promoCode->locale;
					$pricingData = config('prices.' . $discountLocale);

	            	$returnData['success'] = true;
	            	$returnData['productDisplayName'] = $pricingData[$promoCode->product]['name'];
	            	$returnData['productName'] = $promoCode->product;
	            	$returnData['promoCode'] = $promoCode->code;
	            	$returnData['productPrice'] = $promoCode->discount_price;
	            	$returnData['currencyPre'] = $pricingData['currency_pre'];
	            	$returnData['currencyPost'] = $pricingData['currency_post'];
	            	$returnData['currency'] = $pricingData['currency'];
	            	$returnData['message'] = Lang::get('pricing.discountCodeFound');
            	}

            }
        }

        echo json_encode($returnData);

    }


	public function savePaymentForm(SavePaymentRequest $request)
	{
		$payment = new Payments();

		$formData = $request;

        $payment->user_id = Auth::user()->id;
        $payment->product = $formData->item_name;
        $payment->hash = $formData->custom;
        //$payment->invoice_data = json_encode( $formData->invoiceData );
        $payment->payment_status = 'started';
        $payment->price = $formData->amount;
        $payment->currency = $formData->currency_code;
        $payment->locale = config('app.pricing_locale');

        $payment->save();
    
       // return $request->redirect('/pricing');

		return redirect('https://www.sandbox.paypal.com/cgi-bin/webscr')->withInput(Input::all());
	}

}