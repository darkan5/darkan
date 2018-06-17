<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'facebook' => [
        'client_id' => env('FB_CLIENT_ID'),
        'client_secret' => env('FB_CLIENT_SECRET'),
        'redirect' => env('FB_REDIRECT_LINK'),
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_LINK'),
    ],

    'linkedin' => [
        'client_id' => env('LINKEDIN_CLIENT_ID'),
        'client_secret' => env('LINKEDIN_CLIENT_SECRET'),
        'redirect' => env('LINKEDIN_REDIRECT_LINK'),
    ],
    'paypal_sandbox' => [
        'client_id' => 'AYdrFRj8di66HE4Y-4arGha2thyQnAzmfFH_yKJvSNUXh0xhPb85gR18a4Thz2ak-zTEKUiuWFdDT98d',
        'secret' => 'EM5iSs6W9XO8FDZyfOhaT3ylW8tzLAgXzKysEag8xYKfOvRwXZG3GYQjGNQFf26WJ3TgNwikKXhLs7kc',
        'mode' => 'sandbox',
        'endpoint' => 'https://api.sandbox.paypal.com',
        'connection_timeout' => 30,
        'log_enabled' => true,
        'log_path' => storage_path('logs/paypal.log'),
        'log_level' => 'DEBUG'
    ],
    'paypal_live' => [
        'client_id' => 'AdZ2jv8Z_HJvnLZe53F9SSlIh7p16CKgbP5PpIDcPwJ9UEwkGQPgO8RNT7RsZ3zooyqTjUQOqkRhLW_n',
        'secret' => 'EIPQiKf72di11li6zH3qW_I3dL8ydV9MzKIYgJWvgRw-jnyxJzzVSoTeWIkZ17uKZ2zFnBCHOBjEcK9-',
        'mode' => 'sandbox',
        'endpoint' => 'https://api.paypal.com',
        'connection_timeout' => 30,
        'log_enabled' => true,
        'log_path' => storage_path('logs/paypal.log'),
        'log_level' => 'DEBUG'
    ],

];
