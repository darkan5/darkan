<?php
    require_once '../../../config_login.php';
    require_once '../../php/ocs.php';

    $returnInfo = array('status' => 'error');

    // sprawdzenie czy uzytkownik jest zalogowany i czy projekt jest liczba calkowita rozna od 0
    if (isset($_POST['project']) && gettype((int)$_POST['project']) === 'integer') {
        $uID = SESSION_METHOD::sessionGet('user_id');
        $pID = (int)$_POST['project'];

        // uaktualnienie ostatniej aktywnosci uzytkownika
        $userLoginUpdate = $database->query("UPDATE `user_login` SET `date_logout`=NOW() WHERE `id`='$uID'");

        // sprawdzenie czy uzytkownik ma dostep do tego projektu
        $realProjectUID = getProjectUserId($pID);
        if (!$realProjectUID) {
            $returnInfo['status'] = 'noaccess';
            echo json_encode($returnInfo);
            die();
        }

        $projectQuery = $database->query("SELECT * FROM `projects` WHERE `project_id`='$pID' LIMIT 1");
        if ($projectRet = $projectQuery->fetch_assoc()) {

            
            $projectsDir = '../../projects/';

            // sprawdzenie czy projekt znajduje sie na OCS
            if ($projectRet['status'] == 2) {
                $returnInfo['status'] = 'ocsbusy';
            }

            $forceDownloadFromOcs = false;
            if ($projectRet['status'] == 0) {
                if (file_exists($projectsDir . $realProjectUID . '/' . $pID . '/pre')) {

                    $setProjectLastVisitQuery = $database->query("UPDATE `projects` SET `last_visit`=NOW() WHERE `user_id`='$realProjectUID' AND `project_id`='$pID'");
                    $returnInfo['status'] = 'success';
                    $returnInfo['type'] = 'caly czas jest na dysku';
                } else {
                    $forceDownloadFromOcs = true;
                }
            }


            if ($projectRet['status'] == 1 || $forceDownloadFromOcs) {
                $setProjectStatusQuery = $database->query("UPDATE `projects` SET `status`=2 WHERE `user_id`='$realProjectUID' AND `project_id`='$pID'");

                $ocs = new OCS($ocs_container_projects, $ocs_container_banners);


                @mkdir($projectsDir . $realProjectUID);
                @mkdir($projectsDir . $realProjectUID . '/' . $pID);

                
                $ocs->get($ocs->container_projects, 'projects/' . $realProjectUID . '/' . $pID . '/project.zip', $projectsDir . $realProjectUID . '/' . $pID . '/project.zip');

                $zip = new ZipArchive();
                $zip->open($projectsDir . $realProjectUID . '/' . $pID . '/project.zip');
                $zip->extractTo($projectsDir . $realProjectUID . '/' . $pID);
                $zip->close();

                unlink($projectsDir . $realProjectUID . '/' . $pID . '/project.zip');

                if (file_exists($projectsDir . $realProjectUID . '/' . $pID . '/pre')) {
                    $setProjectStatusQuery = $database->query("UPDATE `projects` SET `status`=0, `last_visit`=NOW() WHERE `user_id`='$realProjectUID' AND `project_id`='$pID'");
                    $returnInfo['status'] = 'success';
                    $returnInfo['type'] = 'rozpakowano i wszystko jest ok';
                } else {
                    $setProjectStatusQuery = $database->query("UPDATE `projects` SET `status`=1 WHERE `user_id`='$realProjectUID' AND `project_id`='$pID'");
                    $returnInfo['status'] = 'error';
                }

            }

        } else {
            $returnInfo['status'] = 'notexists';
        }

    } else {
        // echo 'nie kombinuj';
    }

    echo json_encode($returnInfo);