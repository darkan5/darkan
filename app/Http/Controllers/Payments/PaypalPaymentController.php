<?php namespace App\Http\Controllers\Payments;

use Auth;
use App\Http\Controllers\Controller;
use App\Modules\Models\Payments;
use App\Modules\Models\Pprogram;
use App\Modules\Models\PprogramPaid;
use App\Modules\Models\LmsUserPortalPaid;
use App\Modules\Models\PromoCode;
use App\Modules\Models\LmsInfo;
use App\Modules\Models\PromoCodeUses;
use App\Http\Requests\PaypalRequest;
use App\Modules\Mailer\PaymentCompletedMail;
use App\Modules\Mailer\PortalBoughtMail;
use App\Modules\Models\LmsUserPortal;
use Input;
use App\User;
use DateTime;


class PaypalPaymentController extends Controller {

    private $_option;

    private $_logUserID = -1;
    
    // private $_merchant = 'pio.wiecaszek-facilitator@gmail.com';
    // private $_merchant = 'office@darkan.eu';


	public function __construct()
	{
		if (env('paypalLive')) {
            $this->_url = 'https://www.paypal.com/cgi-bin/webscr';
            $this->_merchant = 'office@darkan.eu';
        } else {
            $this->_url = 'https://www.sandbox.paypal.com/cgi-bin/webscr';
            $this->_merchant = 'pio.wiecaszek-facilitator@gmail.com';
        }

        $this->_option = config('prices.en');
	}

	public function makePayment(PaypalRequest $request)
	{

        $this->log('przetwarzam platnosc!');

		$postdata = Input::all();

        if (empty($postdata)) {
            return false;
        }
		
		
		$postFields = 'cmd=_notify-validate';
	
		foreach($postdata as $key => $val) {
			$postFields .= "&$key=".urlencode($val);
		}

	
		$ch = curl_init();
		
		curl_setopt_array($ch, array(
			CURLOPT_URL => $this->_url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postFields
		));
		
		$result = curl_exec($ch);
		curl_close($ch);

        $userID = $this->update_payment_status($result, $postdata);

        $this->_logUserID = $userID;

        $this->log('Mam id usera: ' . $userID);

		$last_txn = file_get_contents(storage_path('app/paypal/lasttxn.txt'));

        $actual_txn = isset($postdata['txn_id']) ? $postdata['txn_id'] : '0';


        // $result = 'VERIFIED';
        // $userID = 1;//$this->update_payment_status($result, $postdata);

		// sprawdz czy nowy post nie jest duplikatem starego
		if ($last_txn != $actual_txn) {


			$new_txn = fopen(storage_path('app/paypal/lasttxn.txt'), 'w');
			fwrite($new_txn, $actual_txn . ' | ' . $userID . ' | ' . $postFields);
            fclose($new_txn);   

            // $result = 'VERIFIED';
            // $userID = 1;//$this->update_payment_status($result, $postdata);


            if ($this->isPortal($postdata['item_name'])) {

                $this->log('to portal...');
                if ($this->verifyPortalPayment($postdata)) {
                    
                    // buy access to portal
                    $this->buyPortal($userID, $postdata);

                } else {
                    $this->log("NIEPOWODZENIE WERYFIKACJI verifyPortalPayment");
                }
            } else {
                $this->log("Weryfikuje kupno planu..");
                // ostatnia weryfikacja
                if ($this->verify($result, $postdata) && $userID > 0){

                    $productName = $postdata['item_name'];
                    $productSection = $this->getProductSection($productName);

                    $days = $this->getProductExtendDays($productName);


                    $this->buyProduct($userID, $productName, $productSection, $days);
                    $this->updateDependencyPlans($userID, $productName, $productSection, $days);

                } else {
                    $this->log("NIEPOWODZENIE WERYFIKACJI kupna planu verify()");
                }
            }



		}
	}



    private function getProductExtendDays($productName) {
        $extendLengthNameArr = explode('_', $productName);
        $extendLengthName = array_pop($extendLengthNameArr);
        switch ($extendLengthName) {
            case 'month':
                return 30;
                break;

            case 'year':
                return 365;
                break;
            
            default:
                return 30;
                break;
        }
    }

