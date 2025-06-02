<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Usuario', function (Blueprint $table) {
            $table->increments('Id_usuario');
            $table->enum('Rol', [
                'administrador',
                'coordinador institucional',
                'coordinador departamental',
                'tutor'
            ]);
            $table->string('Nombre');
            $table->string('Correo')->unique();
            $table->string('Contrasena');
        });

        Schema::create('UsuarioArea', function (Blueprint $table) {
            $table->integer('Id_usuario')->unsigned();
            $table->string('Area_suscripcion');
            $table->primary(['Id_usuario', 'Area_suscripcion']);
            $table->foreign('Id_usuario')->references('Id_usuario')->on('Usuario')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('UsuarioArea');
        Schema::dropIfExists('Usuario');
    }
};
