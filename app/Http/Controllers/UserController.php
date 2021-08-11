<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function index()
    {
        $data = User::orderBy('id','asc')->paginate(15);
        return view('User.index',compact(['data']));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        $data =  User::find($id);
        return view('User.show',compact(['data']));
    }

    public function edit($id)
    {
        $data = User::find($id);
        return view('User.edit',compact(['data']));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'location' => 'required',
            'image' => 'required',
        ]);

        User::where('id',$id)->update($request->all());
        return redirect()->back()->with('success','Update Successfully');

    }

    public function organize($id)
    {
        $User = User::find($id);
        if ($User->role==1)
        {
            $User->update(array('role' => 0));
        }
        else
            User::where('id',$id)->update(array('role' => 1));


        return redirect()->back()->with('success','Update Successfully');

    }

}
