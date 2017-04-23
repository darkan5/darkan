@extends('layouts.app')

@section('title')
{{ Lang::get('portal.title') }}
@stop

@section('description')
{{ Lang::get('portal.description') }}
@stop

@section('content')
<link href="{{ asset('/css/examples.css') }}" rel="stylesheet">
<link href="{{ asset('/css/portal.css') }}" rel="stylesheet">
<link href="{{ asset('/css/portal/'. $portalSettings->skinName .'/portalstyles.css') }}" rel="stylesheet" id="portal_style">

<div class="topmenu-offset"></div>

<div class="container marketing container-portal">


	<div class="well portal-header">
		<div class="portal-image">
			<img src="{{ $userPhoto }}" alt="{{ $subdomainName }}" />
		</div>
		<div class="portal-title">
			<h2>{{ $subdomainName }}</h2>
			<span>
				<?=Lang::get('portal.number_of_publications')?> {{ count($userPublications) }}
			</span>
		</div>
	</div>

	<div class="well potral-option text-center">
		<h4>
			<?=Lang::get('portal.PORTAL_WELCOME_LABEL') ?>
		</h4>

		<h5>
			<?=Lang::get('portal.your_page_link')?> 
			<a target="_blank" href="{{ config('app.protocol_not_secure') }}{{Auth::user()->subdomain}}.{{ config('app.domain') }}{{ config('app.folder') }}">
				{{ config('app.protocol_not_secure') }}{{Auth::user()->subdomain}}.{{ config('app.domain') }}{{ config('app.folder') }}
			</a>
		</h5>

		<hr/>

        <a class="btn-admin btn btn-darkan" target="_blank" href="{{ config('app.protocol_not_secure') }}{{Auth::user()->subdomain}}.{{ config('app.domain') }}{{ config('app.folder') }}">
        	<i class="fa fa-desktop fa-fw"></i> <?=Lang::get('portal.PORTAL_HOW_OTHERS_SEE_ME')?>
        </a>
    	<a class="btn-admin btn btn-darkan" href="{{ url('/darkanpanel') }}" target="_blank" id="lms" class="lms">
    		<i class="fa fa-line-chart fa-fw"></i> <?=Lang::get('portal.ADMIN_PANEL')?>
    	</a>
    	<a class="btn-admin btn btn-darkan" id="portaloptions">
    		<i class="fa fa-cogs fa-fw"></i> <?=Lang::get('portal.settings')?>
    	</a>
	</div>
	

	<div class="well text-center">
		<h4>
			<?=Lang::get('portal.choose_your_skin') ?>
		</h4>
		@foreach ($portalSkins as $portalSkin)
			@if ($portalSkin->public)
			<div class="portal-skin col-md-4" skin="{{ $portalSkin->name }}" skinurl="{{ asset('/css/portal/' . $portalSkin->name . '/portalstyles.css') }}">
				<div class="thumbnail visible <?=$portalSkin->active ? 'active' : ''?>">
					<img src="{{ asset('/css/portal/' . $portalSkin->name . '/thumb.png') }}">
					<div class="caption">
						<?=Lang::get('portal.skin_name_' . $portalSkin->name )?>
					</div>
				</div>
			</div>
			@endif
		@endforeach
		<div class="clearfix"></div>
	</div>

	<div class="clearfix"></div>

	
	<div class="presentations-wrapper">
		
		

		<h3>
			<?=Lang::get('portal.YOUR_CONTENT') ?>
		</h3>
		<div>
			<i><?=Lang::get('portal.dragToChangePosition') ?></i>
		</div>

		<hr/>
		<div class="row my-content">
			<div class="sortable-content">

				@if ($userPublications)

					@foreach($userPublications as $publication)
						<div class="col-md-4 publication-block">
							<div class="thumbnail <?= $publication['active'] == 1 ? 'visible' : '' ?>">
								<a target="_blank" href="{{ url('/content/') }}/{{ $publication['path'] }}">
									<div class="image-container popupiframe"
									href="{{ $publication['iframe'] }}" 
	                                image-url="{{ $publication['thumb'] }}" 
	                                project-title="{{ $publication['name'] }}" 
	                                hash="{{ $publication['path'] }}" 
									>
										<img src="{{ $publication['thumb'] }}"  onerror="this.onerror=null;this.src='{{asset('/css/img/social_logos/155x100.png')}}'" class="portal-content-image visible">
										<div class="play-sign showonhover animated fadeIn"></div>
									</div>
								</a>
								<div class="caption">
									<h3>{{ $publication['name'] }}</h3>
									<p class="thumbnail-caption-shorten">{{ $publication['summary_shorten'] }}</p>
									<p class="thumbnail-caption">{{ $publication['summary'] }}</p>
									<p class="buttons-container text-right">
										@if($publication['show_readmore'])
											<button class="btn btn-primary btn-darkan-color btn-readmore">
												<?=Lang::get('portal.READMORE')?>
											</button>
										@endif
									</p>
									<hr/>
									<p class="options-container text-right">
										<button class="project-visible btn btn-info <?= $publication['active'] == 1 ? 'visible' : '' ?>" pid="{{ $publication['id_banner'] }}">
											<?=Lang::get('portal.SHOWHIDE')?>
										</button>
										<a target="_blank" href="{{ url('/editor/') }}/{{ $publication['project_id'] }}">
											<button class="btn btn-success  btn-edit">
												<?=Lang::get('portal.EDIT')?>
											</button>
										</a>
										<button class="btn btn-danger btn-remove project-delete" pid="{{ $publication['id_banner'] }}">
											<?=Lang::get('portal.DELETE')?>
										</button>
									</p>
								</div>
							</div>
						</div>
					@endforeach

				@else

					<a href="{{ url('/projects') }}">
						<h3>
							<center>
								<?=Lang::get('portal.NO_PROJECTS') ?>
							</center>
						</h3>
					</a>
				@endif

			</div>
		</div><!-- /.row -->
		
		
	</div>
	
</div>

<div class="topmenu-offset"></div>


@include('web.pages.portal.portaloptions')

<script type="text/javascript" src="{{ asset('/js/libs/confirmation/bootstrap-confirmation.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/portal/portal.js') }}"></script>







@endsection