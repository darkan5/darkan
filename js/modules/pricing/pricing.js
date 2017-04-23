var Pricing = function() {

	
	this.initForms();
	this.initSlider();
	this.initDiscountCode();
	this.initInvoiceFormButton();

	this.invoiceForm = $('.invoice-form');

	if (this.isInvoiceSelected()) {
		this.enableInvoiceFields();
	} else {
		this.disableInvoiceFields();
	}
	this.initFunctionalityTitles();
};

Pricing.prototype.initFunctionalityTitles = function() {
	$('.planContainer li[title]').tooltip({
		animation: false
	});
}

Pricing.prototype.initDiscountCode = function() {
	var _that = this;

	$('.ihavepromocode').click(function() {
		var button = $(this);
		var panel = $(this).parent().find('.promocodepanel');

		if (!panel.push()) {
			_Notify(Lang.get('pricing.LOGIN_REQUIRED_PROMOCODE'), 'warning');
		} else {
			button.fadeOut(500, function() {
				panel.show();
			});	
		}
	});


	var feedback = $('.promocode-feedback');
	var to;

	$('.promocode-input').on('keyup paste', function(){

		var $that = $(this);

		feedback.html('<div class="paypal-form-loader"></div>');

		clearTimeout(to);
		to = setTimeout(function() {
			if ($that.val() == '') { 
				feedback.html('');
				return; 
			}

			var data = { code: $that.val() };
			_that.checkDiscountCode(data, function(response) {
				_log('response', response);
				if (response.success) {
					feedback
						.attr('class', 'promocode-feedback text-success')
						.html(response.message);

					var model = {
						promoCode: response.promoCode,
						productName: response.productName,
						productDisplayName: response.productDisplayName,
						productPrice: response.productPrice,
						currencyPre: response.currencyPre,
						currencyPost: response.currencyPost,
						currency: response.currency,
					};

			        var discountCodeWindow = WindowFactory.createDiscountCodeWindow(model);
			        $('body').append(discountCodeWindow.render().$el);

				} else {
					feedback
						.attr('class', 'promocode-feedback text-danger')
						.html(response.message + response.expired);
				}
				
			});
		}, 500);
	});
}

Pricing.prototype.initSlider = function() {

	var _that = this;

	try{

		if(_.isUndefined(pricingDataObject)){
			return;
		}

	}catch(ex){
		return;
	}

	
	var sliderPlan = [{ 
					name: 'light',
					users: pricingDataObject.Darkan_lmslight_month.users, 
					month: pricingDataObject.Darkan_lmslight_month, 
					year: pricingDataObject.Darkan_lmslight_year 
				 },
				 {  
				 	name: 'standard', 	
				 	users: pricingDataObject.Darkan_lmsstandard_month.users, 
					month: pricingDataObject.Darkan_lmsstandard_month, 
					year: pricingDataObject.Darkan_lmsstandard_year 
				 },
				 {  
				 	name: 'pro', 
				 	users: pricingDataObject.Darkan_lmspro_month.users, 
					month: pricingDataObject.Darkan_lmspro_month, 
					year: pricingDataObject.Darkan_lmspro_year 
				 },
				 {  
				 	name: 'ultimate', 
				 	users: pricingDataObject.Darkan_lmsultimate_month.users, 
					month: pricingDataObject.Darkan_lmsultimate_month, 
					year: pricingDataObject.Darkan_lmsultimate_year 
				 }];



	var users = _.pluck(sliderPlan, 'users');

	_log('users', users);

	var slider = new Slider("#ex13", {
	    ticks: [0, 1, 2, 3],
	    ticks_labels: users,
	    //ticks_snap_bounds: 1,
	    animate: true,
	    step: 1,
	    value: 1,

        formatter: function(value) {

        	_that.setPlan(sliderPlan[value], pricingDataObject);

			return Lang.get('pricing.TOTAL_USERS') + sliderPlan[value].users;
		}
	});

	// slider.on('slide', function(value){
	// 	 _log('slide changed', value);
	// });
}

Pricing.prototype.setPlan = function(plan, pdo) {

	$('.price-block-month').html(pdo.currency_pre + plan.month.price + pdo.currency_post );
	$('.price-block-year').html(pdo.currency_pre + plan.year.price + pdo.currency_post);
	
	var paypalFormMonth = $('.paypal-form-month');
	var paypalFormYear = $('.paypal-form-year');

	var totalTsersTitle = $('.total-users-title');
	totalTsersTitle.html(plan.year.users);

	paypalFormMonth.find('input[name="item_name"]').val(plan.month.itemName);
	paypalFormYear.find('input[name="item_name"]').val(plan.year.itemName);

	paypalFormMonth.find('input[name="amount"]').val(plan.month.price);
	paypalFormYear.find('input[name="amount"]').val(plan.year.price);
}

