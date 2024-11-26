<?php

namespace App\Http\Controllers;

use App\Models\Reparacion;
use Illuminate\Http\Request;

class ReparacionController extends Controller
{
    public function index()
    {
        return Reparacion::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'required|string|max:255', // Actualizar con campos reales
        ]);

        return Reparacion::create($validated);
    }

    public function show(Reparacion $reparacion)
    {
        return $reparacion;
    }

    public function update(Request $request, Reparacion $reparacion)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'sometimes|string|max:255', // Actualizar con campos reales
        ]);

        $reparacion->update($validated);
        return $reparacion;
    }

    public function destroy(Reparacion $reparacion)
    {
        $reparacion->delete();
        return response()->noContent();
    }
}
