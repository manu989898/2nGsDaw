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
        Schema::create('citas', function (Blueprint $table) {
            $table->id('id_cita');
            $table->unsignedBigInteger('id_vehiculo');
            $table->unsignedBigInteger('id_mecanico');
            $table->dateTime('fecha_hora');
            $table->string('tipo_servicio');
            $table->enum('estado', ['Pendiente', 'Completada', 'Cancelada']);
            $table->timestamps();

            $table->foreign('id_vehiculo')->references('id_vehiculo')->on('vehiculos');
            $table->foreign('id_mecanico')->references('id_mecanico')->on('mecanicos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citas');
    }
};
