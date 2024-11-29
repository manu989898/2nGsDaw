<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial_servicios');
    }
};
