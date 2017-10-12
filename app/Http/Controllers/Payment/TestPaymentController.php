<?php
/**
 * Created by PhpStorm.
 * User: Przecinit
 * Date: 17.08.2017
 * Time: 17:06
 */

namespace App\Http\Controllers\Payment;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use Illuminate\Routing\Redirector;
use App\Http\Requests\PaypalRequest;
use App\Http\Controllers\Controller;
use App\Modules\Payment\PaymentManager;
use Netshell\Paypal\Paypal;
use App\Modules\Payment\Operator\PayPalOperator;

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
        //dump(['$id' => $id]);
        $token = $request->get('token');
        //dump(['$token' => $token]);
        $payer_id = $request->get('PayerID');
        //dump(['$payer_id' => $payer_id]);
        //dump($apiContext->getCredential());
        $payment = PayPal::getById($id, $apiContext);
        //dump(['$payment' => $payment]);

        $paymentExecution = $PayPal->paymentExecution();

        $paymentExecution->setPayerId($payer_id);
        $executePayment = $payment->execute($paymentExecution, $apiContext);
        //dump(['$executePayment' => $executePayment]);

        return view('payment.done');
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
        return redirect($url);
    }
}