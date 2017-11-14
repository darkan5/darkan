<?php

namespace App\Http\Controllers\Auth;
use Auth;
use Input;
use Socialite;
use Location;
use Carbon\Carbon;

use App\Modules\Models\UserLogin;
use App\Modules\User\FbUserRepository;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

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
        $userLogin->date_login = Carbon::now();
        $userLogin->date_logout = Carbon::now();
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
}
