<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'citas';

    // Clave primaria
    protected $primaryKey = 'id_cita';

    // Campos que pueden ser llenados masivamente
    protected $fillable = [
        'id_vehiculo',
        'id_mecanico',
        'fecha_hora',
        'tipo_servicio',
        'estado',
    ];

    /**
     * Relación con el modelo Vehiculo.
     */
    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo');
    }

    public function mecanico()
    {
        return $this->belongsTo(Mecanico::class, 'id_mecanico');
    }

    public function reparacion()
    {
        return $this->hasOne(Reparacion::class, 'id_cita');
    }
    
}
