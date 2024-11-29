<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'reportes';

    // Clave primaria
    protected $primaryKey = 'id_reporte';

    // Campos que pueden ser llenados masivamente
    protected $fillable = [
        'titulo',
        'descripcion',
        'id_usuario',
        'fecha_generacion',
    ];

    /**
     * Relación con el modelo Usuario.
     */
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }
}
