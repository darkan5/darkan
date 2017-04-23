<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAppTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create('editors', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('name', 255);
			$table->string('description', 255)->default('');
			$table->integer('order')->default(0);
			$table->tinyInteger('develop')->default(0);
			$table->tinyInteger('active')->default(1);
		});

		DB::table('editors')->insert(
            [
                [
                    'name' => 'Empty project', 
                    'description' => 'Empty project',
                ],
                [
                    'name' => 'Pdf project', 
                    'description' => 'Pdf project',
                ],
                [
                    'name' => 'Img project', 
                    'description' => 'Img project',
                ],
                [
                    'name' => 'Darkan easy', 
                    'description' => 'Darkan easy',
                ],
                [
                    'name' => 'Darkan standard', 
                    'description' => 'Darkan standard',
                ],
                [
                    'name' => 'Darkan profesional', 
                    'description' => 'Darkan profesional',
                ],
                [
                    'name' => 'Darkan enterprise', 
                    'description' => 'Darkan enterprise',
                ],
                [
                    'name' => 'Ppt to Darkan', 
                    'description' => 'Ppt to Darkan',
                ],

            ]
        );

		Schema::create('user_login', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('user_id')->unsigned();
			$table->dateTime('date_login');
			$table->dateTime('date_logout');
			$table->string('browser', 500)->default('');
			$table->string('ip', 100)->default('');
			$table->string('countryName', 255)->default('');
			$table->string('countryCode', 255)->default('');
			$table->string('regionCode', 255)->default('');
			$table->string('regionName', 255)->default('');
			$table->string('cityName', 255)->default('');
			$table->text('latitude', 65535);
			$table->string('longitude', 255)->default('');
			$table->string('driver', 500)->default('');
			$table->timestamps();

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('projects', function(Blueprint $table)
		{
			$table->increments('project_id', true);
			$table->integer('user_id')->unsigned();
			$table->dateTime('date');
			$table->string('name', 100);
			$table->string('skin', 50)->default('sk01');
			$table->string('dimentions', 15)->default('860x500');
			$table->string('version', 8)->default('2.0.0');
			$table->dateTime('date_modification');
			$table->integer('size')->default(0);
			$table->integer('template')->default(0);
			$table->dateTime('last_visit');
			$table->integer('status')->default(0);
			$table->integer('external')->default(0);
			$table->integer('editor_id')->unsigned()->default(5);

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('editor_id')->references('id')->on('editors')
                ->onUpdate('cascade')->onDelete('cascade');

		});

		Schema::create('projects_deleted', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('project_id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->string('name', 255);
			$table->integer('external')->default(0);
			$table->timestamps();

			$table->foreign('project_id')->references('project_id')->on('projects')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

		});

		Schema::create('project_version', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('project_id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->dateTime('date');
			$table->string('dir', 100)->default('');
			$table->string('description', 1000)->default('');
			$table->integer('size')->default(0);

			$table->foreign('project_id')->references('project_id')->on('projects')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('projects_demos', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('user_id')->unsigned();
			$table->integer('project_id')->unsigned();
			$table->string('name', 255)->default('');
			$table->string('dimentions', 255)->default('');
			$table->string('skin', 255)->default('');
			$table->integer('size')->default(0);

			$table->foreign('project_id')->references('project_id')->on('projects')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		

		Schema::create('share', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('user_id')->unsigned();
			$table->integer('project_id')->unsigned();

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('project_id')->references('project_id')->on('projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('share_noexists', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('mail', 255);
			$table->integer('project_id')->unsigned();

			$table->foreign('project_id')->references('project_id')->on('projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('share_user_template', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('owner_id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->integer('template_id')->unsigned();

			$table->foreign('owner_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('template_id')->references('project_id')->on('projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('banners_projects', function(Blueprint $table)
		{
			$table->increments('id_banner', true);
			$table->integer('project_id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->text('path', 65535);
			$table->string('iframe')->default('');
			$table->string('name', 255);
			$table->text('summary', 65535)->nullable();
			$table->dateTime('date_create');
			$table->dateTime('date_expiry');
			$table->dateTime('modified');
			$table->integer('view_count')->default(1);
			$table->integer('max_view_count')->default(1);
			$table->string('dimensions', 15)->default(1);
			$table->integer('active')->default(1);
			$table->integer('views')->default(0);
			$table->integer('ord')->default(0);
			$table->string('thumb')->default('none');
			$table->float('price', 10, 0)->default(0);
			$table->integer('size_project')->default(0);
			$table->integer('size_source')->default(0);
			$table->dateTime('last_visit');
			$table->integer('status')->default(0);
			$table->integer('available')->default(0);
			$table->text('questions', 16777215);
			$table->integer('zoom')->default(1);
			$table->integer('share')->default(1);
			$table->integer('fullscreen')->default(1);
			$table->integer('reset_progress')->default(1);
			$table->integer('primary')->default(0);
			$table->string('index_file', 150)->default('');
			$table->integer('show_title')->default(1);
			$table->string('requirements')->default('');
			$table->text('questiondata', 16777215);
			$table->integer('isold')->length(1)->default(1);


			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

       		$table->foreign('project_id')->references('project_id')->on('projects')
                ->onUpdate('cascade')->onDelete('cascade');

		});

		

        Schema::create('banners_projects_external', function(Blueprint $table)
		{
			$table->increments('id_banner', true);
			$table->integer('project_id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->text('path', 65535);
			$table->string('name', 255);
			$table->text('summary', 65535)->nullable();
			$table->timestamps();

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

       		$table->foreign('project_id')->references('project_id')->on('projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('banners_domain', function(Blueprint $table)
		{
			$table->increments('id_banner_domain', true);
			$table->integer('banner_id')->unsigned();
			$table->text('domain', 65535);

			$table->foreign('banner_id')->references('id_banner')->on('banners_projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('banners_shared', function(Blueprint $table)
		{
			$table->increments('id_shared', true);
			$table->integer('banner_id')->unsigned();
			$table->integer('user_id')->unsigned();

			$table->foreign('banner_id')->references('id_banner')->on('banners_projects')
                ->onUpdate('cascade')->onDelete('cascade');

       		$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

		});

		Schema::create('banners_categories', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('owner_id')->unsigned();
			$table->string('name', 255);

       		$table->foreign('owner_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

		});

		Schema::create('banners_to_categories', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('course_id')->unsigned();
			$table->integer('category_id')->unsigned();

			$table->foreign('course_id')->references('id_banner')->on('banners_projects')
                ->onUpdate('cascade')->onDelete('cascade');

       		$table->foreign('category_id')->references('id')->on('banners_categories')
                ->onUpdate('cascade')->onDelete('cascade');

		});
		

		Schema::create('scorm', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('user_id')->unsigned();
			$table->integer('course_id')->unsigned();
			$table->string('lesson_location', 10);
			$table->string('lesson_status', 20);
			$table->string('session_time', 20);
			$table->string('total_time', 20);
			$table->string('score_raw', 20);
			$table->string('score_min', 20);
			$table->string('score_max', 20);
			$table->text('suspend_data', 65535);
			$table->timestamp('date')->default(DB::raw('CURRENT_TIMESTAMP'));

       		$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('course_id')->references('id_banner')->on('banners_projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('scorm_data', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('user_id')->unsigned();
			$table->integer('course_id')->unsigned();
			$table->dateTime('create_date');
			$table->dateTime('modify_date');
			$table->text('data', 16777215);
			$table->string('course_status', 20);
			$table->string('user_score', 200)->default('0');
			$table->string('lesson_location', 50)->default('1');
			$table->text('page_time', 16777215);
			$table->string('mailing_login', 256);
			$table->float('score_max', 10, 0)->default(0);
			$table->string('score_min', 100)->default('0');
			$table->string('success_status', 100);
			$table->string('session_time', 100);

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('course_id')->references('id_banner')->on('banners_projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('scorm_data_guest', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('user_id', 50);
			$table->integer('course_id')->unsigned();
			$table->dateTime('create_date');
			$table->dateTime('modify_date');
			$table->text('data', 16777215);
			$table->string('course_status', 20);

			$table->foreign('course_id')->references('id_banner')->on('banners_projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('testdrive', function(Blueprint $table)
		{
			$table->string('email', 150);
			$table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
		});

		
		
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('testdrive');
		Schema::drop('scorm_data_guest');
		Schema::drop('scorm_data');
		Schema::drop('scorm');
		Schema::drop('banners_to_categories');
		Schema::drop('banners_categories');
		Schema::drop('banners_shared');
		Schema::drop('banners_domain');
		Schema::drop('banners_projects_external');
		Schema::drop('banners_projects');
		Schema::drop('share_user_template');
		Schema::drop('share_noexists');
		Schema::drop('share');
		Schema::drop('projects_demos');
		Schema::drop('project_version');
		Schema::drop('projects_deleted');
		Schema::drop('projects');
		Schema::drop('user_login');
		Schema::drop('editors');
	}

}
