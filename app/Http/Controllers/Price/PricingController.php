<?php

namespace App\Http\Controllers\Price;

use Lang;
use Location;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Payment\PaymentManager;
use App\Modules\Models\Plans;
use App\Modules\Models\PlansCosts;
use App\Modules\Models\Payments;
use App\Modules\Utils\Utils;
use Paypal\Api\Payment;
use App\Modules\Utils\LangByLock;
use Illuminate\Http\Request;

class PricingController extends Controller
{
    protected $currencyMap = [
        'PLN' => 1,
        'EUR' => 2,
        'USD' => 3,
        'GBP' => 4,
    ];

    protected function getCurrencyByLocale() {
        $lang = Utils::getLocale();
    }

    public function buyStandardPlan(Request $request, $period)
    {

        $userCountry = Location::get($request->getClientIp())->countryCode;
        $currencyCode = LangByLock::getCurrencyByCountryCode($userCountry);
        $currencyId = $this->currencyMap[$currencyCode];

        $user = Auth::user();
        if(!$user){
            return Redirect::back()->withErrors(['Aby móc kupić plan musisz się zalogować']);
        }
        if (!in_array($period, ['month', 'year'])) {
            return Redirect::back()->withErrors(['Niepoprawny okres docelowy planu']);
        }

        $planId = config("plans.standard_$period");
        $plan = Plans::where('id', '=', config("plans.standard_$period"))
            ->where('active', '=', 1)
            ->first();

        if(!$plan){
            return Redirect::back()->withErrors(['Wybrany plan nie jest już aktywny']);
        }

        $planCost = PlansCosts::where('plan_id', '=', $planId )
            ->where('version_id', '=', 1)
            ->where('currency_id', '=', $currencyId)
            ->first()->cost;
        if(!$planCost){
            return Redirect::back()->withErrors(['Plan w wybranej walucie jest chwilowo niedostępny']);
        }
        // stworzenie i obsługa obiektu płatności dla PayPal
        $payment = PaymentManager::findByName('paypal');
        $response = $payment->makeSinglePayment($currencyCode, $plan->description, $planCost);
        $url = $payment->getRedirectUrl();

        // obiekt płatności do zapisu danych płatności po naszej stronie w bazie
        Payments::create([
            'invoice_id' => '12345',
            'year' => (int)date('Y'),
            'user_id' => $user->id,
            'product' => $plan->description,
            'payment_result' => $response->getState(),
            'payment_data' => 'plan_'.$planId,  // tu lepiej dać json_encode z wawrtościami dla users_plan
            'hash' => $response->getState(),
            'invoice_data' => $response->getState(),
            'price' => $planCost,
            'currency' => $currencyCode,
            'locale' => 'en',
            'txn_id' => $response->getId(),
            'modified' =>  date('Y-m-d H:i:s')
        ]);

        return redirect($url);



    }

    public function buyProfesionalPlan(Request $request, $period)
    {
        $userCountry = Location::get($request->getClientIp())->countryCode;
        $currencyCode = LangByLock::getCurrencyByCountryCode($userCountry);
        $currencyId = $this->currencyMap[$currencyCode];

        $user = Auth::user();
        if(!$user){
            return Redirect::back()->withErrors(['Aby móc kupić plan musisz się zalogować']);
        }
        if (!in_array($period, ['month', 'year'])) {
            return Redirect::back()->withErrors(['Niepoprawny okres docelowy planu']);
        }

        $planId = config("plans.profesional_$period");
        $plan = Plans::where('id', '=', config("plans.profesional_$period"))
            ->where('active', '=', 1)
            ->first();

        if(!$plan){
            return Redirect::back()->withErrors(['Wybrany plan nie jest już aktywny']);
        }

        $planCost = PlansCosts::where('plan_id', '=', $planId )
            ->where('version_id', '=', 1)
            ->where('currency_id', '=', $currencyId)
            ->first()->cost;
        if(!$planCost){
            return Redirect::back()->withErrors(['Plan w wybranej walucie jest chwilowo niedostępny']);
        }
        // stworzenie i obsługa obiektu płatności dla PayPal
        $payment = PaymentManager::findByName('paypal');
        $response = $payment->makeSinglePayment($currencyCode, $plan->description, $planCost);
        $url = $payment->getRedirectUrl();

        // obiekt płatności do zapisu danych płatności po naszej stronie w bazie
        Payments::create([
            'invoice_id' => '12345',
            'year' => (int)date('Y'),
            'user_id' => $user->id,
            'product' => $plan->description,
            'payment_result' => $response->getState(),
            'payment_data' => 'plan_'.$planId,  // tu lepiej dać json_encode z wawrtościami dla users_plan
            'hash' => $response->getState(),
            'invoice_data' => $response->getState(),
            'price' => $planCost,
            'currency' => $currencyCode,
            'locale' => 'en',
            'txn_id' => $response->getId(),
            'modified' =>  date('Y-m-d H:i:s')
        ]);
        return redirect($url);
    }

    public function buyElearningPlan($period, $amount)
    {
        $user = Auth::user();
        if(!$user){
            return Redirect::back()->withErrors(['Aby móc kupić plan musisz się zalogować']);
        }
        if (!in_array($period, ['month', 'year'])) {
            return Redirect::back()->withErrors(['Niepoprawny okres docelowy planu']);
        }
        if (!in_array($amount, [50,100,200,1000])) {
            return Redirect::back()->withErrors(['Nie istnieje plan dla podanej ilości uczestników']);
        }
    }
}