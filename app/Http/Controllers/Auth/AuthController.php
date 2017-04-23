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
use App\Modules\User\FbUserRepository;
use App\Modules\Models\UserLogin;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Utils\Utils;

class AuthController extends Controller {

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


	public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }
 
    public function handleProviderCallback($provider)
    {
		if(Input::get('error')=='access_denied'){
          return redirect('/auth/login');
        }

        try {
            $user = Socialite::driver($provider)->user();
        } catch (Exception $e) {
            return redirect('login/' . $provider);
        }

		if(!Utils::validateEmail($user->email)){
          return redirect('/auth/login')
          				->withErrors(Lang::get('login.emailnotvalid'))->withInput();
        }
 		
		$FbUser = new FbUserRepository();
		$newUser = $FbUser->findOrCreateUser($user);

        Auth::login($newUser, true);

        $this->addToUserLogin(Auth::user()->id);
 
        return redirect()->intended('/projects');
    }

	public function addToUserLogin($userOwnerId)
	{
		$location = Location::get();
		
		$userLogin = new UserLogin();
		$userLogin->user_id = $userOwnerId;
		$userLogin->browser = $_SERVER['HTTP_USER_AGENT'];
		$userLogin->ip = $location->ip;
		$userLogin->countryName = $location->countryName;
		$userLogin->countryCode = $location->countryCode;
		$userLogin->regionCode = $location->regionCode;
		$userLogin->regionName = $location->regionName;
		$userLogin->cityName = $location->cityName;
		$userLogin->latitude = $location->latitude;
		$userLogin->longitude = $location->longitude;
		$userLogin->longitude = $location->longitude;
		$userLogin->driver = $location->driver;

		$userLogin->save();
	}

	public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

	
}
