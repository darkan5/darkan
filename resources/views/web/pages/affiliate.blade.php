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
		<p class="lead"><?= Lang::get('affiliate.PP_INFO_1') ?></p>
		<p class="lead"><?= Lang::get('affiliate.PP_INFO_2') ?></p>
			
			<div class="col-lg-6 col-md-6 pp-mymoney text-center">
				<div class="panel panel-success">
					<div class="panel-heading">
		                <i class="fa fa-money fa-fw"></i> <?=Lang::get('affiliate.MY_MONEY') ?>
		            </div>


		            <div class="panel-body panel-success">
		                <div class="row">
		                        <i class="fa fa-money fa-5x"></i>
		                    <div class="money-text">
		                    	@if(!empty($myMoney))
			                    	@foreach($myMoney as $lang => $money)
			                    		<div class="huge">{{ $pricingData[$lang]['currency_pre'] }}{{ $money }}{{ $pricingData[$lang]['currency_post'] }}</div>
			                    	@endforeach
		                    	@else
		                    		<div class="huge">{{ $pricingData[config('app.pricing_locale')]['currency_pre'] }}0{{ $pricingData[config('app.pricing_locale')]['currency_post'] }}</div>
		                    	@endif
		                    </div>
		                </div>
		            </div>
		            <div class="panel-footer">
		                <button class="btn btn-success <?=5 >= 10 ? '' : 'disabled';?>"><?=Lang::get('affiliate.GIVE_ME_MONEY')?></button>
		                <div class="clearfix"></div>
		                <div class="">(<?=Lang::get('affiliate.PAYCHECKS_AMOUNT')?>: {{ $paidOut }})</div>
		            </div>
		        </div>
	        </div>

	        <div class="clearfix"></div>

			<h4 class="lead text-center"><strong><?= Lang::get('affiliate.PP_PEOPLE_1') ?> {{ $registeredAccounts }}</strong></h4>
			<h4 class="lead text-center"><strong><?= Lang::get('affiliate.PP_PEOPLE_2') ?> {{ $numberOfPayments }}</strong></h4>

			<hr/>

			<div class="text-center">
				<h3 class="lead"><?= Lang::get('affiliate.PP_INFO_3') ?></h3>

				<hr/>

				<h4 class="text-bold">
					<?=Lang::get('affiliate.your_link')?>
				</h4>
				<h4>
					{{ config('app.protocol') }}{{ config('app.domain') }}{{ config('app.folder') }}aff/{{ Auth::user()->hash }}
				</h4>
			</div>
			
	</div>
</div>

<div class="topmenu-offset"></div>

<div id="testcontent"></div>

<!-- <script type="text/javascript" src="http://darkan.local/test/js/api/darkan_api.js"></script> -->
<script type="text/javascript">
	// DarkanApi.get({
	// 	hash: 'ad4b872976ec0f643a77722d8e4fb3f8',
	// 	container: $('#testcontent')[0]
	// });
</script>

@endsection