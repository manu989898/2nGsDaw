<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehiculo;
use App\Models\Usuario; // Importa el modelo Usuario para usar IDs válidos
use Faker\Factory as Faker;

class VehiculosSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Obtén una lista de IDs de usuarios existentes con rol "Cliente"
        $clientesIds = Usuario::where('rol', 'cliente')->pluck('id_usuario')->toArray();

        if (empty($clientesIds)) {
            // Si no hay clientes, lanza una excepción para evitar fallos
            throw new \Exception('No hay usuarios con rol Cliente para asignar a Vehículos.');
        }

        for ($i = 0; $i < 50; $i++) {
            Vehiculo::create([
                'placa' => strtoupper($faker->unique()->bothify('#### ???')),
                'marca' => $faker->randomElement(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW']),
                'modelo' => $faker->randomElement(['Corolla', 'Civic', 'Focus', 'Impala', 'X5']),
                'año' => $faker->year(),
                'color' => $faker->safeColorName(),
                'id_cliente' => $faker->randomElement($clientesIds), // Selecciona un cliente existente
                'quilometraje' => $faker->numberBetween(0, 200000),
            ]);
        }
    }
}
