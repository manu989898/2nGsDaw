<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;

class CitaController extends Controller
{
    public function index()
    {
        return Cita::all();
        
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'required|string|max:255', // Actualizar con campos reales
        ]);

        return Cita::create($validated);
    }

    public function show(Cita $cita)
    {
        return $cita;
    }

    public function update(Request $request, Cita $cita)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'sometimes|string|max:255', // Actualizar con campos reales
        ]);

        $cita->update($validated);
        return $cita;
    }

    public function destroy(Cita $cita)
    {
        $cita->delete();
        return response()->noContent();
    }
   
    
}