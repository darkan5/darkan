<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOthersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		//bug_reports - Not used
		//capabilities - Not used
		//dealer_users - Not used
		//debug - Not used
		//fblogs - Not used
		//photopea - Not used
		//plans_details - Not used
		//pprogram - Not used
		//pprogram_paid - Not used
		//pp_paycheck - Not used
		//promo_code - Not used
		//promo_code_uses - Not used
		//registration - Not used
		//user_project_log - Not used
		//users_online - Not used
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		// Schema::drop('users_online');
		// Schema::drop('user_project_log');
		// Schema::drop('registration');
		// Schema::drop('promo_code_uses');
		// Schema::drop('promo_code');
		// Schema::drop('pp_paycheck');
		// Schema::drop('pprogram_paid');
		// Schema::drop('pprogram');
		// Schema::drop('plans_details');
		// Schema::drop('photopea');
		// Schema::drop('fblogs');
		// Schema::drop('debug');
		// Schema::drop('dealer_users');
		// Schema::drop('capabilities');
		// Schema::drop('bug_reports');
	}

}
