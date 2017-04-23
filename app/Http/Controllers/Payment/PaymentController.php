<?php

namespace App\Http\Controllers\Payment;

use DB;
use Auth;
use Session;
use Input;
use Redirect;
use App\Http\Controllers\Controller;
use App\Modules\Models\PlansToPriceList;
use App\Modules\Models\PriceTypes;
use App\Modules\Models\PlansCosts;
use App\Modules\Models\Plans;
use App\Modules\Models\PromoCodes;
use App\Modules\Models\PlansUsers;
use App\Modules\Models\Roles;
use App\Modules\Models\PricePlanOptions;
use App\Modules\Models\SalesCoupons;
use App\Modules\Models\PlansUsersToSalesCoupons;
use App\Http\Requests\Price\Buy\BuyNowPlanRequest;
use App\Http\Requests\Price\Buy\BuyNowPlanOptionRequest ;
use App\Http\Requests\Price\Buy\BuyNowPlanSummaryRequest;
use App\Http\Requests\Price\Buy\BuyOptionNowSummaryRequest;
use App\Http\Requests\Price\Buy\BuyPlanBySalesCouponRequest;

use Carbon\Carbon;
use Carbon\CarbonInterval;
use DateTime;
use stdClass;

use App\Modules\Models\Clients\ClientsCities;
use App\Modules\Models\Clients\ClientsZipCodes;
use App\Modules\Models\Clients\ClientsAddresses;

use App\Modules\Plans\UserPlanModule;


class PaymentController extends Controller
{
    protected $version_id = 1;
    protected $currency_id = 1;
	protected $accessRolesBuyPlanIds = [3];


    public function buyPlanNowSummary(BuyNowPlanSummaryRequest $request){

        $user = Auth::user();

        if(!$user){
            return Redirect::back()->withErrors(['Aby móc kupić plan musisz się zalogować']);
        }

        $plan = $this->getPlan($request->plan_id, 4);

        if(!$plan){
            return Redirect::back()->withErrors(['Wybrany plan nie jest już aktywny']);
        }
                                

        $promoCode = $this->getPromoCode($request->promo_code);
        if(!$promoCode){
            return Redirect::back()->withErrors(['Wybrany kod promocyjny nie jest już aktywny']);
        }

        $planCostModel = $this->getPlanCost($plan);
        if(!$planCostModel){
            return Redirect::back()->withErrors(['Wybrany plan nie ma przypisanej ceny']);
        }

        $planCost = $planCostModel->cost;

        $rabatPercent = $promoCode->rabat;
        $rabatValue = 0;
        $rabatValue =  ($rabatPercent / 100) * $planCost;

        $planCostWithRabat = $planCost - $rabatValue;

        $startDate =  $this->getPlanStartDate();
        $expirationDate =  $this->getPlanExpiretionDate($startDate, $plan);

        return view('pricing.pricing_buy_now_summary')
                        ->with('plan', $plan)
                        ->with('promoCode', $promoCode)
                        ->with('planCostModel', $planCostModel)
                        ->with('rabatPercent', $rabatPercent)
                        ->with('rabatValue', $rabatValue)
                        ->with('planCost', $planCost)
                        ->with('planCostWithRabat', $planCostWithRabat)
                        ->with('startDate', $startDate)
                        ->with('expirationDate', $expirationDate);
    }

    public function buyOptionNowSummary(BuyOptionNowSummaryRequest $request){


        $user = Auth::user();

        if(!$user){
            return Redirect::back()->withErrors(['Aby móc kupić plan musisz się zalogować']);
        }

        $userPlan = UserPlanModule::getUserPlan();

        if(!$userPlan){
            return view('pricing.pl.no_acces_to_price_option');
        }

        $planOption = $this->checkAccessToPlansOption($request->plan_option_id);

        if(!$planOption){
            return view('pricing.pl.no_acces_to_price_option');
        }

        $optionCost = $this->getPlanOptionCost($planOption);

        if(!$optionCost){
            return view('pricing.pl.no_acces_to_price_option');
        }


        return view('pricing.pricing_buy_option_now_summary')
                        ->with('userPlan', $userPlan)
                        ->with('planOption', $planOption)
                        ->with('optionCost', $optionCost)
                        ->with('planOptionName', $request->plan_option_name)
                        ->with('planOptionValue', $request->plan_option_value);
    }

