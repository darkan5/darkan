<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Http\Requests\ScormRequest;
use App\Modules\Scorm\ScormLoggedin;
use App\Modules\Scorm\ScormMailing;
use App\Modules\Scorm\ScormGuest;
use Input;

class ScormController extends Controller {

	public function runScormRequest(ScormRequest $request)
	{
		$params = Input::all();

		try {

			$requestData = json_decode( $params['request'] );

			if ($this->validateRequest($requestData)) {

				// if mailing login is defined
				if ($requestData->mailingLogin != null) {

					$scormMailing = new ScormMailing();
					$scormResponse = $scormMailing->runScormRequest($params['request']);

				// if user if logged in
				} else if( Auth::check() ) {

					$scorm = new ScormLoggedin();
					$scormResponse = $scorm->runScormRequest($params['request']);

				// use cookie for guests
				} else {

					$scormGuest = new ScormGuest();
					$scormResponse = $scormGuest->runScormRequest($params['request']);
				}


				$this->showReturnData($scormResponse);	
			}

		}catch(Exception $err) {
			$this->showReturnData(array('status' => 'error', 'err' => $err));
		}

	}

	private function validateRequest($requestData)
	{
		if ($requestData->request) {
			switch ($requestData->request) {
				case 'getScorm':
				case 'saveScorm':
					return true;
					break;

				default:
					return false;
					break;
			}
		}

		return false;
	}

	private function showReturnData($msg)
	{
		if (!$msg) {
			echo '{}';
			return;
		}
		echo json_encode($msg);
	}

}