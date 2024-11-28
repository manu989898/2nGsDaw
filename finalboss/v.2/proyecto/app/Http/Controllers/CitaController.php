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
    // Validar los datos recibidos
    $validatedData = $request->validate([
        'id_cliente' => 'required|exists:usuarios,id_usuario',
        'id_vehiculo' => 'required|exists:vehiculos,id_vehiculo',
        'tipo_servicio' => 'required|string|max:255',
        'fecha_hora' => 'required|date_format:Y-m-d H:i:s',
        'estado' => 'required|in:Pendiente,Completada,Cancelada,Asignada',
    ]);

    // Crear la cita en la base de datos
    $cita = Cita::create([
        'id_cliente' => $validatedData['id_cliente'],
        'id_vehiculo' => $validatedData['id_vehiculo'],
        'tipo_servicio' => $validatedData['tipo_servicio'],
        'fecha_hora' => $validatedData['fecha_hora'],
        'estado' => $validatedData['estado'],
    ]);

    // Retornar una respuesta
    return response()->json([
        'success' => true,
        'message' => 'Cita creada exitosamente.',
        'data' => $cita,
    ], 201);
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
        // Validar el ID del mecánico
        $request->validate([
            'id_mecanico' => 'required|exists:mecanicos,id_mecanico',
        ]);

        // Buscar la cita por ID
        $cita = Cita::findOrFail($id);

        // Asignar el mecánico a la cita
        $cita->id_mecanico = $request->id_mecanico;
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