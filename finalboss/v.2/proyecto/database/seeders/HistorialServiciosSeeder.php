<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HistorialServicio;

class HistorialServiciosSeeder extends Seeder
{
    public function run(): void
    {
        // Crear registros en el historial de servicios
        $historial1 = new HistorialServicio();
        $historial1->id_vehiculo = 1; // ID de un vehículo existente
        $historial1->fecha = '2024-11-20';
        $historial1->descripcion = 'Cambio de aceite y filtro. Limpieza general.';
        $historial1->id_reparacion = 1; // ID de una reparación existente
        $historial1->costo_total = 45.50;
        $historial1->save();

        $historial2 = new HistorialServicio();
        $historial2->id_vehiculo = 2; // Otro vehículo
        $historial2->fecha = '2024-11-22';
        $historial2->descripcion = 'Revisión de frenos y alineación.';
        $historial2->id_reparacion = 2; // Otra reparación
        $historial2->costo_total = 120.00;
        $historial2->save();

        $historial3 = new HistorialServicio();
        $historial3->id_vehiculo = 3; // Otro vehículo
        $historial3->fecha = '2024-11-23';
        $historial3->descripcion = 'Cambio de batería.';
        $historial3->id_reparacion = 3; // Otra reparación
        $historial3->costo_total = 150.00;
        $historial3->save();
    }
}
