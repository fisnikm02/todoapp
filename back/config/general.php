<?php

return [
    // Files upload
    'files' => [
        'image' => [
            'allowed_extensions' => [
                'png',
                'jpg',
                'gif',
                'jpeg',
            ],
            // Size in KiloBytes
            'max_size' => '10000'
        ],
        'general' => [
            'allowed_extensions' => [
                'png',
                'jpg',
                'gif',
                'jpeg',
                'xlsx',
                'xlsm',
                'xltx',
                'xltm',
                'doc',
                'docm',
                'docx',
                'docx',
                'doc',
                'dot',
                'txt',
                'pdf',
            ],
            // Size in KiloBytes
            'max_size' => '10000'
        ]
    ],

    // Middlewares
    'middleware' => [
        'xss' => [
            'skip_attributes' => [
                'password',
                'password_confirm',
            ]
        ]
    ],

    'links' => [
        base_path('public/storage') => storage_path('app'),
    ],
];