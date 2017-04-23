@extends('layouts.app')

@section('title')
{{ $subdomainViewName }} | Darkan
@stop

@section('description')
{{ $subdomainViewName }} | Darkan
@stop

@if (!$portalSettings->topmenuon)
<style type="text/css">
	.topmenu, .topmenu-offset , #cookieplicy-wrapper, #chat-application{
		display: none !important;
	}
</style>
@endif
@if (!$portalSettings->footeron)
<style type="text/css">
	.footer, .footer-company {
		display: none;
	}
</style>
@endif

@section('content')
<link href="{{ asset('/css/examples.css') }}" rel="stylesheet">
<link href="{{ asset('/css/portal.css') }}" rel="stylesheet">
<link href="{{ asset('/css/subdomain.css') }}" rel="stylesheet">
<link href="<?=asset('/css/portal/'. $portalSettings->skinName .'/portalstyles.css') ?>" rel="stylesheet">

<div class="topmenu-offset"></div>

<div class="container marketing container-portal">

	<div class="well portal-header">
		<div class="portal-image">
			<img src="{{ $userPhoto }}" alt="{{ $subdomainViewName }}" />
		</div>
		<div class="portal-title">
			<h2>{{ $subdomainViewName }}</h2>
			<span>
				<?=Lang::get('portal.number_of_publications')?> {{ count($userPublications) }}
			</span>
		</div>
			
	</div>

	@include($accessSubView)


</div>

<div class="topmenu-offset"></div>
<script type="text/javascript" src="{{ asset('/js/libs/confirmation/bootstrap-confirmation.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/portal/portal.js') }}"></script>
@endsection