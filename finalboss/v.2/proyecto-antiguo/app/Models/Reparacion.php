<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparacion extends Model
{
    use HasFactory;

    protected $table = 'reparaciones'; // Nombre correcto de la tabla

    protected $fillable = [
        'id_cita',
        'id_mecanico',
        'notas',
        'estado',
        'fecha_inicio',
        'fecha_fin',
    ];

    public function cita()
    {
        return $this->belongsTo(Cita::class, 'id_cita');
    }

    public function mecanico()
    {
        return $this->belongsTo(Mecanico::class, 'id_mecanico');
    }

    public function vehiculo()
    {
        return $this->cita->vehiculo();
    }
}
