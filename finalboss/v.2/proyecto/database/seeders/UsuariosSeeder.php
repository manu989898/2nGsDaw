<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory;

class UsuariosSeeder extends Seeder
{
    public function run(): void
    {
        // Crear usuarios manualmente
        $user1 = new Usuario();
        $user1->nombre = "admin";
        $user1->apellido = "cuesta";
        $user1->email = "admin@example.com";
        $user1->telefono = "123456789";
        $user1->contraseña = Hash::make("123456789");
        $user1->rol = "Gerente";
        $user1->save();

        $user2 = new Usuario();
        $user2->nombre = "Juan";
        $user2->apellido = "Perez";
        $user2->email = "juan.perez@example.com";
        $user2->telefono = "987654321";
        $user2->contraseña = Hash::make("password123");
        $user2->rol = "Cliente";
        $user2->save();

        $user3 = new Usuario();
        $user3->nombre = "Maria";
        $user3->apellido = "Lopez";
        $user3->email = "maria.lopez@example.com";
        $user3->telefono = "456789123";
        $user3->contraseña = Hash::make("password123");
        $user3->rol = "Mecánico";
        $user3->save();

        $user4 = new Usuario();
        $user4->nombre = "Carlos";
        $user4->apellido = "Gonzalez";
        $user4->email = "xxx@hotmail.com";
        $user4->telefono = "456789123";
        $user4->contraseña = Hash::make("password123");
        $user4->rol = "Mecánico";
        $user4->save();

        Factory::create();
        for ($i = 1; $i <= 50; $i++) {
            $cliente = new Usuario();
            $cliente->nombre = fake()->firstName();
            $cliente->apellido = fake()->lastName();
            $cliente->email = fake()->unique()->safeEmail();
            $cliente->telefono = fake()->phoneNumber();
            $cliente->contraseña = Hash::make("password123"); // Contraseña predeterminada para todos los clientes
            $cliente->rol = "Cliente"; // Rol de cliente
            $cliente->save();
        }
    }
}
