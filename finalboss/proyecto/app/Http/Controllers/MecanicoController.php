<?php

namespace App\Http\Controllers;

use App\Models\Mecanico;
use Illuminate\Http\Request;

class MecanicoController extends Controller
{
    public function index()
    {
        return Mecanico::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'required|string|max:255', // Actualizar con campos reales
        ]);

        return Mecanico::create($validated);
    }

    public function show(Mecanico $mecanico)
    {
        return $mecanico;
    }

    public function update(Request $request, Mecanico $mecanico)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'sometimes|string|max:255', // Actualizar con campos reales
        ]);

        $mecanico->update($validated);
        return $mecanico;
    }

    public function destroy(Mecanico $mecanico)
    {
        $mecanico->delete();
        return response()->noContent();
    }
}