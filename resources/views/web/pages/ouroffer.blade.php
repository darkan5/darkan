@extends('layouts.app')

@section('title')
{{ Lang::get('ouroffer.title') }}
@stop

@section('description')
{{ Lang::get('ouroffer.description') }}
@stop

@section('content')
<link href="{{ asset('/css/ouroffer.css') }}" rel="stylesheet">
<div class="topmenu-offset"></div>


<div id="main-content-wrapper col-md-10 col-md-offset-1">


	<div class="container marketing text-center">
		<div class="row text-center">
			<h1><?= Lang::get('frontpage.whatWeOffer') ?></h1>
		</div>
		<div class="row text-center col-lg-12">
			<h4><?= Lang::get('frontpage.whatWeOfferExtras') ?></h4>
		</div>
	</div>

	<hr/>


	<div class="col-md-12 ouroffer-block" id="offercloud">
		<div class="media col-md-10 col-md-offset-1">
			<div class="media-body">
				<h4 class="media-heading"><?= Lang::get('ouroffer.ouroffer_cloud') ?></h4>
				<ul class="ouroffer-list">
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_cloud1') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_cloud2') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_cloud3') ?></li>
				</ul>
			</div>
			<div class="media-right">
				<img class="media-object" data-src="" alt="64x64" src="{{ asset('/css/img/frontpage/svg/cloud.svg') }}" data-holder-rendered="true">
			</div>
	    </div>
	</div>

	<div class="col-md-12 ouroffer-block block-colored" id="offeranalytics">
		<div class="media col-md-10 col-md-offset-1">
			<div class="media-body">
				<h4 class="media-heading"><?= Lang::get('ouroffer.ouroffer_analytics') ?></h4>
				<ul class="ouroffer-list">
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_analytics1') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_analytics2') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_analytics3') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_analytics4') ?></li>
				</ul>
			</div>
			<div class="media-right">
				<img class="media-object" data-src="" alt="64x64" src="{{ asset('/css/img/frontpage/svg/bar_graph.svg') }}" data-holder-rendered="true">
			</div>
	    </div>
	</div>
	<div class="col-md-12 ouroffer-block" id="offergroupwork">
		<div class="media col-md-10 col-md-offset-1">
			<div class="media-body">
				<h4 class="media-heading"><?= Lang::get('ouroffer.ouroffer_groupwork') ?></h4>
				<ul class="ouroffer-list">
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_groupwork1') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_groupwork2') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_groupwork3') ?></li>
				</ul>
			</div>
			<div class="media-right">
				<img class="media-object" data-src="" alt="64x64" src="{{ asset('/css/img/frontpage/svg/friends.svg') }}" data-holder-rendered="true">
			</div>
	    </div>
	</div>

	<div class="col-md-12 ouroffer-block block-colored" id="offerpsd">
		<div class="media col-md-10 col-md-offset-1">
			<div class="media-body">
				<h4 class="media-heading"><?= Lang::get('ouroffer.ouroffer_psd') ?></h4>
				<ul class="ouroffer-list">
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_psd1') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_psd2') ?></li>
				</ul>
			</div>
			<div class="media-right">
				<img class="media-object" data-src="" alt="64x64" src="{{ asset('/css/img/frontpage/svg/download.svg') }}" data-holder-rendered="true">
			</div>
	    </div>
	</div>
	<div class="col-md-12 ouroffer-block" id="offerscorm">
		<div class="media col-md-10 col-md-offset-1">
			<div class="media-body">
				<h4 class="media-heading"><?= Lang::get('ouroffer.ouroffer_scorm') ?></h4>
				<ul class="ouroffer-list">
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_scorm1') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_scorm2') ?></li>
				</ul>
			</div>
			<div class="media-right">
				<img class="media-object" data-src="" alt="64x64" src="{{ asset('/css/img/frontpage/svg/student.svg') }}" data-holder-rendered="true">
			</div>
	    </div>
	</div>

	<div class="col-md-12 ouroffer-block block-colored" id="offerquestions">
		<div class="media col-md-10 col-md-offset-1">
			<div class="media-body">
				<h4 class="media-heading"><?= Lang::get('ouroffer.ouroffer_questions') ?></h4>
				<ul class="ouroffer-list">
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_questions1') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_questions2') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_questions3') ?></li>
				</ul>
			</div>
			<div class="media-right">
				<img class="media-object" data-src="" alt="64x64" src="{{ asset('/css/img/frontpage/svg/questions.svg') }}" data-holder-rendered="true">
			</div>
	    </div>
	</div>

	<div class="col-md-12 ouroffer-block" id="offermailing">
		<div class="media col-md-10 col-md-offset-1">
			<div class="media-body">
				<h4 class="media-heading"><?= Lang::get('ouroffer.ouroffer_mailing') ?></h4>
				<ul class="ouroffer-list">
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_mailing1') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_mailing2') ?></li>
				</ul>
			</div>
			<div class="media-right">
				<img class="media-object" data-src="" alt="64x64" src="{{ asset('/css/img/frontpage/svg/box.svg') }}" data-holder-rendered="true">
			</div>
	    </div>
	</div>

	<div class="col-md-12 ouroffer-block block-colored" id="offerlibrary">
		<div class="media col-md-10 col-md-offset-1">
			<div class="media-body">
				<h4 class="media-heading"><?= Lang::get('ouroffer.ouroffer_library') ?></h4>
				<ul class="ouroffer-list">
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_library1') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_library2') ?></li>
				</ul>
			</div>
			<div class="media-right">
				<img class="media-object" data-src="" alt="64x64" src="{{ asset('/css/img/frontpage/svg/camera.svg') }}" data-holder-rendered="true">
			</div>
	    </div>
	</div>

	<div class="col-md-12 ouroffer-block" id="offersocialmedia">
		<div class="media col-md-10 col-md-offset-1">
			<div class="media-body">
				<h4 class="media-heading"><?= Lang::get('ouroffer.ouroffer_socialmedia') ?></h4>
				<ul class="ouroffer-list">
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_socialmedia1') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_socialmedia2') ?></li>
					<li><i class="fa fa-check-circle text-success"></i><?= Lang::get('ouroffer.ouroffer_socialmedia3') ?></li>
				</ul>
			</div>
			<div class="media-right">
				<img class="media-object" data-src="" alt="64x64" src="{{ asset('/css/img/frontpage/svg/globe.svg') }}" data-holder-rendered="true">
			</div>
	    </div>
	</div>


	<div class="clearfix"></div>

</div>
@endsection