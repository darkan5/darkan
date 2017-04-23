@extends('layouts.app')

@section('title')
{{ Lang::get('portal.content_not_exists') }}
@stop

@section('description')
{{ Lang::get('portal.content_not_exists') }}
@stop

@section('content')

<link href="{{ asset('/css/content.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>

<div class="container marketing container-portal">

	<div class="well text-center">
		<div class="portal-image">
			<img src="{{ asset('/css/img/social_logos/logo.png') }}" />
		</div>
		<div class="portal-title">
			<h3>
				{{ Lang::get('portal.content_not_exists') }}
			</h3>
		</div>
			
	</div>

</div>

<div class="topmenu-offset"></div>
@endsection