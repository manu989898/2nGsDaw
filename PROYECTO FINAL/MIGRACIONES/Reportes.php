<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    public function up()
    {
        Schema::create('reportes', function (Blueprint $table) {
            $table->id('id_reporte');
            $table->string('titulo');
            $table->text('descripcion');
            $table->unsignedBigInteger('id_usuario');
            $table->timestamp('fecha_generacion');
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
