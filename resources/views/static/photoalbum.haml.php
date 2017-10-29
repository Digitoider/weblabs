@extends('layouts.app')

@section('content')
.container
  .row
    .col-md-10.col-md-offset-1
      .panel.panel-default
        .panel-heading Photoalbum!
        .panel-body 
          .row
            -for($i=1;$i<=5;$i++)
              %div(style="max-width: 600px; min-height: 300px" class="col-md-6 col-sm-12")
                %img(src="/storage/#{$i}.jpg" class="img-responsive")
@endsection