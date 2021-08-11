<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class EventController extends Controller
{
    //
    public function index()
    {
        $data = Event::orderBy('id','desc')->paginate(10);
        return view('Event.index',compact(['data']));
    }

    public function create()
    {
        return view('Event.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'location' => 'required',
            'image' => 'required|mimes:jpg,png,jpeg,gif|max:5048',
        ]);
        $newImageName= time().'-'.$request->name.'.'.$request->image->extension();
        $request->image->move(public_path('wp-content\uploads\images'),$newImageName);
        Event::create([
            'name'=>$request->name,
            'description'=>$request->description,
            'location'=>$request->location,
            'image'=>$newImageName,
            'user_id'=>Auth::id(),
            ]);
        return redirect('/events');
    }

    public function show($id)
    {
        $data =  Event::with('event_images')->find($id);
        return view('Event.show',compact(['data']));
    }

    public function edit($id)
    {
        $data = Event::find($id);
        return view('event.edit',compact(['data']));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'location' => 'required',
            'image' => 'nullable',
        ]);


        foreach ($request->files as $files)
        {
            foreach ($files as $file)
            {
            $newImageName= time().'-'.$file->getClientOriginalName();
            $file->move(public_path('wp-content\uploads\images'),$newImageName);
            EventImage::create(['event_id' => $id,'path' => $newImageName]);
            }
        }


        if ($request->image){
            $newImageName2= time().'-'.$request->name.'.'.$request->image->extension();
            $request->image->move(public_path('wp-content\uploads\images'),$newImageName2);

            Event::where('id',$id)->update([
                'image' => $newImageName2]);
        }
            Event::where('id',$id)->update(
                ['name' => $request->name,
                'description' => $request->description,
                'location' => $request->location]);

        return redirect()->back()->with('success','Update Successfully');

    }

    public function destroy($id)
    {
        Event::where('id',$id)->delete();
        return redirect()->back()->with('success','Delete Successfully');
    }

}
