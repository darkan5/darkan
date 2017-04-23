<?php

require_once '../../config_login.php';
require_once '../../2.0.0/php/ocs.php';

class Content {
	private $path = 'app/banners/'; // sciezka do bannerow

	private $publicationHash = '[-=PUBLICATION_HASH=-]';

	function __construct() {
		$this->check_banner();

	}

	public function showPublication() {

		$robotContent = $this->getRobotContent();

		$publicationContent = $this->getPublicationContent();

		$publicationContent = str_replace('[-=ROBOT_CONTENT=-]', $robotContent, $publicationContent);

		return $publicationContent;

	}

	private function getPublicationContent() {

		return file_get_contents('index.html');
	}

	private function getRobotContent() {

		$seomapPath = 'seomap.json';

        $html = '';

		if (file_exists($seomapPath)) {
			
	        $seomap = json_decode( file_get_contents($seomapPath) );


	        if( $seomap ){

	            foreach ($seomap as $page) {

	            	$html .= '<section>';

	                foreach ($page as $componenent) {

	            		$type = $componenent->type;
	            		$content = $componenent->content;

	            		switch ($type) {
	                         case 'image':
	                             $html .= '<img src="'. $content .'" style="display:none;"/>';	
	                             break;

	                         case 'text':
	                             $html .= '<article style="display:none;">'. $content .'</article>';
	                             break;    
	                        
	                         default:
	     
	                             break;
	                     }
	            	}

	            	$html .= '</section>';
	            }
	        }	
		}

        return $html;
	}


	private function check_banner() {
		global $database, $ocs_container_projects, $ocs_container_banners;

		if ($this->publicationHash == '') {
			// nie ma hasha
			return false;
		}

		$this->publicationHash = $database->mysql_conn->real_escape_string($this->publicationHash);

		$qu = $database->query("SELECT * FROM `banners_projects` WHERE `path`='$this->publicationHash'");
		if ($ret = $qu->fetch_assoc()) {
			// jest banner

			if ($ret['status'] == 1) {
				//banner jest na ocs

				$qu = $database->query("UPDATE `banners_projects` SET `status`=2 WHERE `path`='$this->publicationHash'");

	            $ocs = new OCS($ocs_container_projects, $ocs_container_banners);

	            $ocs->get($ocs->container_banners, 'banners/' . $this->publicationHash . '/backup.zip', 'backup.zip');

	            $zip = new ZipArchive();
	            $zip->open('backup.zip');
	            $zip->extractTo('/');
	            $zip->close();

	            unlink('backup.zip');

	            if (file_exists('exported_view')) {
	                $qu = $database->query("UPDATE `banners_projects` SET `last_visit`=NOW(), `status`=0 WHERE `path`='$this->publicationHash'");
	                return true;
	            } else {
					$qu = $database->query("UPDATE `banners_projects` SET `last_visit`=NOW(), `status`=1 WHERE `path`='$this->publicationHash'");
					return false;
	            }

			} else {
				// banner na dysku lokalnym

				$qu = $database->query("UPDATE `banners_projects` SET `last_visit`=NOW() WHERE `path`='$this->publicationHash'");
				return true;
			}

		} else {
			// nie ma bannera
			return false;
		}
	}
}

$content = new Content();

?>

<html>
<head>
	<title>[-=META_TITLE=-] | Darkan</title>

	<meta http-equiv="Content-Type">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE" />




    <meta property="og:url" content="[-=META_URL=-]" />
    <meta property="og:title" content="[-=META_TITLE=-]" />
    <meta property="og:description" content="[-=META_DESCRIPTION=-]"/>

    <meta property="og:image" content="[-=META_THUMB=-]" />

    <meta property="og:image:width" content="[-=META_THUMB_WIDTH=-]" /> 
    <meta property="og:image:height" content="[-=META_THUMB_HEIGHT=-]" />

</head>
<body>
	<?php 

		echo $content->showPublication();

	 ?>
</body>
</html>