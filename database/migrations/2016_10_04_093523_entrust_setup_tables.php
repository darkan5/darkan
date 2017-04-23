<?php
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class EntrustSetupTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('display_name')->nullable();
            $table->string('description')->nullable();
            $table->tinyInteger('active')->default(1);
            $table->integer('order')->default(0);
            $table->timestamps();
        });


        DB::table('roles')->insert(
            [
                ['name' => 'owner', 'display_name' => 'Project Owner', 'description' => 'User is the owner of a given project'],
                ['name' => 'admin', 'display_name' => 'User Administrator', 'description' => 'User is allowed to manage and edit other users'],
                ['name' => 'user', 'display_name' => 'User', 'description' => 'User is allowed to visit page'],
                ['name' => 'creator', 'display_name' => 'Creator', 'description' => ''],
                ['name' => 'affiliate', 'display_name' => 'Affiliate', 'description' => ''],
                ['name' => 'distributor', 'display_name' => 'Distributor', 'description' => ''],
                ['name' => 'partner', 'display_name' => 'Partner', 'description' => ''],
                ['name' => 'superadmin', 'display_name' => 'Superadmin', 'description' => ''],
                ['name' => 'reseler', 'display_name' => 'Reseler', 'description' => ''],
                ['name' => 'registered', 'display_name' => 'Registered', 'description' => ''],
                ['name' => 'lms', 'display_name' => 'lms', 'description' => 'Lms user'],
                ['name' => 'api', 'display_name' => 'api', 'description' => 'Api admin user'],
                ['name' => 'testdrive', 'display_name' => 'Test Drive', 'description' => 'Test Drive user'],
            ]
        );

        Schema::create('role_user', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('role_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['user_id', 'role_id']);
        });

        DB::table('role_user')->insert(
            [
                ['user_id' => 1, 'role_id' => 1],
                ['user_id' => 2, 'role_id' => 2],
                ['user_id' => 3, 'role_id' => 4],
                ['user_id' => 4, 'role_id' => 4],
                ['user_id' => 5, 'role_id' => 4],
                ['user_id' => 6, 'role_id' => 13],
                ['user_id' => 7, 'role_id' => 12],
                ['user_id' => 8, 'role_id' => 12],

                ['user_id' => 9, 'role_id' => 3],
                ['user_id' => 10, 'role_id' => 3],
                ['user_id' => 11, 'role_id' => 3],
                ['user_id' => 12, 'role_id' => 3],
                ['user_id' => 13, 'role_id' => 3],

                ['user_id' => 14, 'role_id' => 3],
                ['user_id' => 15, 'role_id' => 3],
                ['user_id' => 16, 'role_id' => 3],
                ['user_id' => 17, 'role_id' => 3],
                ['user_id' => 18, 'role_id' => 3],

                ['user_id' => 19, 'role_id' => 3],
                ['user_id' => 20, 'role_id' => 3],
                ['user_id' => 21, 'role_id' => 3],
                ['user_id' => 22, 'role_id' => 3],
                ['user_id' => 23, 'role_id' => 3],

                ['user_id' => 24, 'role_id' => 3],
                ['user_id' => 25, 'role_id' => 3],
                ['user_id' => 26, 'role_id' => 3],
                ['user_id' => 27, 'role_id' => 3],
                ['user_id' => 28, 'role_id' => 3],
                
                ['user_id' => 29, 'role_id' => 3],
                ['user_id' => 30, 'role_id' => 3],
                ['user_id' => 31, 'role_id' => 3],
                ['user_id' => 32, 'role_id' => 3],
                ['user_id' => 33, 'role_id' => 3],


            ]
        );

        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('display_name')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::create('permission_role', function (Blueprint $table) {
            $table->integer('permission_id')->unsigned();
            $table->integer('role_id')->unsigned();

            $table->foreign('permission_id')->references('id')->on('permissions')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['permission_id', 'role_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return  void
     */
    public function down()
    {
        Schema::drop('permission_role');
        Schema::drop('permissions');
        Schema::drop('role_user');
        Schema::drop('roles');
    }
}
