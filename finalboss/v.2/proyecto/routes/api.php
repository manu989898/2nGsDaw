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
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\InventarioController;

use App\Http\Controllers\ReparacionController;
use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\HistorialServicioController;
use Database\Seeders\EmpleadosTableSeeder;

/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
*/

    Route::middleware('api')->group(function () {
    Route::apiResource('citas', CitaController::class);    
    Route::apiResource('facturas', FacturaController::class);
    Route::apiResource('empleados', EmpleadoController::class);  
    Route::apiResource('prova', ProvaController::class);
    Route::apiResource('inventarios', InventarioController::class);
    Route::apiResource('mecanicos', MecanicoController::class);
    Route::apiResource('notificaciones', NotificacionController::class);
    Route::apiResource('reparaciones', ReparacionController::class);
    Route::apiResource('reportes', ReporteController::class);
    Route::apiResource('usuarios', UsuarioController::class);
    Route::apiResource('vehiculos', VehiculoController::class);
    Route::apiResource('historial_servicios', HistorialServicioController::class);
    Route::get('/usuarios/{id}/historial-servicios', [UsuarioController::class, 'obtenerHistorialServicios']);
    Route::get('/usuarios/{id}/facturas', [UsuarioController::class, 'obtenerFacturas']);
    Route::get('/usuarios/{id}/vehiculos', [UsuarioController::class, 'getVehiculos']);
    Route::get('/usuarios/{id}/citas', [UsuarioController::class, 'getCitas']);
    Route::get('/mecanicos/{id}/reparaciones', [ReparacionController::class, 'reparacionesPorMecanico']);
    Route::get('/mecanicos/{id}/citas', [CitaController::class, 'citasPorMecanico']);
    Route::put('/citas/{id}/asignar-mecanico', [CitaController::class, 'asignarMecanico']);
    Route::put('/citas/{id}/asignar-reparacion', [ReparacionController::class, 'asignarReparacion']);
    Route::post('/citas', [CitaController::class, 'store']);
    Route::post('/usuarios', [UsuarioController::class, 'store']);
    Route::post('/vehiculos', [VehiculoController::class, 'store']);
    Route::put('/vehiculos/{id}', [VehiculoController::class, 'update']);
    Route::put('/usuarios/{id}', [UsuarioController::class, 'update']); // Actualizar un usuario

});
