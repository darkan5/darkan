<?php

/**
 * @author mscislaw
 * @created 2014-06-12
 */

	class Library {
		private $request;

		private $data = array();

		function __construct($request) {
			$this->request = json_decode($request);

			switch ($this->request->request) {
				case 1:
					$this->load_main();
					break;

				case 2:
					$this->load_icon();
					break;

				case 3:
					$this->copy_image();
					break;

				case 4:
					$this->searchImages();
					break;
			}
		}

		function __destruct() {
			echo json_encode($this->data);
		}

		private function searchImages() {
			$search = $this->request->search;

			$json = file_get_contents('../../library/library_tags.json', 0, null, null);
			$json_d = json_decode($json, true);

			$k = 0;
			$html = '';
			foreach ($json_d as $key=>$value) {
				foreach ($value as $key2=>$value2) {
					$tags = explode(' ', $value2['tags']);

					if (!empty($search)) {
						$ok = true;
						foreach ($search as $tag) {
							if (!in_array($tag, $tags)) {
								$ok = false;
							}
						}

						if ($ok) {
							$k++;
							$html .= '<div class="avatar-folder" id="avatar-'.$key2.'" style="background-image: url(\'library/' . $key . '/'.$key2.'/thumbnail/'.'mainthumb.png\')" folder-name="'. $key2 .'" folder-lib="' . $key . '"></div>';
						}
					}
				}
			}

			$i = 0;

			$this->data['html'] = $html;
		}

		// private function copy_image() {
		// 	global $prefix, $path_project;

		// 	$foldername = $this->request->path;
		// 	$pageid = $this->request->pageid;
		// 	$next_point_nuber = $this->request->next_point_nuber;
   
		// 	$file = explode('/', $foldername);

  //           if (!file_exists($prefix.$path_project.'pre/exported_view/'.$pageid.'/images'))
  //               mkdir($prefix.$path_project.'pre/exported_view/'.$pageid.'/images');

  //           // echo 'sciezka: ' . $prefix.$path_project.'pre/exported_view/'.$pageid.'/images';

  //           if (!file_exists($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$next_point_nuber))
  //               mkdir($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$next_point_nuber);

  //           foreach (glob($prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$next_point_nuber.'/*') as $fff)
  //                   unlink($fff);
                        
		// 	copy('../library/'.$foldername, $prefix.$path_project.'pre/exported_view/'.$pageid.'/images/'.$next_point_nuber.'/'.end($file));

		// 	$this->data['path'] = 'projects/'.$path_project.'pre/exported_view/'.$pageid.'/images/'.$next_point_nuber.'/'.end($file);

  //           if (strtolower(substr($foldername, -3) == 'svg')) {
  //               $xml = simplexml_load_file('../library/'.$foldername);
  //               $attr = $xml->attributes();
  //               $this->data['width'] = (string)$attr->width;
  //               $this->data['height'] = (string)$attr->height;
  //           } else {
  //               list($width, $height) = getimagesize('../library/'.$foldername);
  //               $this->data['width'] = $width;
  //               $this->data['height'] = $height;
  //           }
		// }

		private function load_icon() {
			$path1 = $this->request->path1;
			$path2 = $this->request->path2;
			$avatars = '';

			foreach (glob("../../library/$path1/$path2/*") as $filename) {
				$folder = explode('/', $filename);
				$fileNn = explode('.', end($folder));
				if (strtolower(end($fileNn)) == 'png' || strtolower(end($fileNn)) == 'jpg' || strtolower(end($fileNn)) == 'jpeg') {
                    if (end($folder) != 'thumbnail') {
                        $avatars .= '<div class="avatar-item" id="avatar-'.end($folder).'" style="background-image: url(\'library/' . $path1 . '/' . $path2  . '/thumbnail/'.end($folder).'.png\')" item-dir="' . $path1 . '/' . $path2 . '/'. end($folder) .'"></div>';
                    }
                }
				
			}
			$this->data['html'] = $avatars;
		}

		private function load_main() {
			$path = $this->request->path;

			$avatars ='';
			foreach (glob("../../library/$path/*") as $filename) {
				$folder = explode('/', $filename);
				$avatars .= '<div class="avatar-folder" id="avatar-'.end($folder).'" style="background-image: url(\'library/' . $path . '/'.end($folder).'/thumbnail/'.'mainthumb.png\')" folder-name="'. end($folder) .'" folder-lib="' . $path . '"></div>';
				
			}
			$this->data['html'] = $avatars;
		}
	}

	if (isset($_POST['request'])) {
		$request = new Library($_POST['request']);
	}
?>