<?php

namespace App\Modules\Utils;
use Location;
use Lang;

class LangByLock
{
   public static function get($ip, $key)
   {
       $countryCode = strtolower(Location::get($ip)->countryCode);
       return Lang::get($key, [], $countryCode);
   }
}