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
        Schema::create('inventarios', function (Blueprint $table) {
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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventarios');
    }
};
