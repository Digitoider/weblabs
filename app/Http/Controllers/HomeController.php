<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Comment;

use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::orderBy('id', 'desc')->paginate(2);
        return view('home', ['posts' => $posts] );
    }

    public function addComment(Request $req, $postId){
        $commentText = $_GET['commentText'];

        // add comment to the post
        // return view

        
        $post = Post::find($postId);
        $comment = new Comment();
        $comment->body = $commentText;
        $comment->user_id = Auth::user()->id;
        // $comment->post_id = $postId;
        // $comment->save();
        $post->comments()->save($comment);

        $commentHTML = view('components.comment', ['comment' => $comment]);

        $script = <<<JAVASCRIPT
              var commentHTML = `$commentHTML`, postId = $postId;
              addCommentToDOM(postId, commentHTML);
JAVASCRIPT;

        // $commentHTML = $post->title;
        // $script = "alert(`$commentHTML`)";

        return response($script, 200);
    }
}
