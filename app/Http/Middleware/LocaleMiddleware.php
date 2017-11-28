<?php namespace App\Http\Middleware;

use Closure, Cookie, Auth, Location, Config;
use App\Modules\Utils\Utils;

class LocaleMiddleware {


    public function handle($request, Closure $next)
    {

        if ($this->isAllowedRoute($request->url())) {
            return $next($request);
        }

        $this->setPricingLocaleByUserLocation();
        
        $this->setSiteLocale($request);

        return $next($request);
    }

    private function setSiteLocale($request)
    {
        $forcedSiteLang = $request->lang;
        if ($forcedSiteLang) {
            Cookie::queue('darkanlocale', $forcedSiteLang);
            app()->setLocale($forcedSiteLang);
            return;
        }
     
        if(Auth::user()){

            app()->setLocale(Auth::user()->lang);
            Cookie::queue('darkanlocale', Auth::user()->lang);


        }elseif(Cookie::has('darkanlocale')){
            app()->setLocale(Cookie::get('darkanlocale'));
        } else {
            $countryCode = Location::get($request->getClientIp())->countryCode;
            $lang = Utils::getLocaleByCode($countryCode);

            app()->setLocale($lang);
            Cookie::queue('darkanlocale', $lang);
        }
    }

    private function setPricingLocaleByUserLocation()
    {
        if(Cookie::has('darkanpricinglocale')){
            $countryCode = Cookie::get('darkanpricinglocale');
        } else {
            $countryCode = Location::get()->countryCode;
            Cookie::queue('darkanpricinglocale', $countryCode);
        }

        // echo('countryCode: ' .$countryCode );

        $pricingLocale = Utils::getPricingLocaleByCode($countryCode);

        Config::set('app.pricing_locale', $pricingLocale);
    }

    private $allowedRoutes = [
        '/paypalpayment'
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