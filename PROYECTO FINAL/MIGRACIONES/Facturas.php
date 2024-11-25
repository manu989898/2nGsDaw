<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    public function up()
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id('id_factura');
            $table->unsignedBigInteger('id_historial');
            $table->unsignedBigInteger('id_cliente');
            $table->decimal('monto_total', 10, 2);
            $table->date('fecha_emision');
            $table->enum('estado', ['Pendiente', 'Pagada']);
            $table->timestamps();

            $table->foreign('id_historial')->references('id_historial')->on('historial_servicios');
            $table->foreign('id_cliente')->references('id_usuario')->on('usuarios');
        });
    }
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}

?>
