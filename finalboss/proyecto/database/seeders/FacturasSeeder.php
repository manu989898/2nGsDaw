<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Factura;

class FacturasSeeder extends Seeder
{
    public function run(): void
    {
        // Crear facturas manualmente
        $factura1 = new Factura();
        $factura1->id_historial = 1; // ID del historial de servicio existente
        $factura1->id_cliente = 2;  // ID de un cliente existente
        $factura1->monto_total = 45.50;
        $factura1->fecha_emision = '2024-11-21';
        $factura1->estado = 'Pagada';
        $factura1->save();

        $factura2 = new Factura();
        $factura2->id_historial = 2; // Otro historial de servicio
        $factura2->id_cliente = 3;  // Otro cliente
        $factura2->monto_total = 120.00;
        $factura2->fecha_emision = '2024-11-23';
        $factura2->estado = 'Pendiente';
        $factura2->save();

        $factura3 = new Factura();
        $factura3->id_historial = 3; // Otro historial de servicio
        $factura3->id_cliente = 4;  // Otro cliente
        $factura3->monto_total = 150.00;
        $factura3->fecha_emision = '2024-11-25';
        $factura3->estado = 'Pagada';
        $factura3->save();
    }
}
