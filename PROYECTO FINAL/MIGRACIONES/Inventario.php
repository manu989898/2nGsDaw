<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    public function up()
    {
        Schema::create('inventario', function (Blueprint $table) {
            $table->id('id_item');
            $table->string('nombre_pieza');
            $table->integer('cantidad_disponible');
            $table->decimal('costo_unitario', 8, 2);
            $table->string('ubicacion');
            $table->unsignedBigInteger('id_reparacion')->nullable();
            $table->timestamps();

            $table->foreign('id_reparacion')->references('id_reparacion')->on('reparaciones');
        });
    }
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}

?>
