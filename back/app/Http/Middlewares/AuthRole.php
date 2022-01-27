<?php

namespace App\Http\Middlewares;

use Closure;
use Illuminate\Support\Facades\Auth;

class AuthRole
{
    
    protected $auth;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    public function handle($request, Closure $next, $role)
    {
        // Check if user is logged in
        if (!Auth::check()) {
            abort(404);
        }
        $roles = explode("|", $role);

        // Check if user role
        if (!in_array(Auth::user()->role, $roles)) {
            return response()->json('Not authorized request!', 401);
        }
        return $next($request);
    }
}
