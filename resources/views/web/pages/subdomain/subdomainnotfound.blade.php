@extends('layouts.app')

@section('title')
{{ Lang::get('portal.Subdomain_not_exists') }}
@stop

@section('description')
{{ Lang::get('portal.Subdomain_not_exists') }}
@stop

@section('content')
<link href="{{ asset('/css/examples.css') }}" rel="stylesheet">
<link href="{{ asset('/css/portal.css') }}" rel="stylesheet">
<link href="{{ asset('/css/subdomain.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>

<div class="container marketing container-portal">

	<div class="well text-center">
		<div class="portal-image">
			<img src="{{ asset('/css/img/social_logos/logo.png') }}" />
		</div>
		<div class="portal-title">
			<h3>
				{{ Lang::get('portal.Subdomain_not_exists') }}
				<a href="{{ url('/profile') }}">{{ Lang::get('portal.Subdomain_not_exists_2') }}</a>
			</h3>
		</div>
			
	</div>

	<div class="well text-center">
		<h3>
			{{ Lang::get('portal.your_subdomain') }}: 
			<a href="{{ $subdomainUrl }}"> {{ $subdomainUrl }}</a>
		</h3>
	</div>

</div>

<div class="topmenu-offset"></div>
@endsection