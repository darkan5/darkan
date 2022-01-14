<?php namespace App\Http\Controllers\Auth;

use Socialite;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\Registrar;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Lang;
use Auth;
use Input;
use Session;
use Location;
use App\Repositories\UserRepository;
use App\Modules\SocialAuth\SocialAuth;
use App\Modules\User\SubdomainUserRepository;
use App\Modules\Models\UserLogin;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\LmsInfo;
use App\Modules\Utils\Utils;
class SubdomainLoginController extends LoginController {

	/*
	|--------------------------------------------------------------------------
	| Registration & Login Controller
	|--------------------------------------------------------------------------
	|
	| This controller handles the registration of new users, as well as the
	| authentication of existing users. By default, this controller uses
	| a simple trait to add these behaviors. Why don't you explore it?
	|
	*/

	use AuthenticatesUsers;

	protected $redirectPath = '/projects';
	protected $redirectAfterLogout = '/auth/login';

	//postLogin
	//postRegisterSubdomain
	//subdomainLogout

	public function postLogin(Request $request)
	{
 		//dd($request->callbackurl);
	   // $subdomain = substr($request->callbackurl,7,3);

        $subdomain = $this->get_string_between($request->callbackurl,'//','.');


	    $this->validate($request, ['email' => 'required', 'password' => 'required']);

	    // $credentials = [
	    //     'login' => trim($request->get('login')),
	    //     'password' => trim($request->get('password'))
	    // ];

	    //$remember = $request->has('remember');
		$getAdminPortal = User::where('subdomain',$subdomain)->first();
		$getInfoLogin = LmsInfo::where('user_id',$getAdminPortal->id)->first();
		if ($this->attemptLogin($request)){
		  
		if($getInfoLogin->state){	
			$user =  LmsUserPortal::where('user', '=', Auth::user()->id)
                ->first();


			$owner = User::find($user->portal_admin);

	        $subdomainPath = config('app.protocol_not_secure') 
                            . $owner->subdomain
                            . '.' 
                            . config('app.domain')
                            . substr(config('app.folder'), 0, -1);


            $this->addToUserLogin(Auth::user()->id);

			return redirect()->intended($subdomainPath);
		}
		if($getInfoLogin->login){
			 $subdomainPath = config('app.protocol_not_secure')
                            . $subdomain
                            . '.'
                            . config('app.domain')
                            . substr(config('app.folder'), 0, -1);
			    $this->addToUserLogin(Auth::user()->id);

                        return redirect()->intended($subdomainPath);
			
	
			}
		}
		

	    //show error if invalid data entered
	    return redirect()->back()->withErrors(Lang::get('login.loginPassDoNotMatch'))->withInput();
	}
    public function get_string_between($string, $start, $end){
        $string = ' ' . $string;
        $ini = strpos($string, $start);
        if ($ini == 0) return '';
        $ini += strlen($start);
        $len = strpos($string, $end, $ini) - $ini;
        return substr($string, $ini, $len);
    }
	public function postRegisterSubdomain(Request $request)
    {
        $validator = $this->registrar->validator($request->all());

        if ($validator->fails()) {
            $this->throwValidationException(
                $request, $validator
            );
        }

		$callbackUrl = $request->get('callbackurl');

		$input = Input::all();

		$repository = new SubdomainUserRepository();
        $newUser = $repository->findOrCreateUser($input);

        Auth::login($newUser);

        return redirect($callbackUrl);
    }

    public function subdomainLogout(Request $request)
    {


      // $user =  LmsUserPortal::where('user', '=', Auth::user()->id)->first();

		$owner = User::find($user->owner_id);

	    $subdomain = $this->get_string_between($request->url(),'//','.');
        $subdomainPath = config('app.protocol_not_secure')
                        . $subdomain
                        . '.'
                        . config('app.domain')
                        . substr(config('app.folder'), 0, -1);

    	Session::flush();
        Auth::logout();
		return redirect()->intended($subdomainPath);

    }

}
