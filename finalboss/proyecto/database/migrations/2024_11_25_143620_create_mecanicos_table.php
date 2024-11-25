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
        Schema::create('mecanicos', function (Blueprint $table) {
            $table->unsignedBigInteger('id_mecanico')->primary();
            $table->string('nombre');
            $table->string('especialidad');
            $table->integer('experiencia_años');
            $table->enum('estado', ['Disponible', 'Ocupado']);

            $table->foreign('id_mecanico')->references('id_usuario')->on('usuarios');
        });
    }

    /**
     * Reverse the migrations.s
     */
    public function down(): void
    {
        Schema::dropIfExists('mecanicos');
    }
};
