<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    public function up()
    {
        Schema::create('historial_servicios', function (Blueprint $table) {
            $table->id('id_historial');
            $table->unsignedBigInteger('id_vehiculo');
            $table->date('fecha');
            $table->text('descripcion');
            $table->unsignedBigInteger('id_reparacion');
            $table->decimal('costo_total', 10, 2);
            $table->timestamps();

            $table->foreign('id_vehiculo')->references('id_vehiculo')->on('vehiculos');
            $table->foreign('id_reparacion')->references('id_reparacion')->on('reparaciones');
        });
    }

    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}

?>
