@extends('web.layout')

@section('title')
{{ Lang::get('apidocs.title') }}
@stop

@section('description')
{{ Lang::get('apidocs.description') }}
@stop

@section('content')
<link href="{{ asset('/css/apidocs.css') }}" rel="stylesheet">
<link href="{{ asset('/css/pricing.css') }}" rel="stylesheet">


<div class="topmenu-offset"></div>

<div id="main-content-wrapper" class="col-md-10 col-md-offset-1 text-center">

	<div class="container col-md-12" >
		<div class="featurette-top">
			<div class="header-wrapper">
				<h2><?= Lang::get('apidocs.PP_INFO_1') ?></h2>
				<hr/>
				<section id="pricePlans">
					<ul id="plans">
						<li class="plan">
							<ul class="planContainer">
								<li class="title"><h2 class="bestPlanTitle">REST API</h2></li>
								<li>
									<ul class="options">
										<li class="plan-extra-info">
											<span>{{ Lang::get('apidocs.REST_API_DESC') }}</span>
										</li>
									</ul>
								</li>
								<li class="button">
									<a class="" href="{{ url('/apidocs/rest') }}">REST API</a>
								</li>
							</ul>
						</li>

						<li class="plan">
							<ul class="planContainer">
								<li class="title"><h2 class="bestPlanTitle">Editor API</h2></li>
								<li>
									<ul class="options">
										<li class="plan-extra-info">
											<span>{{ Lang::get('apidocs.EDITOR_API_DESC') }}</span>
										</li>
									</ul>
								</li>
								<li class="button">
									<a href="{{ url('/apidocs/editor') }}">Editor API</a>
								</li>
							</ul>
						</li>
					</ul> <!-- End ul#plans -->
				
				</section>

				<div class="header-wrapper bottom-extra-info">
					<h2 class="gopro-section-description">
						<?=Lang::get('apidocs.GET_YOUR_API_KEY')?>
					</h2>
				</div>


				</div>

			</div>
		</div>
	</div>
</div>

<div class="clearfix"></div>
<div class="topmenu-offset"></div>
@endsection