<?php namespace App\Modules\Scorm;

use DB;
use Auth;
use App\User;
use App\Modules\Models\ScormDataGuest;
use App\Modules\Models\Banners;
use App\Modules\Utils\Utils;
use Cookie;

class ScormGuest extends Scorm {

    private $cookieName = 'd2uid';

    private function getUserIdFromCookie()
    {

        if ( Cookie::has($this->cookieName) || isset($_COOKIE[$this->cookieName]) ) {

            $userId = Cookie::get($this->cookieName);

            if ( isset($_COOKIE[$this->cookieName]) ) {
                $userId = $_COOKIE[$this->cookieName];
            }

        } else {

            $uniqueID = Utils::generateUniqueHash();

            $this->responseData['cookie'] = 'cookie not found...';
            Cookie::queue($this->cookieName, $uniqueID, 2628000);
            setcookie($this->cookieName, $uniqueID, time() + (86400 * 30), "/");

            $userId = $uniqueID;
        }
        return $userId;
    }



	protected function getScorm () {
        $pid = $this->data->pid;

        $publicationData = Banners::find($pid);

        if ($publicationData) {

            $admin_portal_id = $publicationData->user_id;

            $userId = $this->getUserIdFromCookie();

            $scormData = ScormDataGuest::where('user_id', '=', $userId)
                                                    ->where('course_id', '=', $pid)
                                                    ->first();

            if ($scormData) {

                $this->responseData['suspendData'] = $scormData->data;
                $this->responseData['userScore'] = $scormData->user_score;
                $this->responseData['courseStatus'] = $scormData->course_status;
                $this->responseData['lessonLocation'] = $scormData->lesson_location;
                $this->responseData['pagesTime'] = $scormData->page_time;

            } else {

                $newScormRow = $scormData = new ScormDataGuest();
                $newScormRow->user_id = $userId;
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
            }



        } else {
            $this->responseData['msg'] = 'Project not found...';
        }
	}

	protected function saveScorm() {

        $pid = $this->data->pid;
        
        $userId = $this->getUserIdFromCookie();


        $this->responseData['ok'] = $this->data;

        $suspendData = $this->data->suspendData;
        $userScore = $this->data->userScore;
        $courseStatus = $this->data->courseStatus;
        $lessonLocation = $this->data->lessonLocation;
        $pageTime = $this->data->pagesTime;
        $pid = $this->data->pid;

        $scormData = ScormDataGuest::where('course_id', '=', $pid)
                                ->where('user_id', '=', $userId)
                                ->first();
        if ($scormData) {
            $scormData->modify_date = date('Y_m_d_H_i_s');
            $scormData->data = $suspendData;
            $scormData->course_status = $courseStatus;
            $scormData->user_score = $userScore;
            $scormData->lesson_location = $lessonLocation;
            $scormData->page_time = $pageTime;
            $scormData->save();

            $this->responseData['data'] = $suspendData;
            $this->responseData['msg'] = 'zapisano scorm guest';
        }
    }
}