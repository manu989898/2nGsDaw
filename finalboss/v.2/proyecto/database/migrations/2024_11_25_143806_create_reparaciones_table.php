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
        Schema::create('reparaciones', function (Blueprint $table) {
            $table->id('id_reparacion');
            $table->unsignedBigInteger('id_cita');
            $table->unsignedBigInteger('id_mecanico');
            $table->text('notas')->nullable();
            $table->enum('estado', ['En Proceso', 'Completada'])->default('En Proceso');
            $table->dateTime('fecha_inicio')->nullable();
            $table->dateTime('fecha_fin')->nullable();
            $table->timestamps();
            $table->integer('progreso')->default(0);
            $table->foreign('id_cita')->references('id_cita')->on('citas');
            $table->foreign('id_mecanico')->references('id_mecanico')->on('mecanicos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reparaciones');
    }
};
