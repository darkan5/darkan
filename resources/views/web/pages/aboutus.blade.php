@extends('layouts.app')

@section('title')
{{ Lang::get('footerpages.title_aboutus') }}
@stop

@section('description')
{{ Lang::get('footerpages.description_aboutus') }}
@stop

@section('content')
<div class="subpage-image-container">
	<div class="subpage-image">
		<img src="{{ asset('/css/img/slide-02.jpg') }}" />
	</div>
</div>


<div id="main-content-wrapper" class="col-md-10 col-md-offset-1">

	<div class="footer-content content-company container col-md-12" >
		<div class="featurette-top">
			<div class="header-wrapper">
				<h2><?= Lang::get('footerpages.FOOTER_COMPANY_1') ?></h2>
				<hr/>
			</div>
			<p>
				<p><?= Lang::get('footerpages.FOOTER_COMPANY_2') ?></p>
			</p>
		</div>
	</div>
</div>

<div class="clearfix"></div>
<div class="topmenu-offset"></div>
@endsection