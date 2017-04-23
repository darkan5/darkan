<?php namespace App\Modules\Api\ApiCommand;

use App\Modules\Models\AplicationApi;
use App\Modules\Models\AplicationAdminApiToAplicationApi;
use App\Modules\Models\UsersToAplicationsApi;
use App\Modules\Plans\UserPlanModule;


class ApiCommandObject {

    public $userId = false;

    public function update($request){
        // To override
    }


    protected function getAplicationApi($apiKeyId){

        return AplicationApi::where('id', '=', $apiKeyId)->first();
    }

    public function checkPlan($aplicationAdminApi)
    {
        // To override
        return false;
    }

    protected function getPlans($user)
    {

        $plan = UserPlanModule::getUserPlanByUserId($user->id);

        return  $plan;


        // if($aplicationApi->plans){

        //     $plans = json_decode($aplicationApi->plans);

        //     if($plans){
        //         return $plans;
        //     }
        // }

        // return false;
    }

    protected function getUserFromAplicationApi($aplicationApi){

        $userToAplicationApi = $aplicationApi->userToAplicationApi;

        if(!$userToAplicationApi){
            return false;
        }

        return $userToAplicationApi->user;
    }

    protected function getUserAdminFromAplicationApi($aplicationApi){

        $aplicationAdminApiToAplicationApi = AplicationAdminApiToAplicationApi::where('api_key_id', '=', $aplicationApi->id)->first();

        if(!$aplicationAdminApiToAplicationApi){
            return false;
        }

        $userToAplicationApi = UsersToAplicationsApi::where('aplication_api_id', '=', $aplicationAdminApiToAplicationApi->admin_api_key_id)->first();

        if(!$userToAplicationApi){
            return false;
        }

        return $userToAplicationApi->user;

    }

    protected function getPlanOptionValue($planOptionName, $userPlan){

        $planOptions = json_decode($userPlan->plan_options);

        return isset($planOptions->{$planOptionName}) ? $planOptions->{$planOptionName} : false;
    }

}