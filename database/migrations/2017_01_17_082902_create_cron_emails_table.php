<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCronEmailsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cron_emails_types', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 255);
		});

		DB::table('cron_emails_types')->insert(
            [
                ['name' => 'registred_after_15_minutes'],
                ['name' => 'registred_after_7_days'],
                ['name' => 'pan_ending_for_7_days'],
                ['name' => 'pan_ending_for_1_day'],
                ['name' => 'registred_after_3_days'],
                ['name' => 'registred_after_14_days'],
        	]
        );

		Schema::create('cron_email_type_to_plan_user', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('plan_user_id')->unsigned();
			$table->integer('cron_email_type_id')->unsigned();

			$table->foreign('plan_user_id')->references('id')->on('plans_users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('cron_email_type_id')->references('id')->on('cron_emails_types')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->tinyInteger('email_sended')->default(0);
		});


		Schema::create('cron_email_type_to_user', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->integer('cron_email_type_id')->unsigned();

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('cron_email_type_id')->references('id')->on('cron_emails_types')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->tinyInteger('email_sended')->default(0);
		});

	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('cron_email_type_to_user');
		Schema::drop('cron_email_type_to_plan_user');
		Schema::drop('cron_emails_types');
	}

}
