<?php namespace App\Http\Controllers;

use Auth;
use Input;
use App\User;
use App\Modules\Ocs\Ocs;
use App\Modules\Ocs\OcsDownloader;
use App\Modules\Models\UserLogin;
use App\Modules\Models\Projects;
use App\Http\Requests\EditorRequest;
use ZipArchive;

class OcsController extends Controller {

	public function __construct()
	{
		// $this->middleware('auth');
	}

	public function downloadFromOcs(EditorRequest $request)
	{

		$projectId = Input::get('project');

	    $returnInfo = array('status' => 'error');

	    // sprawdzenie czy uzytkownik jest zalogowany i czy projekt jest liczba calkowita rozna od 0
	    if (isset($projectId) && gettype((int)$projectId) === 'integer') {
	    	if ($projectId == 0) {
	    		$returnInfo['status'] = 'success';
	    		$this->showReturnData( json_encode($returnInfo) );
	    		return;
	    	}
	        // $uID = Auth::user()->user_id;
	        $pID = (int)$projectId;

	        // uaktualnienie ostatniej aktywnosci uzytkownika
	        // $userLoginUpdate = $database->query("UPDATE `user_login` SET `date_logout`=NOW() WHERE `id`='$uID'");

	        // $userLoginUpdate = UserLogin::firstOrNew(['user_id' => $uID]);
	        // $userLoginUpdate->date_logout = date('Y/m/d H:i:s');
	        // $userLoginUpdate->save();


	        $projectData = Projects::find($pID);

	        $projectDownloaded = OcsDownloader::downloadProject($projectData);

	        if ($projectDownloaded) {
                $returnInfo['status'] = 'success';
                $returnInfo['type'] = 'on disk';
	        } else {

                $returnInfo['status'] = 'error';
	        }

	    } else {
	        // echo 'nie kombinuj';
	    }

	    $this->showReturnData( json_encode($returnInfo) );



	}

	private function showReturnData($msg)
	{
		echo $msg;
	}

}
