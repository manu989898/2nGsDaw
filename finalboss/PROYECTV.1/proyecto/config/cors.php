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

    'allowed_methods' => ['*'], // Permitir todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)

    'allowed_origins' => ['http://localhost:3000'], // Cambia esto por el dominio de tu aplicación React

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Permitir todos los encabezados

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false, // Configura en true si usas cookies o autenticación basada en sesiones
];
