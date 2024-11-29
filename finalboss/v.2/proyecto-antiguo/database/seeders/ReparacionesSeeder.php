<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reparacion;
use App\Models\Cita; // Importa el modelo Cita para usar IDs válidos
use App\Models\Mecanico; // Importa el modelo Mecanico para usar IDs válidos
use Faker\Factory as Faker;

class ReparacionesSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Obtén listas de IDs válidos
        $citasIds = Cita::pluck('id_cita')->toArray();
        $mecanicosIds = Mecanico::pluck('id_mecanico')->toArray();

        if (empty($citasIds) || empty($mecanicosIds)) {
            // Si no hay citas o mecánicos, lanza una excepción para evitar fallos
            throw new \Exception('No hay citas o mecánicos disponibles para asignar a las reparaciones.');
        }

        for ($i = 0; $i < 50; $i++) {
            Reparacion::create([
                'id_cita' => $faker->randomElement($citasIds), // Selecciona una cita existente
                'id_mecanico' => $faker->randomElement($mecanicosIds), // Selecciona un mecánico existente
                'notas' => $faker->sentence(),
                'estado' => $faker->randomElement(['En Proceso', 'Completada']),
                'fecha_inicio' => $faker->dateTimeBetween('-1 month', 'now'),
                'fecha_fin' => $faker->optional()->dateTimeBetween('now', '+1 month'),
                'progreso' => $faker->numberBetween(0, 100),
            ]);
        }
    }
}
