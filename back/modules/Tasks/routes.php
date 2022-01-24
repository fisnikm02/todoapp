<?php
$router = $this->app['router'];

// Tasks
$router->group(['prefix' => 'tasks', 'middleware' => ['auth'] ], function () use ($router) {
    $router->get('/', 'TaskController@getAll');
    $router->get('/{id:[0-9]+}', 'TaskController@get');
    $router->get('/user/{user_id:[0-9]+}', 'TaskController@getByUserId');
    $router->post('/', 'TaskController@create');
    $router->put('/', 'TaskController@update');
    $router->delete('/', 'TaskController@delete');
});
