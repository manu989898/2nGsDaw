<?php

namespace App\Http\Controllers;

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
}
