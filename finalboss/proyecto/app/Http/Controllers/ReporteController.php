<?php

namespace App\Http\Controllers;

use App\Models\Reporte;
use Illuminate\Http\Request;

class ReporteController extends Controller
{
    public function index()
    {
        return Reporte::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'required|string|max:255', // Actualizar con campos reales
        ]);

        return Reporte::create($validated);
    }

    public function show(Reporte $reporte)
    {
        return $reporte;
    }

    public function update(Request $request, Reporte $reporte)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'sometimes|string|max:255', // Actualizar con campos reales
        ]);

        $reporte->update($validated);
        return $reporte;
    }

    public function destroy(Reporte $reporte)
    {
        $reporte->delete();
        return response()->noContent();
    }
}