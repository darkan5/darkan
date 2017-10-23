<?php
/**
 * Created by PhpStorm.
 * @author Szymon Chodźko
 * @email szymonchodzko@gmail.com
 * Date: 17.08.2017
 * Time: 14:07
 */

namespace App\Modules\Payment\Operator;


interface OperatorInterface
{
    /**
     * Ustawia cenę płatności
     * @param $price
     * @return mixed
     */
    public function setPrice($price);

    /**
     * Ustawia opis przedmiotu płatności
     * @param $description
     * @return mixed
     */
    public function setDescription($description);

    /**
     * Ustawia walutę płatności
     * @param $currency
     */
    public function setCurrency($currency);

    /**
     * Obsługa pojedynczej płatności
     * @return mixed
     */
    public function makeSinglePayment($currency, $description, $price);

    /**
     * Zwraca link przekierowujący do operatora płatności
     * @return mixed
     */
    public function getRedirectUrl();
}