<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Modules\Models\Banners;
use App\Http\Requests\DefaultRequest;
use Input;
use App\Modules\Lms\Mailing;

class MailingController extends Controller {

	public function __construct()
	{
		// $this->middleware('auth');
	}


	public function runMailingRequest(DefaultRequest $request)
	{
		$params = Input::all();

		$mailing = new Mailing();
		$mailingResponse = $mailing->runMailingRequest($params['request']);

		$this->showReturnData($mailingResponse);

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