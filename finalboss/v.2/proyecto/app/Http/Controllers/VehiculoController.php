<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;
use App\Models\HistorialServicio;

class VehiculoController extends Controller
{
    public function index()
    {
        return Vehiculo::all();
    }

    public function store(Request $request)
    {
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'id_cliente' => 'required|exists:usuarios,id_usuario', // Relación con el cliente
            'placa' => 'required|string|max:20|unique:vehiculos',
            'marca' => 'required|string|max:255',
            'modelo' => 'required|string|max:255',
            'año' => 'required|integer|min:1900|max:' . date('Y'),
            'color' => 'required|string|max:50', // Validación del color
        ]);

        // Crear el vehículo en la base de datos
        $vehiculo = Vehiculo::create([
            'id_cliente' => $validatedData['id_cliente'],
            'placa' => $validatedData['placa'],
            'marca' => $validatedData['marca'],
            'modelo' => $validatedData['modelo'],
            'año' => $validatedData['año'],
            'color' => $validatedData['color'],
        ]);

        // Retornar una respuesta de éxito
        return response()->json([
            'success' => true,
            'message' => 'Vehículo creado exitosamente.',
            'data' => $vehiculo,
        ], 201);
    }

    public function show(Vehiculo $vehiculo)
    {
        return $vehiculo;
    }

    public function update(Request $request, Vehiculo $vehiculo)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'sometimes|string|max:255', // Actualizar con campos reales
        ]);

        $vehiculo->update($validated);
        return $vehiculo;
    }

    public function destroy(Vehiculo $vehiculo)
    {
        $vehiculo->delete();
        return response()->noContent();
    }
  

    public function getHistorialPorCliente($idUsuario)
{
    // Obtener vehículos del cliente
    $vehiculos = Vehiculo::where('id_usuario', $idUsuario)->pluck('id');

    if ($vehiculos->isEmpty()) {
        return response()->json(['historial' => []], 200);
    }

    // Obtener historiales asociados a los vehículos del cliente
    $historial = HistorialServicio::whereIn('id_vehiculo', $vehiculos)->get();

    return response()->json(['historial' => $historial], 200);
}

    
}