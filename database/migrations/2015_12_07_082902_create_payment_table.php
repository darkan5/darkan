<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePaymentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create('plans_versions', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('name', 255);
			$table->string('description', 255);
			$table->string('version')->default('1.0');
			$table->timestamps();
		});

		DB::table('plans_versions')->insert(
            [
                ['name' => 'Plan 1.0', 'description' => 'Plan 1.0 - pierwsza wersja', 'version' => '1.0'],
                ['name' => 'Plan 2.0', 'description' => 'Plan 2.0 - pierwsza wersja', 'version' => '2.0'],
            ]
	    );

		Schema::create('on_off_states', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('state');
			$table->string('name', 255);
		});

		DB::table('on_off_states')->insert(
            [
                ['state' => 0, 'name' => 'Wyłączone'],
                ['state' => 1 ,'name' => 'Włączone']
        	]
        );


		Schema::create('forms_of_payment', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('method');
			$table->string('name', 255);
			$table->string('display_name', 255);
		});

		DB::table('forms_of_payment')->insert(
            [
                ['method' => -1, 'name' => 'all', 'display_name' => 'Wszystkie'],
                ['method' => 145 , 'name' => 'credit_card', 'display_name' => 'Karta płatnicza (cykliczność)']
        	]
        );


		Schema::create('plans_period_types', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 255);
		});

		DB::table('plans_period_types')->insert(
            [
                ['name' => 'days'],
                ['name' => 'weeks'],
                ['name' => 'months'],
                ['name' => 'years']
        	]
        );

		Schema::create('plans', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 255);
			$table->string('description', 255);
			$table->integer('version_id')->unsigned()->default(1);
			$table->integer('period')->default(1);
			$table->integer('form_of_payment_id')->unsigned()->default(1);
			$table->integer('plans_period_type_id')->unsigned()->default(3);

			$table->foreign('form_of_payment_id')->references('id')->on('forms_of_payment')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('plans_period_type_id')->references('id')->on('plans_period_types')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('version_id')->references('id')->on('plans_versions')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->integer('limit')->default(1);
			$table->tinyInteger('active')->default(1);
			$table->dateTime('start_date');
			$table->dateTime('expiration_date');
			$table->tinyInteger('for_admin_only')->default(0);
			$table->tinyInteger('limit_enabled')->default(0);
			$table->tinyInteger('date_enabled')->default(0);
			$table->timestamps();
		});

		DB::table('plans')->insert(
            [

            	['for_admin_only' => 1, 'name' => 'Demo 1', 'description' => 'Demo for 2 weeks', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 2, 'plans_period_type_id' => 2],
            	['for_admin_only' => 1, 'name' => 'Demo 2', 'description' => 'Demo for 1 month', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 1, 'plans_period_type_id' => 3],
            	['for_admin_only' => 1, 'name' => 'Demo 2', 'description' => 'Demo for 2 months', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 2, 'plans_period_type_id' => 3],

                ['for_admin_only' => 0, 'name' => 'Standard', 'description' => 'Standard for 1 month', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 1, 'plans_period_type_id' => 3],
                ['for_admin_only' => 0, 'name' => 'Professional', 'description' => 'Professional for 1 month', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 1, 'plans_period_type_id' => 3],
                ['for_admin_only' => 0, 'name' => 'Elearning', 'description' => 'Elearning for 1 month', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 1, 'plans_period_type_id' => 3],

                ['for_admin_only' => 0, 'name' => 'Standard', 'description' => 'Standard for 6 months', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 6, 'plans_period_type_id' => 3],
                ['for_admin_only' => 0, 'name' => 'Professional', 'description' => 'Professional for 6 months', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 6, 'plans_period_type_id' => 3],
                ['for_admin_only' => 0, 'name' => 'Elearning', 'description' => 'Elearning for 6 months', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 6, 'plans_period_type_id' => 3],

                ['for_admin_only' => 0, 'name' => 'Standard', 'description' => 'Standard for 12 months', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 12, 'plans_period_type_id' => 3],
                ['for_admin_only' => 0, 'name' => 'Professional', 'description' => 'Professional for 12 months', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 12, 'plans_period_type_id' => 3],
                ['for_admin_only' => 0, 'name' => 'Elearning', 'description' => 'Elearning for 12 months', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 12, 'plans_period_type_id' => 3],

                ['for_admin_only' => 1, 'name' => 'For creator', 'description' => 'For creator', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 5, 'plans_period_type_id' => 4],
                
                ['for_admin_only' => 1, 'name' => 'For distributor 5 years', 'description' => 'For distributor 5 years', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 5, 'plans_period_type_id' => 4],
                ['for_admin_only' => 1, 'name' => 'For distributor 5 years', 'description' => 'For distributor 5 years', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 5, 'plans_period_type_id' => 4],

                ['for_admin_only' => 1, 'name' => 'Api Standard', 'description' => 'Api Standard for 12 months', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 12, 'plans_period_type_id' => 3],
                ['for_admin_only' => 1, 'name' => 'Api Professional', 'description' => 'Api Professional for 12 months', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 12, 'plans_period_type_id' => 3],
                ['for_admin_only' => 1, 'name' => 'Api Elearning', 'description' => 'Api Elearning for 12 months', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 12, 'plans_period_type_id' => 3],

                ['for_admin_only' => 1, 'name' => 'Test Drive', 'description' => 'Test Drive', 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05', 'period' => 5, 'plans_period_type_id' => 4],
            ]
	    );

		Schema::create('plans_options', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('name', 255);
			$table->string('description', 255);
			$table->integer('version_id')->unsigned()->default(1);
			$table->text('options', 16777215);

			$table->foreign('version_id')->references('id')->on('plans_versions')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		$optionsDemo = '{
			  "createProjects": true,
			  "haveProjects": true,
			  "publish": true,
			  "publishOnPrimary": true,
			  "hasOwnChannel": true,
			  "exportscorm": true,
			  "exporthtml5": true,
			  "exportpdf": true,
			  "importpdf": true,
			  "importpsd": true,
			  "publishfacebook": true,
			  "mailing": true,
			  "versioning": true,
			  "adminPanel": true,
			  "projects": 2,
			  "banners": 2,
			  "diskspace": 1,
			  "lms_users": 2,
			  "mailing_daily": 100,
			  "mailing_users": 2,
			  "publishfacebook": true
			}';

		$optionsStandard = '{
			  "createProjects": true,
			  "haveProjects": true,
			  "publish": true,
			  "publishOnPrimary": true,
			  "hasOwnChannel": true,
			  "exportscorm": true,
			  "exporthtml5": true,
			  "exportpdf": true,
			  "importpdf": true,
			  "importpsd": true,
			  "publishfacebook": true,
			  "mailing": true,
			  "versioning": true,
			  "adminPanel": true,
			  "projects": 25,
			  "banners": 25,
			  "diskspace": 2,
			  "lms_users": 400,
			  "mailing_daily": 400,
			  "mailing_users": 400
			}';

		$optionsProfesional = '{
			  "createProjects": true,
			  "haveProjects": true,
			  "publish": true,
			  "publishOnPrimary": true,
			  "hasOwnChannel": true,
			  "exportscorm": true,
			  "exporthtml5": true,
			  "exportpdf": true,
			  "importpdf": true,
			  "importpsd": true,
			  "publishfacebook": true,
			  "mailing": true,
			  "versioning": true,
			  "adminPanel": true,
			  "projects": 100,
			  "banners": 100,
			  "diskspace": 6,
			  "lms_users": 600,
			  "mailing_daily": 600,
			  "mailing_users": 600
			}';

		$optionsElearning = '{
			  "createProjects": true,
			  "haveProjects": true,
			  "publish": true,
			  "publishOnPrimary": true,
			  "hasOwnChannel": true,
			  "exportscorm": true,
			  "exporthtml5": true,
			  "exportpdf": true,
			  "importpdf": true,
			  "importpsd": false,
			  "publishfacebook": true,
			  "mailing": false,
			  "versioning": false,
			  "adminPanel": true,
			  "projects": 100,
			  "banners": 100,
			  "diskspace": 6,
			  "lms_users": 1000,
			  "mailing_daily": 1000,
			  "mailing_users": 1000
			}';

		$optionsApi = '{
			  "createProjects": true,
			  "haveProjects": true,
			  "publish": true,
			  "publishOnPrimary": true,
			  "hasOwnChannel": true,
			  "exportscorm": true,
			  "exporthtml5": true,
			  "exportpdf": true,
			  "importpdf": true,
			  "importpsd": true,
			  "publishfacebook": true,
			  "mailing": true,
			  "versioning": true,
			  "adminPanel": true,
			  "projects": 100,
			  "banners": 100,
			  "diskspace": 10,
			  "lms_users": 1000,
			  "mailing_daily": 1000,
			  "mailing_users": 1000,
			  "createUsers": true,
			  "usersLimit": 100
			}';

		$optionsQuest = '{
			  "createProjects": true,
			  "haveProjects": true,
			  "publish": true,
			  "publishOnPrimary": true,
			  "hasOwnChannel": true,
			  "exportscorm": true,
			  "exporthtml5": true,
			  "exportpdf": true,
			  "importpdf": true,
			  "importpsd": true,
			  "publishfacebook": true,
			  "mailing": true,
			  "versioning": true,
			  "adminPanel": true,
			  "projects": 10,
			  "banners": 10,
			  "diskspace": 1,
			  "lms_users": 10,
			  "mailing_daily": 40,
			  "mailing_users": 10
			}';

		$optionsAll = '{
			  "createProjects": true,
			  "haveProjects": true,
			  "publish": true,
			  "publishOnPrimary": true,
			  "hasOwnChannel": true,
			  "exportscorm": true,
			  "exporthtml5": true,
			  "exportpdf": true,
			  "importpdf": true,
			  "importpsd": true,
			  "publishfacebook": true,
			  "mailing": true,
			  "versioning": true,
			  "adminPanel": true,
			  "projects": 100000,
			  "banners": 100000,
			  "diskspace": 10,
			  "lms_users": 100000,
			  "mailing_daily": 100000,
			  "mailing_users": 100000
			}';


		DB::table('plans_options')->insert(
            [
                ['name' => 'default', 'description' => 'default', 'options' => '{}'],
                ['name' => 'demo', 'description' => 'demo', 'options' => $optionsDemo],
                ['name' => 'standard', 'description' => 'standard', 'options' => $optionsStandard],
                ['name' => 'profesional', 'description' => 'profesional', 'options' => $optionsProfesional],
                ['name' => 'elearning', 'description' => 'elearning', 'options' => $optionsElearning],
                ['name' => 'all', 'description' => 'all', 'options' => $optionsAll],
                ['name' => 'api standard', 'api description' => 'standard', 'options' => $optionsApi],
                ['name' => 'api profesional', 'api description' => 'profesional', 'options' => $optionsApi],
                ['name' => 'api elearning', 'api description' => 'elearning', 'options' => $optionsApi],
            ]
	    );

	    Schema::create('plans_to_plans_options', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('plan_id')->unsigned();
            $table->integer('plan_option_id')->unsigned();

            $table->foreign('plan_id')->references('id')->on('plans')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('plan_option_id')->references('id')->on('plans_options')
                ->onUpdate('cascade')->onDelete('cascade');

        });


        DB::table('plans_to_plans_options')->insert(
            [
                ['plan_id' => 1, 'plan_option_id' => 2 ],
                ['plan_id' => 2, 'plan_option_id' => 2 ],
                ['plan_id' => 3, 'plan_option_id' => 2 ],

                ['plan_id' => 4, 'plan_option_id' => 3 ],
                ['plan_id' => 5, 'plan_option_id' => 4 ],
                ['plan_id' => 6, 'plan_option_id' => 5 ],

                ['plan_id' => 7, 'plan_option_id' => 3 ],
                ['plan_id' => 8, 'plan_option_id' => 4 ],
                ['plan_id' => 9, 'plan_option_id' => 5 ],

                ['plan_id' => 10, 'plan_option_id' => 3 ],
                ['plan_id' => 11, 'plan_option_id' => 4 ],
                ['plan_id' => 12, 'plan_option_id' => 5 ],

                ['plan_id' => 13, 'plan_option_id' => 6 ],

                ['plan_id' => 14, 'plan_option_id' => 6 ],
                ['plan_id' => 15, 'plan_option_id' => 6 ],

                ['plan_id' => 16, 'plan_option_id' => 7 ],
                ['plan_id' => 17, 'plan_option_id' => 8 ],
                ['plan_id' => 18, 'plan_option_id' => 9 ],
            ]
	    );
	   
		Schema::create('currencies', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 10);
		});

		DB::table('currencies')->insert(
            [
                ['name' => 'PLN'],
                ['name' => 'EUR'],
                ['name' => 'USD']
            ]
	    );

	    Schema::create('price_option_types', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 255);
		});

		DB::table('price_option_types')->insert(
            [
                ['name' => 'boolean'],
                ['name' => 'numeric']
            ]
	    );

	    Schema::create('price_plan_options', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('name', 255);
			$table->string('value', 255)->default('');
			$table->integer('price_option_type_id')->unsigned();
			$table->string('description', 255)->default('');
			$table->integer('version_id')->unsigned()->default(1);
			$table->tinyInteger('show')->default(0);

			$table->foreign('version_id')->references('id')->on('plans_versions')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('price_option_type_id')->references('id')->on('price_option_types')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		DB::table('price_plan_options')->insert(
            [

            	['show' => 1, 'name' => 'createProjects', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'haveProjects', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'publish', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'publishOnPrimary', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'hasOwnChannel', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'exportscorm', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'exporthtml5', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'exportpdf', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'importpdf', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'importpsd', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'publishfacebook', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'mailing', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'versioning', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'adminPanel', 'value' => 'true', 'price_option_type_id' => 1],
            	['show' => 1, 'name' => 'projects', 'value' => '100', 'price_option_type_id' => 2],
            	['show' => 1, 'name' => 'banners', 'value' => '100', 'price_option_type_id' => 2],
            	['show' => 0, 'name' => 'diskspace', 'value' => '10000000', 'price_option_type_id' => 2],
            	['show' => 1, 'name' => 'lms_users', 'value' => '1000', 'price_option_type_id' => 2],
            	['show' => 1, 'name' => 'mailing_daily', 'value' => '1000', 'price_option_type_id' => 2],
            	['show' => 1, 'name' => 'mailing_users', 'value' => '1000', 'price_option_type_id' => 2],
            ]
	    );

	    Schema::create('plan_options_costs', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('version_id')->unsigned()->default(1);
			$table->integer('price_plan_option_id')->unsigned();
			$table->integer('currency_id')->unsigned();
			$table->decimal('cost', 10, 2);

			$table->foreign('price_plan_option_id')->references('id')->on('price_plan_options')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->foreign('currency_id')->references('id')->on('currencies')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('version_id')->references('id')->on('plans_versions')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		DB::table('plan_options_costs')->insert(
            [

            	['price_plan_option_id' => 1, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 2, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 3, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 4, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 5, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 6, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 7, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 8, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 9, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 10, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 11, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 12, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 13, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 14, 'currency_id' => 1, 'cost' => 10],
            	['price_plan_option_id' => 15, 'currency_id' => 1, 'cost' => 1],
            	['price_plan_option_id' => 16, 'currency_id' => 1, 'cost' => 1],
            	['price_plan_option_id' => 17, 'currency_id' => 1, 'cost' => 1],
            	['price_plan_option_id' => 18, 'currency_id' => 1, 'cost' => 1],
            	['price_plan_option_id' => 19, 'currency_id' => 1, 'cost' => 1],
            	['price_plan_option_id' => 20, 'currency_id' => 1, 'cost' => 1],
            ]
	    );

		Schema::create('plans_costs', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('version_id')->unsigned()->default(1);
			$table->integer('plan_id')->unsigned();
			$table->integer('currency_id')->unsigned();
			$table->decimal('cost', 10, 2);

			$table->foreign('plan_id')->references('id')->on('plans')
                ->onUpdate('cascade')->onDelete('cascade');

			$table->foreign('currency_id')->references('id')->on('currencies')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('version_id')->references('id')->on('plans_versions')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		DB::table('plans_costs')->insert(
            [

            	['plan_id' => 1, 'currency_id' => 1, 'cost' => 0],
                ['plan_id' => 2, 'currency_id' => 1, 'cost' => 0],
                ['plan_id' => 3, 'currency_id' => 1, 'cost' => 0],

                ['plan_id' => 4, 'currency_id' => 1, 'cost' => 199.00],
                ['plan_id' => 5, 'currency_id' => 1, 'cost' => 329.00],
                ['plan_id' => 6, 'currency_id' => 1, 'cost' => 399.00],

                ['plan_id' => 7, 'currency_id' => 1, 'cost' => 499.00],
                ['plan_id' => 8, 'currency_id' => 1, 'cost' => 729.00],
                ['plan_id' => 9, 'currency_id' => 1, 'cost' => 1099.00],

                ['plan_id' => 10, 'currency_id' => 1, 'cost' => 1299.00],
                ['plan_id' => 11, 'currency_id' => 1, 'cost' => 1329.00],
                ['plan_id' => 12, 'currency_id' => 1, 'cost' => 1399.00]
            ]
	    );

	    Schema::create('plans_to_plans_costs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('plan_id')->unsigned();
            $table->integer('plan_cost_id')->unsigned();

            $table->foreign('plan_id')->references('id')->on('plans')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('plan_cost_id')->references('id')->on('plans_costs')
                ->onUpdate('cascade')->onDelete('cascade');

        });

	   
     //    DB::table('plans_options')->insert(
     //        [
     //            ['name' => 'projects', 'value' => '1'],
     //            ['name' => 'banners', 'value' => '1'],
     //            ['name' => 'diskspace', 'value' => '1'],
     //            ['name' => 'lms_users', 'value' => '1'],
     //            ['name' => 'mailing_daily', 'value' => '1'],
     //            ['name' => 'mailing_users', 'value' => '1'],
     //            ['name' => 'login', 'value' => 'true'],
     //            ['name' => 'register', 'value' => 'true'],
     //            ['name' => 'createProjects', 'value' => 'true'],
     //            ['name' => 'haveProjects', 'value' => 'true'],
     //            ['name' => 'publish', 'value' => 'true'],
     //            ['name' => 'publishOnPrimary', 'value' => 'true'],
     //            ['name' => 'exportscorm', 'value' => 'true'],
     //            ['name' => 'exporthtml5', 'value' => 'true'],
     //            ['name' => 'exportpdf', 'value' => 'true'],
     //            ['name' => 'importpdf', 'value' => 'true'],
     //            ['name' => 'importpsd', 'value' => 'true'],
     //            ['name' => 'publishfacebook', 'value' => 'true'],
     //            ['name' => 'mailing', 'value' => 'true'],
     //            ['name' => 'versioning', 'value' => 'true'],
     //            ['name' => 'adminPanel', 'value' => 'true'],
     //        ]
	    // );

		// Schema::create('plans_details', function(Blueprint $table)
		// {
		// 	$table->increments('id');
		// 	$table->string('name', 255);
		// 	$table->string('description', 255);
		// });

		// DB::table('plans_details')->insert(
  //           [
  //               ['name' => 'Darkan_standard', 'description' => 'Darkan_standard'],
  //               ['name' => 'Darkan_pro', 'description' => 'Darkan_pro'],
  //               ['name' => 'Hercules_plan', 'description' => 'Hercules_plan'],
  //               ['name' => 'Darkan_lmslight', 'description' => 'Darkan_lmslight'],
  //               ['name' => 'Darkan_lmsstandard', 'description' => 'Darkan_lmsstandard'],
  //               ['name' => 'Darkan_lmspro', 'description' => 'Darkan_lmspro'],
  //               ['name' => 'Darkan_lmsultimate', 'description' => 'Darkan_lmsultimate']
  //           ]
	 //    );

		// Schema::create('plan_to_plan_details', function (Blueprint $table) {
  //           $table->increments('id');
  //           $table->integer('plan_id')->unsigned();
  //           $table->integer('plan_details_id')->unsigned();

  //           $table->foreign('plan_id')->references('id')->on('plans')
  //               ->onUpdate('cascade')->onDelete('cascade');
  //           $table->foreign('plan_details_id')->references('id')->on('plans_details')
  //               ->onUpdate('cascade')->onDelete('cascade');

  //       });

        Schema::create('clients_cities', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('city', 255);
		});

		Schema::create('clients_zip_codes', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('zip', 10);
		});

		Schema::create('clients_addresses', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->integer('city_id')->unsigned();
			$table->integer('zip_code_id')->unsigned();
			$table->string('address', 255);
			$table->string('email', 255);

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('city_id')->references('id')->on('clients_cities')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('zip_code_id')->references('id')->on('clients_zip_codes')
                ->onUpdate('cascade')->onDelete('cascade');
		});

        Schema::create('promo_codes', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('code', 255)->unique();
			$table->integer('limit')->default(1);
			$table->integer('rabat')->default(10);
			$table->dateTime('start_date');
			$table->dateTime('expiration_date');
			$table->tinyInteger('active')->default(1);
			$table->tinyInteger('limit_enabled')->default(1);
			$table->tinyInteger('date_enabled')->default(1);
			$table->timestamps();
		});

		DB::table('promo_codes')->insert(
            [
                ['code' => '*', 'rabat' => 0, 'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2016-09-18 11:16:05'],
        	]
        );

		Schema::create('transactions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('merchant_id');
			$table->integer('pos_id');
			$table->string('session_id', 255);
			$table->string('amount', 255);
			$table->string('currency', 3);
			$table->integer('order_id');
			$table->string('statement', 255);
			$table->string('sign', 255);
			$table->timestamps();
		});

        Schema::create('plans_users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->integer('paying_user_id')->unsigned();
			$table->integer('created_by_user_id')->unsigned();
			$table->integer('plan_id')->unsigned();
			$table->integer('promo_code_id')->unsigned();
			$table->integer('currency_id')->unsigned();
			$table->decimal('plan_cost_to_pay', 10, 2);
			$table->decimal('plan_cost_to_pay_with_rabat', 10, 2);
			$table->text('plan_options');
			$table->dateTime('start_date');
			$table->dateTime('expiration_date');
			$table->tinyInteger('active')->default(0);
			$table->tinyInteger('paid')->default(0);
			$table->string('session_id')->nullable();
			$table->integer('client_address_id')->unsigned()->nullable();
			$table->integer('transaction_id')->unsigned()->nullable();
			$table->timestamps();

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('paying_user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('created_by_user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('plan_id')->references('id')->on('plans')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('promo_code_id')->references('id')->on('promo_codes')
                ->onUpdate('cascade')->onDelete('cascade');

           	$table->foreign('currency_id')->references('id')->on('currencies')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('transaction_id')->references('id')->on('transactions')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		DB::table('plans_users')->insert(
            [

            	[
	            	'user_id' => 3, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 13, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsAll,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],
            	[
	            	'user_id' => 4, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 13, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsAll,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],
            	[
	            	'user_id' => 5, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 13, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsAll,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],
            	[
	            	'user_id' => 6, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 19, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsQuest,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],
            	[
	            	'user_id' => 7, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 16, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsAll,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],
            	[
	            	'user_id' => 28, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 12, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsElearning,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],
            	[
	            	'user_id' => 29, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 12, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsElearning,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],
            	[
	            	'user_id' => 30, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 12, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsElearning,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],
            	[
	            	'user_id' => 31, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 12, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsElearning,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],
            	[
	            	'user_id' => 32, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 12, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsElearning,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],
            	[
	            	'user_id' => 33, 'paying_user_id' => 2, 'created_by_user_id' => 2, 'plan_id' => 12, 'promo_code_id' => 1, 
	            	'currency_id' => 1, 'plan_cost_to_pay' => 0, 'plan_cost_to_pay_with_rabat' => 0, 'plan_options' => $optionsElearning,
	            	'start_date' => '2016-09-18 11:16:04', 'expiration_date' => '2035-09-18 11:16:05', 'active' => 1, 'paid' => 1
            	],



            ]
	    );

		

		Schema::create('users_to_promo_codes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('promo_code_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('promo_code_id')->references('id')->on('promo_codes')
                ->onUpdate('cascade')->onDelete('cascade');

        });

        Schema::create('users_to_distributors', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('distributor_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('distributor_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

        });

        Schema::create('users_to_distributors_rabats', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->integer('rabat');
			$table->integer('amount');
			$table->integer('currency_id')->unsigned();
			$table->dateTime('start_date');
			$table->dateTime('expiration_date');
			$table->tinyInteger('active')->default(1);
			$table->timestamps();

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('currency_id')->references('id')->on('currencies')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('users_to_reselers_rabats', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->integer('rabat');
			$table->integer('amount');
			$table->integer('currency_id')->unsigned();
			$table->dateTime('start_date');
			$table->dateTime('expiration_date');
			$table->tinyInteger('active')->default(1);
			$table->timestamps();

			$table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('currency_id')->references('id')->on('currencies')
                ->onUpdate('cascade')->onDelete('cascade');
		});

		Schema::create('price_types', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('name', 255);
			$table->string('description', 255);
			$table->timestamps();
		});

		DB::table('price_types')->insert(
            [
                ['name' => 'Standard', 'description' => 'Standard'],
                ['name' => 'Professional', 'description' => 'Professional'],
                ['name' => 'Elearning', 'description' => 'Elearning'],
                ['name' => 'Enterprise', 'description' => 'Enterprise'],
            ]
	    );

	    Schema::create('price_periods', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('name', 255);
			$table->string('description', 255);
			$table->timestamps();
		});

		DB::table('price_periods')->insert(
            [
                ['name' => '1 month', 'description' => '1 month'],
                ['name' => '6 months', 'description' => '6 months'],
                ['name' => '12 months', 'description' => '12 months'],
            ]
	    );

		Schema::create('plans_to_price_list', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('version_id')->unsigned();
            $table->integer('price_type_id')->unsigned();
            $table->integer('price_period_id')->unsigned();
            $table->integer('plan_id')->unsigned();

            $table->foreign('version_id')->references('id')->on('plans_versions')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('price_type_id')->references('id')->on('price_types')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('price_period_id')->references('id')->on('price_periods')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('plan_id')->references('id')->on('plans')
                ->onUpdate('cascade')->onDelete('cascade');

        });

        DB::table('plans_to_price_list')->insert(
            [
                ['version_id' => 1,  'plan_id' => 4, 'price_period_id' => 1, 'price_type_id' => 1 ],
                ['version_id' => 1,  'plan_id' => 5, 'price_period_id' => 2, 'price_type_id' => 1 ],
                ['version_id' => 1,  'plan_id' => 6, 'price_period_id' => 3, 'price_type_id' => 1 ],

                ['version_id' => 1,  'plan_id' => 7, 'price_period_id' => 1, 'price_type_id' => 2 ],
                ['version_id' => 1,  'plan_id' => 8, 'price_period_id' => 2, 'price_type_id' => 2 ],
                ['version_id' => 1,  'plan_id' => 9, 'price_period_id' => 3, 'price_type_id' => 2 ],

                ['version_id' => 1,  'plan_id' => 10, 'price_period_id' => 1, 'price_type_id' => 3 ],
                ['version_id' => 1,  'plan_id' => 11, 'price_period_id' => 2, 'price_type_id' => 3 ],
                ['version_id' => 1,  'plan_id' => 12, 'price_period_id' => 3, 'price_type_id' => 3 ],

            ]
	    );

	    Schema::create('price_functionality', function(Blueprint $table)
		{
			$table->increments('id', true);
			$table->string('name', 255);
			$table->string('description', 255);
			$table->timestamps();
		});

	    DB::table('price_functionality')->insert(
            [
                ['name' => 'Miejsce na dysku', 'description' => '1 month'],
                ['name' => '6 months', 'description' => '6 months'],
                ['name' => '12 months', 'description' => '12 months'],
            ]
	    );

	    Schema::create('reselers_to_distributors', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('reseler_id')->unsigned();
            $table->integer('distributor_id')->unsigned();

            $table->foreign('reseler_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('distributor_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

        });

        Schema::create('users_to_reselers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('reseler_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('reseler_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');

        });

        Schema::create('promo_codes_to_users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('promo_code_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('promo_code_id')->references('id')->on('promo_codes')
                ->onUpdate('cascade')->onDelete('cascade');

        });

        Schema::create('sales_coupons_groups', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255);
            $table->string('description', 255);
        });

        Schema::create('sales_coupons', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 255)->unique();
            $table->integer('sales_coupon_group_id')->unsigned();
            $table->integer('plan_id')->unsigned();
            $table->string('description', 255);
            $table->decimal('cost', 10, 2);
            $table->tinyInteger('active')->default(1);
            $table->tinyInteger('downloaded')->default(0);
            $table->timestamps();

            $table->foreign('sales_coupon_group_id')->references('id')->on('sales_coupons_groups')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->foreign('plan_id')->references('id')->on('plans')
                ->onUpdate('cascade')->onDelete('cascade');

        });

        Schema::create('plans_users_to_sales_coupons', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('plan_user_id')->unsigned();
            $table->integer('sales_coupon_id')->unsigned();

            $table->foreign('plan_user_id')->references('id')->on('plans_users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('sales_coupon_id')->references('id')->on('sales_coupons')
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
		
		Schema::drop('plans_users_to_sales_coupons');
		Schema::drop('sales_coupons');
		Schema::drop('sales_coupons_groups');
		Schema::drop('promo_codes_to_users');
		Schema::drop('users_to_reselers');
		Schema::drop('reselers_to_distributors');
		Schema::drop('price_functionality');
		Schema::drop('plans_to_price_list');
		Schema::drop('price_periods');
		Schema::drop('price_types');
		Schema::drop('users_to_reselers_rabats');
		Schema::drop('users_to_distributors_rabats');
		Schema::drop('users_to_distributors');
		Schema::drop('users_to_promo_codes');
		Schema::drop('plans_users');
		Schema::drop('transactions');
		Schema::drop('promo_codes');
		Schema::drop('clients_addresses');
		Schema::drop('clients_zip_codes');
		Schema::drop('clients_cities');
		Schema::drop('plans_to_plans_costs');
		Schema::drop('plan_options_costs');
		Schema::drop('plans_costs');
		Schema::drop('price_plan_options');
		Schema::drop('price_option_types');
		Schema::drop('currencies');
		Schema::drop('plans_to_plans_options');
		Schema::drop('plans_options');
		Schema::drop('plans');
		Schema::drop('plans_period_types');
		Schema::drop('forms_of_payment');
		Schema::drop('on_off_states');
		Schema::drop('plans_versions');
	
	}

}
