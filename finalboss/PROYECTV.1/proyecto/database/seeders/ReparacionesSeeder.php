<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reparacion;

class ReparacionesSeeder extends Seeder
{
    public function run(): void
    {
        // Crear reparaciones manualmente
        $reparacion1 = new Reparacion();
        $reparacion1->id_cita = 1; // ID de una cita existente
        $reparacion1->progreso = 50;
        $reparacion1->estado = 'En Proceso';
        $reparacion1->notas = 'Esperando piezas para continuar.';
        $reparacion1->fecha_inicio = '2024-11-25 09:00:00';
        $reparacion1->save();

        $reparacion2 = new Reparacion();
        $reparacion2->id_cita = 2; // Otra cita existente
        $reparacion2->progreso = 100;
        $reparacion2->estado = 'Completada';
        $reparacion2->notas = 'Reparación terminada satisfactoriamente.';
        $reparacion2->fecha_inicio = '2024-11-26 10:00:00';
        $reparacion2->fecha_fin = '2024-11-27 15:00:00';
        $reparacion2->save();

        $reparacion3 = new Reparacion();
        $reparacion3->id_cita = 3; // Otra cita existente
        $reparacion3->progreso = 75;
        $reparacion3->estado = 'En Proceso';
        $reparacion3->notas = 'Faltan ajustes finales.';
        $reparacion3->fecha_inicio = '2024-11-28 08:30:00';
        $reparacion3->save();
    }
}
