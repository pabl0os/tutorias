<?php
// filepath: database/seeders/UsuarioSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsuarioSeeder extends Seeder
{
    public function run()
    {
        DB::table('Usuario')->insert([
            ['Rol' => 'administrador', 'Nombre' => 'Admin Principal', 'Correo' => 'admin@ejemplo.com', 'Contrasena' => 'AdminPass123'],
            ['Rol' => 'coordinador institucional', 'Nombre' => 'Coordinador Institucional', 'Correo' => 'coord.inst@ejemplo.com', 'Contrasena' => 'CoordInstPass123'],
            ['Rol' => 'coordinador departamental', 'Nombre' => 'Coord Dep 1', 'Correo' => 'coorddep1@ejemplo.com', 'Contrasena' => 'PassDep1'],
            ['Rol' => 'coordinador departamental', 'Nombre' => 'Coord Dep 2', 'Correo' => 'coorddep2@ejemplo.com', 'Contrasena' => 'PassDep2'],
            ['Rol' => 'coordinador departamental', 'Nombre' => 'Coord Dep 3', 'Correo' => 'coorddep3@ejemplo.com', 'Contrasena' => 'PassDep3'],
            ['Rol' => 'coordinador departamental', 'Nombre' => 'Coord Dep 4', 'Correo' => 'coorddep4@ejemplo.com', 'Contrasena' => 'PassDep4'],
            ['Rol' => 'tutor', 'Nombre' => 'Tutor 1', 'Correo' => 'tutor1@ejemplo.com', 'Contrasena' => 'PassTutor1'],
            ['Rol' => 'tutor', 'Nombre' => 'Tutor 2', 'Correo' => 'tutor2@ejemplo.com', 'Contrasena' => 'PassTutor2'],
            ['Rol' => 'tutor', 'Nombre' => 'Tutor 3', 'Correo' => 'tutor3@ejemplo.com', 'Contrasena' => 'PassTutor3'],
            ['Rol' => 'tutor', 'Nombre' => 'Tutor 4', 'Correo' => 'tutor4@ejemplo.com', 'Contrasena' => 'PassTutor4'],
            ['Rol' => 'tutor', 'Nombre' => 'Tutor 5', 'Correo' => 'tutor5@ejemplo.com', 'Contrasena' => 'PassTutor5'],
            ['Rol' => 'tutor', 'Nombre' => 'Tutor 6', 'Correo' => 'tutor6@ejemplo.com', 'Contrasena' => 'PassTutor6'],
            ['Rol' => 'tutor', 'Nombre' => 'Tutor 7', 'Correo' => 'tutor7@ejemplo.com', 'Contrasena' => 'PassTutor7'],
            ['Rol' => 'tutor', 'Nombre' => 'Tutor 8', 'Correo' => 'tutor8@ejemplo.com', 'Contrasena' => 'PassTutor8'],
            ['Rol' => 'tutor', 'Nombre' => 'Tutor 9', 'Correo' => 'tutor9@ejemplo.com', 'Contrasena' => 'PassTutor9'],
            ['Rol' => 'tutor', 'Nombre' => 'Tutor 10', 'Correo' => 'tutor10@ejemplo.com', 'Contrasena' => 'PassTutor10'],
        ]);

        DB::table('UsuarioArea')->insert([
            // Admin y coordinador institucional
            ['Id_usuario' => 1, 'Area_suscripcion' => 'todas'],
            ['Id_usuario' => 2, 'Area_suscripcion' => 'todas'],
            // CoordDep1
            ['Id_usuario' => 3, 'Area_suscripcion' => 'Ingeniería Industrial'],
            ['Id_usuario' => 3, 'Area_suscripcion' => 'Ingeniería Electrónica'],
            // CoordDep2
            ['Id_usuario' => 4, 'Area_suscripcion' => 'Ingeniería en Sistemas Computacionales'],
            ['Id_usuario' => 4, 'Area_suscripcion' => 'Ingeniería Electromecánica'],
            // CoordDep3
            ['Id_usuario' => 5, 'Area_suscripcion' => 'Ingeniería en Tecnologías de la Información y Comunicaciones'],
            ['Id_usuario' => 5, 'Area_suscripcion' => 'Ingeniería Mecatrónica'],
            // CoordDep4
            ['Id_usuario' => 6, 'Area_suscripcion' => 'Ingeniería en Gestión Empresarial'],
            ['Id_usuario' => 6, 'Area_suscripcion' => 'Ingeniería en Logística'],
            // Tutores
            ['Id_usuario' => 7, 'Area_suscripcion' => 'Ingeniería Industrial'],
            ['Id_usuario' => 8, 'Area_suscripcion' => 'Ingeniería en Sistemas Computacionales'],
            ['Id_usuario' => 9, 'Area_suscripcion' => 'Ingeniería en Tecnologías de la Información y Comunicaciones'],
            ['Id_usuario' => 10, 'Area_suscripcion' => 'Ingeniería en Gestión Empresarial'],
            ['Id_usuario' => 11, 'Area_suscripcion' => 'Ingeniería Electrónica'],
            ['Id_usuario' => 12, 'Area_suscripcion' => 'Ingeniería Electromecánica'],
            ['Id_usuario' => 13, 'Area_suscripcion' => 'Ingeniería Mecatrónica'],
            ['Id_usuario' => 14, 'Area_suscripcion' => 'Ingeniería en Logística'],
            ['Id_usuario' => 15, 'Area_suscripcion' => 'Ingeniería Industrial'],
            ['Id_usuario' => 16, 'Area_suscripcion' => 'Ingeniería en Sistemas Computacionales'],
        ]);
    }
}