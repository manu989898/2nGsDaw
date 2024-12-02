<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use App\Models\Factura;
use App\Models\Usuario;
use App\Models\Vehiculo;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuarios',
            'telefono' => 'nullable|string|max:20',
            'rol' => 'required|string|in:cliente,gerente,mecanico', // Roles permitidos
            'contraseña' => 'required|string|min:8', // Contraseña con mínimo 8 caracteres
        ]);

        // Crear el cliente en la base de datos
        $cliente = Usuario::create([
            'nombre' => $validatedData['nombre'],
            'apellido' => $validatedData['apellido'],
            'email' => $validatedData['email'],
            'telefono' => $validatedData['telefono'],
            'rol' => $validatedData['rol'],
            'contraseña' => Hash::make($validatedData['contraseña']), // Encriptar la contraseña
        ]);

        // Retornar una respuesta de éxito
        return response()->json([
            'success' => true,
            'message' => 'Cliente creado exitosamente.',
            'data' => $cliente,
        ], 201);
    }

    // Show a specific usuario
    public function show(Usuario $usuario)
    {
        return $usuario;
    }

    // Update an existing usuario
    public function update(Request $request, $id)
    {
        // Buscar el usuario por ID utilizando la clave primaria correcta
        $usuario = Usuario::findOrFail($id);
    
        // Validar los datos entrantes
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'telefono' => 'nullable|string|max:20',
            'rol' => 'required|string|in:cliente,mecanico,gerente', // Roles permitidos
            'contraseña' => 'nullable|string|min:8', // Contraseña opcional
        ]);
    
        try {
            // Actualizar los campos del usuario
            $usuario->update([
                'nombre' => $request->input('nombre'),
                'apellido' => $request->input('apellido'),
                'email' => $request->input('email'),
                'telefono' => $request->input('telefono'),
                'rol' => $request->input('rol') ?? $usuario->rol, // Conservar el rol actual si no se modifica
                // Si se incluye la contraseña, actualizarla, de lo contrario mantener la actual
                'contraseña' => $request->input('contraseña') 
                    ? bcrypt($request->input('contraseña')) 
                    : $usuario->contraseña,
            ]);
    
            // Responder con el usuario actualizado
            return response()->json([
                'success' => true,
                'message' => 'Usuario actualizado correctamente',
                'data' => $usuario,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el usuario: ' . $e->getMessage(),
            ], 500);
        }
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

    // Obtener los vehículos asociados a un cliente
    public function getVehiculos($id)
    {
        // Buscar vehículos cuyo id_cliente coincida con el ID del usuario
        $vehiculos = Vehiculo::where('id_cliente', $id)->get();

        if ($vehiculos->isEmpty()) {
            return response()->json(['error' => 'No se encontraron vehículos para este cliente'], 404);
        }

        return response()->json(['vehiculos' => $vehiculos]);
    }


    // Obtener las citas de un usuario
    public function getCitas($id)
    {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $citas = $usuario->citas;

        if ($citas->isEmpty()) {
            return response()->json(['error' => 'No se encontraron citas'], 404);
        }

        return response()->json(['citas' => $citas]);
    }
}
