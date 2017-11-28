<?php namespace App\Modules\User;

use DB;
use Auth;
use App\User;
use App\Modules\Utils\Utils;
use App\Modules\Mailer\RegistrationMail;
use App\Modules\Models\ShareNoExist;
use App\Modules\Models\Share;
use App\Modules\Models\Pprogram;
use App\Role;
use Cookie;
use File;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use DateTime;
use stdClass;
use Session;

use App\Modules\Models\Plans;
use App\Modules\Models\PlansUsers;

class UserRepository {

    protected $version_id = 1;
    protected $currency_id = 1;

    private static $oInstance = false;
  
    public function findOrCreateUser($data) { }

    public function createUser($data, $roleId = 10) { }


    public function checkSharedProjects($login, $userId) {
        $sharedProjects = ShareNoExist::where('mail', '=', $login)->get();

        foreach($sharedProjects as $project) {
            $newSharing = new Share();
            $newSharing->user_id = $userId;
            $newSharing->project_id = $project->project_id;
            $newSharing->save();

            $project->delete();
        }
    }

    public function getUserLanguage() {
        if (Cookie::has('darkanlocale')) {
            return Cookie::get('darkanlocale');
        } else {
            return env('defaultLanguage');
        }
        
    }

    public function createUserDirectory($userId) {
        $userDirectory = storage_path( '/app/projects/' . $userId );

        if (!file_exists($userDirectory)) {
            mkdir($userDirectory);
        }
    }

    public function copyDefaultAvatar($userId) {
        $avatarDirectory = storage_path( '/app/projects/' . $userId . '/avatar/');
        $defaultAvatarDirectory = base_path( '/css/img/default_user.png');

        if (!file_exists($avatarDirectory)) {
            mkdir($avatarDirectory);
        }

        if (file_exists($avatarDirectory)) {
            File::copy( $defaultAvatarDirectory, $avatarDirectory . 'avatar.png' );

            $user = User::find($userId);
            $user->photo = config('app.projects_link') . $userId . '/avatar/avatar.png';
            $user->save();
        }
    }

    public function sendRegistrationMail($registrationData, $receiver) {
        $mailer = new RegistrationMail();
        $mailer->sendRegistrationMail($registrationData, $receiver);
    }

    public function generateHash($login) {
        return hash('md5', $login . time());
    }

    public function checkAffiliateCookie($newUserId) {
        if ( Cookie::has(config('app.affiliateCookieName')) ) {
            $userHash = Cookie::get(config('app.affiliateCookieName'));
            $partnerUser = User::where('hash', '=', $userHash)->first();

            if ($partnerUser) {
                $affiliateRow = Pprogram::where('partner_id', '=', $partnerUser->id)
                                                ->where('user_id', '=', $newUserId)
                                                ->first();
                if (!$affiliateRow) {

                    $newAffiliateRow = new Pprogram();
                    $newAffiliateRow->partner_id = $partnerUser->id;
                    $newAffiliateRow->user_id = $newUserId;
                    $newAffiliateRow->buy = 0;
                    $newAffiliateRow->save();
                }
            }
        }
    }

    protected function generatePassword() 
    {
        return Utils::generatePassword();
    }

    protected function createPassword($password) 
    {
        return (isset($password) && $password != '') ? $password : $this->generatePassword();
    }

    public function attachRole($roleId, $user){
        $registredRole = Role::find($roleId);
        $user->attachRole($registredRole);
    }

    public function addRegistrationPlan($user){

        $registerPlanId = $this->getRegistrationPlanId();
        $plan = $this->getPlan($registerPlanId);
        if(!$plan){
            return Redirect::back()->withErrors(['Wybrany plan nie jest już aktywny']);
        }

        $options = $this->margePlansOptions($plan);

        $startDate =  $this->getPlanStartDate();
        $expirationDate =  $this->getPlanExpiretionDate($startDate, $plan);

        $plansUsers = new PlansUsers();
        $plansUsers->plan_id = $plan->id;
        $plansUsers->user_id = $user->id;
        $plansUsers->paying_user_id = $user->id;
        $plansUsers->created_by_user_id = $this->getCreatedPlanUserId($user);
        $plansUsers->promo_code_id = 1;
        $plansUsers->plan_cost_to_pay = 0;
        $plansUsers->plan_cost_to_pay_with_rabat =0;
        $plansUsers->start_date = $startDate;
        $plansUsers->expiration_date = $expirationDate;
        $plansUsers->currency_id = $this->currency_id;
        $plansUsers->plan_options = json_encode($options);
        $plansUsers->session_id = Session::getId();
        $plansUsers->active = true;
        $plansUsers->save();
    }

    protected function getCreatedPlanUserId($user) {
        return $user->id;
    }

    protected function getRegistrationPlanId() {
        return (int)config("plans.standard_trial"); // plan trial na 2 miesiące
    }   

    private function margePlansOptions($plan) {

        $options = new stdClass();

        foreach ($plan->plansToPlansOptions as $plansToPlansOption ) {

            $currentOptions = json_decode($plansToPlansOption->plansOptions->options);

            $options = (object) array_merge((array) $options, (array) $currentOptions);
        }

        return $options;
    }

    private function getPlan($planId)
    {
        $plan = Plans::where('id', '=', $planId)
                                    ->first();

        return $plan;
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
       return Carbon::now();
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

    public function createNormalUser($data){
        $repository = new NormalUserRepository();
        return $repository->createUser($data);
    }

    public function createDistributorUser($data){
        $repository = new DistributorUserRepository();
        return $repository->createUser($data);
    }

    public function createPartnerUser($data){
        $repository = new DistributorUserRepository();
        return $repository->createUser($data);
    }

    public function createReselerUser($data){
        $repository = new ReselerUserRepository();
        return $repository->createUser($data);
    }

    public function createRegistredUser($data){
        $repository = new RegistredUserRepository();
        return $repository->createUser($data);
    }

    public function createApiUser($data){
        $repository = new ApiUserRepository();
        return $repository->createUser($data);
    }

    public function createLmsElearningUser($data){
        $repository = new LmsElearningUserRepository();
        return $repository->createUser($data);
    }

    

    

    public static function getInstance()
    {
        if( self::$oInstance == false )
        {
            self::$oInstance = new UserRepository();
        }
        return self::$oInstance;
    }

}
