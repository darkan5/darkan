<?php namespace App\Modules\Ocs;

use Auth;
use App\User;
use App\Modules\Ocs\Ocs;
use App\Modules\Models\Projects;
use ZipArchive;
	
class OcsDownloader 
{

	function __construct() 
	{

	}

	public static function downloadProject($projectData)
	{

        $ownerId = $projectData->user_id;
        $pID = $projectData->project_id;

        $projectsDir = config('app.projects_folder');

        // sprawdzenie czy projekt znajduje sie na OCS
        if ($projectData['status'] == 2) {
            return false;
        }

        $projectData->last_visit = date('Y-m-d H:i:s');
        $projectData->save();

        $forceDownloadFromOcs = false;
        if ($projectData['status'] == 0) {
            if (file_exists($projectsDir . '/' . $ownerId . '/' . $pID . '/pre')) {

                // $setProjectLastVisitQuery = $database->query("UPDATE `projects` SET `last_visit`=NOW() WHERE `user_id`='$ownerId' AND `project_id`='$pID'");


                return true;

            } else {
                $forceDownloadFromOcs = true;
            }
        }


        if ($projectData['status'] == 1 || $forceDownloadFromOcs) {

            $projectsDir = config('app.projects_folder');

            $projectData->status = 2;
            $projectData->save();

            $ocs = new Ocs(config('app.ocs_container_projects'), config('app.ocs_container_banners'));


            @mkdir($projectsDir . '/' . $ownerId);
            @mkdir($projectsDir . '/' . $ownerId . '/' . $pID);

            
            // $ocs->get($ocs->container_projects, 'projects/' . $ownerId . '/' . $pID . '/project.zip', $projectsDir . $ownerId . '/' . $pID . '/project.zip');
            $ocs->get(
                $ocs->container_projects, 
                'projects/' . $ownerId . '/' . $pID . '/project.zip', 
                $projectsDir . $ownerId . '/' . $pID . '/project.zip'
                );

            $zip = new ZipArchive();
            $zip->open($projectsDir . $ownerId . '/' . $pID . '/project.zip');
            $zip->extractTo($projectsDir . $ownerId . '/' . $pID);
            $zip->close();

            unlink($projectsDir . $ownerId . '/' . $pID . '/project.zip');

            if (file_exists($projectsDir . $ownerId . '/' . $pID . '/pre')) {
                // $setProjectStatusQuery = $database->query("UPDATE `projects` SET `status`=0, `last_visit`=NOW() WHERE `user_id`='$ownerId' AND `project_id`='$pID'");
                $projectData->status = 0;
                $projectData->save();

                return true;

            } else {
                // $setProjectStatusQuery = $database->query("UPDATE `projects` SET `status`=1 WHERE `user_id`='$ownerId' AND `project_id`='$pID'");
                $projectData->status = 1;
                $projectData->save();

                return false;
            }
    

        }

	}

}