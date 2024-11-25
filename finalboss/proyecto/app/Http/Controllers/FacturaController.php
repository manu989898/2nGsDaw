<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Illuminate\Http\Request;

class FacturaController extends Controller
{
    public function index()
    {
        return Factura::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'required|string|max:255', // Actualizar con campos reales
        ]);

        return Factura::create($validated);
    }

    public function show(Factura $factura)
    {
        return $factura;
    }

    public function update(Request $request, Factura $factura)
    {
        $validated = $request->validate([
            'campo_ejemplo' => 'sometimes|string|max:255', // Actualizar con campos reales
        ]);

        $factura->update($validated);
        return $factura;
    }

    public function destroy(Factura $factura)
    {
        $factura->delete();
        return response()->noContent();
    }
}