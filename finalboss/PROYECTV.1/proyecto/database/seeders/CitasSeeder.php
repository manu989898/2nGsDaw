<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cita;

class CitasSeeder extends Seeder
{
    public function run(): void
    {
        // Crear citas manualmente
        $cita1 = new Cita();
        $cita1->id_vehiculo = 1; // ID de un vehículo existente
        $cita1->id_mecanico = 3; // ID de un mecánico existente
        $cita1->fecha_hora = '2024-11-30 10:00:00';
        $cita1->tipo_servicio = 'Cambio de aceite';
        $cita1->estado = 'Pendiente';
        $cita1->save();

        $cita2 = new Cita();
        $cita2->id_vehiculo = 2; // Otro vehículo
        $cita2->id_mecanico = 4; // Otro mecánico
        $cita2->fecha_hora = '2024-12-01 15:00:00';
        $cita2->tipo_servicio = 'Revisión de frenos';
        $cita2->estado = 'Pendiente';
        $cita2->save();

        $cita3 = new Cita();
        $cita3->id_vehiculo = 3; // Otro vehículo
        $cita3->id_mecanico = 3; // Mismo mecánico
        $cita3->fecha_hora = '2024-12-05 09:00:00';
        $cita3->tipo_servicio = 'Alineación y balanceo';
        $cita3->estado = 'Pendiente';
        $cita3->save();
    }
}
