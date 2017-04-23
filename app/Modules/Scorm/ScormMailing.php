<?php namespace App\Modules\Scorm;

use DB;
use Auth;
use App\User;
use App\Modules\Models\ScormData;
use App\Modules\Models\MailingUsers;
use App\Modules\Models\Banners;
use Cookie;

class ScormMailing extends Scorm {


	protected function getScorm () {
        $pid = $this->data->pid;

        $publicationData = Banners::find($pid);

        if ($publicationData) {

            $admin_portal_id = $publicationData->user_id;

        	$mailingLogin = $this->data->mailingLogin;

            $scormData = ScormData::where('mailing_login', '=', $mailingLogin)
                						->where('course_id', '=', $pid)
                						->first();

            if ($scormData) {

                $this->responseData['suspendData'] = $scormData['data'];
                $this->responseData['userScore'] = $scormData['user_score'];
                $this->responseData['courseStatus'] = $scormData['course_status'];
                $this->responseData['lessonLocation'] = $scormData['lesson_location'];
                $this->responseData['pagesTime'] = $scormData['page_time'];
            } else {

            	$newScormRow = $scormData = new ScormData();
            	$newScormRow->user_id = -1;
            	$newScormRow->course_id = $pid;
            	$newScormRow->create_date = date('Y_m_d_H_i_s');;
            	$newScormRow->course_status = 'incomplete';
            	$newScormRow->data = '';
            	$newScormRow->mailing_login = $mailingLogin;
            	$newScormRow->save();

                // brak danych w scorm
                $this->responseData['suspendData'] = '';
                $this->responseData['userScore'] = 0;
                $this->responseData['courseStatus'] = 'incomplete';
                $this->responseData['lessonLocation'] = 0;
                $this->responseData['pagesTime'] = '';
                $this->responseData['login'] = Auth::user()->email;
            }

            // dodanie uzytkownika do mailing usres
            $mailingUserRow = MailingUsers::firstOrNew(['email' => $mailingLogin, 'owner_id' => $admin_portal_id]);
            $mailingUserRow->email = $mailingLogin;
            $mailingUserRow->owner_id = $admin_portal_id;
            $mailingUserRow->create_date = date('Y_m_d_H_i_s');
            $mailingUserRow->save();


            $this->responseData['user_id'] = $this->userID;
            $this->responseData['course_id'] = $pid;
            $this->responseData['mailing_login'] = $mailingLogin;
            

        } else {
            $this->responseData['msg'] = 'Project not found...';
        }
	}

	protected function saveScorm() {

		$this->responseData['ok'] = $this->data;

        $suspendData = $this->data->suspendData;
        $userScore = $this->data->userScore;
        $courseStatus = $this->data->courseStatus;
        $lessonLocation = $this->data->lessonLocation;
        $pageTime = $this->data->pagesTime;
        $pid = $this->data->pid;
        $mailingLogin = $this->data->mailingLogin;

        $scormData = ScormData::where('course_id', '=', $pid)
        						->where('mailing_login', '=', $mailingLogin)
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
        $this->responseData['msg'] = 'zapisano scorm mailing';
	}
}