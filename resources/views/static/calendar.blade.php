@extends('layouts.app')

@section('content')

<div class="container">
	<button id="switchButton" class="btn btn-default" onclick="showCalendar(event)">Turn on calendar</button>
</div>

<div class="container">
	<div id="calendarContainer" class=" col-sm-offset-3 col-sm-6">
	
	</div>
</div>

@endsection