    private function getProductExtendNameByDays($days) {
        switch ($days) {
            case 30:
                return 'month';
                break;

            case 365:
                return 'year';
                break;
            
            default:
                return 'month';
                break;
        }
    }

    private function getUserPlans($userID) {

        $user = User::where('id', '=', $userID)->first();

        $userPlans = array();

        if ($user) {
                // echo $up['user_plans'];
            if ($user['user_plans'] != "" && $this->isJson($user['user_plans'])) {
                $userPlans = json_decode( $user['user_plans'], true );
            }
        }

        return $userPlans;
    }

    private function getProductDateExpiration($userPlans, $productName) {

        foreach ($userPlans as $key => $section) {
            foreach ($section as $planName => $expirationDate) {
                if ($productName == $planName) {

                    $today_dt = new DateTime();
                    $expire_dt = new DateTime($expirationDate);

                    if ($expire_dt < $today_dt) {
                        return date('Y-m-d');
                    } else {
                        return $expirationDate;
                    }
                }
            }
        }

        return date('Y-m-d');
    }

    private function isProductActive($userPlans, $productName) {

        foreach ($userPlans as $key => $section) {
            foreach ($section as $planName => $expirationDate) {
                if ($productName == $planName) {

                    $today_dt = new DateTime();
                    $expire_dt = new DateTime($expirationDate);

                    if ($expire_dt < $today_dt) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private function getProductSection($productName) {
        switch($productName) {
            case 'Darkan_lmslight_month':
            case 'Darkan_lmslight_year':
            case 'Darkan_lmsstandard_month':
            case 'Darkan_lmsstandard_year':
            case 'Darkan_lmspro_month':
            case 'Darkan_lmspro_year':
            case 'Darkan_lmsultimate_month':
            case 'Darkan_lmsultimate_year':
                return 'lms';
                break;
            
            case 'Darkan_marketinglight_month':
            case 'Darkan_marketinglight_year':
            case 'Darkan_marketingstandard_month':
            case 'Darkan_marketingstandard_year':
            case 'Darkan_marketingpro_month':
            case 'Darkan_marketingpro_year':
            case 'Darkan_marketingultimate_month':
            case 'Darkan_marketingultimate_year':
                return 'mp';
                break;
            
            case 'Darkan_standard_month':
            case 'Darkan_standard_year':
            case 'Darkan_pro_month':
            case 'Darkan_pro_year':
                return 'cc';
                break;

            default:
                return 'cc';
                break;
        }
    }

    private function getProductRealName($productName) {
        switch($productName) {
            case 'Darkan_lmslight_month':
            case 'Darkan_lmslight_year':
                return 'Darkan_lmslight';
                break;

            case 'Darkan_lmsstandard_month':
            case 'Darkan_lmsstandard_year':
                return 'Darkan_lmsstandard';
                break;
                
            case 'Darkan_lmspro_month':
            case 'Darkan_lmspro_year':
                return 'Darkan_lmspro';
                break;
                
            case 'Darkan_lmsultimate_month':
            case 'Darkan_lmsultimate_year':
                return 'Darkan_lmsultimate';
                break;
            
            case 'Darkan_marketinglight_month':
            case 'Darkan_marketinglight_year':
                return 'Darkan_marketinglight';
                break;
                
            case 'Darkan_marketingstandard_month':
            case 'Darkan_marketingstandard_year':
                return 'Darkan_marketingstandard';
                break;
                
            case 'Darkan_marketingpro_month':
            case 'Darkan_marketingpro_year':
                return 'Darkan_marketingpro';
                break;
                
            case 'Darkan_marketingultimate_month':
            case 'Darkan_marketingultimate_year':
                return 'Darkan_marketingultimate';
                break;
            
            case 'Darkan_standard_month':
            case 'Darkan_standard_year':
                return 'Darkan_standard';
                break;

            case 'Darkan_pro_month':
            case 'Darkan_pro_year':
                return 'Darkan_pro';
                break;

            default:
                return 'UNKNOWN';
                break;
        }
    }

    private function isJson($string) {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }

    private function updateUserPlans($userID, $userPlans) {

        $userPlansJSON = json_encode($userPlans);

        $user = User::where('id', '=', $userID)->first();
        $user->user_plans = $userPlansJSON;
        $user->save();
    }

    private function updateDependencyPlans($userID, $productName, $productSection, $days) {
        $dependencyPlans = array(
            "cc" => array("Darkan_standard", "Darkan_pro"),
            "lms" => array("Darkan_lmslight", "Darkan_lmsstandard", "Darkan_lmspro", "Darkan_lmsultimate"),
            "mp" => array("Darkan_marketinglight", "Darkan_marketingstandard", "Darkan_marketingpro", "Darkan_marketingultimate"),
        );


        $userPlans = $this->getUserPlans($userID);

        $productRealName = $this->getProductRealName($productName);

        $dependencyPlansIndex = array_search($productRealName, $dependencyPlans[$productSection]);

        for ($i=0; $i < $dependencyPlansIndex; $i++) {
            if ($this->isProductActive($userPlans, $dependencyPlans[$productSection][$i]) ) {
                $productExtendName = $this->getProductExtendNameByDays($days);
                $productToBuy = $dependencyPlans[$productSection][$i] . '_' . $productExtendName;
                $this->buyProduct($userID, $productToBuy, $productSection, $days);

                $this->log("Product jest aktywny! przedłużam.... " . $productToBuy);
            } else {
                $this->log("Product nie jest aktywny! NIE przedłużam.... " . $dependencyPlans[$productSection][$i]);
            }
        }

    }

    private function buyProduct($userID, $productName, $productSection, $days) {

        $user = User::where('id', '=', $userID)->first();
        
        if ($user) {

            $userPlans = $this->getUserPlans($userID);


            $productRealName = $this->getProductRealName($productName);

            $productExpirationDate = $this->getProductDateExpiration($userPlans, $productRealName);

            $newExpirationDate = new DateTime($productExpirationDate . ' + '. $days .' day');
            $newExpirationDate = $newExpirationDate->format('Y-m-d');

            $userPlans[$productSection][$productRealName] = $newExpirationDate;

            // echo "<br/>productExpirationDate: " . $productExpirationDate . "<br/>";
            // echo "<br/>newExpirationDate: " . $newExpirationDate . "<br/>";
            // echo "<br/>Product Section: " . $productSection . "<br/>";
            // echo "<br/>Product Name: " . $productName . "<br/>";

            // echo("<br/><br/>userPlans<br/>");
            // print_r($userPlans);

            $this->updateUserPlans($userID, $userPlans);


        }
    }

    private function buyPortal($userID, $postdata) {

        $this->log('Kupuje portal! userID: ' . $userID);

        $user = User::where('id', '=', $userID)->first();

        
        if ($user) {

            $paymentData = explode('_', $postdata['custom']);
            $portalAdmin = $paymentData[2];

            $portalBought = new LmsUserPortalPaid();

            $portalBought->user = $userID;
            $portalBought->portal_admin = $portalAdmin;
            $portalBought->paid = 1;
            $portalBought->save();

            $this->log('Dodaje nowy wpis do LmsUserPortalPaid: userID: ' . $userID . ', portal admin: ' . $portalAdmin);

            $lmsInfo = LmsInfo::where('user_id', '=', $portalAdmin)->first();
            if ($lmsInfo && $lmsInfo->portal_bought_mail_template != '') {
                $mailer = new PortalBoughtMail();

                $userPortalData = LmsUserPortal::where('user', '=', $userID)
                                            ->where('portal_admin', '=', $portalAdmin)
                                            ->first();

                $username = "";
                if ($userPortalData) {
                    $username = $userPortalData->user_name;
                }

                $mailData = array(
                    "username" => $username,
                    "owner_id" => $portalAdmin,
                    "paymentMethodPl" => 'pay-pal',
                    "paymentMethodEn" => 'pay-pal',
                    "mail_template" => $lmsInfo->portal_bought_mail_template,
                    "sender" => $lmsInfo->paypal_mail
                );
                $mailer->sendPortalBoughtMail( $mailData, $user->email );

            } else {
                $this->log('Portal admin nie ma templatki po kupnie, nie wysyłam maila');
            }

        } else {
            $this->log('Nie znaleziono usera w bazie danych');
        }
    }

    private function getLocaleByCurrency($currency) {
        $allPricesData = config('prices');

        foreach ($allPricesData as $pricesKey => $priceData) {
            if (isset($priceData['currency'])) {
                if ($priceData['currency'] == $currency) {
                    return $pricesKey;
                }   
            }
        }

        return 'en';
    }

    private function txnIsDuplicate($payment, $txn_id, $post_string)
    {
        $txnCheck = Payments::where('txn_id', '=', $txn_id)->count();
        // check if someone wants to duplicate payment
        if ($txnCheck > 0) {
            $this->log('ALERT, payment duplication, txn_id: ' . $txn_id);

            // update invoice row
            $payment->payment_data = $post_string;
            $payment->payment_status = 'completed';
            // $payment->payment_result = $result;
            // $payment->invoice_id = $new_invoice_id;
            // $payment->year = $actual_year;
            // $payment->price = $post_price;
            // $payment->txn_id = $postdata['txn_id'];

            $payment->save();

            return true;
        }

        return false;
    }

    public function update_payment_status($result, $postdata) {


        $this->log("update_payment_status!");

        // get hash
        $hash = isset($postdata['custom']) ? $postdata['custom'] : 'undefined';
        // $hash = $database->mysql_conn->real_escape_string($hash);

        $this->log("hash: " . $hash);

        $post_string = 'cmd=_notify-validate';

        foreach($postdata as $key => $val) {
            $post_string .= "&$key=".urlencode($val);
        }

        $post_price = $postdata['mc_gross'];

        $userID = -1;

        // get and update payment status
        if ($hash != 'undefined') {

			$payment = Payments::where('hash', '=', $hash)->first();

            if ($payment) {
                $userID = $payment['user_id'];

                $this->log('UserID: ' . $userID);

                if ( $this->txnIsDuplicate($payment, $postdata['txn_id'], $post_string) ) {
                    $payment->payment_data = $post_string;
                    $payment->payment_status = 'duplicate';
                    $payment->payment_result = $result;
                    $payment->price = $post_price;
                    $payment->txn_id = $postdata['txn_id'];

                    $payment->save();
                    return -1;
                }

                $paymentLocale = strtolower( $payment->locale );
                if ($paymentLocale == '') {
                    $paymentLocale = $this->getLocaleByCurrency($payment->currency);
                }

                $this->_option = config('prices.' . $paymentLocale);

                // get actual year
                $actual_year = date('Y', time());

                // query for last invoice id
                $last_invoice_id = Payments::where('year', '=', $actual_year)->max('invoice_id');
                // $last_invoice_id_q = $database->query("SELECT MAX(`invoice_id`) as `last_invoice_id` FROM `payments` WHERE `year` = $actual_year");

                // set new invoice id basing on last one, or start over if its a new year
                if (!$last_invoice_id) {
                    $new_invoice_id = 1;
                } else {
                	$new_invoice_id = $last_invoice_id + 1;
                }

                // get payment id for next query
                $paymentID = $payment['id'];

                // update invoice row
                $payment->payment_data = $post_string;
                $payment->payment_status = 'completed';
                $payment->payment_result = $result;
                $payment->invoice_id = $new_invoice_id;
                $payment->year = $actual_year;
                $payment->price = $post_price;
                $payment->txn_id = $postdata['txn_id'];

                $payment->save();

                // if its not a portal access payment - generate invoice
                if (!$this->isPortal($postdata['item_name'])) {

                    // get invoiceData for invoice generator
                    $invoiceUserData = $payment['invoice_data'];

                    // set payment number for invoice generator
                    $payment_number = $new_invoice_id . '/' . $actual_year;


                    // generate invoice for user
                    $this->generate_invoice($postdata['item_name'], $postdata, $userID, $payment_number, $invoiceUserData);


                    // program partnerski
                    $pprogramData = Pprogram::where('user_id', '=', $userID)->first();
                    if ($pprogramData) {
                        $pprogramData->buy = 1;
                        $pprogramData->save();

                        $pprogramId = $pprogramData->id;

                        $newAffiliatePaymentRow = new PprogramPaid();
                        $newAffiliatePaymentRow->pprogram_id = $pprogramId;
                        $newAffiliatePaymentRow->payments_id = $paymentID;
                        $newAffiliatePaymentRow->paid = 1;
                        $newAffiliatePaymentRow->save();
                    }
                }
            }
        }

        // we dont have passed hash in our database, so insert new row with missing information (just in case)
        if ($userID == -1) {

            $selectedProduct = isset($postdata['item_name']) ? $postdata['item_name'] : 'undefined';

            $newPayment = new Payments();
            $newPayment->user_id = $userID;
            $newPayment->product = $selectedProduct;
            $newPayment->payment_status = 'missing';
            $newPayment->payment_result = $result;
            $newPayment->payment_data = $post_string;
            $newPayment->hash = $hash;
            $newPayment->save();
        }

        return $userID;
    }

    private function isPortal($productName) {
        // if ($productName == 'access_to') {
        //     return true;
        // }
        // return false;
        $result = substr($productName, 0, 9);
        if ($result === 'access_to') {
            return true;
        }
        return false;
    }

    private function generate_invoice($product, $postdata, $userID, $paymentID, $invoiceUserData) {

        try {
            $productFullName = $this->_option[$product]['name'];
            $productPrice = $postdata['mc_gross'];
            $currency = $postdata['mc_currency'];

            // $user_data = $database->query("SELECT * FROM `users` WHERE `user_id`='$userID' LIMIT 1");
            $user = User::where('id', '=', $userID)->first();

            if ($user) {

                $date_string = date('d F Y', time());




                $code  = '<html>'."\n";
                $code .= '<head>'."\n";
                $code .= '<style>body{margin:0;padding:0;font-family:\'calibri\'}.clear{clear:both}#wrapper{width:800px;margin:0 auto;height:800px}#header{width:100%;height:40px;text-align:center;line-height:40px;font-size:22px;background:#f5f5f5;color:#333;font-weight:bold}#ourcompanyinfo{float:left}#invoiceinfo{float:right;text-align:right;margin-top:50px;margin-right:35px}#ourcompanyinfo,#billingcompanyinfo{text-align:center;width:400px;text-align:left}#billingcompanyinfo{margin-top:20px}#ourcompanyinfo p,#billingcompanyinfo p,#invoiceinfo p{padding:0 0 2px 35px;margin:0;font-size:15px}#ourcompanyinfo img{margin:10px 0}.invoice-table{width:700px;border:1px solid #ccc;margin:40px auto;border-collapse:collapse}.invoice-table thead{background:#c5d2db;font-size:18px;font-weight:bold}.invoice-table td{border:1px solid #7fa1b7;padding:12px}#total{font-weight:bold;font-size:20px;margin-bottom:60px}.extras{text-align:center}hr{margin:20px;border:0;border-top:1px solid #eee;border-bottom:1px solid #fff}#footer{color:#AAA;font-size:14px;margin-top:20px;text-align:center}</style>'."\n";
                $code .= '<meta charset="utf-8">'."\n";
                $code .= '</head>'."\n";
                $code .= '<body>'."\n";
                $code .= '<div id="wrapper">'."\n";
                $code .= '<div id="header">INVOICE</div>'."\n";
                $code .= '<div id="ourcompanyinfo">'."\n";
                $code .= '<p><img src="../../../../../assets/img/logo_big.png" /></p>'."\n";
                $code .= '<p><strong>DARKAN-SOFT LTD</strong></p>'."\n";
                $code .= '<p>Registration No.: 8331877</p>'."\n";
                $code .= '<p>590 Kingston Road</p>'."\n";
                $code .= '<p>London SW20 8DN</p>'."\n";
                $code .= '<p>United Kingdom</p>'."\n";
                $code .= '<p>office@darkan.eu</p>'."\n";
                $code .= '</div>'."\n";
                $code .= '<div id="invoiceinfo">'."\n";
                $code .= '<p style="font-size:20px"><strong>INVOICE</strong></p>'."\n";
                $code .= '<p>No. '. $paymentID .'</p>'."\n";
                $code .= '<p>'. $date_string .'</p>'."\n";
                $code .= '</div>'."\n";
                $code .= '<div class="clear"></div>'."\n";
                $code .= '<div id="billingcompanyinfo">'."\n";
                $code .= '<p><strong>Bill To</strong></p>'."\n";
                $code .= '<p>'. $user['email'] .'</p>'."\n";
                if ($this->isJson($invoiceUserData)) {
                    $IUDDecoded = json_decode($invoiceUserData, true);

                    foreach ($IUDDecoded as $fieldName => $userInputValue) {
                        $code .= '<p>'. $IUDDecoded[$fieldName] .'</p>'."\n";
                    }
                }

                $code .= '</div>'."\n";
                $code .= '<table id="products" class="invoice-table">'."\n";
                $code .= '<thead>'."\n";
                $code .= '<td style="width:550px">'."\n";
                $code .= 'Description'."\n";
                $code .= '</td>'."\n";
                $code .= '<td>'."\n";
                $code .= 'Amount'."\n";
                $code .= '</td>'."\n";
                $code .= '</thead>'."\n";
                $code .= '<tbody>'."\n";
                $code .= '<tr>'."\n";
                $code .= '<td style="width:550px">'."\n";
                $code .= $productFullName."\n";
                $code .= '</td>'."\n";
                $code .= '<td>'."\n";
                $code .= $productPrice.' ' . $currency ."\n";
                $code .= '</td>'."\n";
                $code .= '</tr>'."\n";
                $code .= '</tbody>'."\n";
                $code .= '</table>'."\n";
                $code .= '<table id="total" class="invoice-table">'."\n";
                $code .= '<tbody>'."\n";
                $code .= '<tr>'."\n";
                $code .= '<td style="width:550px">'."\n";
                $code .= 'Total'."\n";
                $code .= '</td>'."\n";
                $code .= '<td>'."\n";
                $code .= $productPrice.' ' . $currency ."\n";
                $code .= '</td>'."\n";
                $code .= '</tr>'."\n";
                $code .= '</tbody>'."\n";
                $code .= '</table>'."\n";
                $code .= '<hr/>'."\n";
                $code .= '<div class="extras">'."\n";
                $code .= '********** with compliments **********'."\n";
                $code .= '</div>'."\n";
                $code .= '<div class="extras">'."\n";
                $code .= 'Payment received by PayPal online transfer'."\n";
                $code .= '</div>'."\n";
                $code .= '<div class="extras">'."\n";
                $code .= 'Thank you for doing business with us'."\n";
                $code .= '</div>'."\n";
                $code .= '<div id="footer">'."\n";
                $code .= 'Registration No.: 08331877. Registered in UK - registered address as above.'."\n";
                $code .= '</div>'."\n";
                $code .= '</div>'."\n";
                $code .= '</body>'."\n";
                $code .= '</html>';

                $app_version = env('app_version');

                // if (!file_exists('../../app/'. $app_version .'/projects/'. $userID . '/invoice/')) {
                //     mkdir('../../app/'. $app_version .'/projects/'. $userID . '/invoice/');
                // }

                if (!file_exists(storage_path('/app/projects/'. $userID))) {
                    mkdir(storage_path('/app/projects/'. $userID));
                }
                if (!file_exists(storage_path('/app/projects/'. $userID . '/invoice/'))) {
                    mkdir(storage_path('/app/projects/'. $userID . '/invoice/'));
                }

                $invoiceHtmlPath = storage_path('/app/projects/'. $userID . '/invoice/invoice.html');
                $invoicePdfPath = storage_path('/app/projects/'. $userID . '/invoice/invoice.pdf');

                $html_file = fopen($invoiceHtmlPath, 'w');
                fwrite($html_file, $code);
                fclose($html_file);

                exec('wkhtmltopdf '. $invoiceHtmlPath .' '. $invoicePdfPath);

                $this->send_mail_with_invoice($product, $userID);
            }

        } catch (Exception $e) {
            // $err = $database->mysql_conn->prepare("INSERT INTO `errors` 
            //                     (
            //                         `data`
            //                     ) 
            //                     VALUES (?)");
            // $err->bind_param('s', $e);
            // $err->execute();
        }

            
    }

    private function send_mail_with_invoice($product, $userID) {
        global $database, $app_version;

        $user = User::where('id', '=', $userID)->first();

        if ($user) {


            $invoicePdfPath = storage_path('/app/projects/'. $userID . '/invoice/invoice.pdf');

            $mailData = array(
                    'pdf' => $invoicePdfPath
            );

            $mailer = new PaymentCompletedMail();
            $mailer->sendConfirmationMail($mailData, $user->email);


            // require_once '../lang/php/' . $user['lang'] . '.php';
            
            // $message = '<h1>' . $lang['INVOICE_HEADER'] . '</h1>' . "\n";
            // $message .= "<hr />";
            // $message .= '<p><strong>' . $lang['INVOICE_MESSAGE'] . '</strong></p>' . "\n";

            // $message .= "<hr />";
            // $message .= '<p>' . $lang['REGISTER_MAIL_FOOTER'] . '</p>' . "\n";


            // $email = new PHPMailer();
            // $email->From      = 'office@darkan.eu';
            // $email->FromName  = 'Darkan';
            // $email->Subject   = $lang['INVOICE_SUBJECT'];
            // $email->Body      = $message;

            // $email->CharSet = "UTF-8";
            // $email->IsHTML( true );
            // $email->AddAddress( $user['login'] );

            // $file_to_attach = '../../app/'. $app_version .'/projects/'. $userID . '/invoice/invoice.pdf';

            // $email->AddAttachment( $file_to_attach , 'invoice.pdf' );


            // $email->Send();


            // $alertEmail = new PHPMailer();
            // $alertEmail->From      = 'office@darkan.eu';
            // $alertEmail->FromName  = 'Darkan';
            // $alertEmail->Subject   = 'Ktos kupil darkana!';
            // $alertEmail->Body      = $message;

            // $alertEmail->CharSet = "UTF-8";
            // $alertEmail->IsHTML( true );
            // $alertEmail->AddAddress( 'p.wiecaszek@rapsody.com.pl' );

            // $alert_file_to_attach = '../../app/'. $app_version .'/projects/'. $userID . '/invoice/invoice.pdf';

            // $alertEmail->AddAttachment( $alert_file_to_attach , 'invoice.pdf' );


            // $alertEmail->Send();
        }
    }

    private function getPortalMerchant($postdata)
    {
        try {
            $paymentData = explode('_', $postdata['custom']);
            $portalAdmin = $paymentData[2];

            $lmsSettings = LmsInfo::where('user_id', '=', $portalAdmin)->first();
            if ($lmsSettings) {
                $this->log('Wykryto inny paypal email: ' . $lmsSettings->paypal_mail);
                return $lmsSettings->paypal_mail;
            }
    
        } catch(Exception $e) {
            $this->log('Wystapil blad w getPortalMerchant: ' . $e->getMessage());
        }

        return $this->_merchant;
    }
    
    private function verifyPortalPayment($postdata) {
        if ($postdata['payment_status'] == 'Completed') {
            $merchant = $this->getPortalMerchant($postdata);
            // sprawdzic czy email sprzedawcy sie zgadza
            if ($postdata['receiver_email'] == $merchant) {
                // sprawdz czy opcja zgadza sie z jej cena i czy waluta jest prawidlowa
                if ($this->checkPortalPriceAndCurrency($postdata)) {
                    return true;
                } else {
                    $this->log('Currency sie nie zgadza? currency: ' . $postdata['mc_currency'] . ', w thisie: ' . $this->_option['currency']);
                }
            } else {
                $this->log('Merchant sie nie zgadza. Z posta: ' . $postdata['receiver_email'] . ', powinien byc: ' . $merchant);
            }
        } else {
            $this->log('Status jest inny niz Completed! Status: ' . $postdata['payment_status']);
        }
        return false;
    }
    
    private function checkPortalPriceAndCurrency($postdata) {
        // get hash
        $this->log('Portal Payment - checking produt and price...');
        $hash = isset($postdata['custom']) ? $postdata['custom'] : 'undefined';
        $hash = $hash;

        $post_price = $postdata['mc_gross'];
        $this->log('checkPortalPriceAndCurrency post_price: ' . $post_price);

        // get and update payment status
        if ($hash != 'undefined') {
            $paymentData = Payments::where('hash', '=', $hash)->first();
        
            if ($paymentData) {
                if ($paymentData['price'] == $post_price && $postdata['mc_currency'] == $paymentData['currency']) {
                    $this->log('checkPortalPriceAndCurrency - wszystko sie zgadza');
                    return true;
                } else {
                    $this->log('Cena lub waluta sie nie zgadzaja z tym co w bazie!');
                    $this->log('Cena w bazie: ' . $paymentData['price'] . ', przyszlo: ' . $post_price);
                    $this->log('Waluta w bazie: ' . $paymentData['currency'] . ', przyszlo: ' . $postdata['mc_currency']);
                }
            } else {
                $this->log('Nie ma takiego payment data w bazie, hash: ' . $hash);
            }
        } else {
            $this->log('Hash nie przyszedl od paypala.');
        }
        $this->log('checkPortalPriceAndCurrency dupa...');
        return false;
    }

    private function log($msg) {
        echo '<br/>' . $msg . '<br/>';
        $date = date('Y-m-d H:i:s');
        $logsLine = $date . ' ('. $this->_logUserID.')' . ": " . $msg;
        file_put_contents(storage_path('app/paypal/logs.txt'), $logsLine . "\n", FILE_APPEND);

    }
	
	private function verify($result, $postdata) {
		if ($postdata['payment_status'] == 'Completed') {
                $this->log("Payment status: " . $postdata['payment_status']);
				// sprawdzic czy to nasz email sprzedawcy
				if ($postdata['receiver_email'] == $this->_merchant) {
                    $this->log("receiver_email: " . $postdata['receiver_email']);
					// sprawdz czy opcja zgadza sie z jej cena i czy waluta jest prawidlowa
					if ($this->check_product_and_price($postdata) && $postdata['mc_currency'] === $this->_option['currency']) {
						return true;
					}
				}
		}
		return false;
	}
	
	private function check_product_and_price($postdata) {
        // $hash = $postdata['custom'];
        // $originalPrice = $this->_option[$postdata['item_name']]['price'];
        // $paypalReturnPrice = $postdata['mc_gross'];
        // $productName = $postdata['item_name'];
      
        $this->log("mc_gross: " . $postdata['mc_gross']);
        $this->log($postdata['mc_gross'] . " == " . $this->_option[$postdata['item_name']]['price']);

        if ($postdata['mc_gross'] == $this->_option[$postdata['item_name']]['price']) {
            return true;
        } else {
            //if ($hashCode = $postdata['mc_gross'];
            return $this->check_discount_price($postdata);

            
            // return true;
        }
	}

    private function check_discount_price($postdata) {
        
        $this->log("Cena sie nie zgadza, sprawdzam czy byly jakies upusty...");

        $hash = $postdata['custom'];
        $originalPrice = $this->_option[$postdata['item_name']]['price'];
        $paypalReturnPrice = $postdata['mc_gross'];
        $productName = $postdata['item_name'];

        $hashArray = explode('_', $hash);
        if ( count($hashArray) == 3 ) {
            $promoCode = $hashArray[2];

            $this->log("Wykorzystano kod promocyjny: " . $promoCode);

            $promoCodeData = PromoCode::where('product', '=', $productName)->where('code', '=', $promoCode)->first();
            if ($promoCodeData) {

                $this->log("Zneleziono kod promocyjny: " . $promoCodeData->code);

                $discountPrice = $promoCodeData->discount_price;

                if ($paypalReturnPrice == $discountPrice) {
                    $this->log("Ceny sie zgadzaja!");

                    $codeUse = new PromoCodeUses();
                    $codeUse->user_id = $this->_logUserID;
                    $codeUse->code_id = $promoCodeData->id;
                    $codeUse->save();

                    return true;
                } else {
                    $this->log("Ceny sie nie zgadzaja! (" . $paypalReturnPrice ." == ". $discountPrice .")" );
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

}