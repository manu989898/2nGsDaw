<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = ['nombre', 'apellido', 'email', 'telefono', 'rol', 'contraseña'];

    public function vehiculo()
{
    return $this->belongsTo(Vehiculo::class, 'vehiculo_id');
}

}
