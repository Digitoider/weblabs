<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Post;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createPost(Request $req)
    {
        $XMLPostContent = $req->getContent();

        preg_match("/<title>(.*)<\/title><body>(.*)<\/body>/i", $XMLPostContent, $matches);


        $post = new Post();
        
        $post->title = $matches[1];
        $post->image_path = 'storage/noimage.png';
        $post->body = $matches[2];

        $post->save();

        return view('components.post', ['post' => $post]);
    }

    public function uploadPhoto(Request $req, $postId){

        // $image = Input::file('image');

        // if(!$image){
        //     return response("Input::file doesn't have a file", 404);
        // }

        if (!$req->hasFile('image')) {
            return response("Request doesn't have a file", 404);
        }

        $post = Post::find($postId);

        $image      = $req->file('image');
        $fileName   = time() . '.' . $image->getClientOriginalExtension();

        // $fileName   = $post->id . $image->getClientOriginalExtension();

        // $img = Image::make($image->getRealPath());
        // $img->resize(120, 120, function ($constraint) {
        //     $constraint->aspectRatio();                 
        // });

        // $img->stream(); // <-- Key point

        //dd();
        $imgPath = 'public/' . $fileName;
        // Storage::disk('local')->put($imgPath, $image, 'public');

        $destinationPath = 'storage/';
        $image->move($destinationPath, $fileName);
        
        

        $path = 'storage/' . $fileName;
        $post->image_path = $path;//$imgPath;
        $post->save();

        return response($post->image_path, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updatePost(Request $req, $id)
    {
        // check if admin

        $XMLPostContent = $req->getContent();

        // return response("recieved id: $id; recieved xml: $XMLPostContent", 200);

        preg_match("/<title>(.*)<\/title><body>(.*)<\/body>/i", $XMLPostContent, $matches);
        
        $post = Post::find($id);

        $post->title = $matches[1];
        //$post->image_path = 'none';
        $post->body = $matches[2];

        $post->save();

        return response('Saved', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deletePost($id)
    {
        // check if admin
        $prevCount = Post::all()->count();

        $post = Post::find($id);
        $post->delete();

        $newCount = Post::all()->count();

        return response("prev: $prevCount; new: $newCount", 200); 
    }
}
