<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reporte;

class ReportesSeeder extends Seeder
{
    public function run(): void
    {
        // Crear reportes manualmente
        $reporte1 = new Reporte();
        $reporte1->titulo = 'Reporte Mensual de Reparaciones';
        $reporte1->descripcion = 'Informe detallado de todas las reparaciones realizadas durante el mes.';
        $reporte1->id_usuario = 1; // ID de un usuario administrador existente
        $reporte1->fecha_generacion = '2024-11-01 09:00:00';
        $reporte1->save();

        $reporte2 = new Reporte();
        $reporte2->titulo = 'Reporte de Inventario';
        $reporte2->descripcion = 'Listado y estado de piezas en inventario.';
        $reporte2->id_usuario = 1; // Mismo usuario administrador
        $reporte2->fecha_generacion = '2024-11-15 10:30:00';
        $reporte2->save();

        $reporte3 = new Reporte();
        $reporte3->titulo = 'Reporte de Facturación';
        $reporte3->descripcion = 'Resumen de las facturas emitidas y pendientes de pago.';
        $reporte3->id_usuario = 1; // Usuario administrador
        $reporte3->fecha_generacion = '2024-11-20 08:45:00';
        $reporte3->save();
    }
}
