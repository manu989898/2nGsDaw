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
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->id('id_vehiculo');
            $table->string('placa')->unique();
            $table->string('marca');
            $table->string('modelo');
            $table->year('año');
            $table->string('color');
            $table->unsignedBigInteger('id_cliente');
            $table->timestamps();
            $table->bigInteger('quilometraje')->nullable();

            $table->foreign('id_cliente')->references('id_usuario')->on('usuarios');
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehiculos');
    }
};
