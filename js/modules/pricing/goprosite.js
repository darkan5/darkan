var PricingPage = function() {
	this.initButtons();
	this.initFunctionalityTitles();
};

PricingPage.prototype.initButtons = function() {
	$('.loginrequired').click(function() {
		_Notify(Lang.get('pricing.LOGIN_REQUIRED'), 'warning');
	})
};


PricingPage.prototype.initFunctionalityTitles = function() {
	$('.planContainer li[title]').tooltip({
		animation: false
	});
}

//////////////////////////
$(document).ready(function(){
	var pricingPage = new PricingPage();
});
