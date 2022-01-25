<?php

$router = $this->app['router'];

// Auth
$router->post('/login', 'LoginController@login');
$router->post('/register', 'LoginController@register');

// Users
$router->group(['prefix' => 'users', 'middleware' => ['auth'] ], function () use ($router) {
    $router->get('/', 'UserController@getAll');
    $router->get('/{id:[0-9]+}', 'UserController@get');
    $router->post('/', 'UserController@create');
    $router->put('/', 'UserController@update');
    $router->put('/profile', 'UserController@updateProfile');
    $router->delete('/', 'UserController@delete');
});