    protected function getPlanOptionCost($planOption){

        return $planOption->planOptionCosts;
    }

    protected function checkAccessToPlansOption($planOptionId){

        return PricePlanOptions::where('version_id', '=', $this->version_id)
                                ->where('id', '=', $planOptionId)
                                ->where('show', '=', true)
                                ->first();
    }
    

    public function buyPlanBySalesCoupon(BuyPlanBySalesCouponRequest $request){
       // return $request->all();

        $user = Auth::user();

        if(!$user){
            return Redirect::back()->withErrors(['Aby móc kupić plan musisz się zalogować']);
        }

        $salesCoupon = SalesCoupons::where('code', '=', $request->code)
                                    ->first();

        $plansUsersToSalesCoupons = PlansUsersToSalesCoupons::where('sales_coupon_id', '=', $salesCoupon->id)->first();

        if($plansUsersToSalesCoupons){
            return Redirect::back()->withErrors(['Wpisany kupon jest nieprawidłowy']);
        }

        $plan = Plans::where('id', '=', $salesCoupon->plan_id)
                                    ->where('active', '=', 1)
                                    ->first();

        if(!$plan){
            return Redirect::back()->withErrors(['Wybrany plan nie jest już aktywny']);
        }

        $planCost = $salesCoupon->cost;
        $planCostWithRabat = $salesCoupon->cost;

        $startDate =  $this->getPlanStartDate();
        $expirationDate =  $this->getPlanExpiretionDate($startDate, $plan);


        // $plansUsers = PlansUsers::firstOrNew([
        //     'user_id' => $user->id,
        //     'plan_id' => $plan->id
        // ]);

        $options = $this->margePlansOptions($plan);

        $plansUsers = new PlansUsers();
        $plansUsers->plan_id = $plan->id;
        $plansUsers->user_id = $user->id;
        $plansUsers->paying_user_id = $user->id;
        $plansUsers->created_by_user_id = $user->id;
        $plansUsers->promo_code_id = 1;
        $plansUsers->plan_cost_to_pay = $planCost;
        $plansUsers->plan_cost_to_pay_with_rabat = $planCostWithRabat;
        $plansUsers->start_date = $startDate;
        $plansUsers->expiration_date = $expirationDate;
        $plansUsers->currency_id = 1;
        $plansUsers->plan_options = json_encode($options);
        $plansUsers->session_id = Session::getId();
        $plansUsers->paid = true;
        $plansUsers->active = true;

        $plansUsers->save();

        PlansUsersToSalesCoupons::create([
            'plan_user_id' => $plansUsers->id,
            'sales_coupon_id' => $salesCoupon->id
        ]);


        return redirect('profile');
    }


