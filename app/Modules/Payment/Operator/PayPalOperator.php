<?php
/**
 * Created by PhpStorm.
 * @author Szymon Chodźko
 * @email szymonchodzko@gmail.com
 * Date: 17.08.2017
 * Time: 14:01
 */

namespace App\Modules\Payment\Operator;

use Netshell\Paypal\Paypal;
use PayPal\Api\Amount;
use PayPal\Api\CreditCard;
use PayPal\Api\Details;
use PayPal\Api\FundingInstrument;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\Transaction;


/**
 * Klasa obsługi płatności typu PayPal
 * @property  redirectUrl
 * @package App\Modules\Payment\Operator
 */
class PayPalOperator implements OperatorInterface
{

    /**
     * @var Paypal\Api\Payer
     */
    protected $payer;

    /**
     * @var Paypal\Api\Amount
     */
    protected $amount;

    /**
     * @var Paypal\Api\Transaction
     */
    protected $transaction;

    /**
     * @var Paypal\Api\Payment
     */
    public $payment;


    /**
     * @var Paypal\Api\RedirectUrls
     */
    protected $redirectUrls;

    /**
     * @var adres do przekierowania na stronę płatności
     */
    protected $redirectLink;

    /**
     * Inicjalizer obiektów biblioteki Netshell\Paypal\Paypal
     */
    protected $PayPal;

    /**
     * @var Paypal\Rest\ApiContext
     */
    private $_apiContext;


    public function __construct()
    {
        $this->PayPal = new PayPal();
        $this->payer = $this->PayPal->payer();
        $this->amount = $this->PayPal->amount();
        $this->transaction = $this->PayPal->transaction();
        $this->redirectUrls = $this->PayPal->redirectUrls();
        $this->payment = $this->PayPal->payment();
        $this->item = new Item();



        $this->_apiContext = $this->PayPal->apiContext(
            config('services.paypal.client_id'),
            config('services.paypal.secret')
        );

        $this->_apiContext->setConfig(array(
            'mode' => config('services.paypal.mode'),
            'service.EndPoint' => config('services.paypal.endpoint'),
            'http.ConnectionTimeOut' => config('services.paypal.connection_timeout'),
            'log.LogEnabled' => config('services.paypal.log_enabled'),
            'log.FileName' => config('services.paypal.log_path'),
            'log.LogLevel' =>  config('services.paypal.log_level'),
        ));

    }

    /**
     * Ustawia cenę płatności
     * @param $price
     * @return mixed
     */
    public function setPrice($price)
    {
        $this->item->setPrice($price);
        $this->amount->setTotal($price);
        $this->transaction->setAmount($this->amount);
    }

    /**
     * Ustawia opis przedmiotu płatności
     * @param $description
     * @return mixed
     */
    public function setDescription($description)
    {
        $this->item->setName($description);
        $this->item->setDescription($description);
        $this->transaction->setDescription($description);
    }

    /**
     * Obsługa pojedynczej płatności
     * @return mixed
     *
     */
    public function makeSinglePayment($currency, $description, $price)
    {
        $this->setCurrency($currency);
        $this->setDescription($description);
        $this->item->setQuantity(1);
        $this->setPrice($price);

        $itemList = new ItemList();
        $itemList->setItems(array($this->item));
        $this->transaction->setItemList($itemList);
        $this->payer->setPaymentMethod('paypal');

        $redirectUrls = $this->PayPal->redirectUrls();
        $redirectUrls->setReturnUrl(action('Payment\TestPaymentController@getDone'));
        $redirectUrls->setCancelUrl(action('Payment\TestPaymentController@getCancel'));

        $this->payment->setIntent('sale');
        $this->payment->setPayer($this->payer);
        $this->payment->setRedirectUrls($redirectUrls);
        $this->payment->setTransactions(array($this->transaction));

        try {
            /**
             * @var
             */
            $response = $this->payment->create($this->_apiContext);
        } catch (\Exception $e){
            echo $e->getMessage();
            die;
        }
        $this->redirectLink = $response->links[1]->href;
        return $response;
    }

    /**
     * Zwraca link przekierowujący do operatora płatności
     * @return mixed
     */
    public function getRedirectUrl()
    {
        return $this->redirectLink;
    }

    /**
     * @param $currency string
     */
    public function setCurrency($currency)
    {
        $this->item->setCurrency($currency);
        $this->amount->setCurrency($currency);
    }

    public static function getApiContext()
    {
        $Paypal = new Paypal();
        $apiContext = $Paypal->apiContext(
            config('services.paypal.client_id'),
            config('services.paypal.secret')
        );

        $apiContext->setConfig(array(
            'mode' => config('services.paypal.mode'),
            'service.EndPoint' => config('services.paypal.endpoint'),
            'http.ConnectionTimeOut' => config('services.paypal.connection_timeout'),
            'log.LogEnabled' => config('services.paypal.log_enabled'),
            'log.FileName' => config('services.paypal.log_path'),
            'log.LogLevel' =>  config('services.paypal.log_level'),
        ));

        return $apiContext;
    }
}
