<?php namespace App\Http\Controllers;

use Auth;
use App\User;
use App\Modules\Models\Projects;
use App\Modules\Models\TestUsers;
use App\Modules\Models\LmsUserPortal;
use App\Modules\Models\Banners;
use App\Modules\Models\ScormData;
use App\Modules\Utils\Utils;

class TempController extends Controller {

	public function __construct()
	{
		// $this->middleware('auth');
	}

	public function pamrowTempalate()
	{
		return view('emails.custom.portal_bought_pamrow')
					->with('username', 'test test')
					->with('loginBtnLink', 'test test');
	}
	public function prepareProjectsThumbs()
	{
		
		$allProjects = Projects::where('status', '=', 0)->get();

		foreach ($allProjects as $project) {
			$projectId = $project->project_id;
			$ownerId = $project->user_id;

			$userPath = storage_path('/app/projects/' . $ownerId . '/');
			$projectPath = $userPath . $projectId . '/';
 
			if (	
				file_exists($userPath)
				&& file_exists($projectPath)
				&& file_exists($projectPath . 'pre') 
				&& file_exists($projectPath . 'sitemap')
				&& file_exists($projectPath . 'sitemap/map.json')
			)
			{
				$sitemap = json_decode(file_get_contents($projectPath . 'sitemap/map.json'), true);

				if ( count($sitemap['pages']) ) {
					$firstPageId = $sitemap['pages'][0];

					if ( file_exists($projectPath . 'pre/exported_view/' . $firstPageId) ) {
						
						if ( file_exists($projectPath . 'pre/exported_view/' . $firstPageId . '/pagethumb.jpg') ) {

							echo 'id: ' . $project->project_id . ', user: ' . $project->user_id . '<br/>';

							$pageThumbPath = $projectPath . 'pre/exported_view/' . $firstPageId . '/pagethumb.jpg';


							$thumbsPath = storage_path('/app/projectsthumbs/' .$projectId . '.jpg' );
							copy($pageThumbPath, $thumbsPath);
							
						}

					}

				}
			}
		}
	}

	public function repairAllPublications()
	{
		
		// $allProjects = Banners::all();
		$allUsers = User::all();


		// foreach ($allUsers as $user) {
		// 	$user->photo = str_replace('http://darkan.eu', 'https://darkan.eu', $user->photo);
		// 	$user->save();
		// }


		// foreach ($allProjects as $project) {
			// $folder = $project->path;


			// $project->iframe = str_replace('http://', 'https://', $project->iframe);
			// $project->thumb = str_replace('http://', 'https://', $project->thumb);
			// $project->save();

			// $projectPath = storage_path('/app/publications/' . $folder . '/');
 			
 			// index
			// if ( file_exists($projectPath) && file_exists($projectPath . 'index.html') ) {
			// 	$indexContents = file_get_contents($projectPath . 'index.html');
			// 	$indexContents = str_replace('http://', 'https://', $indexContents);
			// 	file_put_contents($projectPath . 'index.html', $indexContents);
			// }

			// seomap
			// if ( file_exists($projectPath) && file_exists($projectPath . 'seomap.json') ) {
			// 	$seomapContents = file_get_contents($projectPath . 'seomap.json');
			// 	$seomapContents = str_replace('http:', 'https:', $seomapContents);
			// 	file_put_contents($projectPath . 'seomap.json', $seomapContents);
			// }

			// pid.js
			// if ( file_exists($projectPath) && file_exists($projectPath . 'js/pid.js') ) {
			// 	$pidContents = file_get_contents($projectPath . 'js/pid.js');
			// 	$pidContents = str_replace('http://', 'https://', $pidContents);
			// 	file_put_contents($projectPath . 'js/pid.js', $pidContents);
			// }

		// }
	}

	private function getExampleSuspendDataToModify($publicationId)
	{
		// if ($publicationId == 31) {
			$publications = ScormData::where('course_id', '=',$publicationId)->get();
			foreach ($publications as $publication) {
				if ($publication->data != '') {
					return $publication->data;
				}
			}	
		// }

		return '';
	}

	private function getExamplePageTimesToModify($publicationId)
	{
		// if ($publicationId == 31) {
			$publications = ScormData::where('course_id', '=',$publicationId)->get();
			foreach ($publications as $publication) {
				if ($publication->page_time != '') {
					return $publication->page_time;
				}
			}	
		// }

		return '';
	}

	private function getTrueOrFalse()
	{
		return (bool)random_int(0, 1);
	}

	private function modifyPageTimes($pageTimes)
	{
		// try {
		$iterator = 1;
			$times = json_decode($pageTimes);
			foreach ($times as $pageId => $time) {
				// echo 'Time is: ' . $time . '<br/>';
				if ($iterator % 2 == 0) {
					$times->{$pageId} = rand(0, 100);
				} else {
					$times->{$pageId} = rand(0, 50);
				}
				
				// echo 'Getting Random value: ' . $time . '<br/>';
				$iterator++;
			}

			return json_encode( $times );
		// }catch(Exception $ex) { }

		return '';
	}

