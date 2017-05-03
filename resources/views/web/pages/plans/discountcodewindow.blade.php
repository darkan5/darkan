<script id="window-template" type="text/template"></script>
<script id="window-discount-code-template" type="text/template">
	<input type="button" class='window-close-button black-button'>
	<div class="window-content without-topbar">		
		<legend><?=Lang::get('pricing.discountCodeWindowHeader')?></legend>

		<div class="window-body">
			<h4 class="margin50-0"><?=Lang::get('pricing.discountCodeWindowBody')?></h4>
			<h4>
				<strong>
					<?=Lang::get('pricing.discountCodeWindowProduct')?>
				</strong>
			</h4>
			<h4><%=productDisplayName%></h4>
			<h4>
				<strong>
					<?=Lang::get('pricing.discountCodeWindowPrice')?>
				</strong>
			</h4>
			<h4>
				<%=currencyPre%><%=productPrice%><%=currencyPost%>
			</h4>

			<div class="form-group">
				
				<?php if (env('paypalLive')): ?>
					<form method="post" action="http://www.paypal.com/cgi-bin/webscr" class="paypal-form" target="_top">
						<input type="hidden" name="button" value="buynow">
						<input type="hidden" name="item_name" value="<?=productName?>">
						<input type="hidden" name="quantity" value="1">
						<input type="hidden" name="amount" value="<%=productPrice%>">
						<input type="hidden" name="currency_code" value="<%=currency%>">
						<input type="hidden" name="shipping" value="0">
						<input type="hidden" name="tax" value="0">
						<input type="hidden" name="custom" value="{{ $uniqueHash }}_<?= Auth::user()->user_id ?>_<%=promoCode%>">
						<input type="hidden" name="notify_url" value="{{ url('/paypalpayment') }}">
						<input type="hidden" name="return" value="{{ env('PAYPAL_REDIRECT_LINK') }}">
						<input type="hidden" name="cmd" value="_xclick">
						<input type="hidden" name="business" value="office@{{env('APP_URL')}}">
						<input type="hidden" name="bn" value="JavaScriptButton_buynow">
						<button type="submit" class="buybutton bestPlanButton">
							<?= Lang::get('pricing.submitCode') ?>
						</button>
					</form>
				<?php else: ?>
					<form method="post" action="http://www.sandbox.paypal.com/cgi-bin/webscr" class="paypal-form" target="_top">
						<input type="hidden" name="button" value="buynow">
						<input type="hidden" name="item_name" value="<%=productName%>">
						<input type="hidden" name="quantity" value="1">
						<input type="hidden" name="amount" value="<%=productPrice%>">
						<input type="hidden" name="currency_code" value="<%=currency%>">
						<input type="hidden" name="shipping" value="0">
						<input type="hidden" name="tax" value="0">
						<input type="hidden" name="custom" value="{{ $uniqueHash }}_<?= Auth::user()->user_id ?>_<%=promoCode%>">
						<input type="hidden" name="notify_url" value="{{ url('/paypalpayment') }}">
						<input type="hidden" name="return" value="{{ env('PAYPAL_REDIRECT_LINK') }}">
						<input type="hidden" name="env" value="www.sandbox">
						<input type="hidden" name="cmd" value="_xclick">
						<input type="hidden" name="business" value="pio.wiecaszek-facilitator@gmail.com">
						<input type="hidden" name="bn" value="JavaScriptButton_buynow">
						<button type="submit" class="buybutton bestPlanButton">
							<?= Lang::get('pricing.submitCode') ?>
						</button>
					</form>
				<?php endif; ?>
	        </div>
		</div>

	</div>
</script>


<!-- WINDOWS CSS -->
<link href="{{ asset('/css/windows/windows.css') }}" rel="stylesheet">
<link href="{{ asset('/css/windows/discount_code.css') }}" rel="stylesheet">

<script type="text/javascript" src="{{ asset('/js/modules/windows/window/models/window_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/windows/window/views/window_view.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/windows/discount_code/models/discount_code_window_model.js') }}"></script>
<script type="text/javascript" src="{{ asset('/js/modules/windows/discount_code/views/discount_code_window_view.js') }}"></script>

<script src="{{ asset('/js/modules/windows/factory/window_factory.js') }}"></script>