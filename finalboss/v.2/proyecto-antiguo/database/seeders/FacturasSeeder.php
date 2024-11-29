<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Factura;
use App\Models\Usuario; // Modelo de clientes
use App\Models\HistorialServicio; // Modelo de historial de servicios
use Faker\Factory as Faker;

class FacturasSeeder extends Seeder
{
    public function run(): void
    {
        // Crear facturas manualmente (opcional)
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

        // Crear facturas automáticas usando Faker
        $faker = Faker::create();
        $clientes = Usuario::all(); // Obtiene todos los clientes
        $historiales = HistorialServicio::all(); // Obtiene todos los historiales de servicio

        foreach ($clientes as $cliente) {
            // Genera entre 10 y 15 facturas para cada cliente
            $numFacturas = rand(1,3);

            for ($i = 0; $i < $numFacturas; $i++) {
                $historial = $historiales->random(); // Obtiene un historial de servicio aleatorio

                $factura = new Factura();
                $factura->id_historial = $historial->id_historial; // Asocia la factura con un historial
                $factura->id_cliente = $cliente->id_usuario; // ID del cliente actual
                $factura->monto_total = $faker->randomFloat(2, 20, 500); // Genera un monto aleatorio entre 20 y 500
                $factura->fecha_emision = $faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'); // Fecha en el último año
                $factura->estado = $faker->randomElement(['Pagada', 'Pendiente',]); // Estado aleatorio
                $factura->save();
            }
        }
    }
}
