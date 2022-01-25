<?php

namespace Modules\Users\Controllers;

use App\Http\Controller;
use Illuminate\Http\Request;
use Modules\Users\Models\User;
use Illuminate\Support\Facades\Auth;
use Modules\Users\Requests\User\AddRequest;
use Modules\Users\Requests\User\DeleteRequest;
use Modules\Users\Requests\User\OneRowRequest;
use Modules\Users\Requests\User\UpdateRequest;
use Modules\Users\Requests\User\ProfileRequest;

class UserController extends Controller
{
    public function getAll(Request $req)
    {
        $nr = $req->input('nr', 50);
        $search = $req->input('search', null);
        $users = User::when($search, function ($q) use ($search) {
            $q->where('first_name', 'like', '%' . $search . '%')
                ->orWhere('last_name', 'like', '%' . $search . '%');
        })->orderBy('id', 'desc')->paginate($nr);

        return $this->response($users);
    }

    public function get($id)
    {
        $user = User::find($id);

        return $this->response($user);
    }

    public function create(AddRequest $req)
    {
        $user = new User;
        $user->create($req->only(['first_name', 'last_name', 'email', 'password', 'gender', 'role']));

        return $this->response($user);
    }

    public function update(UpdateRequest $req)
    {
        $user = User::find($req->id);
        $user->update($req->only(['first_name', 'last_name', 'email', 'password', 'gender', 'role']));

        return $this->response($user);
    }

    public function delete(DeleteRequest $req)
    {
        $user = User::find($req->id);
        $user->delete();
    }

    public function updateProfile(ProfileRequest $req)
    {
        $user = User::find(Auth::user()->id);
        $user->update($req->only(['id', 'first_name', 'last_name', 'email', 'password', 'gender']));

        return $this->response($user);
    }
}
