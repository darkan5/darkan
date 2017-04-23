<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateApiTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create('aplication_api_roles', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('name', 255);
		});

		DB::table('aplication_api_roles')->insert(
            [
                ['name' => 'admin'],
                ['name' => 'user'],
                ['name' => 'none'],
            ]
	    );

		Schema::create('aplication_api', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('api_key', 128)->unique();
			$table->string('php_controller')->default('');
			$table->integer('role_id')->unsigned();
			$table->string('name', 255)->default('');
			$table->string('plans', 255)->default('{}');

			$table->foreign('role_id')->references('id')->on('aplication_api_roles')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('aplication_admin_api_to_aplication_api', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('admin_api_key_id')->unsigned();
			$table->integer('api_key_id')->unsigned();

			$table->foreign('admin_api_key_id')->references('id')->on('aplication_api')
                ->onUpdate('cascade')->onDelete('cascade');

           	$table->foreign('api_key_id')->references('id')->on('aplication_api')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('api_tokens', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('api_key_id')->unsigned();
			$table->string('token', 32);
			$table->string('hashed_api_key', 255);
			$table->timestamps();

			$table->foreign('api_key_id')->references('id')->on('aplication_api')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('users_to_aplications_api', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->integer('user_id')->unsigned();
			$table->integer('aplication_api_id')->unsigned();

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

           	$table->foreign('aplication_api_id')->references('id')->on('aplication_api')
                ->onUpdate('cascade')->onDelete('cascade');
		});


		DB::table('aplication_api')->insert(
            [
                ['api_key' => 'vOWSylmOWzdnddP3wv5Lp0g1ZngKRSpt8Uy8la1a', 'role_id' => 1],
                ['api_key' => 'vOWSylmOWzdnddP3wv5Lp0g1ZngKRSpt8Uy8la2a', 'role_id' => 2],
            ]
	    );

	    DB::table('aplication_admin_api_to_aplication_api')->insert(
            [
                ['admin_api_key_id' => 1, 'api_key_id' => 2],
            ]
	    );

	    DB::table('users_to_aplications_api')->insert(
            [
                ['user_id' => 7, 'aplication_api_id' => 1],
                ['user_id' => 8, 'aplication_api_id' => 2],
            ]
	    );

		

	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{

		Schema::drop('users_to_aplications_api');
		Schema::drop('api_tokens');
		Schema::drop('aplication_admin_api_to_aplication_api');
		Schema::drop('aplication_api');
		Schema::drop('aplication_api_roles');

	}

}
