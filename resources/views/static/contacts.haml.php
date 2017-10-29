@extends('layouts.app')

@section('content')

.container
  .row
    .col-md-10.col-md-offset-1
      .panel.panel-default
        .panel-heading
          %h2 Contacts
        .panel-body 
          Telephone number: +7 (978) 758 54 93
          %hr
          email: digitoider@gmail.com
          %hr
          %a{:href => "https://vk.com/holdthefuckingdoor"} VK
          %hr
          %a{:href => "https://github.com/digitoider"} GitHub
@endsection