    public function buyPlanNow(BuyNowPlanRequest $request){
        //return $request->all();

        $user = Auth::user();

        if(!$user){
            return Redirect::back()->withErrors(['Aby móc kupić plan musisz się zalogować']);
        }

        $roleId = $user->roleUser->role_id;

        if(!$this->checkAccessToBuyPlan( $roleId )){
            return Redirect::back()->withErrors(['Nie masz uprawnień do kupna planu']);
        }

        $plan = $this->getPlan($request->plan_id, 4);

        if(!$plan){
            return Redirect::back()->withErrors(['Wybrany plan nie jest już aktywny']);
        }
                                

        $promoCode = $this->getPromoCode($request->promo_code);
        if(!$promoCode){
            return Redirect::back()->withErrors(['Wybrany kod promocyjny nie jest już aktywny']);
        }

        $planCostModel = $this->getPlanCost($plan);
        if(!$planCostModel){
            return Redirect::back()->withErrors(['Wybrany plan nie ma przypisanej ceny']);
        }

        $planCost = $planCostModel->cost;

        $rabatPercent = $promoCode->rabat;
        $rabatValue = 0;
        $rabatValue =  ($rabatPercent / 100) * $planCost;

        $planCostWithRabat = $planCost - $rabatValue;

        $startDate =  $this->getPlanStartDate();
        $expirationDate =  $this->getPlanExpiretionDate($startDate, $plan);


        $plansUsers = PlansUsers::firstOrNew([
            'user_id' => $user->id,
            'plan_id' => $plan->id
        ]);

        // $plansUsersCount = PlansUsers::where('session_id', '=', Session::getId())->get();

        // if(count($plansUsersCount) > 0){

        //     return view('register.register_error_sesion');
        // }

        $options = $this->margePlansOptions($plan);

        $plansUsers = new PlansUsers();
        $plansUsers->plan_id = $plan->id;
        $plansUsers->user_id = $user->id;
        $plansUsers->paying_user_id = $user->id;
        $plansUsers->created_by_user_id = $user->id;
        $plansUsers->promo_code_id = $promoCode->id;
        $plansUsers->plan_cost_to_pay = $planCost;
        $plansUsers->plan_cost_to_pay_with_rabat = $planCostWithRabat;
        $plansUsers->start_date = $startDate;
        $plansUsers->expiration_date = $expirationDate;
        $plansUsers->currency_id = $this->currency_id;
        $plansUsers->plan_options = json_encode($options);
        $plansUsers->session_id = Session::getId();
        $plansUsers->save();

        $clientAddress = $this->saveClientAddress($user, $request);

        $plansUsers->save();

        $responce = $this->makePayment($user, $planCostWithRabat, $plan, $plansUsers, $request);

        if(isset($responce['error'])){

            return view('pricing.payment_error')->with('responce', $responce);

        }else{

            return Redirect::to($responce);
        }
    }

    public function buyPlanOptionNow(BuyNowPlanOptionRequest $request){
  
        $user = Auth::user();

        if(!$user){
            return Redirect::back()->withErrors(['Aby móc kupić plan musisz się zalogować']);
        }

        $roleId = $user->roleUser->role_id;

        if(!$this->checkAccessToBuyPlan( $roleId )){
            return Redirect::back()->withErrors(['Nie masz uprawnień do kupna planu']);
        }

        $planOption = $this->checkAccessToPlansOption($request->plan_option_id);

        if(!$planOption){
            return view('pricing.pl.no_acces_to_price_option');
        }

        $optionCost = $this->getPlanOptionCost($planOption);

        if(!$optionCost){
            return view('pricing.pl.no_acces_to_price_option');
        }

        $planCost = $optionCost->cost;


        // $plansUsersCount = PlansUsers::where('session_id', '=', Session::getId())->get();

        // if(count($plansUsersCount) > 0){

        //     return view('register.register_error_sesion');
        // }

        $userPlan = UserPlanModule::getUserPlan();

        if(!$userPlan){
            return view('pricing.pl.no_acces_to_price_option');
        }

        $responce = $this->makePlanOptionPayment($planOption->name, $request->plan_option_value, $userPlan);

        if(isset($responce['error'])){

            return view('pricing.payment_error')->with('responce', $responce);

        }else{

            return Redirect::to($responce);
        }
    }

    private function margePlansOptions($plan) {

        $options = new stdClass();

        foreach ($plan->plansToPlansOptions as $plansToPlansOption ) {

            $currentOptions = json_decode($plansToPlansOption->plansOptions->options);

            $options = (object) array_merge((array) $options, (array) $currentOptions);
        }

        return $options;
    }

    private function getPlanCost($plan)
    {
        $planCost = PlansCosts::where('version_id', '=', $this->version_id)
                            ->where('currency_id', '=', $this->currency_id)
                            ->where('plan_id', '=', $plan->id)
                            ->first();

        return $planCost;
    }

    private function getPromoCode($promoCodeId)
    {
        $promoCode = PromoCodes::where('code', '=', $promoCodeId)
                                    ->where('active', '=', 1)
                                    ->first();

        if(!$promoCode){
            return false;
        }

        if($promoCode->code == '*'){
            return $promoCode;
        }

        if($promoCode->limit_enabled == 0){
            return $promoCode;
        }

        if(count($promoCode->plansUsers) < $promoCode->limit){

            if($promoCode->date_enabled == 0){
                return $promoCode;
            }

            $expirationResult = $this->getExpirationResult($promoCode->start_date, $promoCode->expiration_date);

            if(!$expirationResult){
               return false;
            }   

            return $promoCode;

        }else{
            return false;
        }
    }

