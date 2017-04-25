@extends('layouts.app')

@section('title')
{{ Lang::get('pricing.title_standard') }}
@stop

@section('description')
{{ Lang::get('pricing.description_standard') }}
@stop

@section('content')
<link href="{{ asset('/css/pricing.css') }}" rel="stylesheet">
<div class="topmenu-offset"></div>


<div id="main-content-wrapper-gp">
<!-- Marketing messaging and featurettes
================================================== -->
<!-- Wrap the rest of the page in another container to center all the content. -->

	<div class="container marketing">

				<div class="featurette-top">


					<section id="pricePlans" class="pricing-subpage">
						<ul id="plans">

							<li class="plan bestPlan">
								<ul class="planContainer">
									<li class="title"><h2 class="bestPlanTitle">Standard</h2></li>
									<li class="price"><p class="bestPlanPrice">{{ $pricingData['currency_pre'] }}{{ $pricingData['Darkan_standard_month']['price'] }}{{ $pricingData['currency_post'] }}<span>/<?=Lang::get('pricing.MONTH')?></span></p></li>
									<li>
										<ul class="options">
											<li class="plan-extra-info">
												<span><?=Lang::get('pricing.GOPRO_PLAN_STANDARD')?></span>
											</li>
										</ul>
									</li>
								</ul>
								<hr/>
								<ul class="planContainer">
									<li>
										<ul class="functionalities">
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_1_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_1')?> <span>2 gb</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_2_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_2')?> <span>25</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_3_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_3')?> <span>25</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_4_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_4')?> <span>400 <?=Lang::get('pricing.PEOPLE')?></span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_6_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_6')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_7_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_7')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_8_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_8')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_9_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_9')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_11_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_11')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_12_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_12')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_13_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_13')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_14_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_14')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_15_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_15')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_16_DESC')?>"><span class="not-available"><?=Lang::get('pricing.GOPRO_FUNC_16')?></span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_17_DESC')?>"><span class="not-available"><?=Lang::get('pricing.GOPRO_FUNC_17')?></span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_18_DESC')?>"><span class="not-available"><?=Lang::get('pricing.GOPRO_FUNC_18')?></span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_19_DESC')?>"><span class="not-available"><?=Lang::get('pricing.GOPRO_FUNC_19')?></span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_20_DESC')?>"><span class="not-available"><?=Lang::get('pricing.GOPRO_FUNC_20')?></span></li>
										</ul>
									</li>
								
								</ul>
							</li>

							<li class="panel text-center">
								<div class="content">
									<div class="header">Standard Plan</div>
									<span><?=Lang::get('pricing.GOPRO_PLAN_STANDARD')?>.</span>
								</div>
							</li>

							<li class="panel panel-half text-center">
								<div class="content">
									<h4><?= Lang::get('pricing.for_one_month') ?></h4>
									<p class="price price-block">
										{{ $pricingData['currency_pre'] }}{{ $pricingData['Darkan_standard_month']['price'] }}{{ $pricingData['currency_post'] }}</span>
									</p>
									<?php 

										if($pricingData['currency'] == 'PLN'){
											$priceingBrutto = $pricingData['Darkan_standard_month']['price'] * 1.23;

											?>

												<small>{{$priceingBrutto}}{{ $pricingData['currency_post'] }} brutto</small>

											<?php
										}
										
									?>

									@if ($paypalLive)
										<form method="post" action="http://www.paypal.com/cgi-bin/webscr" class="paypal-form" target="_top">
											<input type="hidden" name="button" value="buynow">
											<input type="hidden" name="item_name" value="Darkan_standard_month">
											<input type="hidden" name="quantity" value="1">
											<input type="hidden" name="amount" value="{{ $pricingData['Darkan_standard_month']['price'] }}">
											<input type="hidden" name="currency_code" value="{{ $pricingData['currency'] }}">
											<input type="hidden" name="shipping" value="0">
											<input type="hidden" name="tax" value="0">
											<input type="hidden" name="custom" value="{{ $uniqueHash }}_<?= Auth::user()->user_id ?>">
											<input type="hidden" name="notify_url" value="{{ url('/paypalpayment') }}">
											<input type="hidden" name="return" value="{{ env('PAYPAL_REDIRECT_LINK') }}">
											<input type="hidden" name="cmd" value="_xclick">
											<input type="hidden" name="business" value="office@darkan.local">
											<input type="hidden" name="bn" value="JavaScriptButton_buynow">
											<button type="submit" class="buybutton">
												<?= Lang::get('pricing.GOPRO_BUY') ?>
											</button>
										</form>
									@else
										<form method="post" action="http://www.sandbox.paypal.com/cgi-bin/webscr" class="paypal-form" target="_top">
											<input type="hidden" name="button" value="buynow">
											<input type="hidden" name="item_name" value="Darkan_standard_month">
											<input type="hidden" name="quantity" value="1">
											<input type="hidden" name="amount" value="{{ $pricingData['Darkan_standard_month']['price'] }}">
											<input type="hidden" name="currency_code" value="{{ $pricingData['currency'] }}">
											<input type="hidden" name="shipping" value="0">
											<input type="hidden" name="tax" value="0">
											<input type="hidden" name="custom" value="{{ $uniqueHash }}_<?= Auth::user()->user_id ?>">
											<input type="hidden" name="notify_url" value="{{ url('/paypalpayment') }}">
											<input type="hidden" name="return" value="{{ env('PAYPAL_REDIRECT_LINK') }}">
											<input type="hidden" name="env" value="www.sandbox">
											<input type="hidden" name="cmd" value="_xclick">
											<input type="hidden" name="business" value="pio.wiecaszek-facilitator@gmail.com">
											<input type="hidden" name="bn" value="JavaScriptButton_buynow">
											<button type="submit" class="buybutton">
												Sandbox!
											</button>
										</form>
									@endif


								</div>
							</li>

							<li class="panel panel-half text-center">
								<div class="content">
									<h4><?=Lang::get('pricing.for_one_year')?></h4>
									<p class="price price-block">
										{{ $pricingData['currency_pre'] }}{{ $pricingData['Darkan_standard_year']['price'] }}{{ $pricingData['currency_post'] }}</span>
									</p>

									<?php 

										if($pricingData['currency'] == 'PLN'){
											$priceingBrutto = $pricingData['Darkan_standard_year']['price'] * 1.23;

											?>

												<small>{{$priceingBrutto}}{{ $pricingData['currency_post'] }} brutto</small>

											<?php
										}
										
									?>


									@if ($paypalLive)
										<form method="post" action="http://www.paypal.com/cgi-bin/webscr" class="paypal-form" target="_top">
											<input type="hidden" name="button" value="buynow">
											<input type="hidden" name="item_name" value="Darkan_standard_year">
											<input type="hidden" name="quantity" value="1">
											<input type="hidden" name="amount" value="{{ $pricingData['Darkan_standard_year']['price'] }}">
											<input type="hidden" name="currency_code" value="{{ $pricingData['currency'] }}">
											<input type="hidden" name="shipping" value="0">
											<input type="hidden" name="tax" value="0">
											<input type="hidden" name="custom" value="{{ $uniqueHash }}_<?= Auth::user()->user_id ?>">
											<input type="hidden" name="notify_url" value="{{ url('/paypalpayment') }}">
											<input type="hidden" name="return" value="{{ env('PAYPAL_REDIRECT_LINK') }}">
											<input type="hidden" name="cmd" value="_xclick">
											<input type="hidden" name="business" value="office@darkan.local">
											<input type="hidden" name="bn" value="JavaScriptButton_buynow">
											<button type="submit" class="buybutton bestPlanButton">
												<?= Lang::get('pricing.GOPRO_BUY') ?>
											</button>
										</form>
									@else
										<form method="post" action="http://www.sandbox.paypal.com/cgi-bin/webscr" class="paypal-form" target="_top">
											<input type="hidden" name="button" value="buynow">
											<input type="hidden" name="item_name" value="Darkan_standard_year">
											<input type="hidden" name="quantity" value="1">
											<input type="hidden" name="amount" value="{{ $pricingData['Darkan_standard_year']['price'] }}">
											<input type="hidden" name="currency_code" value="{{ $pricingData['currency'] }}">
											<input type="hidden" name="shipping" value="0">
											<input type="hidden" name="tax" value="0">
											<input type="hidden" name="custom" value="{{ $uniqueHash }}_<?= Auth::user()->user_id ?>">
											<input type="hidden" name="notify_url" value="{{ url('/paypalpayment') }}">
											<input type="hidden" name="return" value="{{ env('PAYPAL_REDIRECT_LINK') }}">
											<input type="hidden" name="env" value="www.sandbox">
											<input type="hidden" name="cmd" value="_xclick">
											<input type="hidden" name="business" value="pio.wiecaszek-facilitator@gmail.com">
											<input type="hidden" name="bn" value="JavaScriptButton_buynow">
											<button type="submit" class="buybutton bestPlanButton">
												Sandbox!
											</button>
										</form>
									@endif
								</div>
							</li>

							<li class="panel text-center invoice-form">
								<div class="content">
									<h4>
										<label>
											<?=Lang::get('pricing.GOPRO_OPTION_SECSTEP_SUBTITLE')?>
											<input type="checkbox" id="invoice_selected" checked>
										</label>

									</h4>
									<div class="form-group">
										<input type="text" class="form-control" id="username" placeholder="<?=Lang::get('pricing.GOPRO_POPUP_INVOICE_FULLNAME')?>">
									</div>
									<div class="form-group">
										<input type="text" class="form-control" id="company" placeholder="<?=Lang::get('pricing.GOPRO_POPUP_INVOICE_COMPANYNAME')?>">
									</div>
									<div class="form-group">
										<input type="text" class="form-control" id="address" placeholder="<?=Lang::get('pricing.GOPRO_POPUP_INVOICE_ADDRESS')?>">
									</div>
									<div class="form-group">
										<input type="text" class="form-control" id="country" placeholder="<?=Lang::get('pricing.GOPRO_POPUP_INVOICE_COUNTRY')?>">
									</div>
								</div>
							</li>

							<li class="panel text-center">
								<div class="content">
									<h4><?=Lang::get('pricing.paste_promo_code_info')?></h4>
									<div>
										<input class="form-control promocode-input" type="text" placeholder="<?=Lang::get('pricing.paste_promo_code_placeholder')?>">
									</div>
									<div class="promocode-feedback"></div>
								</div>
							</li>

							<li class="panel text-center">
								<div class="content">
									<p><i><?=Lang::get('pricing.payment_extra_info')?></i></p>
								</div>
							</li>

						</ul> <!-- End ul#plans -->
					
					</section>

				</div>


				<div class="header-wrapper bottom-extra-info">
					<h2 class="gopro-section-description">
						<?=Lang::get('pricing.GOPRO_COMPANY_INFO')?>
					</h2>
				</div>
	</div>
</div>

@include('web.pages.plans.discountcodewindow')

<script type="text/javascript" src="{{ asset('/js/modules/pricing/pricing.js') }}"></script>
@endsection