	private function modifySuspendData($suspendData, $publicationId)
	{
		try {
			$data = json_decode($suspendData);
			$questions = $data->q;
			foreach($questions as $questionKey => $question) {
				$type = gettype($question);
				if ($type == 'object') {
					foreach($question as $answer) {
						if (gettype($answer) == 'object') {
							if (isset($answer->c)) {
								$answer->c = $this->getTrueOrFalse();
							}
							if (isset($answer->choosen)) {
								$answer->choosen = $this->getTrueOrFalse();
							}
						}
						// echo "answer: ";
						// print_r($answer);
						// echo '<br/>';
					}
				}
				if ($type == 'boolean') {
					// echo 'ZMIENIAM.................. <br/>';
					$data->q->{$questionKey} = $this->getTrueOrFalse();
					$question = $this->getTrueOrFalse();
				}
				if ($type == 'string') {
					// $publication = Banners::find($publicationId);
					// $questionPossibilities = $publication
					// $data->q->{$questionKey} = ;
					// $question = ;
				}
				// echo "Question: ";
				// print_r($question);
				// echo '<br/>';
				// echo "Question Type: ";
				// echo $type;
				// echo '<br/>';
			}

			return json_encode($data);
		}catch(Exception $ex) { }

		return '';
	}

    public function assignTestUsersWithScormData($adminId)
    {
    	$iterator = 1;
    	$allTestUsers = TestUsers::all();
    	foreach ($allTestUsers as $testUser) {
    		$userId = $testUser->id;

    		$lmsUser = LmsUserPortal::firstOrNew(['user' => $userId, 'portal_admin' => $adminId]);
    		$lmsUser->user_name = 'Test User ' . $iterator;
    		$lmsUser->save();

    		$allUserPublications = Banners::where('user_id', '=', $adminId)->get();
    		foreach($allUserPublications as $publication) {
    			try {
    				$publicationId = $publication->id_banner;

    				$requirements = json_decode($publication->requirements);
    				$maxScore = (int)$requirements->scoreMax;

    				$randomScore = rand(0, $maxScore);
    				$randomStatus = array_rand($this->statuses, 1);
					$randomStatus = $this->statuses[$randomStatus];

					$exampleSuspendData = $this->getExampleSuspendDataToModify($publicationId);
					if ($exampleSuspendData != '') {
						$exampleSuspendData = $this->modifySuspendData($exampleSuspendData, $publicationId);
					}

					$examplePageTimes = $this->getExamplePageTimesToModify($publicationId);
					if ($examplePageTimes != '') {
						$examplePageTimes = $this->modifyPageTimes($examplePageTimes);
					}

    				$newScormRow = ScormData::firstOrNew(['user_id' => $userId, 'course_id' => $publicationId]);
    				
    				$newScormRow->user_id = $userId;
    				$newScormRow->course_id = $publicationId;
    				$newScormRow->create_date = date('Y-m-d H:i:s');
    				$newScormRow->modify_date = date('Y-m-d H:i:s');
    				$newScormRow->data = $exampleSuspendData;
    				$newScormRow->course_status = $randomStatus;
    				$newScormRow->user_score = $randomScore;
    				$newScormRow->lesson_location = 0;
    				$newScormRow->page_time = $examplePageTimes;
    				$newScormRow->score_max = $maxScore;
    				$newScormRow->score_min = 0;
    				$newScormRow->success_status = $randomStatus;
    				$newScormRow->save();

    			} catch(Exception $ex) {

    			}
    			
    		}

    		$iterator++;

    	}
    }

    public function createTestUsers($usersNumber)
    {

    	for ($i=0; $i < $usersNumber; $i++) { 

	    	$login = Utils::generateRandomPassword() . '@' . Utils::generateRandomPassword() . '_test.com';

	    	$subdomain = Utils::createSubdomain($login);

	        $newUser = User::create([
	            'email' => $login,
	            'password' => bcrypt('aaaaaa'),
	            'user_plans' => Utils::getTrialUserPlans(),
	            'version' => env('app_version'),
	            'download_project' => 1,
	            'hash' => '',
	            'subdomain' => $subdomain,
	            'subdomain_name' => $subdomain,
	            'photo' => 'default',
	            'active' => 1,
	            'date' => date('Y-m-d H:i:s')
	        ]);

	        $newTestUser = new TestUsers();
	        $newTestUser->id = $newUser->id;
	        $newTestUser->save();
    	}

    }

    private $statuses = ['incomplete', 'passed', 'failed'];

    public function removeAllTestUsersData()
    {
    	$allUsers = TestUsers::all();
    	foreach ($allUsers as $testUser) {
    		$userId = $testUser->id;

    		$userTable = User::find($userId);
    		if ($userTable) {
    			$userTable->delete();
    		}

    		$lmsUserTable = LmsUserPortal::where('user', '=', $userId)->get();
    		foreach ($lmsUserTable as $lmsUser) {
    			$lmsUser->delete();
    		}

    		$scormData = ScormData::where('user_id', '=', $userId)->get();
    		foreach ($scormData as $scormUserData) {
    			$scormUserData->delete();
    		}

    		$testUser->delete();
    	}
    }


    public function restartNodeServerIfDown()
    {



		exec("ps -ef | grep -i screen_test.sh | grep -v grep", $return, $output);
		if (count($return) > 0) {
			echo 'Server is running!';
		} else {
			echo 'Server is down! Restart!!';
		}
		echo '<br/>';

		print_r($return);
		echo '<br/>';
		print_r($output);
    }
}