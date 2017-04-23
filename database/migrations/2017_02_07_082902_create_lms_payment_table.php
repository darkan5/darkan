<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLmsPaymentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

        Schema::create('payments', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('invoice_id');
			$table->integer('year');
			$table->integer('user_id')->unsigned();
			$table->string('product', 60);
			$table->string('payment_status', 20)->default('started');
			$table->string('payment_result', 50);
			$table->text('payment_data', 65535);
			$table->timestamp('created')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->dateTime('modified');
			$table->string('hash', 50);
			$table->text('invoice_data', 65535);
			$table->string('price', 10);
			$table->timestamps();
			$table->string('currency', 10);
			$table->string('locale', 10)->default('');
			$table->string('txn_id', 255)->default('');
		});

	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		
		Schema::drop('payments');
	}

}
