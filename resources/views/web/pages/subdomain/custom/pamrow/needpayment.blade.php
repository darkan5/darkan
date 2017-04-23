<style type="text/css">
.username-extra-info {
    display: block;
}
</style>

@if (Auth::check() && !$portalSettings->topmenuon)
	<hr/>
	<div class="well loggedinas">
		<span>{{ Lang::get('portal.loggedInAs') }}: {{ Auth::user()->login }} </span>

		<form class="btn btn-englishfor" style="margin-left:40px" role="form" method="POST" action="{{ url('/subdomain/logout') }}">
			<button type="submit" class="btn-transparent">
				{{ Lang::get('portal.logout') }}
			</button>
			<input type="hidden" name="callbackurl" value="{{ url() }}">
		</form>
	</div>
	<hr/>
@endif

<div class="container marketing container-subdomain">

	<div class="custom-page-title"></div>
	<section class="darkan-vertical-timeline">
		<div class="vertical-timeline-block">
			<div class="vertical-timeline-dot"></div>
			<div class="cd-timeline-content content-left">
				{{ Lang::get('portal.portalneedpayment') }}
			</div>
		</div>
		<div class="vertical-timeline-block">
			<div class="vertical-timeline-dot"></div>
			<div class="cd-timeline-content content-right">
				{{ Lang::get('portal.paymentcost') }}: <?= $portalPrice ?> {{ $portalSettings->currency }}/72€ (up to the exchange rate)
			</div>
		</div>
		@if (!Auth::check())
		<div class="vertical-timeline-block">
			<div class="vertical-timeline-dot"></div>
			<div class="cd-timeline-content content-right">
				{{ Lang::get('portal.logintomakepayment') }}
			</div>
		</div>
		@endif
		<div class="vertical-timeline-block">
			<div class="vertical-timeline-dot"></div>
		</div>
	</section>
	
	@if (Auth::check())
	<p class="text-center">
		{{ Lang::get('portal.customPamrowHeader') }}
	</p>
	@endif
	<div class="align-center">
		<?php if (Auth::check()) { ?>
			<?php if (env('paypalLive')): ?>
				<form method="post" id="portal-form" action="https://www.paypal.com/cgi-bin/webscr" class="paypal-form text-center" target="_top">
					<input type="hidden" name="button" value="buynow">
					<input type="hidden" name="item_name" value="access_to:<?=$subdomainViewName?>">
					<input type="hidden" name="quantity" value="1">
					<input type="hidden" name="amount" value="<?= $portalPrice ?>">
					<input type="hidden" name="currency_code" value="{{ $portalSettings->currency }}">
					<input type="hidden" name="shipping" value="0">
					<input type="hidden" name="tax" value="0">
					<input type="hidden" name="custom" value="{{ $uniqueHash }}_<?= Auth::user()->user_id . '_' . $subdomainOwnerId ?>">
					<input type="hidden" name="notify_url" value="<?=config('app.protocol') . config('app.domain') . config('app.folder') . 'paypalpayment'?>">
					<input type="hidden" name="return" value="{{ $redirectUrl }}">
					<input type="hidden" name="cmd" value="_xclick">
					<input type="hidden" name="business" value="{{ $merchantMail }}">
					<input type="hidden" name="bn" value="JavaScriptButton_buynow">
					<button type="submit" class="paypal-button btn-makepayment paypal-confirm-payment large">{{ Lang::get('portal.customPamrowPaypalBtn') }}</button>
				</form>
			<?php else: ?>
				<form method="post" id="portal-form" action="https://www.sandbox.paypal.com/cgi-bin/webscr" class="paypal-form text-center" target="_top">
					<input type="hidden" name="button" value="buynow">
					<input type="hidden" name="item_name" value="access_to:<?=$subdomainViewName?>">
					<input type="hidden" name="quantity" value="1">
					<input type="hidden" name="amount" value="<?= $portalPrice ?>">
					<input type="hidden" name="currency_code" value="{{ $portalSettings->currency }}">
					<input type="hidden" name="shipping" value="0">
					<input type="hidden" name="tax" value="0">
					<input type="hidden" name="custom" value="{{ $uniqueHash }}_<?= Auth::user()->user_id . '_' . $subdomainOwnerId ?>">
					<input type="hidden" name="notify_url" value="<?=config('app.protocol') . config('app.domain') . config('app.folder') . 'paypalpayment'?>">
					<input type="hidden" name="return" value="<?=config('app.protocol_not_secure') . $subdomainName . '.' . config('app.domain') . config('app.folder')?>">
					<input type="hidden" name="env" value="www.sandbox">
					<input type="hidden" name="cmd" value="_xclick">
					<input type="hidden" name="business" value="pio.wiecaszek-facilitator@gmail.com">
					<input type="hidden" name="bn" value="JavaScriptButton_buynow">
					<button type="submit" class="paypal-button btn-makepayment paypal-confirm-payment large">Sandbox!</button>
				</form>
			<?php endif; ?>

			<div class="well">
				<?=Lang::get('portal.customPamrowBankTransfer')?>
			</div>
			<div class="well">
				<?=Lang::get('portal.customPamrowPostOfficeTransfer')?>
			</div>

			<p class="text-black"><strong>{{ Lang::get('portal.customPamrowBankInfo_pre') }}</strong></p>
			<div class="well">
				<p><strong>{{ Lang::get('portal.customPamrowBankInfo1') }}</strong></p>
				<p>{{ Lang::get('portal.customPamrowBankInfo2') }}</p>
				<p>{{ Lang::get('portal.customPamrowBankInfo3') }}</p>
				<p>{{ Lang::get('portal.customPamrowBankInfo4') }}</p>
				<p>{{ Lang::get('portal.customPamrowBankInfo5') }}</p>
				<p>{{ Lang::get('portal.customPamrowBankInfo6') }}</p>
				<p>{{ Lang::get('portal.customPamrowBankInfo7') }}</p>
				<p>{{ Lang::get('portal.customPamrowBankInfo8') }}</p>
				<p>{{ Lang::get('portal.customPamrowBankInfo9') }}</p>
				<p>{{ Lang::get('portal.customPamrowBankInfo10') }}</p>
			</div>


			<div style="margin:70px 0px"></div>


		<?php } else { ?>
			<h2 class="text-center login-text">
				{{ Lang::get('login.loginBtn') }}
			</h2>
			<hr/>

			@include('auth.loginsubdomain')
		<?php } ?>
	</div>
</div>