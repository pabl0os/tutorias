<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index'); // index.blade.php
});

Route::get('/perfil', function () {
    return view('view.perfil');
});

Route::get('/tutor', function () {
    return view('view.tutor');
});
Route::get('/departamental', function () {
    return view('view.departamental');
});

Route::get('/institucional', function () {
    return view('view.institucional');
});
Route::get('/usuarios', function () {
    return view('view.usuarios');
});

Route::get('/usuarios-ver', function () {
    return view('view.usuarios-ver');
});


Route::get('/Formato-reporte-semestral-Coordinador-departamental', function () {
    return view('formatos.depar.Formato-reporte-semestral-Coordinador-departamental');
});
Route::get('/NIVEL-DE-DESEMPENO-TUTORADOS', function () {
    return view('formatos.desempeno.NIVEL-DE-DESEMPENO-TUTORADOS');
});
Route::get('/REPORTE-DEL-TUTOR', function () {
    return view('formatos.tuto.REPORTE-DEL-TUTOR');
});








// Ruta para mostrar el formulario de login

Route::post('/login', function (Request $request) {
    // Validar campos
    $request->validate([
        'correo' => 'required|email',
        'contrasena' => 'required'
    ]);

    // Buscar usuario por correo
    $usuario = DB::table('Usuario')->where('Correo', $request->correo)->first();

    // Validar contraseña (aquí compara texto plano, para producción usa hash)
    if ($usuario && $request->contrasena === $usuario->Contrasena) {
        // Consultar áreas de suscripción del usuario
        $areas = DB::table('UsuarioArea')
            ->where('Id_usuario', $usuario->Id_usuario)
            ->pluck('Area_suscripcion')
            ->toArray();

        // Convertir el usuario a array y agregarle las áreas
        $usuarioArray = (array) $usuario;
        $usuarioArray['areas'] = $areas;

        // Guardar en sesión
        session(['usuario' => (object) $usuarioArray]);

        // Redirigir a index2.blade.php (crea una ruta para esto)
        return redirect('/inicio');
    } else {
        // Volver al login con error
        return back()->withErrors(['correo' => 'Credenciales incorrectas'])->withInput();
    }
});

// Ruta para mostrar index2.blade.php
Route::get('/inicio', function () {
    // Puedes proteger esta ruta si quieres que solo usuarios logueados accedan
    if (!session('usuario')) {
        return redirect('/');
    }
    return view('index2');
});

// Ruta para cerrar sesión
Route::get('/logout', function () {
    session()->flush(); // Borra todos los datos de la sesión
    return redirect('/'); // Redirige al login
});