    private function getPlan($planId, $role_id)
    {
        $plan = Plans::where('id', '=', $planId)
                                    ->where('active', '=', 1)
                                    //->where('role_id', '=', $role_id)
                                    ->where('for_admin_only', '=', 0)
                                    ->where('version_id', '=', $this->version_id)
                                    ->first();

        if(!$plan){
            return false;
        }

        if($plan->limit_enabled == 0){
            return $plan;
        }

        if($plan->used < $plan->limit){

            if($plan->date_enabled == 0){
                return $plan;
            }

            $expirationResult = $this->getExpirationResult($plan->start_date, $plan->expiration_date);

            if(!$expirationResult){
               return false;
            }   

            return $plan;

        }else{
            return false;
        }
    }

    private function getExpirationResult($startDate, $expirationDate) {

        $now = time();
        $first = DateTime::createFromFormat('Y-m-d H:i:s', $startDate)->getTimestamp();
        $second = DateTime::createFromFormat('Y-m-d H:i:s', $expirationDate)->getTimestamp();

        if ($now >= $first && $now <= $second)
        {
            return true;
        }

        return false;
    }

    private function getPlanStartDate()
    {

        $plansUsers = PlansUsers::where('user_id', '=', Auth::user()->id)
                                    ->where('paid', '=', true)
                                    ->where('active', '=', true)
                                    ->get();

        if(count($plansUsers) == 0){
            Carbon::now();
        }

        $expirationDate = Carbon::now();

        $last = time();

        foreach ($plansUsers as $planUser) {
            $timestamp = DateTime::createFromFormat('Y-m-d H:i:s', $planUser->expiration_date)->getTimestamp();

            if($timestamp > $last){

                $dt = Carbon::parse($planUser->expiration_date);

                $dt->addSecond();

                $expirationDate = $dt;

                $last = $timestamp;
            }
        } 
        
        return $expirationDate;
    }

    private function getPlanExpiretionDate($start_date, $plan) {

        $startDate = Carbon::createFromFormat('Y-m-d H:i:s', $start_date);

        switch ($plan->plans_period_type_id) {
            case 1:
                $expirationDate =  $startDate->addDays($plan->period);
                break;

            case 2:
                $expirationDate =  $startDate->addWeeks($plan->period);
                break;

            case 3:
                $expirationDate =  $startDate->addMonths($plan->period);
                break;

            case 4:
                $expirationDate =  $startDate->addYears($plan->period);
                break;
            
            default:
                $expirationDate =  $startDate;
                break;
        }

        return $expirationDate;
    }

    private function saveClientAddress($user, $request)
    {
        $clientCitie = ClientsCities::firstOrNew(['city' => $request->city]);
        $clientCitie->city = $request->city;
        $clientCitie->save();

        $clientZipCode = ClientsZipCodes::firstOrNew(['zip' => $request->zip]);
        $clientZipCode->zip = $request->zip;
        $clientZipCode->save();

        $clientAddress = ClientsAddresses::firstOrNew(['user_id' => $user->id,
                                                        'city_id' => $clientCitie->id, 
                                                        'zip_code_id' => $clientZipCode->id,
                                                        'address' => $request->address,
                                                        'email' => $request->email
                                                       ]);
        $clientAddress->user_id = $user->id;
        $clientAddress->city_id = $clientCitie->id;
        $clientAddress->zip_code_id = $clientZipCode->id;
        $clientAddress->address = $request->address;
        $clientAddress->email = $request->email;
        $clientAddress->save();

        return $clientAddress;
    }

