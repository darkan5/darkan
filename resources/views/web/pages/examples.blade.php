@extends('layouts.app')

@section('title')
{{ Lang::get('examples.title') }}
@stop

@section('description')
{{ Lang::get('examples.description') }}
@stop

@section('content')
<link href="{{ asset('/css/examples.css') }}" rel="stylesheet">
<div class="topmenu-offset"></div>


<div id="main-content-wrapper col-md-10 col-md-offset-1">


	<div class="container marketing text-center">
		<h1><?= Lang::get('examples.examplesHeader') ?></h1>
	</div>

	<hr/>

	@foreach ($publications as $key => $publication)

		<section class="col-md-4 publication-block">
			<div class="thumbnail visible">
				<div class="image-container">
					<a target="_blank" href="{{ url('content', $publication->path) }}">
						<img src="{{ $publication->thumb }}" class="portal-content-image visible">
						<div class="play-sign showonhover animated fadeIn"></div>
					</a>
				</div>
				<div class="caption">
					<h3><?=Lang::get('examples.example1')?></h3>
					<p class="thumbnail-caption-shorten"><?=Lang::get('examples.example1desc')?></p>
					<p class="options-container text-right">
						<a target="_blank" href="{{ url('content', $publication->path) }}" class="btn btn-success btn"><?=Lang::get('examples.OPEN')?></a>
					</p>
				</div>
			</div>
		</section>

	@endforeach

	<div class="clearfix"></div>

</div>

@endsection