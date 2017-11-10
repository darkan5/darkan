<?php

namespace App\Modules\Utils;
use Location;
use Lang;

class LangByLock
{
   public static function get($key)
   {
       $countryCode = strtolower(Location::get()->countryCode);
       return Lang::get($key, [], $countryCode);
   }
}