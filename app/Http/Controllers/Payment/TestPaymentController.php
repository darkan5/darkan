<?php
/**
 * Created by PhpStorm.
 * User: Przecinit
 * Date: 17.08.2017
 * Time: 17:06
 */

namespace App\Http\Controllers\Payment;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Routing\Redirector;
use App\Http\Requests\PaypalRequest;
use App\Http\Controllers\Controller;
use App\Modules\Payment\PaymentManager;
use Netshell\Paypal\Paypal;
use App\Modules\Payment\Operator\PayPalOperator;
use App\Modules\Models\Payments;
use App\Modules\Models\PlansUsers;
use App\Modules\Models\Plans;
use Carbon\Carbon;


class TestPaymentController extends Controller
{

    /**
     * akcja potwierdzenia płatności
     * @param PaypalRequest $request
     */
    public function getDone(PaypalRequest $request)
    {
        $PayPal = new Paypal();
        $apiContext = PayPalOperator::getApiContext();
        $id = $request->get('paymentId');
        $token = $request->get('token');
        $payer_id = $request->get('PayerID');
        $payment = PayPal::getById($id, $apiContext);

        $paymentExecution = $PayPal->paymentExecution();
        $paymentExecution->setPayerId($payer_id);
        $executionResult = $payment->execute($paymentExecution, $apiContext);

        $paymentRecord = Payments::where('txn_id', '=', $id)
            ->where('user_id', '=', Auth::user()->id)->first();
        if ($executionResult->getState() === 'approved') {
            $paymentRecord->payment_status = 'finished';
            $paymentRecord->payment_result = $executionResult->getState();
            $paymentRecord->save();

            $planId = ltrim($paymentRecord->payment_data, 'plan_');
            // dodanie planu do usera

            $plan = Plans::where('id', '=', $planId)
                ->where('active', '=', 1)
                ->first();
            $options = $this->mergePlansOptions($plan);
            $period = $plan->period;
            Carbon::setLocale('pl');


            $input = [];
            $input['user_id'] = Auth::user()->id;
            $input['promo_code_id'] = 1;
            $input['created_by_user_id'] = 2;
            $input['paying_user_id'] = Auth::user()->id;
            $input['paid'] = 1;
            $input['active'] = 1;
            $input['plan_cost_to_pay_with_rabat'] = 0;
            $input['plan_options'] = json_encode($options);
            $input['session_id'] = 1;
            $input['plan_id'] = $planId;
            $input['start_date'] = Carbon::now()->format('Y-m-d H:i:s');
            $input['expiration_date'] = Carbon::now()->addDays($period)->format('Y-m-d H:i:s');
            $input['currency_id'] = 3;
            $input['plan_cost_to_pay'] = 0;

            PlansUsers::create($input);
            //jeszcze usuwanie triala

            return view('payment.done');
        } else {
            $paymentRecord->payment_result = $executionResult->getState();
            $paymentRecord->save();
            return view('payment.cancel');
        }


    }

    /**
     * akcja anulowania płatności
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getCancel()
    {
        return view('payment.cancel');
    }

    /**
     * Testowa akcja
     */
    public function testPaypal()
    {
        $payment = PaymentManager::findByName('paypal');
        $payment->setCurrency('USD');
        $payment->setDescription('Super fajny kurs');
        $payment->setPrice(1);
        $payment->makeSinglePayment();
        $url = $payment->getRedirectUrl();
        echo '<a href=' . $url . '>link</a>';
        //return redirect($url);
    }

    private function mergePlansOptions($plan)
    {
        $options = new \stdClass();
        foreach ($plan->plansToPlansOptions as $plansToPlansOption) {
            $currentOptions = json_decode($plansToPlansOption->plansOptions->options);
            $options = (object)array_merge((array)$options, (array)$currentOptions);
        }
        return $options;
    }
}