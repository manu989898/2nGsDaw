<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Inventario;
use Faker\Factory as Faker;

class InventariosSeeder extends Seeder
{
    public function run(): void
    {
        // Crear items de inventario manualmente
        $item1 = new Inventario();
        $item1->nombre_pieza = 'Filtro de Aceite';
        $item1->cantidad_disponible = 20;
        $item1->costo_unitario = 15.50;
        $item1->ubicacion = 'Almacén A1';
        $item1->id_reparacion = null; // No asignado a una reparación específica
        $item1->save();

        $item2 = new Inventario();
        $item2->nombre_pieza = 'Pastillas de Freno';
        $item2->cantidad_disponible = 10;
        $item2->costo_unitario = 30.75;
        $item2->ubicacion = 'Almacén B2';
        $item2->id_reparacion = 2; // Asignado a la reparación con ID 2
        $item2->save();

        $item3 = new Inventario();
        $item3->nombre_pieza = 'Aceite de Motor';
        $item3->cantidad_disponible = 50;
        $item3->costo_unitario = 10.00;
        $item3->ubicacion = 'Almacén C3';
        $item3->id_reparacion = 1; // Asignado a la reparación con ID 1
        $item3->save();

        $item4 = new Inventario();
        $item4->nombre_pieza = 'Batería Automotriz';
        $item4->cantidad_disponible = 5;
        $item4->costo_unitario = 120.00;
        $item4->ubicacion = 'Almacén D4';
        $item4->id_reparacion = null; // No asignado a una reparación específica
        $item4->save();

        // Crear 150 piezas adicionales usando Faker
        $faker = Faker::create();
        for ($i = 0; $i < 150; $i++) {
            $item = new Inventario();
            $item->nombre_pieza = $faker->words(2, true); // Genera un nombre aleatorio para la pieza
            $item->cantidad_disponible = $faker->numberBetween(1, 100); // Cantidad entre 1 y 100
            $item->costo_unitario = $faker->randomFloat(2, 5, 500); // Costo entre 5 y 500 con 2 decimales
            $item->ubicacion = 'Almacén ' . $faker->bothify('?##'); // Ejemplo: "Almacén A23"
            $item->id_reparacion = 1; //ARRGLAR ESTO
            $item->save();
        }
    }
}
