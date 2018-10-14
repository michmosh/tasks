<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Task;

class TasksController extends Controller
{
    public function __construct(){
       
    }

    public function index(){
        return view('welcome');
    }

    public function getTasks(Request $request ){
        $tasks = DB::table('tasks')->get();
        echo json_encode(array("tasks"=>$tasks));

    }

    public function addTask(Request $request){
        $task = new Task();
        $task->jsonData = $request->get('task')['jsonData'];
        $task->save();
        return json_encode(array('task'=>$task));
    }

    public function deleteTask(Request $request , $id){
        $res = Task::where('id',$id)->delete();
        return array(
            'meta'=>json_decode(json_encode(["deleted" => $res],true))
        );
    }

    public function editTask(Request $request , $id){
        $task = Task::find($id);
        $task->jsonData =  $request->get('task')['jsonData'];
        $res = $task->update(['jsonData'=> $task->jsonData]);
        return array(
            'meta'=>json_decode(json_encode(["updated" => $res],true))
        );
    }
}

