<?php
/**
 * Created by PhpStorm.
 * @author Szymon Chodźko
 * @email szymonchodzko@gmail.com
 * Date: 17.08.2017
 * Time: 13:59
 */

namespace App\Modules\Payment;
use App\Modules\Payment\Operator\PayPalOperator;
use \Exception;
use App\Modules\Payment\Operator\OperatorInterface;


class PaymentManager
{
    /**
     * Lista operatorów płatności
     * @return array
     */
    public static function paymentOperatorList()
    {
        return [
            'paypal' => PayPalOperator::class
        ];
    }

    /**
     * Wyszukuje klasę operatora płatności na podstawie przekazanego identyfikatora
     * @param $operatorName string
     * @return OperatorInterface
     * @throws Exception
     */
    public static function findByName($operatorName) {
        $paymentOperatorList = self::paymentOperatorList();
        if (array_key_exists($operatorName, $paymentOperatorList)) {
            return new $paymentOperatorList[$operatorName];
        } else {
            throw new Exception("Operator płatności $operatorName nie został znaleziony");
        }
    }
}