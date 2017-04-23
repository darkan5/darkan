<?php namespace App\Http\Controllers;


use App\Http\Requests\ProfileRequest;
use Auth;
use Input;
use App\User;
use Hash;


class ProfileController extends Controller {

	public function __construct()
	{
		// $this->middleware('auth');
	}

	private function getParams($input)
	{
		return json_decode($input['params']);
	}

	private function isEmpty($string)
	{

	}


	private function checkSubdomain($subdomain) 
	{
		if ($subdomain == 'www' || $subdomain == 'blog') {
			return false;
		}
		if(!preg_match("/^[a-zA-Z0-9]+$/", $subdomain)){
			return false;
		}
		return true;
	}

	private function subdomainAlreadyExists($subdomain) 
	{
		return User::where('subdomain', '=', $subdomain)->where('id', '!=', Auth::user()->id)->count();
	}

	public function savesubdomain(ProfileRequest $request) 
	{
		$params = $this->getParams(Input::all());

		// subdomain cannot be empty!
		if ( $this->isEmpty($params->subdomain) ) {
			$this->showReturnData(array('ret' => 'empty'));
			return;
		}

		// check if subdomain is valid
		if ( !$this->checkSubdomain($params->subdomain) ) {
			$this->showReturnData(array('ret' => 'invalid'));
			return;
		}


		// save!
		if ( !$this->subdomainAlreadyExists($params->subdomain) ) {
			Auth::user()->subdomain = $params->subdomain;
			Auth::user()->save();

			$newSubdomain = config('app.protocol_not_secure') 
								. Auth::user()->subdomain 
								. '.' 
								. config('app.domain') 
								. config('app.folder');
			$this->showReturnData(array('ret' => 'success', 'subname' => $params->subdomain, 'newsubdomainlink' => $newSubdomain));
		} else {
			// subdomain already exists!
			$this->showReturnData(array('ret' => 'taken'));
		}

	}


	public function savesubdomainname(ProfileRequest $request) 
	{
		$params = $this->getParams(Input::all());
		Auth::user()->subdomain_name = $params->subdomainName;
		Auth::user()->save();
		$this->showReturnData(array('ret' => 'success', 'subdomainName' => $params->subdomainName));
	}


	public function changepassword(ProfileRequest $request) 
	{
		$params = $this->getParams(Input::all());


		$oldPass = $params->oldpass;
		$newPass = $params->newpass;
		$retypePass = $params->retypepass;

		$data = array();
		$data['ret'] = -1;

		if($oldPass == ""){
			$data['ret'] = 1;
			$this->showReturnData($data);
			return;
		}

		if($newPass == ""){
			$data['ret'] = 2;
			$this->showReturnData($data);
			return;
		}

		if($retypePass == ""){
			$data['ret'] = 3;
			$this->showReturnData($data);
			return;
		}

		if ($newPass === $retypePass) {

			if ($this->validatePassword(trim($newPass))) {
				$user = Auth::user();
				if ($user) {
					$password = $user->password;
					$passwd = bcrypt($oldPass);
					$data['oldpasscrypted'] = $passwd;

					$salt = config('app.salt');
					$oldWayPasswd = hash_hmac('sha256', trim($oldPass), $salt);

					$credentials = [
					    'login' => $user->email,
					    'password' => $oldPass,
					];
					if (Hash::check($oldPass, $password) || $password === $oldWayPasswd) {
						$pass = bcrypt($newPass);

						$user->password = $pass;
						$user->save();

						$data['ret'] = 0;


					} else {
						$data['ret'] = 6;
					}
				}else{
					$data['ret'] = 7;
				}
			} else {
				$data['ret'] = 5;
			}
			
		}else{
			$data['ret'] = 4;
		}

		
		$this->showReturnData($data);
	}

	private function validatePassword($pass)
	{
		if (preg_match("#.*^(?=.{6,30})(?=.*[a-z])(?=.*[0-9]).*$#", $pass)) {
			if (strlen($pass) < 6 ){
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
			
	}

	public function changeavatar(ProfileRequest $request) 
	{

		if (Input::hasFile('avatar')) {
	    	$file = Input::file('avatar');

	    	$userDirectory = storage_path( '/app/projects/' . Auth::user()->id );

	    	if (!file_exists($userDirectory)) {
	    		mkdir($userDirectory);
	    	}
	    	if (!file_exists($userDirectory . '/avatar')) {
	    		mkdir($userDirectory . '/avatar');
	    	}

	       	copy($file, $userDirectory . '/avatar/avatar.png');

	       	$userAvatarLink = config('app.projects_link') . Auth::user()->id . '/avatar/avatar.png';
	       	Auth::user()->photo = $userAvatarLink;
	       	Auth::user()->save();

	       	$this->showReturnData(array('imagelink' => $userAvatarLink));
	    }
	    else{
	        //
    	}
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
