<?php namespace App\Modules\Api\Token;

use App\Modules\Models\AplicationApi;
use App\Modules\Models\ApiTokens;
use App\Modules\Utils\Utils;

class TokenObject {

    public $userId = false;
    public $token;
    public $apiKey;

    public function update($request){

    }

    public function generateToken(){

        $aplicationApi = $this->getAplicationApi($this->apiKey);

        if(!$aplicationApi){
            return false;
        }

        $apiToken = ApiTokens::firstOrNew(['api_key_id' => $aplicationApi->id]);

        if($apiToken){
            

            $token = $this->createToken();
            $hashedApiKey = $this->hashApiKey($this->apiKey, $token);

            $apiToken->api_key_id = $aplicationApi->id;
            $apiToken->token = $token;
            $apiToken->hashed_api_key = $hashedApiKey;
            $apiToken->save();
        }        

        return $apiToken;
    }

    private function createToken(){
        return Utils::generateRandomToken(32);
    }

    private function hashApiKey($apiKey, $token){

        $hash = sha1($apiKey . $token);

        return $hash;
    }

    protected function getAplicationApi($apiKey){

        return AplicationApi::where('api_key', '=', $apiKey)->first();
    }

    public function checkPlan($aplicationApi)
    {
        return true;
    }

    

}