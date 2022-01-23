<?php

namespace Modules\Tasks\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class TaskServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Route::group([
            'prefix' => 'api',
            'namespace' => 'Modules\Tasks\Controllers'
        ], function () {
            $this->loadRoutesFrom(__DIR__. '/../routes.php');
        });
    }
}
