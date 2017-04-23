<?php namespace App\Modules\Scorm;

use DB;
use Auth;
use App\User;
use App\Modules\Scorm\Scorm;

use App\Modules\Models\Banners;
use App\Modules\Models\ScormData;
use App\Modules\Models\LmsUserPortal;


class ScormLoggedin extends Scorm {

	protected function getScorm () {

		$userID = Auth::user()->id;

        $pid = $this->data->pid;

        $publicationData = Banners::find($pid);

        if ($publicationData) {

            $admin_portal_id = $publicationData->user_id;


			$scormData = ScormData::where('user_id', '=', $userID)
			                						->where('course_id', '=', $pid)
			                						->first();

            if ($scormData) {

                $this->responseData['suspendData'] = $scormData->data;
                $this->responseData['userScore'] = $scormData->user_score;
                $this->responseData['courseStatus'] = $scormData->course_status;
                $this->responseData['lessonLocation'] = $scormData->lesson_location;
                $this->responseData['pagesTime'] = $scormData->page_time;

            } else {

            	$newScormRow = $scormData = new ScormData();
            	$newScormRow->user_id = $userID;
            	$newScormRow->course_id = $pid;
            	$newScormRow->create_date = date('Y_m_d_H_i_s');
            	$newScormRow->course_status = 'incomplete';
            	$newScormRow->data = '';
            	$newScormRow->save();

                // brak danych w scorm
                $this->responseData['suspendData'] = '';
                $this->responseData['userScore'] = 0;
                $this->responseData['courseStatus'] = '';
                $this->responseData['lessonLocation'] = 0;
                $this->responseData['pagesTime'] = '';
                $this->responseData['login'] = Auth::user()->email;
            }

            // dodanie uzytkownika lms user portal
            $mailingUserRow = LmsUserPortal::firstOrNew(['portal_admin' => $admin_portal_id, 'user' => $userID]);
            $mailingUserRow->portal_admin = $admin_portal_id;
            $mailingUserRow->user = $userID;
            $mailingUserRow->save();

        } else {
            $this->responseData['msg'] = 'Project not found...';
        }
	}

	protected function saveScorm() {

		$userID = Auth::user()->id;

        $suspendData = $this->data->suspendData;
        $userScore = $this->data->userScore;
        $courseStatus = $this->data->courseStatus;
        $lessonLocation = $this->data->lessonLocation;
        $pageTime = $this->data->pagesTime;
        $pid = $this->data->pid;


        $scormData = ScormData::where('course_id', '=', $pid)
        						->where('user_id', '=', $userID)
        						->first();
		if ($scormData) {
			$scormData->modify_date = date('Y_m_d_H_i_s');
			$scormData->data = $suspendData;
			$scormData->course_status = $courseStatus;
			$scormData->user_score = $userScore;
			$scormData->lesson_location = $lessonLocation;
			$scormData->page_time = $pageTime;
			$scormData->save();
		}
        
        $this->responseData['data'] = $suspendData;
        $this->responseData['status'] = 'success';

	}
}