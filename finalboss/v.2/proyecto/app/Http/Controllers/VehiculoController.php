<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;

class VehiculoController extends Controller
{
    public function index()
    {
        return Vehiculo::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'required|string|max:255', // Actualizar con campos reales
        ]);

        return Vehiculo::create($validated);
    }

    public function show(Vehiculo $vehiculo)
    {
        return $vehiculo;
    }

    public function update(Request $request, Vehiculo $vehiculo)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'sometimes|string|max:255', // Actualizar con campos reales
        ]);

        $vehiculo->update($validated);
        return $vehiculo;
    }

    public function destroy(Vehiculo $vehiculo)
    {
        $vehiculo->delete();
        return response()->noContent();
    }
}