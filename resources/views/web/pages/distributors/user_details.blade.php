@extends('layouts.app')

@section('content')
<link href="{{ asset('/css/distributors.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>


<div class="col-md-8 col-md-offset-2">

	<div class="form-group">
		<a href="{{ url('/administration/dashboard') }}" class="btn btn-success">Powrót do listy</a>
	</div>

	<h4>Szczegóły użytkownika: {{ $user->login }}</h4>

	<hr>

	<fieldset>
		<legend>Logowania: ({{ count($logins) }})</legend>
		<ul>
			@foreach ($logins as $login)
				<li>
					{{ $login->created_at }} | {{ $login->countryCode }} | {{ $login->ip }}
				</li>
			@endforeach
			
		</ul>
	</fieldset>

	<fieldset>
		<legend>Projekty: ({{ count($projects) }})</legend>
		<ul>
			@foreach ($projects as $project)
				<li>
					<a target="_blank" href="{{ url('/editor/' . $project->project_id) }}">{{ $project->name }}</a>
				</li>
			@endforeach
			
		</ul>
	</fieldset>

	<fieldset>
		<legend>Publikacje: ({{ count($banners) }})</legend>
		<ul>
			@foreach ($banners as $banner)
				<li>
					<a target="_blank" href="{{ url('/content/' . $banner->path) }}">{{ $banner->name }}</a> ({{ $banner->summary }})
				</li>
			@endforeach
			
		</ul>
	</fieldset>



</div>

<div class="clearfix"></div>

<div class="topmenu-offset"></div>

@endsection