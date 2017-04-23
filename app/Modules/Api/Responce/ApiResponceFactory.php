<?php namespace App\Modules\Api\Responce;


class ApiResponceFactory {


    public static $returnedCodes = array(
        'success' => array(
            'code' => 100, 
            'message' => 'Sukces', 
            'success' => true
        ),
        'serverError' => array(
            'code' => 500, 
            'message' => 'Server error', 
            'success' => false
        ),
        'noParameter' => array(
            'code' => 201, 
            'message' => 'No parameter', 
            'success' => false
        ),
        'incorrectParameter' => array(
            'code' => 202, 
            'message' => 'Incorrect parameter', 
            'success' => false
        ),
        'noAccessToProject' => array(
            'code' => 203, 
            'message' => 'You do not have access to the project', 
            'success' => false
        ),
        'apiKeyIsInvalid' => array(
            'code' => 204, 
            'message' => 'API key is invalid', 
            'success' => false
        ),
        'projectIsEmpty' => array(
            'code' => 205, 
            'message' => 'Project is empty', 
            'success' => false
        ),
        'projectNotExist' => array(
            'code' => 206, 
            'message' => 'Project not exist', 
            'success' => false
        ),
        'databaseError' => array(
            'code' => 207, 
            'message' => 'Database connection error', 
            'success' => false
        ),
        'projectNameRequired' => array(
            'code' => 208, 
            'message' => 'Parameter projectName is not correct', 
            'success' => false
        ),
        'errorCreatingProject' => array(
            'code' => 209, 
            'message' => 'Error occured while creating new project', 
            'success' => false
        ),
        'errorCreatingPublication' => array(
            'code' => 210, 
            'message' => 'Error occured while creating publication', 
            'success' => false
        ),
        'errorNotLogin' => array(
            'code' => 211, 
            'message' => 'You are not login', 
            'success' => false
        ),
        'dimensionsRequired' => array(
            'code' => 212, 
            'message' => 'Parameter dimensions is not correct', 
            'success' => false
        ),
        'skinRequired' => array(
            'code' => 213, 
            'message' => 'Parameter skin is not correct', 
            'success' => false
        ),
        'autoScaleRequired' => array(
            'code' => 214, 
            'message' => 'Parameter autoScale is not correct', 
            'success' => false
        ),
        'generateTokenFault' => array(
            'code' => 215, 
            'message' => 'Genaerate tokon fault', 
            'success' => false
        ),
        'generateNewApiKeyFault' => array(
            'code' => 216, 
            'message' => 'Genaerate new api key fault', 
            'success' => false
        ),
        'noPermissions' => array(
            'code' => 217, 
            'message' => 'You do not have permissions for this command', 
            'success' => false
        ),
        'usersLimit' => array(
            'code' => 218, 
            'message' => 'Over users limit', 
            'success' => false
        ),
        'projectsLimit' => array(
            'code' => 219, 
            'message' => 'Over projects limit', 
            'success' => false
        ),
        
    );

	public static function getResponce($messageKey, $params = []){

		$responce = array();
		
		$responce['status'] = self::getReturnCode($messageKey);
        $responce['data'] = $params;

		return $responce;
	}

	private static function getReturnCode($value, $message = ''){

        if($message != ''){
            self::$returnedCodes[$value]['message'] = $message;
        }

        return self::$returnedCodes[$value];
    }

}