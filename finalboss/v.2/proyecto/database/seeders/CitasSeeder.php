<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cita;
use App\Models\Mecanico; // Importa el modelo Mecanico para usar IDs válidos
use App\Models\Vehiculo; // Importa el modelo Vehiculo para usar IDs válidos
use Faker\Factory as Faker;

class CitasSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Obtén listas de IDs válidos
        $vehiculosIds = Vehiculo::pluck('id_vehiculo')->toArray();
        $mecanicosIds = Mecanico::pluck('id_mecanico')->toArray();

        if (empty($vehiculosIds) || empty($mecanicosIds)) {
            // Si no hay vehículos o mecánicos, lanza una excepción para evitar fallos
            throw new \Exception('No hay vehículos o mecánicos disponibles para asignar a las citas.');
        }

        for ($i = 0; $i < 50; $i++) {
            Cita::create([
                'id_vehiculo' => $faker->randomElement($vehiculosIds), // Selecciona un vehículo existente
                'id_mecanico' => $faker->randomElement($mecanicosIds), // Selecciona un mecánico existente
                'fecha_hora' => $faker->dateTimeBetween('now', '+1 month'),
                'tipo_servicio' => $faker->randomElement(['Cambio de aceite', 'Revisión de frenos', 'Alineación']),
                'estado' => $faker->randomElement(['Pendiente', 'Asignada']),
            ]);
        }
    }
}
