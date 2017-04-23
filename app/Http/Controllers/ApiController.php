<?php namespace App\Http\Controllers;


use Auth;
use App\Modules\Api\Responce\ApiResponceFactory;
use App\Modules\Projectlist\Projectlist;
use App\Modules\Models\Projects;
use App\Modules\Models\AplicationApi;
use App\Modules\Api\NewProject\NewProjectObject;
use App\Modules\Api\PublishProject\PublishProjectObject;
use App\Modules\Api\Token\TokenObject;
use App\Modules\Api\NewApiKey\CreateNewApiKeyObject;
use App\Http\Requests\ApiRequest;
use App\Modules\Skins\Skins;
use App\User;
use Input;
use File;
use stdClass;
use App\Modules\Models\ApiTokens;

class ApiController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Api Controller
	|--------------------------------------------------------------------------
	|
	|
	*/

	private $responce = array();

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		// $this->middleware('auth');
	}


	public function runApi(ApiRequest $request)
	{
		$action = false;

		if ($request->has('action')) {
		    $action = $request->action;
		}

		switch($action) {

			case 'generateToken':

            	$this->generateToken($request);

            	break;	

			case 'createNewApiKey':

				$this->createNewApiKey($request);

            	break;
            default:

            	$this->executeApiCommand($request);

            	break;
        }
	}

	private function generateToken($request) 
	{

		$action = false;
		$apiKey = false;

		if ($request->has('action')) {
		    $action = $request->action;
		}

		if ($request->has('apikey')) {
		    $apiKey = $request->apikey;
		}

		if($action == false){

			$this->responce = ApiResponceFactory::getResponce('incorrectParameter', array('invalidParameter' => 'action'));
			return;
		}

		if($apiKey == false){

			$this->responce = ApiResponceFactory::getResponce('incorrectParameter', array('invalidParameter' => 'apikey'));
			return;
		}

		if(strlen($apiKey) != 40){

			$this->responce = ApiResponceFactory::getResponce('incorrectParameter', array('invalidParameter' => 'apikey length'));
			return;
		}

		$aplicationApi= $this->getAplicationApiByApiKey($apiKey);

		if(!$aplicationApi){
			$this->responce = ApiResponceFactory::getResponce('apiKeyIsInvalid');
			return;
		}

		if(!$aplicationApi->isActive()){

			$this->responce = ApiResponceFactory::getResponce('noPermissions');
			return;
		}

		$user = $this->getUserFromAplicationApi($aplicationApi);

		
		if(!$user){
			$this->responce = ApiResponceFactory::getResponce('errorNotLogin');
			return;
		}

		$userId = $user->id;

		$tokenObject = new TokenObject();
    	$tokenObject->userId = $userId;
    	$tokenObject->apiKey = $apiKey;

		$apiToken = $tokenObject->generateToken();

		if(!$apiToken){
			return ApiResponceFactory::getResponce('generateTokenFault');
		}

		$responce = array();
		$responce['token'] = $apiToken->token;
        $responce['message'] = 'success';
        $responce['status'] = 'success';

    	$this->responce = $responce;

    	return;

	}

	public function createNewApiKey(ApiRequest $request)
	{

		$action = false;
		$apiKey = false;

		if ($request->has('action')) {
		    $action = $request->action;
		}

		if ($request->has('apikey')) {
		    $apiKey = $request->apikey;
		}


		if($action == false){

			$this->responce = ApiResponceFactory::getResponce('incorrectParameter', array('invalidParameter' => 'action'));
			return;
		}

		if($apiKey == false){

			$this->responce = ApiResponceFactory::getResponce('incorrectParameter', array('invalidParameter' => 'apiKey'));
			return;
		}

		if(strlen($apiKey) != 40){

			$this->responce = ApiResponceFactory::getResponce('incorrectParameter', array('invalidParameter' => 'apiKey length'));
			return;
		}

		$aplicationApi = $this->getAplicationApiByHashedApiKey($apiKey);

		if(!$aplicationApi){
			$this->responce = ApiResponceFactory::getResponce('errorNotLogin');
			return;
		}

		if(!$aplicationApi->isAdmin()){

			$this->responce = ApiResponceFactory::getResponce('noPermissions');
			return;
		}

		$user = $this->getUserFromAplicationApi($aplicationApi);

		if(!$user){

			$this->responce = ApiResponceFactory::getResponce('errorNotLogin');
			return;
		}


		$userId = $user->id;

		$createNewApiKeyObject = new CreateNewApiKeyObject();

		if(!$createNewApiKeyObject->checkPlan($aplicationApi)){
            $this->responce = ApiResponceFactory::getResponce('usersLimit');
            return;
        }

		$newApikey = $createNewApiKeyObject->generateNewApiKey($user);

		if(!$newApikey){
			$this->responce = ApiResponceFactory::getResponce('generateNewApiKeyFault');
			return;
		}

		$responce = array();
		$responce['apikey'] = $newApikey->api_key;
        $responce['message'] = 'success';
        $responce['status'] = 'success';

    	$this->responce = $responce;

	}



	public function executeApiCommand(ApiRequest $request)
	{


		$action = false;
		$apiKey = false;

		if ($request->has('action')) {
		    $action = $request->action;
		}

		if ($request->has('apikey')) {
		    $apiKey = $request->apikey;
		}


		if($action == false){

			$this->responce = ApiResponceFactory::getResponce('incorrectParameter', array('invalidParameter' => 'action'));
			return;
		}

		if($apiKey == false){

			$this->responce = ApiResponceFactory::getResponce('incorrectParameter', array('invalidParameter' => 'apiKey'));
			return;
		}

		if(strlen($apiKey) != 40){

			$this->responce = ApiResponceFactory::getResponce('incorrectParameter', array('invalidParameter' => 'apiKey length'));
			return;
		}

		$aplicationApi = $this->getAplicationApiByHashedApiKey($apiKey);

		if(!$aplicationApi){
			$this->responce = ApiResponceFactory::getResponce('apiKeyIsInvalid');
			return;
		}

		if(!$aplicationApi->isUser()){

			$this->responce = ApiResponceFactory::getResponce('noPermissions');
			return;
		}

		$user = $this->getUserFromAplicationApi($aplicationApi);

		if(!$user){

			$this->responce = ApiResponceFactory::getResponce('errorNotLogin');
			return;
		}

		$userId = $user->id;

		switch($action) {
 
            case 'addNewProject':

            	$newProjectObject = new NewProjectObject();
            	$newProjectObject->userId = $userId;

            	if(!$newProjectObject->checkPlan($aplicationApi)){
		            $this->responce = ApiResponceFactory::getResponce('projectsLimit');
		            return;
		        }

            	
				if (!$request->has('projectName')) {

					$this->responce = ApiResponceFactory::getResponce('projectNameRequired');
					return;
			    }

			    if(!$this->validateProjectName($request)){
  					$this->responce = ApiResponceFactory::getResponce('projectNameRequired');
					return;
		        }


				if ($request->has('dimensions')) {

					if(!$this->validateDimensions($request)){
	  					$this->responce = ApiResponceFactory::getResponce('dimensionsRequired');
						return;
			        }
			    }

			    if ($request->has('skin')) {
            
			        if(!$this->validateSkin($request, $user)){
			            $this->responce = ApiResponceFactory::getResponce('skinRequired');
						return;
			        } 
		        }

		        if ($request->has('autoScale')) {
            
			        if(!$this->validateAutoScaleRequired($request)){
			            $this->responce = ApiResponceFactory::getResponce('autoScaleRequired');
						return;
			        } 
		        }

		        

		        $newProjectObject->update($request);

				$this->responce = $this->addNewProject($newProjectObject, $user);

                break;

            case 'publishProject':


            	$publishProjectObject = new PublishProjectObject();
            	$publishProjectObject->userId = $userId;

            	if(!$publishProjectObject->checkPlan($aplicationApi)){
		            $this->responce = ApiResponceFactory::getResponce('noPermissions');
		            return;
		        }

            	$publishProjectObject->update($request);


            	if($publishProjectObject->projectId == false){

	            	$this->responce = ApiResponceFactory::getResponce('incorrectParameter', array('invalidParameter' => 'projectId'));
					return;
				}

                $this->responce = $this->publishProject($publishProjectObject);

                break; 

            default: 

            	break; 
        }

	}


	private function clearApiUserFolderStructure($userId) 
	{
		$user = User::find($userId);
		if ($user) {
			$user->folders_structure = '';
			$user->save();
		}
	}

	private function addProjectToFolderStructure($project, $user) 
	{
		$newProject = clone $project;
		$newProject->folder = -4;
		$newProject->pType = "userProjects";

		$foldersStructure = new stdClass();

		if($foldersStructure != ''){
			$foldersStructure = json_decode($user->folders_structure);
		}

		$objs = array();

		if(isset($foldersStructure->objs)){
			$objs = $foldersStructure->objs;
		}

		array_push($objs, $newProject);

		$foldersStructure->objs = $objs;

		
		$folders = array();

		if(isset($foldersStructure->folders)){
			$folders = $foldersStructure->folders;
		}

		$exist = false;

		foreach ($folders as $oneFolder) {
			if($oneFolder->folderID == -4){
				$exist = true;
				break;
			}
		}

		if(!$exist){
			$folder = new stdClass(); 
			$folder->folder = 0;
            $folder->folderID = -4;
            $folder->name = 'External projects';
            $folder->pType = 'folder';

            array_push($folders, $newProject);
		}

		$foldersStructure->folders = $folders;

		$user->folders_structure = json_encode($foldersStructure);

		$user->save();
	}

	private function addNewProject($newProjectObject, $user){

		$newProject = $newProjectObject->createNewProject();

		$this->clearApiUserFolderStructure($newProjectObject->userId);
		//$this->addProjectToFolderStructure($newProject, $user);

		$responce = array();

		$responce['pid'] = $newProject->project_id;
        $responce['pname'] = stripslashes($newProject->name);
        $responce['message'] = 'success';
        $responce['status'] = 'success';
        $responce['projectData'] = $newProject;

		return $responce;
	}

	private function publishProject($publishProjectObject){
		

		$project = Projects::where('user_id', '=', $publishProjectObject->userId)->where('project_id', '=', $publishProjectObject->projectId)->first();

		if(!$project){
			return ApiResponceFactory::getResponce('noAccessToProject');
		}

		$result = $this->validateProjectFiles( $publishProjectObject );

		if(!$result){
			return ApiResponceFactory::getResponce('projectIsEmpty');
		}

		// Publish project code	
		$publishProjectObject->publishProject();

		$responce = array();

		$responce['publicationId'] = $publishProjectObject->publicationId;
        $responce['link'] = $publishProjectObject->link;
        $responce['message'] = 'success';
        $responce['status'] = 'success';

		return $responce;
	}


	private function getAplicationApiByApiKey($apiKey){

		$aplicationApi = AplicationApi::where('api_key', '=', $apiKey)->first();

		if(!$aplicationApi){
			return false;
		}else{
			return $aplicationApi;
		}
	}

	private function getUserFromAplicationApi($aplicationApi){

		$userToAplicationApi = $aplicationApi->userToAplicationApi;

		if(!$userToAplicationApi){
			return false;
		}

		return $userToAplicationApi->user;
	}

	private function getAplicationApiByHashedApiKey($hashedApiKey){

		$apiTokens = ApiTokens::where('hashed_api_key', '=', $hashedApiKey)->first();


		if(!$apiTokens){
			return false;
		}else{

			$aplicationApi = $apiTokens->aplicationApi;

			if(!$aplicationApi){
				return false;
			}else{
			
				return $aplicationApi;
			}
		}
	}

	

	public function validateProjectFiles($publishProjectObject){

		$userId = $publishProjectObject->userId;
		$projectId = $publishProjectObject->projectId;

        $projectPath = storage_path('/app/projects/'. $userId . '/' . $projectId . '/');

        $mapPath = $projectPath . '/sitemap/map.json';
        $optionsPath = $projectPath . '/sitemap/options.json';

        if (!File::exists($mapPath) || !File::exists($optionsPath)) {
            return false;
        }else{
            return true;
        }
    }

    private function validateDimensions($request)
    {
        if(!is_string($request->dimensions)){
            return false;
        }

        $arr = explode('x', $request->dimensions);

        if(count($arr) != 2){
        	return false;
        }

        list($width, $height) = $arr;

        if(!$this->isInteger($width) || !$this->isInteger($height)){
            return false;
        }

        return true;
    }

    private function validateAutoScaleRequired($request)
    {
    	$autoScale = filter_var($request->autoScale, FILTER_VALIDATE_BOOLEAN);

        if(!is_bool($autoScale)){
            return false;
        }

        return true;
    }

    private function validateSkin($request, $user)
    {

        if(!is_string($request->skin)){
            return false;
        }

        if(!$user){
            return false;
        }

        $userMail = $user->email;

        if(!$userMail){
            return false;
        }

        $skins = new Skins($userMail);

        $haveAccess = $skins->checkUserAccesToSkin($request->skin);
              
        return $haveAccess;
    }

    private function validateProjectName($request)
    {

        if(!is_string($request->projectName)){
            return false;
        }
              
        return true;
    }

    private function isInteger($input){
	    return(ctype_digit(strval($input)));
	}

    

	function __destruct() {

        echo json_encode($this->responce);
    }
}