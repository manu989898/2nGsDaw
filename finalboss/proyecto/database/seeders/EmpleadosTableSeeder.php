<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EmpleadosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('empleados')->insert([
            [
                'email' => 'empleado1@example.com',
                'password' => Hash::make('password123'), // Contraseña encriptada
                'dni' => '12345678A',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'empleado2@example.com',
                'password' => Hash::make('password456'),
                'dni' => '87654321B',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
