<?php

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

