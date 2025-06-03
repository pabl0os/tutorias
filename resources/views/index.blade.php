<!-- filepath: c:\Users\pabli\Desktop\gestionProyectosSoftware\tutorias\resources\views\index.blade.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="{{ asset('proyectoGestionProyectosSoftware/styles/estilos.css') }}">
    <style>
        body { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f5f5f5; }
        .login-container { background: #fff; padding: 2rem 2.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .login-container h2 { margin-bottom: 1.5rem; }
        .login-container label { display: block; margin-bottom: 0.5rem; }
        .login-container input { width: 100%; padding: 0.5rem; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 4px; }
        .login-container button { width: 100%; padding: 0.7rem; background: #007bff; color: #fff; border: none; border-radius: 4px; font-size: 1rem; }
        .login-container button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Iniciar Sesión</h2>
        @if($errors->any())
            <div style="color: red; margin-bottom: 1rem;">
                {{ $errors->first() }}
            </div>
        @endif
        <form method="POST" action="{{ url('login') }}">
            @csrf
            <label for="correo">Correo electrónico</label>
            <input type="email" id="correo" name="correo" required>

            <label for="contrasena">Contraseña</label>
            <input type="password" id="contrasena" name="contrasena" required>

            <button type="submit">Entrar</button>
        </form>
    </div>
</body>
</html>