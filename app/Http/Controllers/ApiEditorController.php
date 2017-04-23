<?php namespace App\Http\Controllers;

use Auth;
use App\Modules\Models\Projects;
use App\Modules\Models\AplicationApi;
use App\Modules\Models\ApiTokens;
use App\Http\Requests\DefaultRequest;
use App\User;
use Input;
use Session;


class ApiEditorController extends Controller {

	public function runLoginRequest(DefaultRequest $request)
	{
		$params = Input::all();

		$this->requestData = json_decode( $params['request'] );

		switch ($this->requestData->request) {
			case 1:
				$response = $this->loginExternalUser();
				break;
		}

		$this->showReturnData($response);	

	}

	private function showReturnData($msg)
	{
		if (!$msg) {
			echo '{}';
			return;
		}
		echo json_encode($msg);
	}

	private function loginExternalUser() {

		$response = array();

		$data = $this->requestData->data;
		$apikey = isset($data->apikey) ? $data->apikey : false;
		$projectId = isset($this->requestData->__meta__->projectID) ? $this->requestData->__meta__->projectID : false;

		if(!$apikey || !$projectId){
			$response['status'] = 'failed';
			return $response;
		}

		$user = $this->getUserByApiKey($apikey);
		if (!$user) {
			$response['status'] = 'failed';
			return $response;
		}
		$userId = (int)$user->id;

		$project = $this->getProjectByUserId($userId, $projectId);
		$response['userId'] = $userId;
		$response['projectId'] = $projectId;
		$response['login'] = $user->email;

		if(!$userId || !$project){
			$response['status'] = 'failed';
			return $response;
		}

		Auth::loginUsingId($userId);

		Session::set('loggedExternal', true);

		$response['status'] = 'success';
			
		return $response;
	}

	private function getUserByApiKey($hashedApiKey){
		$apiData = ApiTokens::where('hashed_api_key', '=', $hashedApiKey)->first();
		// $apiData = AplicationApi::where('api_key', '=', $apiKey)->first();
		if ($apiData && $apiData->aplicationApi) {
			if ($apiData->aplicationApi->user) {
				return $apiData->aplicationApi->user;
			}
		}

		return false;
    }

    private function getProjectByUserId($userId, $projectId){
    	return Projects::where('project_id', '=', $projectId)
    						->where('user_id', '=', $userId)
    						->first();
    }

}
