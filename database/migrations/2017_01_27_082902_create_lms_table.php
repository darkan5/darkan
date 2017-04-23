<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLmsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create('portal_skins', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('name', 100);
			$table->string('css_file', 100);
			$table->integer('public')->default(1);
		});

		DB::table('portal_skins')->insert(
            [
                ['name' => 'default', 'css_file' => 'default.css', 'public' => 1],
                ['name' => 'red', 'css_file' => 'red.css', 'public' => 1],
                ['name' => 'pamrow', 'css_file' => 'pamrow.css', 'public' => 0],
            ]
	    );
		
		Schema::create('lms_info', function(Blueprint $table)
		{
			//$table->increments('id', true);
			$table->integer('user_id')->unsigned();
			$table->integer('state')->default(0);
			$table->integer('login')->default(0);
			$table->integer('savemail')->default(0);
			$table->string('passwd', 100)->default('');
			$table->integer('price')->default(0);
			$table->string('currency', 5)->default('EUR');
			$table->timestamp('expiration')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->integer('max_accounts')->default(20);
			$table->integer('business')->default(0);
			$table->integer('paid')->length(1)->default(0);
			$table->integer('topmenuon')->length(1)->default(1);
			$table->integer('footeron')->length(1)->default(1);
			$table->integer('skin')->unsigned()->default(1);
			$table->string('paypal_mail', 255)->default('');
			$table->string('redirect_url', 255)->default('');
			$table->string('custom_view', 100)->default('');
			$table->string('mail_template', 100)->default('');
			$table->string('portal_bought_mail_template', 120)->default('');
			$table->string('terms_link', 255)->default('');
			$table->string('force_lang', 2)->default('');

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('skin')->references('id')->on('portal_skins')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('groups', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('id_owner')->unsigned();
			$table->string('name', 100);
			$table->integer('status');

			$table->foreign('id_owner')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('group_banner', function(Blueprint $table)
		{
			$table->integer('id_group')->unsigned();
			$table->integer('id_banner')->unsigned();
			$table->primary(['id_group','id_banner']);

			$table->foreign('id_group')->references('id')->on('groups')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->foreign('id_banner')->references('id_banner')->on('banners_projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('group_user', function(Blueprint $table)
		{
			$table->integer('id_group')->unsigned();
			$table->integer('id_user')->unsigned();
			$table->primary(['id_group','id_user']);

			$table->foreign('id_group')->references('id')->on('groups')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->foreign('id_user')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('lms_group_content', function(Blueprint $table)
		{
			$table->integer('group_id')->unsigned();
			$table->integer('content_id')->unsigned();
			$table->primary(['group_id','content_id']);

			$table->foreign('group_id')->references('id')->on('groups')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('content_id')->references('id_banner')->on('banners_projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('mailing_groups', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('id_owner')->unsigned();
			$table->string('name', 100);

			$table->foreign('id_owner')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('mailing_users', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('email', 255)->unique();
			$table->string('name', 50)->default('');
			$table->integer('owner_id')->unsigned();
			$table->timestamp('create_date')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->text('data', 65535);
			$table->string('fb_link')->default('');
		});

		Schema::create('mailing_group_user', function(Blueprint $table)
		{
			$table->integer('id_group')->unsigned();
			$table->integer('id_user')->unsigned();
			$table->primary(['id_group','id_user']);

			$table->foreign('id_group')->references('id')->on('mailing_groups')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->foreign('id_user')->references('id')->on('mailing_users')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('lms_scorm_data', function(Blueprint $table)
		{
			$table->integer('user_id')->unsigned();
			$table->integer('content_id')->unsigned();
			$table->string('status', 25)->default('incompleted');
			$table->text('suspend_data', 65535);
			$table->integer('lesson_location')->default(0);
			$table->text('point_status', 16777215);
			$table->text('questionsarray', 16777215);
			$table->text('page_time', 65535);
			$table->text('pages', 65535);
			$table->string('needs', 200);
			$table->text('answers', 16777215);
			$table->primary(['user_id','content_id']);

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('content_id')->references('id_banner')->on('banners_projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('lms_scorm_data_guest', function(Blueprint $table)
		{
			$table->string('hash', 100)->primary();
			$table->integer('content_id')->unsigned();
			$table->string('status', 25)->default('incompleted');
			$table->text('suspend_data', 65535);
			$table->integer('lesson_location')->default(0);
			$table->text('point_status', 16777215);
			$table->text('questionsarray', 16777215);
			$table->text('page_time', 65535);
			$table->text('pages', 65535);
			$table->string('needs', 200);
			$table->text('answers', 16777215);

			$table->foreign('content_id')->references('id_banner')->on('banners_projects')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('lms_user_portal', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('portal_admin')->unsigned();
			$table->integer('user')->unsigned();
			$table->integer('active_actual')->default(1);
			$table->integer('active_future')->default(1);
			$table->string('user_name')->default('');
			$table->integer('limit_exceeded')->default(0);

			$table->foreign('portal_admin')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('user')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
	
		});

		Schema::create('lms_user_portal_paid', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('user')->unsigned();
			$table->integer('portal_admin')->unsigned();
			$table->integer('paid');

			$table->foreign('portal_admin')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('user')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('lms_invitation_requests', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('owner_id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->integer('mails_sent');
			$table->string('hash', 50);
			$table->timestamps();

            $table->foreign('owner_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('lms_invitation_requests');
		Schema::drop('lms_user_portal_paid');
		Schema::drop('lms_user_portal');
		Schema::drop('lms_scorm_data_guest');
		Schema::drop('lms_scorm_data');
		Schema::drop('mailing_group_user');
		Schema::drop('mailing_users');
		Schema::drop('mailing_groups');
		Schema::drop('lms_group_content');
		Schema::drop('group_user');
		Schema::drop('group_banner');
		Schema::drop('groups');
		Schema::drop('lms_info');
		Schema::drop('portal_skins');
		
	}

}
