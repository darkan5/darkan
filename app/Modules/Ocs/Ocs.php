<?php namespace App\Modules\Ocs;

use Auth;
use App\User;
	
	class Ocs {
		private $ocs_url = 'https://ocs-pl.oktawave.com/auth/v1.0/';
		private $ocs_user = 'TomaszWisniewski4791:admin';
		private $ocs_pass = 'Habuzdz44';

		public $container_projects; // = 'projects';

		public $container_banners; // = 'banners';
		
		// sam token
		private $token;
		
		// token z prefixem X-Auth-Token:
		private $x_auth_token;
		
		// adres url
		private $url;
		
		function __construct($container_projects, $container_banners) {

			$this->container_projects = $container_projects;
			$this->container_banners = $container_banners;

			$this->token = $this->get_token();
			
			if (!$this->token) {
				//die('nie moge pobrac tokena');
				return false;
			}
		}

		private function checkStatus($output) {
			// $output nie moze byc pusty
			if (!empty($output)) {
				foreach($output as $key=>$value) {
					// wyszukanie kodu powrotu
					if (substr($value, 0, 4) === 'HTTP') {


						$ch = strpos($value, '100');
						if ($ch !== false) {
							continue;
						}
						
						// sprawdzenie czy kod powrotu rowny jest 200
						$ch = strpos($value, '200');

						if ($ch === false)
							$ch = strpos($value, '201');

						if ($ch === false) {
							// kod rozny od 200
							return false;
						} else {
							// zapytanie wykonane poprawnie, kod powrotu 200, 201
							return true;
						}
					}
				}
			}
			
			return false;
		}
		
		private function get_token() {
			$output = null;
			$token = false;
			$return = exec("curl -i $this->ocs_url -X GET -H 'X-Auth-User: $this->ocs_user' -H 'X-Auth-Key: $this->ocs_pass'", $output);
			//print_r($output);
			//echo '<br>' . $return . '<br>';
			foreach($output as $key=>$value) {
				// wyszukanie w tablicy tokena
				if (substr($value, 0, 14) === 'X-Auth-Token: ') {
					$token_tmp = explode('X-Auth-Token: ', $value);
					$token = $token_tmp[1];
					$this->x_auth_token = $value;
				}
				// wyszukanie w tablicy adresu url
				if (substr($value, 0, 15) === 'X-Storage-Url: ') {
					$url_tmp = explode('X-Storage-Url: ', $value);
					$this->url = $url_tmp[1];
				}
			}
			return $token;
		}
		
		public function get_data() {
			//$return = exec("curl -i $this->url/mscislawtest -X GET -H '$this->x_auth_token'");
			$return = exec("curl -i $this->url/mscislawtest?format=json -X GET -H '$this->x_auth_token'");
			//$return = exec("curl -i $this->url?format=json -X GET -H '$this->x_auth_token'");
			//echo $return . '<br>';
			//foreach ($return[0] as $val) {
			//	echo 'a - ';
			//}
			$return = json_decode($return);
			//echo $return;
			//$return = json_decode($return, true);
			
			foreach ($return as $val) {
				echo ' - ' . $val->name;
				echo "<br>";
			}
			//echo "<br>test<br>";
		}
		
		// pobieranie obiektow z kontenera
		public function get($container, $object, $destination) {
			$object_arr = explode('/', $object);
			$file_name = end($object_arr);
			$return = exec("curl -X GET -H '$this->x_auth_token' $this->url/$container/$object > $destination");
		}

		// tworzenie pliku 'del.txt' z lista wszystkich obiektow w podanym kontenerze
		public function container_obj_list_to_file($container) {
			$return = exec("curl -i $this->url/$container?format=json -X GET -H '$this->x_auth_token'");
			$return = json_decode($return);
			
			$fp = fopen('del.txt', 'w');
			foreach ($return as $val) {
				fwrite($fp, $container . '/' . $val->name . "\n");
			}
			fclose($fp);
		}

		public function copy_x($container_source, $container_dest, $prefix) {
			$objects = array();
			$return = exec("curl -i $this->url/$container_source?format=json -X GET -H '$this->x_auth_token'");
			$return = json_decode($return);
			
			// wyszukanie w kontenerze wszystkich obiektow odpowiadajacych prefiksowi
			foreach ($return as $val) {
				if (strlen($val->name) >= strlen($prefix)) {
					if ($prefix === substr($val->name, 0, strlen($prefix))) {
						$objects[] = $val->name;
					}
				}
			}
			
			// tworzenie pliku z objektami w kontenerze do usuniecia
			//$this->container_obj_list_to_file($container_dest);
			
			// usuniecie wczesniej wyszukanych obiektow w kontenerze
			//$this->delete2($container_dest, 'del.txt');
			
			// kopiowanie obiektow z danego "katalogu"
			foreach ($objects as $val) {
				$return = exec("curl -X PUT -i $this->url/$container_dest/$val -H '$this->x_auth_token' -H 'X-Copy-From: /$container_source/$val' -H 'Content-Length: 0'");
			}
		}
		
		// usuwanie obiektow z kontenera
		public function delete($container, $object) {
			$return = exec("curl -X DELETE -i -H '$this->x_auth_token' $this->url/$container/$object");
		}

		// kasownaie obiektow podanych w pliku $delete_list w kontenerze
		public function delete2($container, $delete_list) {
			$return = exec("curl -X DELETE --data-binary @$delete_list -H '$this->x_auth_token' -H 'Content-Type: text/plain' $this->url/?bulk-delete");
		}
		
		// umieszczanie obiektow w kontenerze
		public function put($container, $object, $destination) {
			$output = null;
			$return = exec("curl -X PUT -i -H '$this->x_auth_token' -T $object $this->url/$container/$destination", $output);


			if (!$this->checkStatus($output)) {
				//echo 'blad: nie ide dalej<br>';
				return false;
			}

			return true;
		}
	}
	
	//$ocs = new OCS();
?>