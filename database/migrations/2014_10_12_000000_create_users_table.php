<?php

//https://laravel.com/docs/5.3/migrations

//php artisan migrate
//php artisan migrate:reset

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            //$table->integer('user_id')->unsigned()->nullable();
            $table->string('name')->default('');
            $table->string('email')->unique();
            $table->string('password', 64);

            $table->string('provider_id', 50)->default('');
            $table->string('lang', 3)->default('pl');
            $table->integer('active')->default(0);
            $table->string('photo')->default('default');
            $table->string('subdomain', 25)->default('');
            $table->string('subdomain_name')->default('');
            $table->string('hash', 40)->default('');
            //$table->integer('owner_id')->default(0);
            $table->integer('download_project')->default(0);
            $table->integer('folders_layout')->default(1);
            $table->text('folders_structure')->nullable();
            $table->tinyInteger('visible')->default(1);
            $table->string('version', 10)->default('2.0.0');
            $table->integer('api_id')->default(1);

            $table->rememberToken();
            $table->timestamps();

            // $table->foreign('user_id')->references('id')->on('users')
            //     ->onUpdate('cascade')->onDelete('cascade');

        });

        DB::table('users')->insert(
            [
                [
                    'name' => 'Owner',
                    'email' => 'owner@rapsody.com.pl', 
                    'password' => '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq',
                    'subdomain' => 'owner',
                    'subdomain_name' => 'owner',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Admin', 
                    'email' => 'admin@rapsody.com.pl', 'password' => 
                    '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq',
                    'subdomain' => 'admin',
                    'subdomain_name' => 'admin',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Template User', 
                    'email' => 'template@rapsody.com.pl', 'password' => 
                    '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq',
                    'subdomain' => 'template',
                    'subdomain_name' => 'template',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Examples User', 
                    'email' => 'examples@rapsody.com.pl', 'password' => 
                    '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq',
                    'subdomain' => 'examples',
                    'subdomain_name' => 'examples',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Distribution User', 
                    'email' => 'distribution@rapsody.com.pl', 'password' => 
                    '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq',
                    'subdomain' => 'distribution',
                    'subdomain_name' => 'distribution',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Test Drive', 
                    'email' => 'testdrive@rapsody.com.pl', 'password' => 
                    '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq',
                    'subdomain' => 'testdrive',
                    'subdomain_name' => 'testdrive',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Api demo admin', 
                    'email' => 'apidemoadmin@rapsody.com.pl', 'password' => 
                    '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq',
                    'subdomain' => 'demo',
                    'subdomain_name' => 'demo',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Api demo user', 
                    'email' => 'apidemouser@rapsody.com.pl', 'password' => 
                    '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq',
                    'subdomain' => 'apidemouser',
                    'subdomain_name' => 'apidemouser',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],


                // Konta testowe do wykożystania w przyszłości

                [
                    'name' => 'Test1', 
                    'email' => 'test1@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test1',
                    'subdomain_name' => 'test1',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test2', 
                    'email' => 'test2@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test2',
                    'subdomain_name' => 'test2',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test3', 
                    'email' => 'test3@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test3',
                    'subdomain_name' => 'test3',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test4', 
                    'email' => 'test4@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test4',
                    'subdomain_name' => 'test4',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test5', 
                    'email' => 'test5@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test5',
                    'subdomain_name' => 'test5',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test6', 
                    'email' => 'test6@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test6',
                    'subdomain_name' => 'test6',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test7', 
                    'email' => 'test7@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test7',
                    'subdomain_name' => 'test7',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test8', 
                    'email' => 'test8@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test8',
                    'subdomain_name' => 'test8',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test9', 
                    'email' => 'test9@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test9',
                    'subdomain_name' => 'test9',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test10', 
                    'email' => 'test10@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test10',
                    'subdomain_name' => 'test10',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test11', 
                    'email' => 'test11@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test11',
                    'subdomain_name' => 'test11',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test12', 
                    'email' => 'test12@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test12',
                    'subdomain_name' => 'test12',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test13', 
                    'email' => 'test13@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test13',
                    'subdomain_name' => 'test13',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test14', 
                    'email' => 'test14@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test14',
                    'subdomain_name' => 'test14',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test15', 
                    'email' => 'test15@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test15',
                    'subdomain_name' => 'test15',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test16', 
                    'email' => 'test16@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test16',
                    'subdomain_name' => 'test16',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test17', 
                    'email' => 'test17@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test17',
                    'subdomain_name' => 'test17',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test18', 
                    'email' => 'test18@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test18',
                    'subdomain_name' => 'test18',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test19', 
                    'email' => 'test19@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test19',
                    'subdomain_name' => 'test19',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],
                [
                    'name' => 'Test20', 
                    'email' => 'test20@rapsody.com.pl', 'password' => 
                    bcrypt('1234qwer'),
                    'subdomain' => 'test20',
                    'subdomain_name' => 'test20',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 0
                ],


                // Konta które nie mogą być usuniete
                [
                    'name' => 'Tomasz Wiśniewski', 
                    'email' => 't.wisniewski@rapsody.com.pl', 'password' => 
                    bcrypt('kol12345'),
                    'subdomain' => 'twisniewski',
                    'subdomain_name' => 'twisniewski',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Jarosław Wieczorkowski', 
                    'email' => 'j.wieczorkowski@rapsody.com', 'password' => 
                    bcrypt('kol12345'),
                    'subdomain' => 'jwieczorkowski',
                    'subdomain_name' => 'jwieczorkowski',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Hubert Biszkont', 
                    'email' => 'huberthc@gmail.com', 'password' => 
                    bcrypt('kol12345'),
                    'subdomain' => 'huberthc',
                    'subdomain_name' => 'huberthc',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Tomasz Chmielik', 
                    'email' => 't.chmielik@rapsody.com.pl', 'password' => 
                    bcrypt('kol12345'),
                    'subdomain' => 'tchmielik',
                    'subdomain_name' => 'tchmielik',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],
                [
                    'name' => 'Jarosław Kutyna', 
                    'email' => 'j.kutyna@rapsody.com.pl ', 'password' => 
                    bcrypt('kol12345'),
                    'subdomain' => 'jkutyna',
                    'subdomain_name' => 'jkutyna',
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s'),
                    'visible' => 1
                ],

            ]
        );

        // Schema::create('users_to_users', function(Blueprint $table)
        // {
        //     $table->increments('id', true);
        //     $table->integer('owner_id')->unsigned();
        //     $table->integer('user_id')->unsigned();

        //     $table->foreign('owner_id')->references('id')->on('users')
        //         ->onUpdate('cascade')->onDelete('cascade');

        //     $table->foreign('user_id')->references('id')->on('users')
        //         ->onUpdate('cascade')->onDelete('cascade');

        // });

        // DB::table('users_to_users')->insert(
        //     [
        //         [
        //             'owner_id' => 2,
        //             'user_id' => 3, 
        //         ],

        //     ]
        // );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Schema::drop('users_to_users');
        Schema::drop('users');
    }
}
