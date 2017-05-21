@extends('layouts.app')

@section('title')
{{ Lang::get('affiliate.title') }}
@stop

@section('description')
{{ Lang::get('affiliate.description') }}
@stop

@section('content')
<link href="{{ asset('/css/affiliate.css') }}" rel="stylesheet">

<div class="subpage-image-container">
	<div class="subpage-image">
		<img src="{{ asset('css/img/pprogram.jpg') }}" />
	</div>
</div>


<div class="footer-content content-company container">
	<div class="featurette-top" style="padding-top:0px;">
		<h1 class="featurette-heading text-center"><?= Lang::get('affiliate.PP_TITLE') ?></h1>
		<hr/>
		<p class="lead"><?= Lang::get('affiliate.NOACCESS') ?></p>
		<p class="lead"><?= Lang::get('affiliate.NOACCESS2') ?></p>

		<a href="{{ url('auth/login') }}">
			<h2 class="featurette-heading text-center margin50-0"><?= Lang::get('affiliate.PP_INFO_4') ?></h2>
		</a>
        <div class="clearfix"></div>
	</div>
</div>

<div id="testcontent"></div>


<script type="text/javascript" src="<?php echo env('APP_PROTOCOL').env('APP_URL') ?>/test/js/api/darkan_api.js"></script>
<script type="text/javascript">
	// DarkanApi.get({
	// 	hash: 'ad4b872976ec0f643a77722d8e4fb3f8',
	// 	container: $('#testcontent')[0]
	// });
</script>

@endsection