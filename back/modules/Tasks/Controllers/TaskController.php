<?php

namespace Modules\Tasks\Controllers;

use App\Http\Controller;
use Illuminate\Http\Request;
use Modules\Tasks\Models\Task;
use Illuminate\Support\Facades\Auth;
use Modules\Tasks\Requests\AddRequest;
use Modules\Tasks\Requests\DeleteRequest;
use Modules\Tasks\Requests\UpdateRequest;

class TaskController extends Controller
{
    public function getAll(Request $req) {
        $search = $req->input('search', null);
        $tasks = Task::when($search, function ($q) use ($search) {
            $q->where('name', 'like', '%'. $search .'%');
        })->orderBy('id', 'desc')->get();

        return $this->response($tasks);
    }

    public function get($id) {
        $task = Task::find($id);
        
        return $this->response($task);
    }

    public function getByUserId($user_id) {
        $tasks = Task::where('user_id', $user_id)->orderBy('id', 'desc')->get();

        return $this->response($tasks);
    }

    public function create(AddRequest $req) {
        $task = new Task;

        $task->fill($req->only(['name', 'description', 'status']));
        if($req->hasFile('image') && $req->file('image')) {
            $name = uniqid() . '-' . $req->image->getClientOriginalName();
            $path = $req->image->move(storage_path('app/tasks'), $name);
            $task->image = $name;
        }
        $task->user_id = (Auth::user()->role == 'admin' && $req->user_id) ? $req->user_id : Auth::user()->id;
        $task->save();

        return $this->response($task);
    }

    public function update(UpdateRequest $req) {
        $task = Task::find($req->id);
        $task->fill($req->only(['name', 'description', 'status']));
        if($req->hasFile('image') && $req->file('image')) {
            $name = uniqid() . '-' . $req->image->getClientOriginalName();
            $path = $req->image->move(storage_path('app/tasks'), $name);
            $task->image = $name;
        }
        $task->user_id = (Auth::user()->role == 'admin' && $req->user_id) ? $req->user_id : Auth::user()->id;
        $task->save();

        return $this->response($task);
    }

    public function delete(DeleteRequest $req) {
        $task = Task::find($req->id);
        $task->delete();
    }
}
