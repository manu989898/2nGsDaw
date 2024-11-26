<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mecanico extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'mecanicos';

    // Clave primaria
    protected $primaryKey = 'id_mecanico';

    // Deshabilitar timestamps porque no están definidos en la migración
    public $timestamps = false;

    // Campos que pueden ser llenados masivamente
    protected $fillable = [
        'id_mecanico',
        'especialidad',
        'experiencia_años',
        'estado',
    ];

    /**
     * Relación con el modelo Usuario.
     */
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_mecanico', 'id_usuario');
    }
}
