<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparacion extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'reparaciones';

    // Clave primaria
    protected $primaryKey = 'id_reparacion';

    // Campos que pueden ser llenados masivamente
    protected $fillable = [
        'id_cita',
        'progreso',
        'estado',
        'notas',
        'fecha_inicio',
        'fecha_fin',
    ];

    /**
     * Relación con el modelo Cita.
     */
    public function cita()
    {
        return $this->belongsTo(Cita::class, 'id_cita', 'id_cita');
    }
}
