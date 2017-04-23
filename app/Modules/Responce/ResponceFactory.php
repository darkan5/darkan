<?php namespace App\Modules\Responce;

use App\Modules\Responce\ResponceResult;
use App\Modules\Responce\ResponceFault;

class ResponceFactory {

	public static function createResponceResult(){
		$responce = new ResponceResult();
		return $responce;
	}

	public static function createResponceFault(){
		$responce = new ResponceFault();
		return $responce;
	}
}