<?php namespace App\Modules\Api\NewApiKey;

use App\Modules\Models\AplicationApi;
use App\Modules\Models\ApiTokens;
use App\Modules\Models\AplicationAdminApiToAplicationApi;
use App\Modules\Utils\Utils;

use App\Modules\Api\ApiCommand\ApiCommandObject;

use App\Modules\User\ApiUserRepository;

class CreateNewApiKeyObject extends ApiCommandObject{

    public $userId = false;
    public $token;
    public $apiKey;

    public function update($request){

    }

    public function generateNewApiKey($adminApiUser){


        $newAplicationApi = new AplicationApi();
        $newAplicationApi->api_key = $this->createApiKey();
        $newAplicationApi->role_id = 2;
        $newAplicationApi->plans = '{"projectsLimit":10}';
        $newAplicationApi->save();

        $login = $this->generateLogin($newAplicationApi);
        $password = $this->generateRandomPassword();


        $apiUserRepository = new ApiUserRepository();
        $newUser = $apiUserRepository->findOrCreateUser(array( 'login' =>  $login , 'password' => '' ));

        if(!$newUser){
            return false;
        }

        $aplicationApi = $this->getAplicationApi($adminApiUser->api_id);

        if(!$aplicationApi){
            return false;
        }

        $aplicationAdminApiToAplicationApi = new AplicationAdminApiToAplicationApi();
        $aplicationAdminApiToAplicationApi->admin_api_key_id = $aplicationApi->id;
        $aplicationAdminApiToAplicationApi->api_key_id = $newAplicationApi->id;
        $aplicationAdminApiToAplicationApi->save();

        $newUser->api_id = $newAplicationApi->id;
        $newUser->save();

        return $newAplicationApi;
    }

    private function createApiKey(){
        return Utils::generateRandomToken();
    }

    protected function getAplicationApi($apiKeyId){

        return AplicationApi::where('id', '=', $apiKeyId)->first();
    }

    private function generateRandomPassword(){
        return Utils::generateRandomPassword();
    }

    private function generateLogin($newAplicationApi){
        return $newAplicationApi->id . '@darkanapi.me';
    }

    public function checkPlan($aplicationAdminApi)
    {
        $user = $this->getUserFromAplicationApi($aplicationApi);

        if(!$user){
            return false;
        }

        $userPlan = $this->getPlans($user);

        if(!$userPlan){
            return false;
        }

        $createUsers = $this->getPlanOptionValue('createUsers', $userPlan);
        $usersLimit = $this->getPlanOptionValue('usersLimit', $userPlan);

        $apiUsersCount = AplicationAdminApiToAplicationApi::where('admin_api_key_id', '=', $aplicationAdminApi->id)->count();

        if($createUsers && ($apiUsersCount < $usersLimit)){
            return true;
        }

        return false;
    }

}