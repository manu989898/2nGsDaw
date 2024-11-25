<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'inventarios';

    // Clave primaria
    protected $primaryKey = 'id_item';

    // Campos que pueden ser llenados masivamente
    protected $fillable = [
        'nombre_pieza',
        'cantidad_disponible',
        'costo_unitario',
        'ubicacion',
        'id_reparacion',
    ];

    /**
     * Relación con el modelo Reparacion.
     */
    public function reparacion()
    {
        return $this->belongsTo(Reparacion::class, 'id_reparacion', 'id_reparacion');
    }
}
