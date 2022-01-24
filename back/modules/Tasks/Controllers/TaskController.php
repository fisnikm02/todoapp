<?php

namespace Modules\Tasks\Controllers;

use App\Http\Controller;
use Illuminate\Http\Request;
use Modules\Tasks\Models\Task;
use Modules\Tasks\Requests\AddRequest;
use Modules\Tasks\Requests\DeleteRequest;
use Modules\Tasks\Requests\OneRowRequest;
use Modules\Tasks\Requests\UpdateRequest;
use Modules\Tasks\Requests\OneRowUserRequest;

class TaskController extends Controller
{
    public function getAll(Request $req) {
        $search = $req->input('search', null);
        $tasks = Task::when($search, function ($q) use ($search) {
            $q->where('name', 'like', '%'. $search .'%');
        })->orderBy('id', 'desc')->get();

        return $this->response($tasks);
    }

    public function get(OneRowRequest $req) {

    }

    public function getByUserId($user_id) {
        $tasks = Task::where('created_by', $user_id)->orderBy('id', 'desc')->get();

        return $this->response($tasks);
    }

    public function create(AddRequest $req) {
        $task = new Task;
        $task->create($req->all());

        return $this->response($task);
    }

    public function update(UpdateRequest $req) {
        $task = Task::find($req->id);
        $task->update($req->all());

        return $this->response($task);
    }

    public function delete(DeleteRequest $req) {
        $task = Task::find($req->id);
        $task->delete();
    }
}