    private function makePayment($user, $planCostWithRabat, $plan, $plansUsers, $request)
    {

        $plansUsers->paid = true;
        $plansUsers->active = true;
        $plansUsers->save();


        return url('/');

        // $MERCHANT_ID = Config::get('przelewy24.merchantId');  // - identyfikator merchanta
        // $POS_ID = Config::get('przelewy24.posId');  // - pos id
        // $SALT = Config::get('przelewy24.salt');// - wartość CRC
        // $sandbox = Config::get('przelewy24.testMode'); // - jeżeli true nastąpi połączenie z serwerem testowym (sandbox) jeżeli false (domyślne) nastąpi połączenie z serwerem produkcyjnym.


        // $P24 = $this->createPrzelewy24Client($MERCHANT_ID,
        //     $POS_ID,
        //     $SALT,
        //     $sandbox
        // );

        // $P24->addValue('p24_api_version', Config::get('przelewy24.P24_version'));
        // $P24->addValue('p24_session_id', Session::getId());
        // $P24->addValue('p24_amount', $this->calculateCostToP24($planCostWithRabat));
        // $P24->addValue('p24_currency', Config::get('przelewy24.p24_currency'));
        // $P24->addValue('p24_description', $this->cretaep24Description($plansUsers, $user));
        // $P24->addValue('p24_email', $request->p24_email);
        // $P24->addValue('p24_client', $request->p24_client);
        // $P24->addValue('p24_address', $request->p24_address);
        // $P24->addValue('p24_zip', $request->p24_zip);
        // $P24->addValue('p24_city', $request->p24_city);
        // $P24->addValue('p24_country', Config::get('przelewy24.p24_country'));
        // //$P24->addValue('p24_phone', '');
        // //$P24->addValue('p24_language', '');
        
        // $P24->addValue('p24_url_return', url('payment/result'));
        // $P24->addValue('p24_url_status', url('payment/verify'));
        // //$P24->addValue('p24_time_limit', '');
        // $P24->addValue('p24_wait_for_result', 1); // wystła get'a po weryfikacji płatnosci
        // //$P24->addValue('p24_ecod', '');
        // //$P24->addValue('p24_shipping', '');

        // $P24->addValue('p24_name_1', $plan->name);
        // $P24->addValue('p24_description_1', $plan->description);
        // $P24->addValue('p24_quantity_1', 1);
        // $P24->addValue('p24_price_1', $planCostWithRabat);
        // $P24->addValue('p24_number_1', 1);
        // //$P24->addValue('p24_encoding', 'ISO-8859-2');

        // $P24->addValue('p24_transfer_label', $this->cretaep24TransferLabel());

        
        // $formOfPayment = $plan->formOfPayment;

        // if($formOfPayment->name != 'all'){
        //     $P24->addValue('p24_method', $formOfPayment->method);
        // }

        // $responce = $P24->trnRegister(true);

        // if(isset($responce['error'])){

        //     $p24RegisterErrors = new P24RegisterErrors();
        //     $p24RegisterErrors->error = $responce['error'];
        //     $p24RegisterErrors->error_message = $responce['errorMessage'];
        //     $p24RegisterErrors->p24_session_id = Session::getId();
        //     $p24RegisterErrors->plan_user_id = $plansUsers->id;
        //     $p24RegisterErrors->save();
        // }

        // return $responce;
    }

    private function makePlanOptionPayment($planOptionName, $planOptionValue, $userPlan)
    {
        $this->setPlanOptionValue($planOptionName, $planOptionValue, $userPlan);
    }

    protected function getPlanOptionValue($planOptionName, $userPlan){

        $planOptions = json_decode($userPlan->plan_options);

        return isset($planOptions->{$planOptionName}) ? $planOptions->{$planOptionName} : false;
    }

    protected function setPlanOptionValue($planOptionName, $planOptionValue, $userPlan){

        $planOptions = json_decode($userPlan->plan_options);

        if(is_numeric($planOptionValue)){

            $planOptions->{$planOptionName} = (int)$planOptionValue;

        }else if(is_bool(filter_var($planOptionValue, FILTER_VALIDATE_BOOLEAN))){

            $planOptions->{$planOptionName} = (bool)filter_var($planOptionValue, FILTER_VALIDATE_BOOLEAN);
        }

        $userPlan->plan_options = json_encode($planOptions);

        $userPlan->save();
    }

    protected function checkAccessToBuyPlan($role_id) 
    {
        $rolesIdsArray = Roles::wherein('id', $this->accessRolesBuyPlanIds)->pluck('id')->toArray();

        if(!in_array($role_id, $rolesIdsArray)) {
            return false;
        }

        return true;
    }

    public function accountHasExpired()
    {

        if(Session::get('hasPlan')){
            return redirect('/'); 
        }

        return view('pricing.account_has_expired');
  
    }

}
