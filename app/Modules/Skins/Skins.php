<?php namespace App\Modules\Skins;

use Auth;
use App\User;


class Skins {
	public $skin;
	private $userMail;

	function __construct($userMail) {
		$this->userMail = $userMail;

		$this->skins = array();

		$this->skins['sk34'] = array('*');
		$this->skins['sk35'] = array('*');
		$this->skins['sk36'] = array('*');
		$this->skins['sk00'] = array('*');
		$this->skins['sk01'] = array('*');
		$this->skins['sk02'] = array('*');
		// $this->skins['default']['def01'] = array('*');

		// $this->skins['sk02'] = array('*');
		$this->skins['sk03'] = array('*');
		// $this->skins['sk04'] = array('*');
		// $this->skins['sk05'] = array('*');
		// $this->skins['sk06'] = array('*');
		// $this->skins['sk07'] = array('*');
		// $this->skins['sk08'] = array('*');
		// $this->skins['sk09'] = array('*');
		// $this->skins['sk10'] = array('*');
		// $this->skins['sk11'] = array('*');
		// $this->skins['sk12'] = array('*');
		// $this->skins['sk13'] = array('*');
		// $this->skins['sk14'] = array('*');
		// $this->skins['sk15'] = array('*');
		// $this->skins['sk16'] = array('*');
		// $this->skins['sk17'] = array('*');
		// $this->skins['sk18'] = array('*');
		// $this->skins['sk19'] = array('*');
		$this->skins['sk21'] = array('*');
		$this->skins['sk22'] = array('*');
		// $this->skins['sk23'] = array('*');
		// $this->skins['sk24'] = array('*');
		// $this->skins['sk25'] = array('*');
		// $this->skins['sk26'] = array('*');
		// $this->skins['sk27'] = array('*');
		// $this->skins['sk28'] = array('*');
		$this->skins['sk29'] = array('pio.wiecaszek@gmail.com');
		$this->skins['sk30'] = array('pio.wiecaszek@gmail.com');
		$this->skins['sk31'] = array('pio.wiecaszek@gmail.com');
		$this->skins['sk32'] = array('pio.wiecaszek@gmail.com', 'darkanmac@gmail.com');
	}

	public function showSkinList() {

		$skinsHtml = '';
		// skiny responsywne
		if (file_exists(config('app.public_folder') . '/js/editors/standard/skins')) {
			foreach ($this->skins as $skinName => $skinAccess) {
				if ($this->checkAccesToSkin($skinAccess)) {
					$skinsHtml .= '<div class="skin" skinName="' . $skinName . '" style="background:url('. asset('/js/editors/standard/skins/') .'/' . $skinName . '/thumb.png); background-size: 100% 100%"></div>';
				}
			}
		}

		return $skinsHtml;
	}

	private function checkAccesToSkin($skinAccess) {
		foreach ($skinAccess as $who) {
			if ($who === '*' || $who === $this->userMail) {
				return true;
			}
		}

		return false;
	}

	public function checkUserAccesToSkin($skinName) {

		if(!isset($this->skins[$skinName])){
			return false;;
		}
		
		$skinAccess = $this->skins[$skinName];

		return $this->checkAccesToSkin($skinAccess);
	}
}
