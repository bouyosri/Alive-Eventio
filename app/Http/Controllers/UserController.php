<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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

    public function edit()
    {
        $id=Auth::id();
        $data = User::find($id);
        return view('User.Myaccount',compact(['data']));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'image' => 'nullable',
        ]);

        if ($request->image){
            $newImageName2= time().'-'.$request->name.'.'.$request->image->extension();
            $request->image->move(public_path('wp-content\uploads\images'),$newImageName2);

            User::where('id',$id)->update([
                'image' => $newImageName2]);
        }
        $hashed = Hash::make($request->password);

        User::where('id',$id)->update(
                 ['name' => $request->name,
                'email' => $request->email,
                'password' => $hashed]);
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

    public function block($id)
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
