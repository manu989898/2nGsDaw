<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\MecanicoController;
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\Api\ProvaController;
use App\Http\Controllers\InventarioController;

use App\Http\Controllers\ReparacionController;
use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\HistorialServicioController;

/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
*/
Route::middleware('api')->group(function () {
    Route::apiResource('citas', CitaController::class);
    Route::apiResource('facturas', FacturaController::class);
    // Resto de las rutas...
    Route::apiResource('prova', ProvaController::class);

Route::apiResource('inventarios', InventarioController::class);
Route::apiResource('mecanicos', MecanicoController::class);
Route::apiResource('notificaciones', NotificacionController::class);
Route::apiResource('reparaciones', ReparacionController::class);
Route::apiResource('reportes', ReporteController::class);
Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('vehiculos', VehiculoController::class);
Route::apiResource('historial_servicios', HistorialServicioController::class);
});


