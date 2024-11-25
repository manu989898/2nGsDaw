<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehiculo;

class VehiculosSeeder extends Seeder
{
    public function run(): void
    {
        // Crear vehículos manualmente
        $vehiculo1 = new Vehiculo();
        $vehiculo1->placa = "ABC123";
        $vehiculo1->marca = "Toyota";
        $vehiculo1->modelo = "Corolla";
        $vehiculo1->año = 2020;
        $vehiculo1->color = "Blanco";
        $vehiculo1->id_cliente = 2; // ID de un usuario con rol "Cliente"
        $vehiculo1->save();

        $vehiculo2 = new Vehiculo();
        $vehiculo2->placa = "DEF456";
        $vehiculo2->marca = "Honda";
        $vehiculo2->modelo = "Civic";
        $vehiculo2->año = 2018;
        $vehiculo2->color = "Negro";
        $vehiculo2->id_cliente = 3; // Otro cliente
        $vehiculo2->save();

        $vehiculo3 = new Vehiculo();
        $vehiculo3->placa = "GHI789";
        $vehiculo3->marca = "Ford";
        $vehiculo3->modelo = "Focus";
        $vehiculo3->año = 2021;
        $vehiculo3->color = "Rojo";
        $vehiculo3->id_cliente = 2; // Mismo cliente del primer vehículo
        $vehiculo3->save();
    }
}
