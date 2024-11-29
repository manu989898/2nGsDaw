<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mecanico;

class MecanicosSeeder extends Seeder
{
    public function run(): void
    {
        // Crear mecánicos manualmente
        $mecanico1 = new Mecanico();
        $mecanico1->id_mecanico = 1; // ID del usuario que es mecánico
        $mecanico1->nombre = "Juan Pérez";
        $mecanico1->especialidad = "Transmisiones";
        $mecanico1->experiencia_años = 5;
        $mecanico1->estado = "Disponible";
        $mecanico1->save();

        $mecanico2 = new Mecanico();
        $mecanico2->id_mecanico = 2; // Otro ID de usuario que es mecánico
        $mecanico2->nombre = "María González";
        $mecanico2->especialidad = "Motores";
        $mecanico2->experiencia_años = 8;
        $mecanico2->estado = "Ocupado";
        $mecanico2->save();

        // Crear mecánicos en masa
        $mecanico3 = new Mecanico();
        $mecanico3->id_mecanico = 3;
        $mecanico3->nombre = "Pedro Ramírez";
        $mecanico3->especialidad = "Frenos";
        $mecanico3->experiencia_años = 3;
        $mecanico3->estado = "Disponible";
        $mecanico3->save();
        
    }
}
