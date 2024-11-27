<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
->withRouting(
    using: function () {
        Route::middleware('api')
           ->prefix('api')
           ->group(base_path('routes/api.php'));
        Route::middleware('web')
           ->group(base_path('routes/web.php'));
        },

)
->withMiddleware(function (Middleware $middleware) {
    $middleware->api("throttle:api");
})

    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
