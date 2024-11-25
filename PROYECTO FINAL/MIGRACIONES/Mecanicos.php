<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    public function up()
    {
        Schema::create('mecanicos', function (Blueprint $table) {
            $table->unsignedBigInteger('id_mecanico')->primary();
            $table->string('especialidad');
            $table->integer('experiencia_años');
            $table->enum('estado', ['Disponible', 'Ocupado']);

            $table->foreign('id_mecanico')->references('id_usuario')->on('usuarios');
        });
    }
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}

?>
