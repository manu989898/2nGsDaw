<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'facturas';

    // Clave primaria
    protected $primaryKey = 'id_factura';

    // Campos que pueden ser llenados masivamente
    protected $fillable = [
        'id_historial',
        'id_cliente',
        'monto_total',
        'fecha_emision',
        'estado',
    ];

    /**
     * Relación con el modelo HistorialServicio.
     */
    public function historial()
    {
        return $this->belongsTo(HistorialServicio::class, 'id_historial', 'id_historial');
    }
    public function inventarios()
{
    return $this->belongsToMany(Inventario::class, 'factura_inventario', 'id_factura', 'id_item')
                ->withPivot('cantidad')
                ->withTimestamps();
}
    /**
     * Relación con el modelo Usuario (cliente).
     */
    public function cliente()
    {
        return $this->belongsTo(Usuario::class, 'id_cliente', 'id_usuario');
    }
    
}
