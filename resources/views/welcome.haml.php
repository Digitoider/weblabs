!!!
%html{:lang => "<?php app()->getLocale() ?>"}
  %head
    %meta{:content => "text/html; charset=UTF-8", "http-equiv" => "Content-Type"}/
    %meta{:charset => "utf-8"}/
    %meta{:content => "IE=edge", "http-equiv" => "X-UA-Compatible"}/
    %meta{:content => "width=device-width, initial-scale=1", :name => "viewport"}/
    %title Laravel
    / Fonts
    %link{:href => "https://fonts.googleapis.com/css?family=Raleway:100,600", :rel => "stylesheet", :type => "text/css"}/
    / Styles
    :css
      html, body {
          background-color: #fff;
          color: #636b6f;
          font-family: 'Raleway', sans-serif;
          font-weight: 100;
          height: 100vh;
          margin: 0;
      }

      .full-height {
          height: 100vh;
      }

      .flex-center {
          align-items: center;
          display: flex;
          justify-content: center;
      }

      .position-ref {
          position: relative;
      }

      .top-right {
          position: absolute;
          right: 10px;
          top: 18px;
      }

      .content {
          text-align: center;
      }

      .title {
          font-size: 84px;
      }

      .links > a {
          color: #636b6f;
          padding: 0 25px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .1rem;
          text-decoration: none;
          text-transform: uppercase;
      }

      .m-b-md {
          margin-bottom: 30px;
      }
  %body
    .flex-center.position-ref.full-height
      @if (Route::has('login'))
      .top-right.links
        @auth
        %a{:href => "/home"} Home
        @else
        %a{:href => "/login"} Login
        %a{:href => "/register"} Register
        @endauth
      @endif
      .content
        .title.m-b-md
          Weblabs
        .links
          %a{:href => "/profile"} Profile
          %a{:href => "/about"} About
          %a{:href => "/contacts"} Contacts
          %a{:href => "/education"} Education
          %a{:href => "/photoalbum"} Photoalbum
