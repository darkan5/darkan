<?php

require_once '../../php/session.php';

class ImageSearch
{
	private $returnData = array();
	private $request;
	
	function __construct($request)
	{
		$this->request = json_decode($request);
		
		switch ($this->request->request) {
			
			case 1:
				// wyszukiwanie z google
				$this->googleImageSearch($this->request->searchVal);
				break;
			
			case 2:
				// wyszukiwanie z iconfinder
				$this->iconfinderSearch($this->request->searchVal);
				break;

			case 3:
				// wyszukiwanie z pixabay
				$this->pixabaySearch($this->request->searchVal);
				break;

			case 4:
				// wyszukiwanie z morgueFile
				require_once 'mf.api.class.php';

				$this->morguefileSearch($this->request->searchVal);
				break;
			
			case 5:
				// wyszukiwarka wszystkiego
				// require_once 'mf.api.class.php';
				$this->allSearch($this->request->searchVal);
				break;

			case 6:
				$this->getImageFile();
				break;
		}
	}

	private function allSearch($searchVal) {
		$searchVal = str_replace(" ", "+", $searchVal);
		$json = array();
		$json['google'] = $this->get_url_contents_google('http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=8&safe=off&as_rights=cc_noncommercial&q=' . urlencode($searchVal));
		$json['iconfinder'] = $this->get_url_contents_iconfinder('https://www.iconfinder.com/json/search/?q='. urlencode($searchVal) .'&c=50&p=0&min=1&price=nonpremium&l=2&max=365&api_key=16f13074bff647c29d20631f0876eab1');
		$json['pixabay'] = $this->get_url_contents_pixabay('http://pixabay.com/api/?username=darkan&key=ccc9501fa36fa489ff06&search_term='. urlencode($searchVal) .'&image_type=photo');


		// $sercz = '/archive/search/new/1/' . urlencode($searchVal) . '/';
		// $mf = new morguefile();
		// $json[3] = $mf->call($sercz);
		$this->sendData($json);
	}
	
	private function googleImageSearch($searchVal) {
		$json = $this->get_url_contents_google('http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=8&safe=off&as_rights=cc_noncommercial&q=' . urlencode($searchVal));
		$this->sendData($json);
	}
	
	
	private function iconfinderSearch($searchVal) {
		$searchVal = str_replace(" ", "+", $searchVal);
		$json = $this->get_url_contents_iconfinder('https://www.iconfinder.com/json/search/?q='. urlencode($searchVal) .'&c=50&p=0&min=1&price=nonpremium&l=2&max=365&api_key=16f13074bff647c29d20631f0876eab1');
		$this->sendData($json);
	}

	private function pixabaySearch($searchVal) {
		$searchVal = str_replace(" ", "+", $searchVal);
		$json = $this->get_url_contents_pixabay('http://pixabay.com/api/?username=darkan&key=ccc9501fa36fa489ff06&search_term='. urlencode($searchVal) .'&image_type=photo');
		$this->sendData($json);
	}

	private function morguefileSearch($searchVal) {
		$searchVal = str_replace(" ", "+", $searchVal);
		$sercz = '/archive/search/new/1/' . urlencode($searchVal) . '/';
		$mf = new morguefile();
		$json = $mf->call($sercz);
		$this->sendData($json);
	}

	private function get_url_contents_pixabay($url) {
		$crl = curl_init();

		curl_setopt($crl, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)');
		curl_setopt($crl, CURLOPT_URL, $url);
		curl_setopt($crl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($crl, CURLOPT_CONNECTTIMEOUT, 5);

		$ret = curl_exec($crl);
		curl_close($crl);
		return $ret;
	}
	
	private function get_url_contents_iconfinder($url) {
		$crl = curl_init();
		curl_setopt($crl, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)');
		curl_setopt($crl, CURLOPT_URL, $url);
		curl_setopt($crl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($crl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($crl, CURLOPT_SSL_VERIFYHOST , false);
		curl_setopt($crl, CURLOPT_CONNECTTIMEOUT, 5);
		$ret = curl_exec($crl);
		curl_close($crl);
		return $ret;
	}
	
	private function get_url_contents_google($url) {
		$crl = curl_init();

		curl_setopt($crl, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)');
		curl_setopt($crl, CURLOPT_URL, $url);
		curl_setopt($crl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($crl, CURLOPT_CONNECTTIMEOUT, 5);

		$ret = curl_exec($crl);
		curl_close($crl);
		return $ret;
	}

	private function getImageFile() {
		SESSION_METHOD::sessionStart();
		
        $link = str_replace('https', 'http', $this->request->link);
        $path = $_POST['path'];
        $pageid = $_POST['pageid'];
        if (isset($_POST['fname']) && $_POST['fname'] != '') {
            $file = $_POST['fname'];
            $file = str_replace(' ', '_', $file);
        } else {
    		$tempExplode = explode('/', $link);
            $file = end($tempExplode);
            $file = str_replace('%20', '_', $file);
            $file = str_replace('%', '_', $file);
        }
        
        if (!file_exists($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/')) {
            mkdir($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/');
        }

        if (!file_exists($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$path))
            mkdir($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$path);
        
        $fp = fopen($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$path.'/'.$file, 'w+');
        $link = str_replace(' ', '%20', $link);
        $ch = curl_init($link);
        curl_setopt($ch, CURLOPT_TIMEOUT, 50);
        curl_setopt($ch, CURLOPT_FILE, $fp);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_exec($ch);
        fclose($fp);
        //$test = "http://dl.dropboxusercontent.com/1/view/pdks5jtqh0ngd41/Camera%20Uploads/2013-09-09%2015.04.49.jpg";
        //file_put_contents("test.jpg", file_get_contents($test));
        
        //copy($link, $prefix.$path_image.$path.'/'.$file);
        list($width, $height) = getimagesize($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$path.'/'.$file);
        //echo $width.' - '.$height;
        $ret[0] = $width;
        $ret[1] = $height;
        $ret[2] = $file;
        //$ret[3] = $prefix.$path_project.$pageid.'/images/'.$path.'/'.$file;
        //$ret[4] = $prefix.$path_image.$path.'/'.$file;
        
        // echo json_encode($ret);
	}
	
	private function sendData($data) {
		echo json_encode($data);
	}
	
}

$imgSearch = new ImageSearch($_POST['request']);