<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notificacion;

class NotificacionesSeeder extends Seeder
{
    public function run(): void
    {
        // Crear notificaciones manualmente
        $notificacion1 = new Notificacion();
        $notificacion1->id_usuario = 2; // ID de un cliente existente
        $notificacion1->tipo = 'Cliente';
        $notificacion1->mensaje = 'Su cita ha sido programada exitosamente para el 2024-11-30.';
        $notificacion1->estado = 'Enviada';
        $notificacion1->fecha_envio = '2024-11-25 10:00:00';
        $notificacion1->save();

        $notificacion2 = new Notificacion();
        $notificacion2->id_usuario = 3; // ID de un mecánico existente
        $notificacion2->tipo = 'Mecánico';
        $notificacion2->mensaje = 'Tiene una nueva reparación asignada.';
        $notificacion2->estado = 'Pendiente';
        $notificacion2->fecha_envio = '2024-11-25 10:30:00';
        $notificacion2->save();

        $notificacion3 = new Notificacion();
        $notificacion3->id_usuario = 4; // Otro cliente
        $notificacion3->tipo = 'Cliente';
        $notificacion3->mensaje = 'El estado de su reparación ha cambiado a "En Proceso".';
        $notificacion3->estado = 'Enviada';
        $notificacion3->fecha_envio = '2024-11-25 11:00:00';
        $notificacion3->save();
    }
}
