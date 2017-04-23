@extends('web.layout')

@section('title')
{{ Lang::get('apidocs.title') }}
@stop

@section('description')
{{ Lang::get('apidocs.description') }}
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
				<h2><?= Lang::get('apidocs.PP_INFO_1') ?></h2>
				<hr/>
			</div>
			<p>
				<h2>Spis treści:</h2>

				<ul>
					<li>
						<a target="strona" href=""><?= Lang::get('apidocs.a_1') ?></a><br />
					</li>
					<li>
						<a target="strona" href=""><?= Lang::get('apidocs.a_2') ?></a><br />
						<ul>
							<li><a target="strona" href=""><?= Lang::get('apidocs.a_3') ?></a><br /></li>
							<li><a target="strona" href=""><?= Lang::get('apidocs.a_4') ?></a><br /></li>
							<li><a target="strona" href=""><?= Lang::get('apidocs.a_5') ?></a><br /></li>
							<li><a target="strona" href=""><?= Lang::get('apidocs.a_6') ?></a><br /></li>
						</ul>
					</li>
					<li>
						<a target="strona" href=""><?= Lang::get('apidocs.a_7') ?></a><br />
						<ul>
							<li><a target="strona" href=""><?= Lang::get('apidocs.a_8') ?></a><br /></li>
							<li><a target="strona" href=""><?= Lang::get('apidocs.a_9') ?></a><br /></li>
							<li><a target="strona" href=""><?= Lang::get('apidocs.a_10') ?></a><br /></li>
						</ul>
					</li>
					<li>
						<a target="strona" href=""><?= Lang::get('apidocs.a_11') ?></a><br />
						<ul>
							<li><a target="strona" href=""><?= Lang::get('apidocs.a_12') ?></a><br /></li>
							<li><a target="strona" href=""><?= Lang::get('apidocs.a_13') ?></a><br /></li>
							<li><a target="strona" href=""><?= Lang::get('apidocs.a_14') ?></a><br /></li>
						</ul>	
					</li>
					<li>
						<a target="strona" href=""><?= Lang::get('apidocs.a_15') ?></a><br />
					</li>
				</ul>

				
				
				
				
			</p>
		</div>
	</div>
</div>

<div class="clearfix"></div>
<div class="topmenu-offset"></div>
@endsection