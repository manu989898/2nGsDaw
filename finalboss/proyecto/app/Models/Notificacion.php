<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'notificaciones';

    // Clave primaria
    protected $primaryKey = 'id_notificacion';

    // Campos que pueden ser llenados masivamente
    protected $fillable = [
        'id_usuario',
        'tipo',
        'mensaje',
        'estado',
        'fecha_envio',
    ];

    /**
     * Relación con el modelo Usuario.
     */
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }
}
