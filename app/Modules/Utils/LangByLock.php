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

    /**
     * Konwertuje podany kod kraju na kod wersji językowej w
     * której znajduje się zapisana docelowa waluta
     * Jako że przeliczenia walut trzymamy w translacjach
     * en -> funty
     * de -> euro
     * us -> dolary
     * pl -> złotówki
     *
     * @param $countryCode string
     * @return  string
     */
    public static function getCountryForPayments($countryCode)
    {
        if(in_array($countryCode, self::getEuroCountries())) {
            // wersja językowa zawierająca ceny w eruo
            return 'de';
        } else if (in_array($countryCode, self::getPoundCountries())) {
            // wersja jezykowa zawierająca ceny w funtach
            return 'en';
        } else if (in_array($countryCode, self::getUsdCountries())) {
            // wersja językowa zawierająca ceny w dolarach
            return 'us';
        } else if ($countryCode === 'PL') {
            // aby można zrobić falback dla pozostałych krajów przepuszczenie PLNów
            return 'pl';
        } else return 'us';
    }

    /**
     * Zwraca tablicę z kodami krajów dla których płatności mają być
     * realizowane w Euro
     * @return array
     */
    public static function getEuroCountries()
    {
        return [
            'AT', 'BE', 'HR', 'BG', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
            'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
        ];
    }

    public static function getUsdCountries()
    {
        return [
            'US'
        ];
    }

    public static function getPoundCountries()
    {
        return [
            'GB'
        ];
    }
}