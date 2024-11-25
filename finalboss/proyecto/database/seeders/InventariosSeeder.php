<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Inventario;

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
    }
}
