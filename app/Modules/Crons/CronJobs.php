<?php namespace App\Modules\Crons;

use Auth;
use File;
use App\User;
use App\Modules\Ocs\Ocs;
use App\Modules\Utils\Utils;
use App\Modules\Models\Projects;
use ZipArchive;
use Log;
use DateTime;
	
class CronJobs 
{

    function __construct() 
    {

    }

    public function sendProjectsToOcs() 
    {

    	$date = new DateTime;
		$date->modify('-15 minutes');

		$formatted_date = $date->format('Y-m-d H:i:s');

		print_r($formatted_date);

		echo "\n";


    	$projectsOnDisk = Projects::where('status', '=', 0)
    						->where('template', '=', 0)
    						->where('external', '=', 0)
    						->where('last_visit' , '<', $formatted_date)
    						->get();

		foreach ($projectsOnDisk as $project) {

			$projectId = $project->project_id;
			$userId = $project->user_id;
			$projectPath = config('app.projects_folder') . $userId . '/' . $projectId . '/';

			echo( 'Processing ' . $userId . '/' . $projectId . "\n" );

			if ($this->validatePath($projectPath)) {
				$project->status = 2;
				$project->save();


				File::delete($projectPath . 'project.zip');

				File::deleteDirectory($projectPath . 'pack');
				File::deleteDirectory($projectPath . 'pdf');
				File::deleteDirectory($projectPath . 'tmp');
				File::deleteDirectory($projectPath . 'versions');

				$zip = new ZipArchive();

				if ($zip->open($projectPath . 'project.zip', ZIPARCHIVE::CREATE) !==TRUE) {
					exit ("nie moge zrobic pliku archiwum project.zip");
				}


				Utils::zipDir($zip, $projectPath);

				$zip->close();

				$ocs = new Ocs(config('app.ocs_container_projects'), config('app.ocs_container_banners'));
				$ocsret = $ocs->put(
					config('app.ocs_container_projects'), 
					$projectPath . 'project.zip',
					'projects/' . $userId . '/' . $projectId . '/project.zip'
					);


				if ($ocsret) {
					File::deleteDirectory($projectPath);
					echo( 'Sent and DELETED Successfully' . "\n" );
					$project->status = 1;
					$project->save();
				} else {
					File::delete($projectPath . 'project.zip');
					$project->status = 0;
					$project->save();
					echo( 'Error Sending package' . "\n" );
				}

			} else {
				echo( 'Directories not exists!' . "\n" );
				$project->status = 1;
				$project->save();
			}

		}
    }

    public function refreshTestDrive()
    {
		$testDriveSourcePath = storage_path('/app/testdrive/');
		$testDriveData = Projects::where('project_id', '=', 0)->first();

		if ($testDriveData) {
			$testDriveDestenation = config('app.projects_folder') . $testDriveData->user_id . '/0/';

			$clearSuccess = File::cleanDirectory($testDriveDestenation);

			File::copyDirectory($testDriveSourcePath, $testDriveDestenation);

			exec("chmod -R 777 " . $testDriveDestenation);
		}

    }

    public function restartNodeServerIfDown()
    {
		exec("screen -list | grep test", $output);
		print_r($output);
    }

    private function validatePath($path)
    {

    	if (
    		file_exists($path . 'sitemap') && 
    		file_exists($path . 'pre')
    		)
    	{
    		return true;
    	}

    	return false;
    }


}