Route::get('/usuarios', function () {
    $usuario = session('usuario');
    if (!$usuario) {
        return redirect('/');
    }

    $usuarios = [];

    if ($usuario->Rol === 'administrador') {
        // Todos los usuarios con su primer área de adscripción
        $usuarios = DB::table('Usuario')
            ->leftJoin('UsuarioArea', 'Usuario.Id_usuario', '=', 'UsuarioArea.Id_usuario')
            ->select('Usuario.Id_usuario', 'Usuario.Nombre', 'Usuario.Correo', 'Usuario.Rol', 'UsuarioArea.Area_suscripcion')
            ->get();
    } elseif ($usuario->Rol === 'coordinador institucional') {
        // Solo coordinadores departamentales con su primer área de adscripción
        $usuarios = DB::table('Usuario')
            ->leftJoin('UsuarioArea', 'Usuario.Id_usuario', '=', 'UsuarioArea.Id_usuario')
            ->where('Usuario.Rol', 'coordinador departamental')
            ->select('Usuario.Id_usuario', 'Usuario.Nombre', 'Usuario.Correo', 'Usuario.Rol', 'UsuarioArea.Area_suscripcion')
            ->get();
    } elseif ($usuario->Rol === 'coordinador departamental') {
        // Tutores de las mismas áreas
        $areas = $usuario->areas ?? [];
        $usuarios = DB::table('Usuario')
            ->join('UsuarioArea', 'Usuario.Id_usuario', '=', 'UsuarioArea.Id_usuario')
            ->where('Usuario.Rol', 'tutor')
            ->whereIn('UsuarioArea.Area_suscripcion', $areas)
            ->select('Usuario.Id_usuario', 'Usuario.Nombre', 'Usuario.Correo', 'Usuario.Rol', 'UsuarioArea.Area_suscripcion')
            ->get();
    }

    // Agrupa las áreas por usuario (para que cada usuario tenga solo una carrera principal)
    $usuariosAgrupados = [];
    foreach ($usuarios as $u) {
        $key = $u->Correo; // Usamos el correo como identificador único
        if (!isset($usuariosAgrupados[$key])) {
            $usuariosAgrupados[$key] = [
                'id' => $u->Id_usuario,
                'nombre' => $u->Nombre,
                'correo' => $u->Correo,
                'rol'    => $u->Rol,
                'carrera' => $u->Area_suscripcion ?? '',
            ];
        }
    }

    // Convierte a array simple para JS
    $usuariosArray = array_values($usuariosAgrupados);

    return view('view.usuarios', [
        'usuariosJson' => json_encode($usuariosArray),
    ]);
});
Route::post('/usuarios/agregar', function (Request $request) {
    try {
        $request->validate([
            'nombre' => 'required|string',
            'correo' => 'required|email|unique:Usuario,Correo',
            'rol' => 'required|string|in:administrador,coordinador institucional,coordinador departamental,tutor',
            'contrasena' => 'required|string',
            'carreras' => 'required|array',
        ]);

        // Mapa de transformación para las áreas
        $areaMap = [
            'industrial' => 'Ingeniería Industrial',
            'sistemas' => 'Ingeniería en Sistemas Computacionales',
            'tic' => 'Ingeniería en Tecnologías de la Información y Comunicaciones',
            'gestion' => 'Ingeniería en Gestión Empresarial',
            'electronica' => 'Ingeniería Electrónica',
            'electromecanica' => 'Ingeniería Electromecánica',
            'mecatronica' => 'Ingeniería Mecatrónica',
            'logistica' => 'Ingeniería en Logística',
        ];

        // Crear el usuario
        $usuarioId = DB::table('Usuario')->insertGetId([
            'Nombre' => $request->nombre,
            'Correo' => $request->correo,
            'Rol' => $request->rol,
            'Contrasena' => $request->contrasena,
        ]);

        // Agregar las áreas de adscripción si existen
        if ($request->rol === 'coordinador departamental' && !empty($request->carreras)) {
            foreach ($request->carreras as $area) {
                $areaTransformed = $areaMap[$area] ?? null; // Transformar el área
                if ($areaTransformed) {
                    DB::table('UsuarioArea')->insert([
                        'Id_usuario' => $usuarioId,
                        'Area_suscripcion' => $areaTransformed,
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Usuario registrado exitosamente.']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});
Route::delete('/usuarios/eliminar/{id}', function ($id) {
    try {
        // Eliminar el usuario de la base de datos
        DB::table('Usuario')->where('Id_usuario', $id)->delete();

        // También eliminar las áreas de adscripción asociadas
        DB::table('UsuarioArea')->where('Id_usuario', $id)->delete();

        return response()->json(['message' => 'Usuario eliminado exitosamente.']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});
Route::post('/usuarios/eliminar', function (Request $request) {
    try {
        $request->validate([
            'nombre' => 'required|string',
            'correo' => 'required|email',
        ]);

        // Buscar y eliminar el usuario por Nombre y Correo
        $usuario = DB::table('Usuario')
            ->where('Nombre', $request->nombre)
            ->where('Correo', $request->correo)
            ->first();

        if ($usuario) {
            // Eliminar el usuario de la tabla Usuario
            DB::table('Usuario')->where('Id_usuario', $usuario->Id_usuario)->delete();

            // Eliminar las áreas de adscripción asociadas
            DB::table('UsuarioArea')->where('Id_usuario', $usuario->Id_usuario)->delete();

            return response()->json(['message' => 'Usuario eliminado exitosamente.']);
        } else {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});
Route::get('/usuarios/lista', function () {
    try {
        $usuario = session('usuario');
        if (!$usuario) {
            return response()->json([], 401);
        }

        $usuarios = [];

        if ($usuario->Rol === 'administrador') {
            $usuarios = DB::table('Usuario')
                ->leftJoin('UsuarioArea', 'Usuario.Id_usuario', '=', 'UsuarioArea.Id_usuario')
                ->select('Usuario.Id_usuario as id', 'Usuario.Nombre as nombre', 'Usuario.Correo as correo', 'Usuario.Rol as rol', 'UsuarioArea.Area_suscripcion as carrera')
                ->get();
        } elseif ($usuario->Rol === 'coordinador institucional') {
            $usuarios = DB::table('Usuario')
                ->leftJoin('UsuarioArea', 'Usuario.Id_usuario', '=', 'UsuarioArea.Id_usuario')
                ->where('Usuario.Rol', 'coordinador departamental')
                ->select('Usuario.Id_usuario as id', 'Usuario.Nombre as nombre', 'Usuario.Correo as correo', 'Usuario.Rol as rol', 'UsuarioArea.Area_suscripcion as carrera')
                ->get();
        } elseif ($usuario->Rol === 'coordinador departamental') {
            $areas = $usuario->areas ?? [];
            $usuarios = DB::table('Usuario')
                ->join('UsuarioArea', 'Usuario.Id_usuario', '=', 'UsuarioArea.Id_usuario')
                ->where('Usuario.Rol', 'tutor')
                ->whereIn('UsuarioArea.Area_suscripcion', $areas)
                ->select('Usuario.Id_usuario as id', 'Usuario.Nombre as nombre', 'Usuario.Correo as correo', 'Usuario.Rol as rol', 'UsuarioArea.Area_suscripcion as carrera')
                ->get();
        }

        // Agrupa por correo para evitar duplicados
        $usuariosAgrupados = [];
        foreach ($usuarios as $u) {
            $key = $u->correo;
            if (!isset($usuariosAgrupados[$key])) {
                $usuariosAgrupados[$key] = [
                    'id' => $u->id,
                    'nombre' => $u->nombre,
                    'correo' => $u->correo,
                    'rol'    => $u->rol,
                    'carrera' => $u->carrera ?? '',
                ];
            }
        }

        return response()->json(array_values($usuariosAgrupados));
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});
Route::get('/usuarios/ver/{id}', function ($id) {
    try {
        // Obtener los datos del usuario desde la tabla Usuario
        $usuario = DB::table('Usuario')
            ->where('Id_usuario', $id)
            ->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }

        // Obtener las áreas de adscripción del usuario desde la tabla UsuarioArea
        $areas = DB::table('UsuarioArea')
            ->where('Id_usuario', $id)
            ->pluck('Area_suscripcion');

        // Combinar los datos del usuario con sus áreas de adscripción
        $usuario->areas = $areas;

        return response()->json($usuario);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// PENDIENTE POR CHECAR
Route::get('/usuarios/ver', function (Request $request) {
    try {
        $usuario = DB::table('Usuario')
            ->where('Nombre', $request->query('nombre'))
            ->where('Correo', $request->query('correo'))
            ->where('Rol', $request->query('rol'))
            ->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }

        $areas = DB::table('UsuarioArea')
            ->where('Id_usuario', $usuario->Id_usuario)
            ->pluck('Area_suscripcion');

        $usuario->areas = $areas;

        return response()->json($usuario);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});


