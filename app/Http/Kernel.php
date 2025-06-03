protected $middlewareGroups = [
    'web' => [
        // Otros middlewares...
        \App\Http\Middleware\VerifyCsrfToken::class,
    ],
];