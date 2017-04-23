<?php namespace App\Modules\Responce;

class ResponceObject {

	public $code = -1;
    public $message = '';
    public $success = null;
    public $data = array();

    public function toJSON(){
    	echo json_encode($this);
    }
}