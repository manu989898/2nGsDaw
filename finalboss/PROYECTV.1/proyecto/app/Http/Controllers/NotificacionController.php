<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use Illuminate\Http\Request;

class NotificacionController extends Controller
{
    public function index()
    {
        return Notificacion::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'required|string|max:255', // Actualizar con campos reales
        ]);

        return Notificacion::create($validated);
    }

    public function show(Notificacion $notificacion)
    {
        return $notificacion;
    }

    public function update(Request $request, Notificacion $notificacion)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'sometimes|string|max:255', // Actualizar con campos reales
        ]);

        $notificacion->update($validated);
        return $notificacion;
    }

    public function destroy(Notificacion $notificacion)
    {
        $notificacion->delete();
        return response()->noContent();
    }
}
