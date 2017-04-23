@extends('layouts.app')

@section('title')
{{ Lang::get('pricing.title') }}
@stop

@section('description')
{{ Lang::get('pricing.description') }}
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

					<h2 class="what-to-do">
					</h2>
					@if(Auth::check() && Auth::user()->hasRole('affiliate'))
						<a href="{{ url('/affiliate') }}" target="_blank">
							<div class="diagram-item diagram-pp"><?=Lang::get('pricing.I_WANT_TO_EARN_MONEY')?></div>
						</a>
					@endif

					<section id="pricePlans">
						<ul id="plans">

							<li class="plan">
								<ul class="planContainer">
									<li class="title"><h2>Standard</h2></li>
									<li class="price"><p>{{ $pricingData['currency_pre'] }}{{ $pricingData['Darkan_standard_month']['price'] }}{{ $pricingData['currency_post'] }}<span>/<?=Lang::get('pricing.MONTH')?></span></p></li>
									<li>
										<ul class="options">
											<li class="plan-extra-info">
												<span><?=Lang::get('pricing.GOPRO_PLAN_STANDARD')?></span>
											</li>
										</ul>
									</li>
									<li 
										id="gpstandard" 
										@if(Auth::guest())
											class="button gopro-button loginrequired"
										@else
											class="button gopro-button"
										@endif
										>
										<a
										@if(!Auth::guest())
											href="{{ url('/pricing/standard') }}"
										@else
											href="#"
										@endif
										>
											<?= Lang::get('pricing.GOPRO_BUY') ?>
										</a>
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

							<li class="plan bestPlan">
								<ul class="planContainer">
									<li class="title"><h2 class="bestPlanTitle">Professional</h2></li>
									<li class="price"><p class="bestPlanPrice">{{ $pricingData['currency_pre'] }}{{ $pricingData['Darkan_pro_month']['price'] }}{{ $pricingData['currency_post'] }}/<?=Lang::get('pricing.MONTH')?></p></li>
									<li>
										<ul class="options">
											<li class="plan-extra-info">
												<span><?=Lang::get('pricing.GOPRO_PLAN_PRO')?></span>
											</li>
										</ul>
									</li>
									<li 
										id="gppro" 

										@if(Auth::guest())
											class="button gopro-button loginrequired"
										@else
											class="button gopro-button"
										@endif
										>

										<a
										@if(!Auth::guest())
											href="{{ url('/pricing/pro') }}"
										@else
											href="#"
										@endif
										>
											<?= Lang::get('pricing.GOPRO_BUY') ?>
										</a>
									</li>
								</ul>

								<hr/>
								<ul class="planContainer">
									<li>
										<ul class="functionalities">
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_1_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_1')?> <span>6 gb</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_2_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_2')?> <span>100</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_3_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_3')?> <span>100</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_4_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_4')?> <span>600 <?=Lang::get('pricing.PEOPLE')?></span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_6_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_6')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_7_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_7')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_8_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_8')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_9_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_9')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_11_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_11')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_12_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_12')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_13_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_13')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_14_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_14')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_15_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_15')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_16_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_16')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_17_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_17')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_18_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_18')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_19_DESC')?>"><span class="not-available"><?=Lang::get('pricing.GOPRO_FUNC_19')?></span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_20_DESC')?>"><span class="not-available"><?=Lang::get('pricing.GOPRO_FUNC_20')?></span></li>
										</ul>
									</li>
								
								</ul>

							</li>

							<li class="plan">
								<ul class="planContainer">
									<li class="title"><h2>E-learning Portal</h2></li>
									<li class="price"><p>{{ $pricingData['currency_pre'] }}{{ $pricingData['Darkan_lmslight_month']['price'] }}{{ $pricingData['currency_post'] }}<span>/<?=Lang::get('pricing.MONTH')?></span></p></li>
									<li>
										<ul class="options">
											<li class="plan-extra-info">
												<span><?=Lang::get('pricing.GOPRO_PLAN_ELEARNING')?></span>
											</li>
										</ul>
									</li>
									<li 
										id="gplmslight" 

										@if(Auth::guest())
											class="button gopro-button loginrequired"
										@else
											class="button gopro-button"
										@endif
										>


										<a
										@if(!Auth::guest())
											href="{{ url('/pricing/elearning') }}"
										@else
											href="#"
										@endif
										>
											<?= Lang::get('pricing.GOPRO_BUY') ?>
										</a>

									</li>
								</ul>

								<hr/>
								<ul class="planContainer">
									<li>
										<ul class="functionalities">
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_1_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_1')?> <span>6 gb</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_2_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_2')?> <span>100</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_3_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_3')?> <span>100</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_4_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_4')?> <span>1000 <?=Lang::get('pricing.PEOPLE')?></span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_6_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_6')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_7_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_7')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_8_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_8')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_9_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_9')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_11_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_11')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_12_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_12')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_13_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_13')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_14_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_14')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_15_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_15')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_16_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_16')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_17_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_17')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_18_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_18')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_19_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_19')?></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_20_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_20')?></li>
										</ul>
									</li>
								
								</ul>

							</li>

							<li class="plan">
								<ul class="planContainer">
									<li class="title"><h2>Enterprise</h2></li>
									<li class="price"><p><span><?=Lang::get('pricing.CONTACT_US')?></span></p></li>
									<li>
										<ul class="options">
											<li class="plan-extra-info">
												<span><?=Lang::get('pricing.GOPRO_COMPANY_INFO_PLAN')?></span>
											</li>
										</ul>
									</li>
									<li class="button">
										<a href="#" onClick="smartsupp('chat:open');return false;" class="open-chat"><?= Lang::get('pricing.FOOTER_CONTACT') ?></a>
									</li>
								</ul>

								<hr/>
								<ul class="planContainer">
									<li>
										<ul class="functionalities">
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_1_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_ENTERPRISE_1')?> <span>&infin;</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_2_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_ENTERPRISE_2')?> <span>&infin;</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_3_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_ENTERPRISE_2a')?> <span>&infin;</span></li>
											<li title="<?=Lang::get('pricing.GOPRO_FUNC_4_DESC')?>"><?=Lang::get('pricing.GOPRO_FUNC_ENTERPRISE_2b')?> <span>&infin; <?=Lang::get('pricing.PEOPLE')?></span></li>
											<li><?=Lang::get('pricing.GOPRO_FUNC_ENTERPRISE_3')?></li>
											<li><?=Lang::get('pricing.GOPRO_FUNC_ENTERPRISE_4')?></li>
											<li><?=Lang::get('pricing.GOPRO_FUNC_ENTERPRISE_5')?></li>
											<li><?=Lang::get('pricing.GOPRO_FUNC_ENTERPRISE_6')?></li>
											<li><?=Lang::get('pricing.GOPRO_FUNC_ENTERPRISE_7')?></li>
											<li><span><?=Lang::get('pricing.GOPRO_FUNC_ENTERPRISE_8')?></span></li>
										</ul>
									</li>
								
								</ul>
							</li>
						</ul> <!-- End ul#plans -->
					
					</section>

				</div>


				<div class="header-wrapper bottom-extra-info">
					<h2 class="gopro-section-description">
						<?=Lang::get('pricing.GOPRO_COMPANY_INFO')?>
					</h2>
				</div>

				<div class="promocode-section text-center">
					<div class="btn btn-darkan ihavepromocode"><?=Lang::get('pricing.iHavePromoCode')?></div>
					@if (Auth::check())
					<div class="panel promocodepanel animated fadeInLeft">
						<div class="content">
							<h4><?=Lang::get('pricing.paste_promo_code_info')?></h4>
							<div>
								<input class="form-control promocode-input" type="text" placeholder="<?=Lang::get('pricing.paste_promo_code_placeholder')?>">
							</div>
							<div class="promocode-feedback"></div>
						</div>
					</div>
					@endif
				</div>
	</div>
</div>

@if (Auth::check())
	@include('web.pages.plans.discountcodewindow')
@endif
<script type="text/javascript" src="{{ asset('/js/modules/pricing/pricing.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/pricing/goprosite.js') }}"></script>
@endsection