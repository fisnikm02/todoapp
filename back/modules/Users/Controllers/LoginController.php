<?php

namespace Modules\Users\Controllers;

use App\Http\Controller;
use Modules\Tasks\Models\Task;
use Modules\Users\Models\User;
use Illuminate\Support\Facades\Auth;
use Modules\Users\Requests\LoginRequest;
use Modules\Users\Requests\RegisterRequest;

class LoginController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @param  LoginRequest  $request
     * @return JSON
     */
    public function login(LoginRequest $request)
    {
        // Check
        $credentials = $request->only(['email', 'password']);
        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['errors' => ['login' => [__('auth.failed')]]], 422);
        }

        // Data
        $data = [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ];
        $user = Auth::user()->toArray();
        $data = array_merge($data, $user);

        // Final Response
        return $this->response($data);
    }

    public function register(RegisterRequest $request)
    {
        $register = new User;
        $register->fill($request->only(['first_name', 'last_name', 'email', 'password', 'gender']));
        $register->role = 'user';
        $register->save();

        // Final Response
        return $this->response($register);
    }
    
    public function logs() {
        $rows = [];

        $rows['users'] = User::where('role', 'user')->count();
        $rows['admins'] = User::where('role', 'admin')->count();
        $rows['tasks'] = Task::count();
        $rows['tasks_todo'] = Task::where('status', 0)->count();
        $rows['tasks_doing'] = Task::where('status', 1)->count();
        $rows['tasks_done'] = Task::where('status', 2)->count();

        return $this->response($rows);
    }
}
