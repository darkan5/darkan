@extends('layouts.app')

@section('title')
{{ Lang::get('footerpages.title_documentation') }}
@stop

@section('description')
{{ Lang::get('footerpages.description_documentation') }}
@stop

@section('content')
<link href="{{ asset('/css/tutorials.css') }}" rel="stylesheet">

<div class="topmenu-offset"></div>

<div id="main-content-wrapper" class="col-md-8 col-md-offset-2">

	<div class="footer-content content-company container col-md-12" >

		<div class="breadcrumbs">
			<a href="{{ url('/') }}">Darkan</a> -> 
			<a href="{{ url('/documentation') }}">
				<?= Lang::get('footerpages.FOOTER_DOCUMENTATION') ?>
			</a> -> <?php echo $title; ?>
		</div>

		<div class="featurette-top">
			{!! $docs !!}
		</div>
		
		<div class="breadcrumbs">
			<a href="{{ url('/') }}">Darkan</a> -> 
			<a href="{{ url('/documentation') }}">
				<?= Lang::get('footerpages.FOOTER_DOCUMENTATION') ?>
			</a> -> <?php echo $title; ?>
		</div>
	</div>
</div>


<div class="clearfix"></div>

<div class="topmenu-offset"></div>
@endsection