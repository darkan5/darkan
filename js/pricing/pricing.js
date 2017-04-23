var RegisterParent = function() {

	this.initbuttons();
}

RegisterParent.prototype.initbuttons = function() {

	var _that = this;

	$(document).on('change keyup paste', '.promo-code', function(e) { _that.onPromoCodeChnged(e); });
};

RegisterParent.prototype.onPromoCodeChnged = function(e) {

	var promoCodeValue = $(e.target).val();

	if(promoCodeValue == ''){
		promoCodeValue = '*';
	}

	var forms = $('form');

	for (var i = 0; i < forms.length; i++) {
		var form = $(forms[i]);

		var promoCodeInput = form.find('.promo-code-input');
		promoCodeInput.val(promoCodeValue);
	};
}


$(document).ready(function() {

	var registerParent = new RegisterParent();
});