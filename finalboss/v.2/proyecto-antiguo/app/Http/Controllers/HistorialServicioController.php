<?php

namespace App\Http\Controllers;

use App\Models\HistorialServicio;
use Illuminate\Http\Request;

class HistorialServicioController extends Controller
{
    public function index()
    {
        return HistorialServicio::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'required|string|max:255', // Actualizar con campos reales
        ]);

        return HistorialServicio::create($validated);
    }

    public function show(HistorialServicio $historialservicio)
    {
        return $historialservicio;
    }

    public function update(Request $request, HistorialServicio $historialservicio)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'sometimes|string|max:255', // Actualizar con campos reales
        ]);

        $historialservicio->update($validated);
        return $historialservicio;
    }

    public function destroy(HistorialServicio $historialservicio)
    {
        $historialservicio->delete();
        return response()->noContent();
    }
}