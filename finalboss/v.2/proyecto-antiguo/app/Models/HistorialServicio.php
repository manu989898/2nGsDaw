<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialServicio extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'historial_servicios';

    // Clave primaria
    protected $primaryKey = 'id_historial';

    // Campos que pueden ser llenados masivamente
    protected $fillable = [
        'id_vehiculo',
        'fecha',
        'descripcion',
        'id_reparacion',
        'costo_total',
    ];

    /**
     * Relación con el modelo Vehiculo.
     */
    public function vehiculo()
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo', 'id_vehiculo');
    }

    /**
     * Relación con el modelo Reparacion.
     */
    public function reparacion()
    {
        return $this->belongsTo(Reparacion::class, 'id_reparacion', 'id_reparacion');
    }
}
