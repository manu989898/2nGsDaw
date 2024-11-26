<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    // List all usuarios
    public function index()
    {
        return Usuario::all();
    }

    // Store a new usuario
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = bcrypt($validated['password']); // Encrypt password

        return Usuario::create($validated);
    }

    // Show a specific usuario
    public function show(Usuario $usuario)
    {
        return $usuario;
    }

    // Update an existing usuario
    public function update(Request $request, Usuario $usuario)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:usuarios,email,' . $usuario->id,
            'password' => 'sometimes|string|min:8',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']); // Encrypt password
        }

        $usuario->update($validated);
        return $usuario;
    }

    // Delete a usuario
    public function destroy(Usuario $usuario)
    {
        $usuario->delete();
        return response()->noContent();
    }
    public function asignarVehiculo(Request $request, $id)
{
    $request->validate([
        'vehiculo_id' => 'required|exists:vehiculos,id',
    ]);

    $usuario = Usuario::find($id);

    if (!$usuario) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    $usuario->vehiculo_id = $request->vehiculo_id;
    $usuario->save();

    return response()->json(['message' => 'Vehículo asignado exitosamente', 'usuario' => $usuario], 200);
}
public function obtenerHistorialServicios($id)
{
    $usuario = Usuario::with('vehiculo.historialServicios')->find($id);

    if (!$usuario) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    if (!$usuario->vehiculo) {
        return response()->json(['message' => 'El usuario no tiene un vehículo asignado'], 404);
    }

    return response()->json(['historial' => $usuario->vehiculo->historialServicios]);
}

public function obtenerFacturas($id)
{
    $facturas = Factura::where('id_cliente', $id)->get();

    if ($facturas->isEmpty()) {
        return response()->json(['message' => 'No se encontraron facturas para este cliente'], 404);
    }

    return response()->json(['facturas' => $facturas]);
}

}
