@extends('layouts.app')

@section('title')
{{ Lang::get('mails.accessRequestMailSubject') }}
@stop

@section('description')
{{ Lang::get('mails.accessRequestMailSubject') }}
@stop

@section('content')
<div class="topmenu-offset"></div>

<div class="container marketing container-portal">

	<div class="well text-center">
		<div class="portal-image">
			<img src="{{ asset('/css/img/greencheck.png') }}" />
		</div>
		<div class="portal-title">
			<h3>
				{{ Lang::get('portal.accessGranted') }}: {{ $requestSender }}
			</h3>
		</div>
			
	</div>

</div>

<div class="topmenu-offset"></div>
@endsection