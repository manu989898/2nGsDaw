<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;

class CitaController extends Controller
{
    public function index()
{
    $citas = Cita::with(['vehiculo.cliente', 'mecanico', 'reparacion'])->get();
    return response()->json($citas);
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
   
    public function citasPorMecanico($idMecanico)
{
    $citas = Cita::with(['vehiculo.cliente', 'reparacion'])
        ->where('id_mecanico', $idMecanico)
        ->get();

    return response()->json($citas);
}
public function asignarMecanico(Request $request, $id)
{
    try {
        // Validar que se envía el ID del mecánico
        $request->validate([
            'id_mecanico' => 'required|exists:mecanicos,id_mecanico',
        ]);

        // Buscar la cita por ID
        $cita = Cita::findOrFail($id);

        // Asignar el mecánico y cambiar el estado de la cita
        $cita->id_mecanico = $request->id_mecanico;
        $cita->estado = 'Asignado';
        $cita->save();

        // Retornar la respuesta con éxito
        return response()->json([
            'message' => 'Mecánico asignado correctamente.',
            'cita' => $cita,
        ], 200);
    } catch (\Exception $e) {
        // Capturar cualquier error y retornar una respuesta adecuada
        return response()->json([
            'message' => 'Error al asignar el mecánico.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


}