@extends('layouts.app')

@section('content')
%section.container
  %h1 Севастопольский государственный университет
  %h2 Институт информационных технологий и управления в технических системах
  %br/
  %table.table.table-bordered
    %tr{:align => "middle"}
      %td{:rowspan => "3"} #
      %td{:rowspan => "3"} Дисциплина
      %td{:colspan => "12"}
        Часов в неделю
        %br/
        (Лекций, Лаб. раб, Практ. раб)
    %tr{:align => "middle", :valign => "bottom"}
      %td{:colspan => "6"} 1 курс
      %td{:colspan => "6"} 2 курс
    %tr{:align => "middle", :valign => "top"}
      %td{:colspan => "3"} 1 сем
      %td{:colspan => "3"} 2 сем
      %td{:colspan => "3"} 3 сем
      %td{:colspan => "3"} 4 сем
    %tr
      %td 1
      %td
        %i Экология
      %td
      %td
      %td
      %td
      %td
      %td
      %td 1
      %td 0
      %td 1
      %td
      %td
      %td
    %tr
      %td 2
      %td
        %i Высшая математика
      %td 3
      %td 0
      %td 3
      %td 3
      %td 0
      %td 3
      %td 2
      %td 0
      %td 2
      %td
      %td
      %td
    %tr
      %td 3
      %td
        %i Русский язык и культура речи
      %td 1
      %td 0
      %td 2
      %td
      %td
      %td
      %td
      %td
      %td
      %td
      %td
      %td
    %tr
      %td 4
      %td
        %i Основы дискретной математики
      %td 2
      %td 0
      %td 1
      %td 3
      %td 0
      %td 2
      %td
      %td
      %td
      %td
      %td
      %td
    %tr
      %td 5
      %td
        %i Основы программирования и алгоритмические языки
      %td 3
      %td 2
      %td 0
      %td 3
      %td 3
      %td 0
      %td 0
      %td 0
      %td 1
      %td
      %td
      %td
    %tr
      %td 6
      %td
        %i Основы экологии
      %td
      %td
      %td
      %td
      %td
      %td
      %td 1
      %td 0
      %td 0
      %td
      %td
      %td
    %tr
      %td 7
      %td
        %i Теория вероятностей и математическая статистика
      %td
      %td
      %td
      %td
      %td
      %td
      %td 3
      %td 1
      %td 0
      %td
      %td
      %td
    %tr
      %td 8
      %td
        %i Физика
      %td 2
      %td 2
      %td 0
      %td 2
      %td 2
      %td 0
      %td 2
      %td 1
      %td 0
      %td
      %td
      %td
    %tr
      %td 9
      %td
        %i Основы электроники и электротехники
      %td
      %td
      %td
      %td
      %td
      %td
      %td 2
      %td 1
      %td 1
      %td
      %td
      %td
    %tr
      %td 10
      %td
        %i Численные методы в информатике
      %td
      %td
      %td
      %td
      %td
      %td
      %td 2
      %td 2
      %td 0
      %td 0
      %td 0
      %td 1
    %tr
      %td 11
      %td
        %i Методы исследования операций
      %td
      %td
      %td
      %td
      %td
      %td
      %td 1
      %td 1
      %td 0
      %td 2
      %td 1
      %td 1

@endsection