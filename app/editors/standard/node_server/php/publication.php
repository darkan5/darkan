<?php

require_once '../../../config_login.php';
require_once '../../php/database.php';
require_once '../../php/ocs.php';
require_once '../../php/session.php';

class EmptyClass{

}


Class Publication {

    private $responseData = [];
	private $requeresponseDatast;

	function __construct($request) {

		$this->request = json_decode($request);

		if (isset($this->request->type)) {

			switch ($this->request->type) {

				case 'newPublication':

					$this->newPublication();

					break;

				case 'overwritePublication':

					$this->overwritePublication();

					break;

                case 'deletePublication':

                    $this->deletePublication();

                    break;

                case 'exportToScorm':

                    $this->exportToScorm();

                    break;

                case 'exportToHTML':

                    $this->exportToHTML();

                    break;

                case 'exportToPDF':

                    $this->exportToPDF();

                    break;

				default:
					break;

			}

		}

		$this->sendData();

	}

    private function exportToPDF() {
        global $APP_LINK, $CFG;

        $projectID = (int)$this->request->projectID;
        $userID = getProjectUserId($projectID);
        $landscape = $this->request->landscape;
        $dataPDF = $this->request->dataPDF;


        $this->projectPath = '../../projects/' . $userID . '/' . $projectID . '/';
        $this->packPath = $this->projectPath . 'pack/';

        $this->createLangFile();

        if ($landscape === 'L') {
            $landscapeOption = '-O Landscape';
        } else {
            $landscapeOption = '-O Portrait';
        }



        $htmlFile = file_get_contents('../page_thumbs/index_pdf_page.html', 0, null, null);

        $files = '';

        foreach ($dataPDF as $onePage) {

            if ($onePage->activePage) {

                $newHTML = '';

                if ($onePage->activeNote) {
                    $newHTML = str_replace('--NOTE--', $onePage->note, $htmlFile);
                } else {
                    $newHTML = str_replace('--NOTE--', '', $htmlFile);
                }

                $imgPath = str_replace('\\', '/', realpath($_SERVER["DOCUMENT_ROOT"])) . $CFG['FOLDER'] . '/app/2.0.0/projects/' . $userID . '/' . $projectID . '/pre/exported_view/' . $onePage->pageID . '/pagethumb.jpg';

                $newHTML = str_replace('--THUMBIMAGE--', $imgPath, $newHTML);

                //file_put_contents($this->projectPath . 'pre/exported_view/' . $onePage->pageID . '/pagethumb.html', $newHTML, LOCK_EX);

                //exec('convert ' . $this->projectPath . 'pre/exported_view/' . $onePage->pageID . '/pagethumb.jpg  ' . $this->projectPath . 'pre/exported_view/' . $onePage->pageID . '/pagethumb.pdf');

                $rootPath = str_replace('\\', '/', realpath($_SERVER["DOCUMENT_ROOT"])) . $CFG['FOLDER'] . '/app/2.0.0/projects/' . $userID . '/' . $projectID . '/pre/exported_view/' . $onePage->pageID . '/';

                exec('wkhtmltopdf ' . $landscapeOption . ' ' . $rootPath . 'pagethumb.html ' . $rootPath . 'pagethumb.pdf');

                $this->responseData['exec'] = 'wkhtmltopdf ' . $landscapeOption . ' ' . $landscape . ' ' . $rootPath . 'pagethumb.html ' . $rootPath . 'pagethumb.pdf';

                //exec('wkhtmltopdf ' . $orientation . ' ' . $pagePath . ' ../projects/' . $userID . '/' . $project . '/pdf/page_' . $page->pageID . '.pdf');
                //exec('echo "' . $newHTML . '" | wkhtmltopdf - ' .  $this->projectPath . 'pre/exported_view/' . $onePage->pageID . '/pagethumb.pdf');

                $files .= $this->projectPath . 'pre/exported_view/' . $onePage->pageID . '/pagethumb.pdf ';
            }

        }

        // foreach ($json_content['pages'] as $pageID) {

        //     exec('convert ' . $this->projectPath . 'pre/exported_view/' . $pageID . '/pagethumb.jpg  ' . $this->projectPath . 'pre/exported_view/' . $pageID . '/pagethumb.pdf');

        //     //$pdff->addPDF($this->projectPath . 'pre/exported_view/' . $pageID . '/pagethumb.pdf', 'all');

        //     $files .= $this->projectPath . 'pre/exported_view/' . $pageID . '/pagethumb.pdf ';
        // }

        if (!file_exists($this->packPath)) {

            mkdir($this->packPath);

        }

        exec('gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dPDFSETTINGS=/printer -sOutputFile='. $this->packPath .'file.pdf ' . $files);

        $this->responseData['downloadLink'] = $APP_LINK . 'projects/' . $userID . '/' . $projectID . '/pack/file.pdf';


        //$pdff->merge('file', $this->packPath . 'file.pdf');

    }

    private function exportToScorm() {
        global $APP_LINK;

        $projectID = (int)$this->request->projectID;
        $userID = getProjectUserId($projectID);
        $name = strtolower(preg_replace('/([^a-zA-Z0-9.])/', "_", $this->request->name));
        $ownUserID = SESSION_METHOD::sessionGet('user_id');
        $scormVersion = $this->request->scormVersion;
        $title = $this->request->title;
        $skin = $this->request->skin;

        $this->projectPath = '../../projects/' . $userID . '/' . $projectID . '/';
        $this->mainTmpPath = $this->projectPath . 'tmp/';
        $this->tmpPath = $this->mainTmpPath . time() . '/';
        $this->contentTemplatePath = '../../content_template/';
        $this->packPath = $this->projectPath . 'pack/';
        $this->skinPath = '../../skins/' . $skin . '/';

        $this->createLangFile();

        // clear all temp directories
        if (file_exists($this->mainTmpPath)) {
            $this->rrmdir($this->mainTmpPath);
        }
        if (file_exists($this->packPath)) {
            $this->rrmdir($this->packPath);
        }

        

        if (!file_exists($this->mainTmpPath)) {
            mkdir($this->mainTmpPath);
        }

        if (!file_exists($this->tmpPath)) {
            mkdir($this->tmpPath);
        }

        if (!file_exists($this->packPath)) {
            mkdir($this->packPath);
        }

        if (!file_exists($this->tmpPath . 'css/')) {
            mkdir($this->tmpPath . 'css/');
        }

        if (!file_exists($this->tmpPath . 'skin/')) {
            mkdir($this->tmpPath . 'skin/');
        }

        $this->copyRecursive($this->projectPath . 'pre/', $this->tmpPath);
        $this->copyRecursive($this->contentTemplatePath, $this->tmpPath);

        $this->copyRecursive($this->skinPath . 'css/', $this->tmpPath . 'css/');
        $this->copyRecursive($this->skinPath . 'skin/', $this->tmpPath . 'skin/');

        $this->conversionImagesMin($this->tmpPath . 'exported_view/');

        $this->prepareIndexTemplateAndCopyToPublicationPath($this->skinPath, $this->tmpPath);

        $this->prepareMetaTags($this->tmpPath, '',  '', '', '');

        $this->scormPath = '../../scorm/12/';

        if ($scormVersion === '12') {

            $this->scormPath = '../../scorm/12/';
        } else if ($scormVersion === '2004') {

            $this->scormPath = '../../scorm/2004';
        }

        $this->copyRecursive($this->scormPath, $this->tmpPath);

        $doc = new DOMDocument();
        $doc->load($this->tmpPath . 'imsmanifest.xml');
        $nodes = $doc->getElementsByTagName('title');

        foreach ($nodes as $item) {
            $item->nodeValue = $title;
        }
        $doc->save($this->tmpPath . 'imsmanifest.xml');

        $zipFileName = $name . '.zip';

        $zip = new ZipArchive();

        if ($zip->open($this->packPath . $zipFileName, ZIPARCHIVE::CREATE) !==TRUE) {
            exit ("nie mogę zrobić pliku archiwum project.zip");
        }

        $this->zipDir($zip, $this->tmpPath);

        $zip->close();

        $this->responseData['downloadLink'] = $APP_LINK . 'projects/' . $userID . '/' . $projectID . '/pack/' . $zipFileName;

        $this->rrmdir($this->tmpPath);
    }

    private function exportToHTML() {
        global $APP_LINK;

        $projectID = (int)$this->request->projectID;
        $userID = getProjectUserId($projectID);
        $name = strtolower(preg_replace('/([^a-zA-Z0-9.])/', "_", $this->request->name));
        $ownUserID = SESSION_METHOD::sessionGet('user_id');
        $skin = $this->request->skin;

        $this->projectPath = '../../projects/' . $userID . '/' . $projectID . '/';
        $this->mainTmpPath = $this->projectPath . 'tmp/';
        $this->tmpPath = $this->mainTmpPath . time() . '/';
        $this->contentTemplatePath = '../../content_template/';
        $this->packPath = $this->projectPath . 'pack/';
        $this->skinPath = '../../skins/' . $skin . '/';

        $this->createLangFile();


        // clear all temp directories
        if (file_exists($this->mainTmpPath)) {
            $this->rrmdir($this->mainTmpPath);
        }
        if (file_exists($this->packPath)) {
            $this->rrmdir($this->packPath);
        }


        if (!file_exists($this->mainTmpPath)) {
            mkdir($this->mainTmpPath);
        }

        if (!file_exists($this->tmpPath)) {
            mkdir($this->tmpPath);
        }

        if (!file_exists($this->packPath)) {
            mkdir($this->packPath);
        }

        if (!file_exists($this->tmpPath . 'css/')) {
            mkdir($this->tmpPath . 'css/');
        }

        if (!file_exists($this->tmpPath . 'skin/')) {
            mkdir($this->tmpPath . 'skin/');
        }

        $this->copyRecursive($this->projectPath . 'pre/', $this->tmpPath);
        $this->copyRecursive($this->contentTemplatePath, $this->tmpPath);

        $this->copyRecursive($this->skinPath . 'css/', $this->tmpPath . 'css/');
        $this->copyRecursive($this->skinPath . 'skin/', $this->tmpPath . 'skin/');

        $this->conversionImagesMin($this->tmpPath . 'exported_view/');

        $this->prepareIndexTemplateAndCopyToPublicationPath($this->skinPath, $this->tmpPath);

        $this->prepareMetaTags($this->tmpPath, '',  '', '', '');

        $zipFileName = $name . '.zip';

        $zip = new ZipArchive();

        if ($zip->open($this->packPath . $zipFileName, ZIPARCHIVE::CREATE) !==TRUE) {
            exit ("nie mogę zrobić pliku archiwum project.zip");
        }

        $this->zipDir($zip, $this->tmpPath);

        $zip->close();

        $this->responseData['downloadLink'] = $APP_LINK . 'projects/' . $userID . '/' . $projectID . '/pack/' . $zipFileName;

        $this->rrmdir($this->tmpPath);

    }

    private function deletePublication() {
        global $database, $address_db, $user_db, $passwd_db, $database_db_second, $ocs_container_projects, $ocs_container_banners;

        $bannerID = (int)$this->request->bannerID;
        $hash = $this->request->hash;
        $ownUserID = SESSION_METHOD::sessionGet('user_id');

        $this->publicationPath = '../../../banners/' . $hash . '/';

        $getOwnPublicationQuery = $database->query("SELECT * FROM `banners_projects` WHERE `user_id`='$ownUserID'");

        $deletePublicationQuery = $database->mysql_conn->prepare("DELETE FROM `banners_projects` WHERE `id_banner`=? AND `path`=?");
        $deletePublicationQuery->bind_param('is', $bannerID, $hash);
        $deletePublicationQuery->execute();

        $deleteScormDataQuery = $database->mysql_conn->prepare("DELETE FROM `scorm_data` WHERE `course_id`=?");
        $deleteScormDataQuery->bind_param('i', $bannerID);
        $deleteScormDataQuery->execute();

        $deleteScormDataGuestQuery = $database->mysql_conn->prepare("DELETE FROM `scorm_data_guest` WHERE `course_id`=?");
        $deleteScormDataGuestQuery->bind_param('i', $banner_id);
        $deleteScormDataGuestQuery->execute();

        $groupBannerQuery = $database->query("SELECT * FROM `group_banner` LEFT JOIN `groups` ON `group_banner`.`id_group`=`groups`.`id` WHERE `group_banner`.`id_banner`='$bannerID'");
        if ($groupBannerRet = $groupBannerQuery->fetch_assoc()) {
            $groupID = $groupBannerRet['id'];

            $deleteGroupsQuery = $database->query("DELETE FROM `groups` WHERE `id`='$groupID' AND `status`='1'");
            $deleteGroupBannerQuery = $database->query("DELETE FROM `group_banner` WHERE `id_group`='$groupID'");
            $deleteGroupUserQuery = $database->query("DELETE FROM `group_user` WHERE `id_group`='$groupID'");
        }

        // usuwanie statystyk z drugiej bazy danych
        $mysqlConnSecond = mysqli_connect($address_db, $user_db, $passwd_db, $database_db_second);

        $deleteStatisticQuery = $mysqlConnSecond->query("DELETE FROM `statistics` WHERE `id_banner`='$banner_id'");

        $mysqlConnSecond->close();

        // sortowanie pozostalych bannerow

        $ordPubArray = [];
        $ordDeletedPublication = 0;

        while ($getOwnPublicationRet = $getOwnPublicationQuery->fetch_assoc()) {

            if ($getOwnPublicationRet['id_banner'] == $bannerID) {
                $ordDeletedPublication = (int)$getOwnPublicationRet['ord'];
            }

            $ordPubArray[$getOwnPublicationRet['id_banner']] = (int)$getOwnPublicationRet['ord'];

        }

        foreach ($ordPubArray as $pID => $ord) {

            if ($ord > $ordDeletedPublication) {

                $ordPubArray[$pID] = $ord - 1;

            }

            if ($pID == $bannerID) {
                $this->responseData['usuwam'] = $pID;
                unset($ordPubArray[$pID]);
            }

        }

        $changeOrdersQuery = "UPDATE `banners_projects` SET `ord` = CASE";

        foreach ($ordPubArray as $bID => $ord) {
            $changeOrdersQuery .= " WHEN `id_banner`='$bID' THEN '$ord'";
        }

        $changeOrdersQuery .= " ELSE `ord` END WHERE `id_banner` IN (";

        $i = 0;
        foreach ($ordPubArray as $bID => $ord) {
            if ($i != 0)
                $changeOrdersQuery .= ", ";

            $changeOrdersQuery .= "$bID";

            $i++;
        }

        $changeOrdersQuery .= ")";

        $database->mysql_conn->query($changeOrdersQuery);

        $this->rrmdir($this->publicationPath);
        
        $ocs = new OCS($ocs_container_projects, $ocs_container_banners);

        $ocs->delete($ocs->container_banners,  'banners/' . $hash . '/backup.zip');
    }

    private function preparePreview($userId, $projectId, $hash){

        global $server_link, $protocol;

        $projectModel =  array(
            'pages' => array(),
            'options' => new EmptyClass()
        );

        $projectId = (int)$projectId;

        $projectPath = '../../projects/' . $userId . '/' . $projectId . '/';

        $mapPath = $projectPath . '/sitemap/map.json';
        $map = json_decode( file_get_contents($mapPath) );

        if( $map->pages ){

            foreach ($map->pages as $pageId) {
                $pagePath = $projectPath . '/sitemap/'. $pageId .'.json';
                $page = json_decode( file_get_contents($pagePath) );

                if($page->options->active){
                    array_push($projectModel['pages'], $page);
                }
            }
        }

        $pages = array();

        foreach ($projectModel['pages'] as $pageModel) {

            $page = array();
            $pageId = $pageModel->options->pageid;

            foreach ($pageModel->lines as $line) {
                foreach ($line->objects as $objectModel) {

                    $object = null;

                    $type = $objectModel->type;
                    $actionkey = $objectModel->actionkey;
                    

                    switch ($type) {
                        case 'image':

                            $imageFileName = $objectModel->imageFileName;

                            $ext = substr($imageFileName, count($imageFileName) - 4, 3);

                            $imageFilePath = $protocol . $server_link . '/app/banners/' . $hash . '/exported_view/' . $pageId  . '/images/' . $actionkey . '/min.' . $ext;

                            $object = array('type' => $objectModel->type, 'content' => $imageFilePath);
                            break;

                        case 'text':
                            $object = array('type' => $objectModel->type, 'content' => $objectModel->contents);
                            break;    
                        
                        default:
        
                            break;
                    }

                    if($object != null){
                        array_push($page, $object);
                    }
                }
            }

            if(count($page)){
                array_push($pages, $page);
            }
        }

        $seomapPath = $projectPath . '/pre/seomap.json';
        $eomapContent = json_encode($pages);

        $wp = fopen($seomapPath, 'w');
        fwrite($wp, $eomapContent);
        fclose($wp);


    }


	private function overwritePublication() {
		global $database, $server_link;

		$this->responseData['overwritePublication'] = 'overwritePublication';

		$bannerID = (int)$this->request->bannerID;
		$hash = $this->request->hash;
		$projectID = (int)$this->request->projectID;
		$userID = getProjectUserId($projectID);
        $thumb = $this->request->thumb;
        $skin = $this->request->skin;
        $requirements = json_encode( $this->request->requirements );
        $questiondata = json_encode( $this->request->questiondata );

        $title = $database->mysql_conn->real_escape_string($this->request->title);
        $description = $database->mysql_conn->real_escape_string($this->request->description);
        $zoom = $this->request->zoom;
        $fullscreen = $this->request->fullscreen;
        $share = $this->request->share;
        $resetProgress = $this->request->resetProgress;
        $joinSource = $this->request->joinSource;

		$this->projectPath = '../../projects/' . $userID . '/' . $projectID . '/';
		$this->publicationPath = '../../../banners/' . $hash . '/';
		$this->contentTemplatePath = '../../content_template/';
        $this->thumbPath = '../../' . $thumb;
        $this->skinPath = '../../skins/' . $skin . '/';



        $this->preparePreview($userID, $projectID, $hash);
        $this->createLangFile();



		$this->rrmdir($this->publicationPath);

        if (!file_exists($this->publicationPath)) {
        	mkdir($this->publicationPath);
        }

        $this->createPublicationFiles();
        $this->conversionImagesMin($this->publicationPath . 'exported_view/');

        $sourceSize = 0;

        if ($joinSource === 1) {

            $this->joinProjectSource();

            $sourceSize = $this->sizeRecursive($this->publicationPath . 'b_source/');
        }

        if (file_exists($this->thumbPath)) {

            if (!file_exists($this->publicationPath . 'thumb')) {

                mkdir($this->publicationPath . 'thumb');
            }

            copy($this->thumbPath, $this->publicationPath . 'thumb/thumb.png');
        }

        $thumbFileName = 'http://'. $server_link . '/app/banners/' . $hash . '/thumb/thumb.png';

        $size = $this->sizeRecursive($this->publicationPath);

        $overwritePublicationQuery = $database->mysql_conn->prepare("UPDATE `banners_projects` SET `modified`=NOW(), `size_project`=?, `requirements`=?, `questiondata`=?, `size_source`=?, `name`=?, `summary`=?, `zoom`=?, `fullscreen`=?, `share`=?, `reset_progress`=?, `thumb`=? WHERE `id_banner`=? AND `path`=?");
        $overwritePublicationQuery->bind_param('ississiiiisis', $size, $requirements, $questiondata, $sourceSize, $title, $description, $zoom, $fullscreen, $share, $resetProgress, $thumbFileName, $bannerID, $hash);
        $overwritePublicationQuery->execute();

        $this->prepareMetaTags($this->publicationPath, 'http://'. $server_link . '/app/banners/' . $hash . '/' ,  $title, $description, $thumbFileName);
        
        $this->copyPublicationController($this->publicationPath, $hash);

        $this->addPublicationIDToProjectObject( $bannerID, $hash);

        $this->sendToOCS($hash);
	}

	private function newPublication() {
		global $database, $server_link;



		$projectID = (int)$this->request->projectID;
		$userID = getProjectUserId($projectID);
	    $title = $database->mysql_conn->real_escape_string($this->request->title);
	    $description = $database->mysql_conn->real_escape_string($this->request->description);
	    $zoom = $this->request->zoom;
	    $fullscreen = $this->request->fullscreen;
	    $share = $this->request->share;
	    $resetProgress = $this->request->resetProgress;
	    $joinSource = $this->request->joinSource;
	    $ownUserID = SESSION_METHOD::sessionGet('user_id');
        $thumb = $this->request->thumb;
        $skin = $this->request->skin;
        $requirements = json_encode( $this->request->requirements );
        $questiondata = json_encode( $this->request->questiondata );



        $userMaxPublications = getPlanMaxValue('banners');


        $publicationCountQuery = $database->query("SELECT * FROM `banners_projects` WHERE `user_id`='$ownUserID'");

        $ord = $publicationCountQuery->num_rows;

        if ($ord >= $userMaxPublications) {
            $this->responseData['error'] = array();
            $this->responseData['error']['message'] = 'Limit';
            return false;
        }


        for (;;) {

            $hash = hash('md5', $title . time());

            $checkHashQuery = $database->query("SELECT * FROM `banners_projects` WHERE `path`='$hash' LIMIT 1");

            if ($checkHashRet = $checkHashQuery->fetch_assoc()) {

            } else {

            	break;
            }
        }




	    $this->projectPath = '../../projects/' . $userID . '/' . $projectID . '/';
        $this->publicationPath = '../../../banners/' . $hash . '/';
        $this->contentTemplatePath = '../../content_template/';
        $this->thumbPath = '../../' . $thumb;
        $this->skinPath = '../../skins/' . $skin . '/';

        $this->preparePreview($userID, $projectID, $hash);
        $this->createLangFile();

        if (!file_exists($this->publicationPath)) {
        	mkdir($this->publicationPath);
        }

        $this->createPublicationFiles();

        $this->conversionImagesMin($this->publicationPath . 'exported_view/');

        $sourceSize = 0;

        $this->responseData['joinSource'] = $joinSource;

        if ($joinSource === 1) {

            $this->joinProjectSource();

            $sourceSize = $this->sizeRecursive($this->publicationPath . 'b_source/');
        }

        if (file_exists($this->thumbPath)) {

            if (!file_exists($this->publicationPath . 'thumb')) {

                mkdir($this->publicationPath . 'thumb');
            }

            copy($this->thumbPath, $this->publicationPath . 'thumb/thumb.png');
        }

        $thumbFileName = 'http://'. $server_link . '/app/banners/' . $hash . '/thumb/thumb.png';

        $size = $this->sizeRecursive($this->publicationPath);

        $iFrame = 'http://'. $server_link . '/c/' . $hash;


        $addNewPublicationQuery = $database->mysql_conn->prepare("INSERT INTO `banners_projects` (`user_id`, `project_id`, `name`, `summary`, `zoom`, `share`, `fullscreen`, `reset_progress`, `ord`, `path`, `size_project`, `iframe`, `size_source`, `date_create`, `modified`, `thumb`, `requirements`, `questiondata`) VALUES (?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?, ?)");
        $addNewPublicationQuery->bind_param('iissiiiiisisisss', $ownUserID, $projectID, $title, $description, $zoom, $share, $fullscreen, $resetProgress, $ord, $hash, $size, $iFrame, $sourceSize, $thumbFileName, $requirements, $questiondata);
        $addNewPublicationQuery->execute();

        $this->addPublicationIDToProjectObject( $addNewPublicationQuery->insert_id, $hash);

        $this->prepareMetaTags($this->publicationPath, 'http://'. $server_link . '/app/banners/' . $hash . '/' ,  $title, $description, $thumbFileName);

        $this->copyPublicationController($this->publicationPath, $hash);

        $this->sendToOCS($hash);
	}

    private function addPublicationIDToProjectObject($id, $hash) {
        global $CFG;

        $myfile = fopen('../../../banners/' . $hash . '/js/pid.js', "w");
        $txt = "var ___pid = " . $id . ";\n";
        $txt .= "var __lang = '" . getUserLanguage() . "';\n";
        $txt .= "var _scormServer = \"" . $CFG['FOLDER'] . "/darkanpanel/server/php/scorm.php\";\n";
        fwrite($myfile, $txt);
        fclose($myfile);
    }

    private function createLangFile() {
        global $CFG;

        $myfile = fopen( $this->projectPath . 'pre/js/lang.js', "w");
        $txt = "var __lang = '" . getUserLanguage() . "';\n";
        fwrite($myfile, $txt);
        fclose($myfile);
    }

    private function joinProjectSource() {

        $publicationSourcePath = $this->publicationPath . 'b_source/';

        if (!file_exists($publicationSourcePath)) {

            mkdir($publicationSourcePath);
            mkdir($publicationSourcePath . 'pre/');
            mkdir($publicationSourcePath . 'sitemap/');

        }

        $this->copyRecursive($this->projectPath . 'pre/', $publicationSourcePath . 'pre/');
        $this->copyRecursive($this->projectPath . 'sitemap/', $publicationSourcePath . 'sitemap/');
    }

	private function createPublicationFiles() {

		if (file_exists($this->projectPath . 'pre/') &&
            file_exists($this->publicationPath) &&
            file_exists($this->contentTemplatePath) &&
            file_exists($this->skinPath)) {

			$this->copyRecursive($this->projectPath . 'pre/', $this->publicationPath);
			$this->copyRecursive($this->contentTemplatePath, $this->publicationPath);

            $this->prepareIndexTemplateAndCopyToPublicationPath($this->skinPath, $this->publicationPath);

            if (!file_exists($this->publicationPath . 'css/')) {
                mkdir($this->publicationPath . 'css/');
            }

            if (!file_exists($this->publicationPath . 'skin/')) {
                mkdir($this->publicationPath . 'skin/');
            }

            $this->copyRecursive($this->skinPath . 'css/', $this->publicationPath . 'css/');
            $this->copyRecursive($this->skinPath . 'skin/', $this->publicationPath . 'skin/');

			return true;
		} else {

			return false;
		}

	}

    private function prepareIndexTemplateAndCopyToPublicationPath($skinPath, $publicationPath) {
        $skinContents = file_get_contents($skinPath . '/templates/template.html');

        $indexContents = file_get_contents($publicationPath . 'index.html');

        $indexCombinedWithSkinTemplate = str_replace('[-=TEMPLATE=-]', $skinContents, $indexContents);

        $time = time();

        $indexWithRandomGetsForJs = str_replace('[-=RANDOMVAL=-]', $time, $indexCombinedWithSkinTemplate);

        file_put_contents($publicationPath . 'index.html', $indexWithRandomGetsForJs);
    }

    private function prepareMetaTags($publicationPath, $projectURL, $projectTitle, $projectDescription, $projectThumb) {

        $indexContents = file_get_contents($publicationPath . 'index.html');

        
        $indexContents = str_replace('[-=META_URL=-]', $projectURL, $indexContents);
        $indexContents = str_replace('[-=META_TITLE=-]', $projectTitle, $indexContents);
        $indexContents = str_replace('[-=META_DESCRIPTION=-]', $projectDescription, $indexContents);
        $indexContents = str_replace('[-=META_THUMB=-]', $projectThumb, $indexContents);


        if($projectThumb && $projectThumb != ''){
            list($projectThumbWidth, $projectThumbHeight) = getimagesize($projectThumb);            
        }else{
            $projectThumbWidth = '';
            $projectThumbHeight = '';
        }

        $indexContents = str_replace('[-=META_THUMB_WIDTH=-]', $projectThumbWidth, $indexContents);
        $indexContents = str_replace('[-=META_THUMB_HEIGHT=-]', $projectThumbHeight, $indexContents);

        
        file_put_contents($publicationPath . 'index.html', $indexContents);
    }

    private function copyPublicationController($publicationPath, $hash) {

        $indexContents = file_get_contents('../../utilities/publications/darkan/index.php');
        
        $indexContents = str_replace('[-=PUBLICATION_HASH=-]', $hash, $indexContents);


        file_put_contents($publicationPath . 'index.php', $indexContents);
    }

    private function sendToOCS($hash) {
        global $database, $ocs_container_projects, $ocs_container_banners;
        $status = 0;
        $zip = new ZipArchive();

        if ($zip->open($this->publicationPath . 'backup.zip', ZIPARCHIVE::CREATE) !==TRUE) {
            exit ("nie mogę zrobić pliku archiwum project.zip");
        }

        //zip_dir('../../banners/'.$path, '../../banners/'.$path, '');

        $this->zipDir($zip, $this->publicationPath);

        $zip->close();

        $ocs = new OCS($ocs_container_projects, $ocs_container_banners);

        $ocsret = $ocs->put($ocs->container_banners, $this->publicationPath . '/backup.zip', 'banners/' . $hash . '/backup.zip');

        if (!$ocsret) {
            // nie udalo sie wrzucic projektu na ocs

            $status = 3;
        }

        unlink($this->publicationPath . 'backup.zip');
        return $status;
    }

	private function conversionImagesMin($path) {

        foreach (
            $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($path),
            RecursiveIteratorIterator::SELF_FIRST) as $item
        ) {
        if ($item->isDir()) {

            } else {

            	$fileName = basename($iterator->getSubPathName());
            	$_extName = explode('.', $fileName);
            	$extName = end($_extName);
            	$dirName = dirname($iterator->getSubPathName());

            	if (strtolower($extName) === 'png' && basename($iterator->getSubPathName(), '.' . $extName) !== 'min') {

	            	$minFileName = 'min' . '.' . $extName;
	            	$minFilePath = $path . DIRECTORY_SEPARATOR . $dirName . DIRECTORY_SEPARATOR . $minFileName;
	            	$ordFileName = $path . DIRECTORY_SEPARATOR . $iterator->getSubPathName();

	            	if (file_exists($minFilePath) && file_exists($ordFileName)) {
                        unlink($ordFileName);
	            		// rename($minFilePath, $ordFileName);
	            	}
            	}

            	if (strtolower($extName) === 'jpg' && basename($iterator->getSubPathName(), '.' . $extName) !== 'min') {

	            	$minFileName = 'min' . '.' . $extName;
	            	$minFilePath = $path . DIRECTORY_SEPARATOR . $dirName . DIRECTORY_SEPARATOR . $minFileName;
	            	$ordFileName = $path . DIRECTORY_SEPARATOR . $iterator->getSubPathName();

	            	if (file_exists($minFilePath) && file_exists($ordFileName)) {
                        unlink($ordFileName);
	            		// rename($minFilePath, $ordFileName);
	            	}
            	}

            	if (strtolower($extName) === 'jpeg' && basename($iterator->getSubPathName(), '.' . $extName) !== 'min') {

	            	$minFileName = 'min' . '.' . $extName;
	            	$minFilePath = $path . DIRECTORY_SEPARATOR . $dirName . DIRECTORY_SEPARATOR . $minFileName;
	            	$ordFileName = $path . DIRECTORY_SEPARATOR . $iterator->getSubPathName();

	            	if (file_exists($minFilePath) && file_exists($ordFileName)) {
                        unlink($ordFileName);
	            		// rename($minFilePath, $ordFileName);
	            	}
            	}
            }

        }

	}

    // private function zipDir2($dir, $dir2, $dir3)
    // {
    //     global $zip, $prefix, $user, $project;
    //     if (is_dir($dir))
    //     {
    //         $objects = scandir($dir);
    //         foreach ($objects as $object)
    //         {
    //             if ($object != "." && $object != "..") {
    //                 if (filetype($dir."/".$object) == "dir") {
    //                     $this->zipDir($dir."/".$object, $dir2, $dir3);
    //                 }
    //                 else {
    //                     if (isset($dir3) && $dir3 != '')
    //                         $zip->addFile($dir.'/'.$object, $dir3.substr($dir."/".$object, strlen($dir2) + 1));
    //                     else
    //                         $zip->addFile($dir.'/'.$object, substr($dir."/".$object, strlen($dir2) + 1));
    //                 }
    //             }
    //         }
    //         reset($objects);
    //     }
    // }

    private function zipDir($zip, $dir) {

        foreach (
            $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir),
            RecursiveIteratorIterator::SELF_FIRST) as $item
        ) {
            if ($item->isDir()) {
            } else {

                $zip->addFile($dir . DIRECTORY_SEPARATOR . $iterator->getSubPathName(), $iterator->getSubPathName());

            }
        }
    }

    private function rrmdir($dir)
    {
        if (is_dir($dir))
        {
            $objects = scandir($dir);
            foreach ($objects as $object)
            {
                if ($object != "." && $object != "..") {
                    if (filetype($dir."/".$object) == "dir")
                    	$this->rrmdir($dir."/".$object);
                    else
                    	unlink($dir."/".$object);
                }
            }
            reset($objects);
            rmdir($dir);
        }
    }

    private function sizeRecursive($path) {
        $size = 0;
        if (is_dir($path)) {
            $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));

            foreach ($iterator as $file) {
                $size += $file->getSize();
            }
        }
        return $size;
    }

    private function copyRecursive($source, $dest) {

        foreach (
            $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($source),
            RecursiveIteratorIterator::SELF_FIRST) as $item
        ) {
        if ($item->isDir()) {
            if (!file_exists($dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName()))
                mkdir($dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName());
            } else {
                copy($item, $dest . DIRECTORY_SEPARATOR . $iterator->getSubPathName());
            }
        }
    }

	private function sendData() {

		echo json_encode($this->responseData);

	}
}

if (isset($_POST['request'])) {

	$publication = new Publication($_POST['request']);

}

?>