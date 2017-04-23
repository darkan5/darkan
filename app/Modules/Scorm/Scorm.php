<?php namespace App\Modules\Scorm;

use DB;
use Auth;
use App\User;
use App\Modules\Models\ScormData;
use App\Modules\Models\MailingUsers;
use App\Modules\Models\Banners;
use App\Modules\Models\LmsUserPortal;


class Scorm {


	protected $responseData = array();
	protected $data;
	protected $userID;


	public function runScormRequest($data) {
		
		$this->data = json_decode($data);

		switch ($this->data->request) {

			case 'saveScorm':

				$this->saveScorm();

				break;

			case 'getScorm':

				$this->getScorm();

				break;

            case 'checkScorm':

                break;


			default:

				$this->responseData['norequest'] = 'no request';

				break;

		}

		return $this->responseData;
	}

	protected function getScorm () {
        // to override
	}

	protected function saveScorm() {
        // to override
    }
}