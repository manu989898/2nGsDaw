<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HistorialServicio;
use App\Models\Vehiculo;
use App\Models\Reparacion;
use Faker\Factory as Faker;

class HistorialServiciosSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Obtener los IDs existentes de vehículos y reparaciones
        $vehicleIds = Vehiculo::pluck('id_vehiculo')->toArray();
        $repairIds = Reparacion::pluck('id_reparacion')->toArray();

        // Asegurarse de que hay datos disponibles
        if (empty($vehicleIds) || empty($repairIds)) {
            $this->command->info('No se encontraron vehículos o reparaciones en la base de datos.');
            return;
        }

        for ($i = 0; $i < 100; $i++) {
            HistorialServicio::create([
                'id_vehiculo' => $faker->randomElement($vehicleIds), // ID válido de vehículo
                'fecha' => $faker->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
                'descripcion' => $faker->randomElement(['Cambio Pastillas de Freno', 'Realizado Mantenimiento Anual']),// Descripción genérica
                'id_reparacion' => $faker->randomElement($repairIds), // ID válido de reparación
                'costo_total' => $faker->randomFloat(2, 50, 500),
            ]);
        }
    }
}
