@extends('layouts.app')

@section('title')
{{ Lang::get('pricing.payment_thanks') }}
@stop

@section('description')
{{ Lang::get('pricing.payment_thanks') }}
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
				{{ Lang::get('pricing.payment_thanks') }}
			</h3>
			<h4>
				<strong>{{ Lang::get('pricing.payment_status') }}</strong> {{ $paymentData['payment_status'] }}
			</h4>
		</div>
			
	</div>

	<div class="well text-center">

		<h3>
			{{ Lang::get('pricing.see_active_plans') }}
			<a href="{{ url('/profile') }}">{{ Lang::get('portal.Subdomain_not_exists_2') }}</a>
		</h3>

	</div>

</div>

<div class="topmenu-offset"></div>
@endsection