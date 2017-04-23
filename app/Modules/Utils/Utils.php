<?php namespace App\Modules\Utils;

use DB;
use Auth;
use App\User;
use App\Modules\Models\PlansDetails;
use App\Modules\Models\Share;
use App\Modules\Models\Projects;
use DateTime;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use ZipArchive;
use Lang;
use Cookie;
use stdClass;
use Response;

use App\Modules\Plans\UserPlanModule;


class Utils {

    public static function generateUniqueHash()
    {
        return uniqid();
    }

    public static function generateSalesCupon($prefix = '') {

        // $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        // $randomString = '';
        // for ($i = 0; $i < $amount; $i++) {
        //         $randomString .= $characters[rand(0, strlen($characters) - 1)];
        // }
        // return $randomString;

        return uniqid($prefix);
    }

    public static function stringArrayToIntArray($stringArray)
    {
        $intArray = [];

        if(!isset($stringArray)){
            return $intArray;
        }

        foreach ($stringArray as $item) {
            array_push($intArray, (int)$item);
        }

        return $intArray;
    }

    public static function validateEmail($email)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    }

    public static function getDefaultPortalSettings()
    {
        $settings = new stdClass();
        $settings->state = 0;
        $settings->login = 0;
        $settings->savemail = 0;
        $settings->price = 0;
        $settings->currency = 'EUR';
        $settings->max_accounts = 0;
        $settings->business = 0;
        $settings->paid = 0;
        $settings->footeron = 1;
        $settings->topmenuon = 1;
        $settings->skin = 1;
        $settings->paypal_mail = env('paypalMerchant');
        $settings->redirect_url = '';
        $settings->custom_view = '';
        $settings->mail_template = '';
        $settings->portal_bought_mail_template = '';
        $settings->terms_link = '';
        $settings->force_lang = '';

        return $settings;
    }

    public static function getLocale() {
        if(Auth::check()){
            $locale = Auth::user()->lang;
        }elseif(Cookie::has('darkanlocale')){
            $locale = Cookie::get('darkanlocale');
        } else {
            $locale = config('app.locale');
        }

        // echo 'locale: ' . $locale . "<br/>";
        return $locale;
    }

    public static function getPricingLocaleByCode($countryCode) {

        $pricingLocale = env('defaultPricingLanguage');

        switch ($countryCode) {
            case 'US':
                $pricingLocale = 'us';
                break;
            case 'GB':
                $pricingLocale = 'gb';
                break;
            case 'DE':
                $pricingLocale = 'de';
                break;
            case 'PL':
                $pricingLocale = 'pl';
                break;
        }

        // echo 'countryCode: ' . $countryCode . "<br/>";
        // echo 'pricingLocale: ' . $pricingLocale . "<br/>";
        return $pricingLocale;
    }

    public static function getLocaleByCode($countryCode) {

        $language = strtolower($countryCode);

        $returnLang = env('defaultLanguage');

        switch ($language) {
            case 'en':
            case 'gb':
            case 'de':
                $returnLang = 'en';
                break;

            case 'pl':
                $returnLang = 'pl';
                break;

            default:
                break;
        }

        // echo 'returnLang: ' . $returnLang . "<br/>";
        return $returnLang;
    }

    public static function getCourseStatusString($status) {
        return Lang::get('utils.' . $status);
    }

    public static function getIconByCourseStatus($status) {
        
        switch ($status) {
            case 'incomplete':
                $icon = '<i class="fa fa-2x fa-play-circle text-warning portal-status-icon"></i>';
                break;
            case 'passed':
                $icon = '<i class="fa fa-2x fa-thumbs-up portal-status-icon"></i>';
                break;
            case 'failed':
                $icon = '<i class="fa fa-2x fa-thumbs-down portal-status-icon"></i>';
                break;
            
            default:
                $icon = '<i class="fa fa-2x fa-play-circle text-warning portal-status-icon"></i>';
                break;
        }
        return $icon;
    }

    public static function planExists($plan) {

        if(isset($plan) && trim($plan) != '') {
            $userPlans = self::getUserPlans();

            if (isset($userPlans[$plan]) && !empty($userPlans[$plan])) {
                return true;
            }
            
        }
        return false;
    }

    public static function generateRandomPassword() {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

    public static function generateRandomToken($max = 40) {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < $max; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

    public static function getUserPlans() {

        $userPlansFromDb = User::where('id', '=', Auth::user()->id)->first();

        if ($userPlansFromDb) {

            if ($userPlansFromDb['user_plans'] != '') {

                $userPlans = json_decode($userPlansFromDb['user_plans'], true);

                return $userPlans;
            }
        }

        return array('trial' => '2015-10-10');
    }

    public static function createSubdomain($mail) {
        $mail_explode = explode('@', $mail);
        $subdomain = $mail_explode[0];
        $subdomain = str_replace('_', '', $subdomain);
        $subdomain = str_replace('.', '', $subdomain);
        $subdomain = str_replace('-', '', $subdomain);
        
        $i = - 0;
        for (;;) {
            if ($i === 0)
                $sub = $subdomain;
            else
                $sub = $subdomain.$i;
            
            // $user = $this->query("SELECT * FROM `users` WHERE `subdomain`='$sub'");
            $user = User::where('subdomain', '=', $sub)->first();

            if (!$user) {
                break;
            }
            $i++;
        }
        
        return $sub;
    }


    public static function getTrialUserPlans() {
        $expirationDate = new DateTime(date('Y-m-d') . ' + 14 day');
        $expirationDate = $expirationDate->format('Y-m-d');
        $userPlans = array(
            "cc" => array("Darkan_standard" => $expirationDate),
            "lms" => array("Darkan_lmslight" => $expirationDate)
            // "mp" => array("Darkan_marketinglight" => $expirationDate),
        );
        return json_encode( $userPlans );
    }

    public static function getPlansDetails() {

        $allPlansDetails = PlansDetails::all();
        $allPlansDetails = $allPlansDetails->toArray();
        $plansDetailsArray = array();

        foreach ($allPlansDetails as $plans) {
            $plansDetailsArray[$plans['name']] = array();
            foreach ($plans as $key => $value) {
                $plansDetailsArray[$plans['name']][$key] = $value;
            }
        }

        return $plansDetailsArray;
    }

    public static function getNumberOfActivePlans() {

        // $userActivePlans = 0;

        // $userID = (int)Auth::user()->id;

        // $userPlans = self::getUserPlans();

        // foreach ($userPlans as $key => $planSection) {
        //     foreach ($planSection as $planName => $planExpirationDate) {
        //         if (!self::isDateExpired($planExpirationDate)) {
        //             $userActivePlans++;
        //         }
        //     }
        // }

        return UserPlanModule::hasPlan() ? 1 : 0;
    }


    public static function getPlanMaxValue($planDetail) {
        // $userPlans = self::getUserPlans();
        // $plansDetails = self::getPlansDetails();

        // $maxPlanValue = 0;

        // foreach ($userPlans as $planCategoryKey => $planCategory) {
        //     foreach ($planCategory as $planName => $planExpirationDate) {
        //         $planHasExpired = self::isDateExpired($planExpirationDate);
        //         if (!$planHasExpired) {
        //             if ($plansDetails[$planName][$planDetail] > $maxPlanValue) {
        //                 $maxPlanValue = $plansDetails[$planName][$planDetail];
        //             }
        //         }
        //     }
        // }

        $userPlan = UserPlanModule::getUserPlan();

        if(!$userPlan){
            return false;
        }

        $planOptions = json_decode($userPlan->plan_options);

        return isset($planOptions->{$planDetail}) ? $planOptions->{$planDetail} : false;
    }

    public static function isDateExpired($expirationDate) {
        // $today_dt = new DateTime();
        // $expire_dt = new DateTime($expirationDate . ' 23:59:59');
        // if ($today_dt <= $expire_dt ) {
        //     return false;
        // } else {
        //     return true;
        // }

        return  UserPlanModule::hasPlan();
    }

    public static function getDaysToExpiry($expirationDate) {
        $today_dt = new DateTime();
        $expire_dt = new DateTime($expirationDate);
        $diff = date_diff($today_dt,$expire_dt);

        $days = $diff->format("%r%a");

        if($days === "-0") {
            //today
            $days = 0;
        } elseif($days === "0") {
            //tomorrow
            $days = 1;
        } elseif($days > 0) {
            $days = $days + 1;
        }

        if ($days === 0) {
            return '<span>' . Lang::get('utils.LAST_DAY'). '</span>';
        } else {
            return $days > 0 ? $days . " " . Lang::get('utils.DAYS') : '<span>' .Lang::get('utils.EXPIRED') . ' (' . abs($days) .' '. Lang::get('utils.DAYS') .' '. Lang::get('utils.AGO') .')</span>';
        }
    }

    public static function getDaysToExpiry_APP($expirationDate) {
        global $lang;
        $today_dt = new DateTime();
        $expire_dt = new DateTime($expirationDate);
        $diff = date_diff($today_dt,$expire_dt);

        $days = $diff->format("%r%a");

        if($days === "-0") {
            //today
            $days = 0;
        } elseif($days === "0") {
            //tomorrow
            $days = 1;
        } elseif($days > 0) {
            $days = $days + 1;
        }

        if ($days === 0) {
            return '<span>' . _lang('LAST_DAY'). '</span>';
        } else {
            return $days > 0 ? $days . " " . _lang('DAYS') : '<span>' ._lang('EXPIRED') . ' (' . abs($days) .' '. _lang('DAYS') .' '. _lang('AGO') .')</span>';
        }
    }

    public static function getCategoryDaysToExpiry($category) {
        global $lang;
        $userPlans = self::getUserPlans();

        $maxPlanDate = 0;

        foreach ($userPlans[$category] as $planName => $planExpirationDate) {
            $planHasExpired = self::isDateExpired($planExpirationDate);
            if (!$planHasExpired) {
                if ($planExpirationDate > $maxPlanDate) {
                    $maxPlanDate = $planExpirationDate;
                }
            }
        }
        
        if ($maxPlanDate == 0) {
            return '<span style="color:#939393">' . Lang::get('utils.EXPIRED'). '</span>';
        } else {
            return getDaysToExpiry($maxPlanDate);
        }
        
    }

    public static function getYouTubeLink() {
        $chosenLang = config('app.locale');

        switch ($chosenLang) {
            case 'en':
            default:
                return 'https://www.youtube.com/channel/UCCpw1swP1Lyq3LLLNi_4F0w';
                break;

            case 'pl':
                return 'https://www.youtube.com/channel/UCCpw1swP1Lyq3LLLNi_4F0w';
                break;
        }
    }

    public static function getPhotoshopBlogPost() {
        $chosenLang = config('app.locale');

        switch ($chosenLang) {
            default:
            case 'en':
                return 'http://darkan.eu/blog/?p=280';
                break;

            case 'pl':
                return 'http://darkan.eu/blog/?p=277';
                break;
        }
    }

    public static function zipDir($zip, $dir) {

        foreach (
            $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir),
            RecursiveIteratorIterator::SELF_FIRST) as $item
        ) {
            if ($item->isDir()) {
            } else {

                $zip->addFile($dir . DIRECTORY_SEPARATOR . $iterator->getSubPathName(), $iterator->getSubPathName());

            }
        }
    }

    public static function replaceSpecialChars($text) {
        return strtolower(preg_replace('/([^a-zA-Z0-9.])/', "_", $text));
    }

    public static function canCreateProject($projectId)
    {

    }

    public static function canReadProject($projectId)
    {
        $project = Projects::where('user_id', '=', Auth::user()->id)
                                ->where('project_id', '=', $projectId)
                                ->first();

        if($project){
            return true;
        }

        $shared = Share::where('user_id', '=', Auth::user()->id)->where('project_id', '=', $projectId)->first();

        if($shared){
            return true;
        }else{
            return false;
        }

        return false;
    }

    public static function canUpdateProject($projectId)
    {
        return self::isMineProject($projectId); 
    }

    public static function canDeleteProject($projectId)
    {
        return self::isMineProject($projectId);        
    }

    public static function isMineProject($projectId)
    {
        $project = Projects::where('user_id', '=', Auth::user()->id)
                                ->where('project_id', '=', $projectId)
                                ->first();


        if($project){
            return true;
        }else{
            return false;
        }
    }

    public static function isProjectLimitExceeded()
    {
        $projectsCount = Projects::where('user_id', '=', Auth::user()->id)->count();

        $userMaxProjects = (int)self::getPlanMaxValue('projects');

        if($projectsCount < $userMaxProjects){
            return true;
        }else{
            return false;
        }
    }

    public static function generatePassword($amount = 8) {

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
        for ($i = 0; $i < $amount; $i++) {
                $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }
        return $randomString;
    }

    public static function saveCsvFileFromList($list, $headItems, $fileName){


        // print_r($list);
        // die();

        $filePath = base_path() . '/storage/app/download/report.csv';


        # add headers for each column in the CSV download
        //array_unshift($list, array_keys($headItems));
        array_unshift($list, $headItems);

        $FH = fopen($filePath, 'w+');
        foreach ($list as $row) { 
            fputcsv($FH, $row);
        }
        fclose($FH);

        //return Response::stream($callback, 200, $headers);

        return $filePath;
    }

    public static function generateCsvFileFromList($list, $headItems, $fileName){

        $headers = [
                'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0'
            ,   'Content-type'        => 'text/csv;charset=UTF-8'
            ,   'Content-Disposition' => 'attachment; filename=galleries.csv'
            ,   'Expires'             => '0'
            ,   'Pragma'              => 'public'
        ];

        $filePath = self::saveCsvFileFromList($list, $headItems, $fileName);

        return Response::download($filePath, $fileName, $headers);

    }
}