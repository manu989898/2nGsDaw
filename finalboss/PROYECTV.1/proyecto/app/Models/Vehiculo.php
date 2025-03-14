<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculo extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'vehiculos';

    // Clave primaria
    protected $primaryKey = 'id_vehiculo';

    // Campos que pueden ser llenados masivamente
    protected $fillable = [
        'placa',
        'marca',
        'modelo',
        'año',
        'color',
        'id_cliente',
    ];

    /**
     * Relación con el modelo Usuario (cliente).
     */
    public function cliente()
{
    return $this->hasOne(Usuario::class, 'vehiculo_id');
}

public function historialServicios()
{
    return $this->hasMany(HistorialServicio::class, 'id_vehiculo');
}

}
