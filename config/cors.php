<?php

return [

    /*
|--------------------------------------------------------------------------
| Cross-Origin Resource Sharing (CORS) Configuration
|--------------------------------------------------------------------------
|
| Here you may configure your settings for cross-origin resource sharing
| or "CORS". This determines what cross-origin operations may execute
| in web browsers. You are free to adjust these settings as needed.
|
| To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
|
*/

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // Allows all methods or specify as needed

    'allowed_origins' => ['https://chat.loiri.com.ua'], // Add your origin here

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Allows all headers or specify as needed

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
