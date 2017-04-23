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
		<div class="featurette-top">
			<h1 class="featurette-heading text-center"><?= Lang::get('footerpages.FOOTER_DOCUMENTATION') ?></h1>
			<hr/>
			<ol class="tutorial-list">

				@foreach ($docs as $index => $doc)
					<?php $url = url('/tutorial/' . $index); ?>
					<li class="tutorial-list-item"><a href="<?=$url?>">{{ $doc['title'] }}</a></li>
				@endforeach

			</ul>
		</div>
	</div>
</div>


<div class="clearfix"></div>

<div class="topmenu-offset"></div>
@endsection