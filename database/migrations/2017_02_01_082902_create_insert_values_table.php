<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

use App\Modules\Models\Banners;
use App\Modules\Models\Projects;

class CreateInsertValuesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		// DB::table('projects')->insert(
  //           [
  //               [
  //                   'user_id' => 2,
  //                   'name' => 'Jarek', 
  //               ],
  //               [
  //                   'user_id' => 2,
  //                   'name' => 'Jarek', 
  //               ],
  //               [
  //                   'user_id' => 2,
  //                   'name' => 'Jarek', 
  //               ]
  //           ]
  //       );

  //       DB::table('banners_projects')->insert(
  //           [
  //               [
  //                   'project_id' => 1,
  //                   'user_id' => 2,
  //                   'path' => '', 
  //                   'iframe' => '', 
  //                   'name' => 'jarek asdasdsd asdasd asd asd', 
  //                   'summary' => '', 
  //                   'date_create' => date('Y-m-d H:i:s'),
  //                   'date_expiry' => date('Y-m-d H:i:s'),
  //                   'modified' => date('Y-m-d H:i:s'),
  //                   'view_count' => 1,
  //                   'max_view_count' => 10,
  //                   'dimensions' => '800x600',
  //                   'questions' => '',
  //                   'index_file' => '',
  //                   'requirements' => '',
  //                   'questiondata' => '',
  //               ],
  //               [
  //                   'project_id' => 2,
  //                   'user_id' => 4,
  //                   'path' => '', 
  //                   'iframe' => '', 
  //                   'name' => 'jarek nnnnr werwerwe cccccc aaaaaa', 
  //                   'summary' => '',
  //                   'date_create' => date('Y-m-d H:i:s'),
  //                   'date_expiry' => date('Y-m-d H:i:s'),
  //                   'modified' => date('Y-m-d H:i:s'),
  //                   'view_count' => 1,
  //                   'max_view_count' => 10,
  //                   'dimensions' => '800x600',
  //                   'questions' => '',
  //                   'index_file' => '',
  //                   'requirements' => '',
  //                   'questiondata' => '',
  //               ],
  //               [
  //                   'project_id' => 2,
  //                   'user_id' => 2,
  //                   'path' => '', 
  //                   'iframe' => '', 
  //                   'name' => 'bbb dzdzsdfsd asddddddd dddddddd ddddd',
  //                   'summary' => '',
  //                   'date_create' => date('Y-m-d H:i:s'),
  //                   'date_expiry' => date('Y-m-d H:i:s'),
  //                   'modified' => date('Y-m-d H:i:s'),
  //                   'view_count' => 1,
  //                   'max_view_count' => 10,
  //                   'dimensions' => '800x600',
  //                   'questions' => '',
  //                   'index_file' => '',
  //                   'requirements' => '',
  //                   'questiondata' => '',
  //               ],
  //               [
  //                   'project_id' => 2,
  //                   'user_id' => 2,
  //                   'path' => '', 
  //                   'iframe' => '', 
  //                   'name' => 'ccc', 
  //                   'summary' => '',
  //                   'date_create' => date('Y-m-d H:i:s'),
  //                   'date_expiry' => date('Y-m-d H:i:s'),
  //                   'modified' => date('Y-m-d H:i:s'),
  //                   'view_count' => 1,
  //                   'max_view_count' => 10,
  //                   'dimensions' => '800x600',
  //                   'questions' => '',
  //                   'index_file' => '',
  //                   'requirements' => '',
  //                   'questiondata' => '',
  //               ],
  //           ]
  //       );

  //       DB::table('scorm_data')->insert(
  //           [
  //               [
  //                   'user_id' => 2,
  //                   'course_id' => 1,
  //                   'data' => '', 
  //                   'create_date' => date('Y-m-d H:i:s'),
  //                   'modify_date' => date('Y-m-d H:i:s'),
  //                   'course_status' => 'passed',
  //                   'user_score' => 10,
  //                   'lesson_location' => 1,
  //                   'page_time' => '2',
  //                   'mailing_login' => '',
  //                   'score_max' => 100,
  //                   'score_min' => 1,
  //                   'success_status' => '',
  //                   'session_time' => '',
  //               ],

  //               [
  //                   'user_id' => 2,
  //                   'course_id' => 3,
  //                   'data' => '', 
  //                   'create_date' => date('Y-m-d H:i:s'),
  //                   'modify_date' => date('Y-m-d H:i:s'),
  //                   'course_status' => 'passed',
  //                   'user_score' => 10,
  //                   'lesson_location' => 1,
  //                   'page_time' => '2',
  //                   'mailing_login' => '',
  //                   'score_max' => 100,
  //                   'score_min' => 1,
  //                   'success_status' => '',
  //                   'session_time' => '',
  //               ],
  //               [
  //                   'user_id' => 3,
  //                   'course_id' => 3,
  //                   'data' => '', 
  //                   'create_date' => date('Y-m-d H:i:s'),
  //                   'modify_date' => date('Y-m-d H:i:s'),
  //                   'course_status' => 'passed',
  //                   'user_score' => 10,
  //                   'lesson_location' => 1,
  //                   'page_time' => '2',
  //                   'mailing_login' => '',
  //                   'score_max' => 100,
  //                   'score_min' => 1,
  //                   'success_status' => '',
  //                   'session_time' => '',
  //               ],
  //               [
  //                   'user_id' => 4,
  //                   'course_id' => 2,
  //                   'data' => '', 
  //                   'create_date' => date('Y-m-d H:i:s'),
  //                   'modify_date' => date('Y-m-d H:i:s'),
  //                   'course_status' => 'passed',
  //                   'user_score' => 10,
  //                   'lesson_location' => 1,
  //                   'page_time' => '2',
  //                   'mailing_login' => '',
  //                   'score_max' => 100,
  //                   'score_min' => 1,
  //                   'success_status' => '',
  //                   'session_time' => '',
  //               ],
  //           ]
  //       );

        

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		
	}

}
