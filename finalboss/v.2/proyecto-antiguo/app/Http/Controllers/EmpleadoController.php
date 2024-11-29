<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmpleadoController extends Controller
{
    /**
     * Mostrar todos los empleados.
     */
    public function index()
    {
        return Empleado::all();
    }

    /**
     * Crear un nuevo empleado.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:empleados,email',
            'password' => 'required|min:8',
            'dni' => 'required|unique:empleados,dni',
        ]);

        $empleado = Empleado::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'dni' => $request->dni,
        ]);

        return response()->json($empleado, 201);
    }

    /**
     * Mostrar un empleado específico.
     */
    public function show($id)
    {
        $empleado = Empleado::find($id);

        if (!$empleado) {
            return response()->json(['message' => 'Empleado no encontrado'], 404);
        }

        return $empleado;
    }

    /**
     * Actualizar un empleado existente.
     */
    public function update(Request $request, $id)
    {
        $empleado = Empleado::find($id);

        if (!$empleado) {
            return response()->json(['message' => 'Empleado no encontrado'], 404);
        }

        $request->validate([
            'email' => 'email|unique:empleados,email,' . $id,
            'dni' => 'unique:empleados,dni,' . $id,
        ]);

        $empleado->update($request->only(['email', 'dni']));

        if ($request->password) {
            $empleado->password = Hash::make($request->password);
            $empleado->save();
        }

        return response()->json($empleado);
    }

    /**
     * Eliminar un empleado.
     */
    public function destroy($id)
    {
        $empleado = Empleado::find($id);

        if (!$empleado) {
            return response()->json(['message' => 'Empleado no encontrado'], 404);
        }

        $empleado->delete();

        return response()->json(['message' => 'Empleado eliminado']);
    }
}
