<?php namespace App\Http\Middleware;

use Closure;
use Auth;

class SubdomainMiddleware {

    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($this->isAllowedRoute($request->url())) {
           
            if(substr($request->url(),-17,17) == "/subdomain/logout"){
                Auth::logout();    
                //redirect('/subdomain/login');
            }
            return $next($request);
        }

        if ($this->isNotAllowedSubdomain($request)) {
            return redirect( config('app.protocol_not_secure') . config('app.domain') . config('app.folder') );
        }

        $pieces = explode('.', $request->getHost());

        $domain = $pieces[0] . '.' . $pieces[1];

        $acceptedSubdomainPath = config('app.protocol_not_secure') 
                                    . $pieces[0] 
                                    . '.' 
                                    . config('app.domain')
                                    . substr(config('app.folder'), 0, -1);
        
                                  
        if($acceptedSubdomainPath != $request->url()) {

            $host = $request->getHost();
            $wholeLink = $request->url();

            $onlyRoute = str_replace($host, config('app.domain'), $wholeLink);


            $redirectPath = $onlyRoute;


            return redirect( $redirectPath );
        }

        return $next($request);
    }

    private $notAllowedSubdomains = [
        'www'
    ];
    private function isNotAllowedSubdomain($request)
    {
        $pieces = explode('.', $request->getHost());
        $domain = $pieces[0];

        foreach($this->notAllowedSubdomains as $notAllowedUrl) {
            if ($domain == $notAllowedUrl) {
                return true;
            }
        }

        return false;
    }

    private $allowedRoutes = [
        '/portal/sendaccessrequest',
        '/subdomain/login',
        '/subdomain/register',
        '/subdomain/logout',
        '/portal/saveportalpayment'
    ];

    private function isAllowedRoute($url)
    {
        foreach($this->allowedRoutes as $allowedUrl) {
            if (strpos($url, $allowedUrl) !== false) {
                return true;
            }
        }

        return false;
    }

}