<?php namespace App\Http\Controllers;


use App\User;
use Auth;
use Input;
use stdClass;
use App\Http\Requests\Api\ApiRequest;
use App\Modules\Models\Projects;
use App\Modules\Models\AplicationApi;
use App\Modules\Models\UsersToAplicationsApi;

class ApiDemo extends Controller {

	private $API_DEMO_USER_ID = 8;

	/*
	|--------------------------------------------------------------------------
	| Api Demo
	|--------------------------------------------------------------------------
	|
	|
	*/

	public function index()
	{
		
		// if (Auth::check()) {

			$projects = Projects::where('user_id', '=', $this->API_DEMO_USER_ID)
                                ->where('external', '=', 1)
                                ->get();
			
			return view('api.demo')
				->with('projects', $projects );
				
		// } else {
		// 	return redirect()->guest('/auth/login');
		// }
	}

	private function generateToken($apikey){

		///////////////////////////
		//generowanie tokena
		/////////////////////////
		$post = array(
		    'apikey' => $apikey,
		    'action' => 'generateToken'
		);

		$exec = $this->postCurl($post);

		return $exec;
	}

	public function getHashedApikey(ApiRequest $request){
		return json_encode( $this->getDemoHashedApikey() );
	}

	private function getDemoHashedApikey(){

		$user = User::where('id', '=', $this->API_DEMO_USER_ID)->first();

		$usersToAplicationsApi = UsersToAplicationsApi::where('user_id', '=', $this->API_DEMO_USER_ID)->first();

		$aplicationApi = $usersToAplicationsApi->aplicationApi;

		$apikey = $aplicationApi->api_key;

		$result = $this->generateToken($apikey);


		if(!isset($result->status) || $result->status != 'success'){
			return $result;
		}

		$token = $result->token;

		if(!$token){
			return $result;
		}

		$hashedApkey = $this->hashApiKey($apikey, $token);

		$responce = new stdClass();
		$responce->hashedApikey = $hashedApkey;
		$responce->status = 'success';

		return $responce;
	}

	public function createNewApiKey(){

	}

	public function addNewProject(ApiRequest $request){

		$params = json_decode(Input::get('params'));

		$projectName = $params->name;
		$projectDimensions = $params->dimentions;
		$projectSkin = $params->skin;
		$projectAutoScale = $params->autoScale;

		$result = $this->getDemoHashedApikey();



		if(!isset($result->status) || $result->status != 'success'){
			echo json_encode($result);
			return;
		}



		$hashedApikey = $result->hashedApikey;

		if(!$hashedApikey){

			echo json_encode($result);
			return;
		}


		/////////////////////////////////
		// tworzenie nowego projektu
		/////////////////////////////////
		$post = array(
		    'apikey' => $hashedApikey,
		    'projectName' => $projectName,
		    'action' => 'addNewProject',
		    'dimensions' => $projectDimensions,
		    'skin' => $projectSkin,
		    'autoScale' => $projectAutoScale
		);




		$exec = $this->postCurl($post);

		echo json_encode($exec);
	}

	public function publishProject(ApiRequest $request){

		$params = json_decode(Input::get('params'));

		$projectId = (int)$params->project_id;

		$result = $this->getDemoHashedApikey();

		if(!isset($result->status) || $result->status != 'success'){
			echo json_encode($result);
			return;
		}

		$hashedApikey = $result->hashedApikey;

		if(!$hashedApikey){
			echo json_encode($result);
			return;
		}

		/////////////////////////////////
		// publikacja projektu
		/////////////////////////////////
		$post = array(
		    'apikey' => $hashedApikey,
		    'projectId' => $projectId,
		    'action' => 'publishProject',
		);

		$exec = $this->postCurl($post);

		
		if(!isset($exec->status) || $exec->status != 'success'){
			echo json_encode($exec);
			return;
		}

		$link = $exec->link;

		echo json_encode($exec);
	}

	public function postCurl($post){

		$ch = curl_init();
		//curl_setopt($ch, CURLOPT_URL, 'http://darkan.eu/test/app/project_list/api.php' );
		curl_setopt($ch, CURLOPT_URL, env('API_DEMO_POST_URL') );
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		$exec = curl_exec($ch);
		
		curl_close($ch);

		return json_decode($exec);
	}

	private function hashApiKey($apiKey, $token){

        $hash = sha1($apiKey . $token);

        return $hash;
    }

	
}