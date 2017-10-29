<div class="post" id="{{ $post->id }}" post-id="{{ $post->id }}">
  <div class="post__header">
    <div class="post__title">
      <div class="post__title-text">  
       {{ $post->title }}
      </div>
      @if(Auth::user()->hasRole('manager'))
        <div class="post__admin-controls">
          <button class="post__edit" post-id="{{ $post->id }}"><span class="glyphicon glyphicon-edit"></span></button>
          <button class="post__delete" post-id="{{ $post->id }}"><span class="glyphicon glyphicon-remove"></span></button>
        </div>
      @endif
    </div>
    <div class="post__creation-datetime">
      {{ $post->created_at }}
    </div>
  </div>
  <div class="post__body">
    <div class="post__text">
      {{ $post->body }}
    </div>
    <div class="post__photo"><img src="{{ asset($post->image_path) }}" alt="photo"></div>
  </div>
  <!-- <div class="post__footer">
    <div class="post__footer-separator"></div>
    <button class="post__comment-button">
      Comment
    </button>
  </div> -->
  <div class="post__comment-section-separator"></div>
  <div class="post__comment-section">
    <div class="post__comments-container">
      

      @each('components.comment', $post->comments, 'comment')
    </div>
    <div class="post__add-comment-section">
      <textarea  post-id="{{ $post->id }}" class="post__comment-textarea" placeholder="leave a comment..."></textarea>
      <a class="post__send-comment-button"><span class="glyphicon glyphicon-send" aria-hidden="true" post-id="{{ $post->id }}"></span></a>  
    </div>
  </div>
</div>