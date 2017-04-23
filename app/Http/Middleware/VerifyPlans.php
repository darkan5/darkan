<?php namespace App\Http\Middleware;

use Closure;
use Auth;
use Session;
use App\Modules\Plans\UserPlanModule;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyPlans extends BaseVerifier {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */

	// public function handle($request, Closure $next)
	// {
	// 	return parent::handle($request, $next);
	// }

	public function handle($request, Closure $next)
    {
        // print_r(csrf_token());
        ///die();


        if (Auth::user())
        {
        	$hasPlan = UserPlanModule::hasPlan();

        	// print_r(json_encode($hasPlan));
        	// die();

	 	    Session::set('hasPlan', $hasPlan);
        }

        return $next($request);

        //throw new TokenMismatchException;
    }

}
