<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    public function up()
    {
        Schema::create('reparaciones', function (Blueprint $table) {
            $table->id('id_reparacion');
            $table->unsignedBigInteger('id_cita');
            $table->integer('progreso')->default(0);
            $table->enum('estado', ['En Proceso', 'Completada']);
            $table->text('notas')->nullable();
            $table->timestamp('fecha_inicio')->nullable();
            $table->timestamp('fecha_fin')->nullable();
            $table->timestamps();

            $table->foreign('id_cita')->references('id_cita')->on('citas');
        });
    }
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}

?>
