@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            
            @if(Auth::user()->hasRole('manager'))
                <div class="align-center-container">
                    <button type="button" class="btn-circle" data-toggle="modal" data-target="#addPostModal">
                        <span class="glyphicon glyphicon-plus"></span>
                    </button>
                </div>

                <!-- Add Post Modal -->
                <div class="modal fade" id="addPostModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Add Post</h4>
                      </div>
                      <div class="modal-body">

                        <form name="post" enctype="multipart/form-data">
                          {{ csrf_field() }}
                          <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" name="title">
                          </div>
                          <div class="form-group">
                            <label for="image">File input</label>
                            <input type="file" name="image">
                            <p class="help-block">Choose photo for the post</p>
                          </div>
                          <div class="form-group">
                            <label for="body">Post Body</label>
                            <textarea class="form-control" rows="3" name="body"></textarea>
                          </div>
                          <!-- <button type="submit" class="btn btn-default">Submit</button> -->
                        </form>

                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" id="sendPostButton" class="btn btn-primary">Save Post</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Edit Post Modal -->
                <div class="modal fade" id="editPostModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel1">Edit Post</h4>
                      </div>
                      <div class="modal-body">

                        <form name="editPost" enctype="multipart/form-data">
                          <!-- csrf_field()  -->
                          <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" name="title">
                          </div>
                          <!-- <div class="form-group">
                            <label for="image">File input</label>
                            <input type="file" name="image">
                            <p class="help-block">Choose photo for the post</p>
                          </div> -->
                          <div class="form-group">
                            <label for="body">Post Body</label>
                            <textarea class="form-control" rows="3" name="body"></textarea>
                          </div>

                          <input type="hidden" name="editId"> 

                          <!-- <button type="submit" class="btn btn-default">Submit</button> -->
                        </form>

                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" id="updatePostButton" class="btn btn-primary">Save Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
            @endif

            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                    
                    @php
                    $role = 'employee';
                    if(Auth::user()->hasRole('manager')){
                        $role = 'manager';
                    }
                    @endphp
                    You are logged in as {{ $role }}!


                </div>
            </div>

            <div  id="posts">
              @foreach($posts as $post)
                @include('components.post')
              @endforeach

              {{ $posts->links() }}
            </div>
            
        </div>
    </div>
</div>
@endsection
