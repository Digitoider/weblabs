<div class="post__comment">
  <div class="post__comment-author">{{ App\User::find($comment->user_id)->name }}</div>
  <div class="post__comment-body">{{ $comment->body }}</div>
  <div class="post__comment-creation-datetime">{{ $comment->created_at }}</div>
</div>

<div class="post__comment-separator"></div>