Pricing.prototype.initForms = function() {
	var _that = this;
	// var paypalForms = $('.paypal-form');


	$(document).on('submit', '.paypal-form', function(e, params) {
		var paypalForms = $('.paypal-form');

		var form = $(e.target);

		params = params == undefined ? {} : params;

		_log('params', params);

		if(!params.paypal && form.hasClass('paypal-form-is-disabled')){
			e.preventDefault();
			return;
		}

		var formData = _that.getFormData(this);

		_log('formData', formData);
		

		
		var invoiceData = _that.getInvoiceData();

		if ( _that.isInvoiceSelected() ) {
			if ( !_that.isInvoiceFilled() ) {
				e.preventDefault();
				_that.showWarningOnInvoiceForm();
				return;
			}
		} else {
			invoiceData = _that.getBlankInvoiceData();
		}

		paypalForms.addClass('paypal-form-is-disabled');

		

		if(!params.paypal){

			e.preventDefault();

			_log('paypal = false', formData);

			var loader = $('<div>', {
				class: 'paypal-form-loader'
			});

			var buyButton = form.find('.buybutton');
			buyButton.append(loader);

			formData['invoiceData'] = invoiceData;

			_that.savePayment(formData, function(){
		
				form.trigger('submit', { paypal: true });
			});

			return;
		}

		_log('paypal = true', formData);

	});
};

Pricing.prototype.initInvoiceFormButton = function() {
	var _that = this;

	$('#invoice_selected').change(function() {
		if (_that.isInvoiceSelected()) {
			_that.enableInvoiceFields();
		} else {
			_that.disableInvoiceFields();
		}
	});
	
}

Pricing.prototype.enableInvoiceFields = function() {
	this.invoiceForm.find('input[type="text"]').removeAttr('disabled');
}

Pricing.prototype.disableInvoiceFields = function() {
	this.invoiceForm.find('input[type="text"]').attr('disabled', 'disabled');
}

Pricing.prototype.showWarningOnInvoiceForm = function() {
	var _that = this;

	var formOffset = _that.invoiceForm.offset().top;

	$('body').animate({ scrollTop: formOffset-200 }, { duration: 1000 });

	_that.invoiceForm.find('.content').addClass('panel-warning');

	setTimeout(function() {
		_that.invoiceForm.find('.content').removeClass('panel-warning');
	}, 2000);
}

Pricing.prototype.isInvoiceSelected = function() {
	return $('#invoice_selected').prop('checked');
}

Pricing.prototype.isInvoiceFilled = function() {
	var invoiceData = this.getInvoiceData();
	return 	invoiceData.fullname.length > 0 &&
			invoiceData.company.length > 0 &&
			invoiceData.address.length > 0 &&
			invoiceData.country.length > 0;
}

Pricing.prototype.getFormData = function(form) {
	return {
		product: $(form).find('input[name="item_name"]').attr('value'),
		price: $(form).find('input[name="amount"]').attr('value'),
		currency: $(form).find('input[name="currency_code"]').attr('value'),
		hash: $(form).find('input[name="custom"]').attr('value')
	}
};

Pricing.prototype.checkDiscountCode = function(data, onResult) {

	data.async = false;

	DataAccess.checkDiscountCode(
		data,
		function(response) {
			onResult(response);
		},
		function() {
			_Notify(Lang.get('pricing.checkDiscountCodeError'), 'danger');
		}
	)
};


Pricing.prototype.savePayment = function(data, onResult) {

	data.async = false;

	DataAccess.savePayment(
		data,
		function() {
			onResult();
		},
		function() {
			_Notify(Lang.get('pricing.SAVE_PRICING_ERROR'), 'danger');
		}
	)
};

Pricing.prototype.getInvoiceData = function() {
	return {
		fullname: $('#username').val(),
		company: $('#company').val(),
		address: $('#address').val(),
		country: $('#country').val()
	}
};

Pricing.prototype.getBlankInvoiceData = function() {
	return {
		fullname: '',
		company: '',
		address: '',
		country: ''
	}
};

//////////////////////////
$(document).ready(function(){
	var pricing = new Pricing();
});
