<?php

namespace App\Http\Controllers;

use App\Models\Inventario;
use Illuminate\Http\Request;

class InventarioController extends Controller
{
    public function index()
    {
        return Inventario::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'required|string|max:255', // Actualizar con campos reales
        ]);

        return Inventario::create($validated);
    }

    public function show(Inventario $inventario)
    {
        return $inventario;
    }

    public function update(Request $request, Inventario $inventario)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'sometimes|string|max:255', // Actualizar con campos reales
        ]);

        $inventario->update($validated);
        return $inventario;
    }

    public function destroy(Inventario $inventario)
    {
        $inventario->delete();
        return response()->noContent();
    }
}