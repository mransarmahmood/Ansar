<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_values(array_filter([
        'http://localhost',
        'http://localhost:5173',
        'http://localhost:8787',
        'http://127.0.0.1:5173',
        env('FRONTEND_URL'),                 // e.g. https://ansarmahmood.org
        env('FRONTEND_URL') ? rtrim(env('FRONTEND_URL'), '/') . '/' : null,
    ])),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
