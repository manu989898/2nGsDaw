<?php

namespace App\Http\Controllers;

use App\Models\Cita;
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
    public function reparacionesPorMecanico($idMecanico)
    {
        $reparaciones = Reparacion::with(['cita.vehiculo', 'mecanico'])
            ->where('id_mecanico', $idMecanico)
            ->get();
    
        return response()->json($reparaciones);
    }
    public function asignarReparacion(Request $request, $idCita)
{
    $request->validate([
        'id_mecanico' => 'required|exists:mecanicos,id_mecanico',
        'notas' => 'nullable|string',
        'estado' => 'required|string|in:Pendiente,En Proceso,Completada',
    ]);

    // Verifica que la cita existe
    $cita = Cita::findOrFail($idCita);

    // Crea o actualiza la reparación
    $reparacion = Reparacion::updateOrCreate(
        ['id_cita' => $idCita],
        [
            'id_mecanico' => $request->id_mecanico,
            'notas' => $request->notas,
            'estado' => $request->estado,
        ]
    );

    return response()->json([
        'message' => 'Reparación asignada correctamente.',
        'reparacion' => $reparacion,
    ]);
}

}
