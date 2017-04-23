<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();

        if (env('cronsEnabled')) {

            $schedule->call('App\Http\Controllers\Cron\CronJob@printDate')
                 ->name('printDate')
                 ->everyFiveMinutes();

            $schedule->call('App\Http\Controllers\TestDrive\TestDriveController@clearTestDriveUser')
                 ->name('clearTestDriveUser')
                 ->hourly();


            $schedule->call('App\Http\Controllers\Cron\CronJob@changeCronLogFileName')
                 ->name('changeCronLogFileName')
                 ->monthly()->at('00:00');
                 
        }
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
