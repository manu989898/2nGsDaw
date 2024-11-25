<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder;
use FacturaInventarioSeeder;
use UsuariosTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        /*
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        User::factory(50)->create();
        $this->call(IslandSeeder::class);
        $this->call(ZoneSeeder::class);
        $this->call(ServiceSeeder::class);
        $this->call(SpaceTypeSeeder::class);
        $this->call(MunicipalitySeeder::class);
        $this->call(ModalitySeeder::class);
        $this->call(SpaceSeeder::class);
        $this->call(CommentSeeder::class);
        Image::factory(50)->create();
        */
        $this->call(UsuariosSeeder::class);
        $this->call(VehiculosSeeder::class);
        $this->call(MecanicosSeeder::class);
        $this->call(CitasSeeder::class);
        $this->call(ReparacionesSeeder::class);
        $this->call(InventariosSeeder::class);
        $this->call(HistorialServiciosSeeder::class);
        $this->call(FacturasSeeder::class);
        $this->call(NotificacionesSeeder::class);
        $this->call(ReportesSeeder::class);
    }
}
