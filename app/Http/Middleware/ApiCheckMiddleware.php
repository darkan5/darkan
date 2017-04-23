<?php namespace App\Http\Middleware;

use Closure, Cookie, Auth, Location, Config;
use App\Modules\Utils\Utils;
use Session;

class ApiCheckMiddleware {


    public function handle($request, Closure $next)
    {
        
        if (Auth::check()) {
            if (Session::get('loggedExternal')) {
                Session::flush();
                Auth::logout();
            }
        }

        return $next($request);
    }
}