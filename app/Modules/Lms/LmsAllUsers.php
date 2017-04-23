<?php namespace App\Modules\Lms;

use DB;
use Auth;
use App\User;

use App\Modules\Models\ScormData;
use App\Modules\Models\Banners;
use App\Modules\Models\LmsInfo;


class LmsAllUsers extends LmsUser {

	public function getCoursesList() {

		$coursesList = array();

		// $coursesQuery = $this->query("SELECT * FROM `banners_projects` WHERE `user_id`='$this->userID' OR `primary`='1' ORDER BY `modified` DESC");
		$coursesQuery = Banners::where('user_id', '=', $this->userID)
									->orWhere('primary', '=', 1)
									->orderBy('modified', 'DESC')
									->get();
		foreach ($coursesQuery as $coursesRet) {

			$bannerID = $coursesRet['id_banner'];

			// $numberOfUsersQuery = $this->query("SELECT `user_id` FROM `scorm_data` WHERE `course_id`='$bannerID'");
			$numberOfUsersQuery = ScormData::where('course_id', '=', $bannerID)->count();

			$requirements = $this->isJson($coursesRet['requirements']) ? json_decode($coursesRet['requirements']) : '';

			$coursesList[] = array(
				'courseID' 			=> (int)$coursesRet['id_banner'],
				'name' 				=> $coursesRet['name'],
				'size' 				=> (int)$coursesRet['size_project'],
				'photo' 			=> $coursesRet['thumb'],
				'users' 			=> $numberOfUsersQuery,
				'requirements' 		=> $requirements
			);

		}

		$this->responseData['coursesList'] = $coursesList;

		return $this->responseData;
	}

	public function getCourseQuestionsData() {

		$courseId = $this->data->courseID;

		// $coursesQuery = $this->query("SELECT `questiondata` FROM `banners_projects` WHERE `user_id`='$this->userID' AND `id_banner`='$courseId' LIMIT 1");
		$coursesQuery = Banners::where('user_id', '=', $this->userID)
									->where('id_banner', '=', $courseId)
									->first();

		$questiondata = '';
		if ($coursesQuery) {
			$questiondata = $this->isJson($coursesQuery['questiondata']) ? json_decode($coursesQuery['questiondata']) : '';
		}

		return $questiondata;
	}


	public function getCourseScormData() {

		$courseId = $this->data->courseID;

		$scormData = [ ];

		// $coursesQuery = $this->query("SELECT `data` FROM `scorm_data` WHERE `course_id`='$courseId'");

		$coursesQuery = ScormData::where('course_id', '=', $courseId)->get();

		foreach ($coursesQuery as $coursesRet) {
			if ($this->isJson($coursesRet['data'])) {
				array_push( $scormData, json_decode($coursesRet['data']) );
			}
		}

		return $scormData;
	}

	public function getCourseScormDataByUserId() {

		$courseId = $this->data->courseID;
		$userId = $this->data->userID;

		$scormData = [ ];

		// $coursesQuery = $this->query("SELECT `data` FROM `scorm_data` WHERE `course_id`='$courseId' AND `user_id`='$userId'");

		$coursesQuery = ScormData::where('course_id', '=', $courseId)
									->where('user_id', '=', $userId)
									->get();

		foreach ($coursesQuery as $coursesRet) {
			if ($this->isJson($coursesRet['data'])) {
				array_push( $scormData, json_decode($coursesRet['data']) );
			}
		}

		return $scormData;
	}


	public function getUsersCompletionInfo() {

		$ownerCourses = $this->getOwnerCourses();
		
		if (count($ownerCourses) > 0) {
			$complitionInfo = array();


			// $complitionInfoQuery = $this->query("SELECT `course_status` FROM `scorm_data` WHERE `course_id` IN (" . implode(',', $ownerCourses) . ")");

			$complitionInfoQuery = ScormData::whereIn('course_id', $ownerCourses)
												->get();

			foreach ($complitionInfoQuery as $userTimes) {

				if(isset($complitionInfo[$userTimes['course_status']])){
					$complitionInfo[$userTimes['course_status']]++;
				}else{
					$complitionInfo[$userTimes['course_status']] = 1;
				}
			}

			$this->responseData['complitionInfo'] = $complitionInfo;
		}

		return $this->responseData;
	}


	public function deleteAttempt() {
		$attempts = $this->data->attempts;

		// $myCourses = $this->getOwnerCourses();

		$status = array('status' => 'error');

		foreach ($attempts as $attempt) {
			// check if user really can delete selected attempt
			// $attemptQuery = $this->query("SELECT * FROM `scorm_data` WHERE id='$attempt' LIMIT 1");
			$attemptData = ScormData::find($attempt);

			if ($attemptData) {
				if ($attemptData->banner->user_id == Auth::user()->id) {
					$status['status'] = 'success';
					$attemptData->delete();
				}
			}
		}

		return $status;

	}

	public function getPanelSettings() {
		// $panelSettingsQuery = $this->query("SELECT * FROM `lms_info` WHERE `user_id` = '$this->userID'");
		// return $this->createArrayOfQuery($panelSettingsQuery);
		return array(LmsInfo::where('user_id', '=', $this->userID)->first());
	}

	public function setPanelSettings($data) {
		$forceLogin = $data->forceLogin ? 1 : 0;
		$onlyMyUsers = $data->onlyMyUsers ? 1 : 0;
		$paid = $data->paid ? 1 : 0;
		$price = $data->price;

		$panelSettings = LmsInfo::firstOrNew(['user_id' => $this->userID]);
		$panelSettings->user_id = $this->userID;
		$panelSettings->state = $onlyMyUsers;
		$panelSettings->paid = $paid;
		$panelSettings->price = $price;
		$panelSettings->login = $forceLogin;
		$panelSettings->save();
	}

	public function downloadChartPivotTableSingleCourse() {

		$scormDatas = $this->getCourseScormData();

		$objPHPExcel = new PHPExcel();
		$objPHPExcel->setActiveSheetIndex(0);

		$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'User');
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Nazwa');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Wartosc');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Suma');

		$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(30);
		$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(30);

		foreach ($scormDatas as $key1 => $scormData) {

			$uc = $scormData->uc[0];

			foreach ($scormData->v->p as $key2 => $variable) {

				$objPHPExcel->getActiveSheet()->SetCellValue('A' . (($key1 * $key2) + 2), $uc);
				$objPHPExcel->getActiveSheet()->SetCellValue('B' . (($key1 * $key2) + 2), $variable->pvarname);
				$objPHPExcel->getActiveSheet()->SetCellValue('C' . (($key1 * $key2) + 2), $variable->pvarvalue);
				$objPHPExcel->getActiveSheet()->SetCellValue('D' . (($key1 * $key2) + 2), 1);
			}
		}

		$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);

	    $file = 'certyficate/variables/variables.xlsx';
	    
	    $objWriter->save($file);


		return array('scormData' => $scormDatas );
	}
}

?>