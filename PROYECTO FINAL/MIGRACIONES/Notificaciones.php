<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    public function up()
    {
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->id('id_notificacion');
            $table->unsignedBigInteger('id_usuario');
            $table->enum('tipo', ['Cliente', 'Mecánico']);
            $table->text('mensaje');
            $table->enum('estado', ['Enviada', 'Pendiente']);
            $table->timestamp('fecha_envio');
            $table->timestamps();

            $table->foreign('id_usuario')->references('id_usuario')->on('usuarios');
        });
    }
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}

?>
