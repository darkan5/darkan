var Portal = function() {
	this.initButtons();

	this.applySortable();
};

Portal.prototype.initButtons = function() {
	var _that = this;





	$('.project-delete').confirmation({
        title: Lang.get('portal.remove_publication'),
        btnOkLabel: Lang.get('portal.yes'),
        btnCancelLabel: Lang.get('portal.no'),

        onConfirm: function() {
			var bannerId = $(this).attr('pid');
			var publicationBlock = $(this).closest('.publication-block');
			DataAccess.deletePublication(
				{bannerId: bannerId},
				function() {
					_log('publicationBlock', publicationBlock);
					publicationBlock.fadeOut();
				},
				function() {
				}
			);
        }
    });

	$('#send-access-request').click(function(e) { _that.sendAccessRequest(e) });

	$('.project-visible').click(function(e) { _that.showHide(e) });

	$('.btn-readmore').click(function() { _that.readMoreClick($(this)) });

	$('#portaloptions').click(function() { _that.showPortalOptionsWindow() });

	$('.portal-skin').click(function() { _that.changePortalSkin($(this)) });

	$('.loginregisterbutton').click(function(e) { _that.toggleLoginRegister(e) });

	this.initPaypalButton();
};


Portal.prototype.toggleLoginRegister = function(e) {
	e.preventDefault();
	$('#login-form').toggle();
	$('#register-form').toggle();
};

Portal.prototype.changePortalSkin = function(el) {
	var skinName = el.attr('skin');
	var skinurl = el.attr('skinurl');
	if (el.find('.thumbnail').hasClass('active')) { return; }

	$('.portal-skin .thumbnail').removeClass('active');
	el.find('.thumbnail').addClass('active');

    this.appendStyle(skinurl);

	DataAccess.changePortalSkin(
		{skinName: skinName},
		function() {
			_Notify(Lang.get('portal.settings_callback_success'), 'success');
		},
		function() {
			_Notify(Lang.get('portal.settings_callback_error'), 'danger');
		}
	);
}

Portal.prototype.appendStyle = function(skinurl){
	this.removeStyle();
    $('body').append('<link rel="stylesheet" href="' + skinurl + '" type="text/css" id="portal_style"/>');
}

Portal.prototype.removeStyle = function(){
    $("#portal_style").remove();
}

Portal.prototype.showPortalOptionsWindow = function() {

	var model = {};
    var portalOptionsWindow = WindowFactory.createPortalOptionsWindow(model);
    $('body').append(portalOptionsWindow.render().$el);
}

Portal.prototype.initPaypalButton = function() {
	var _that = this;

	$('#portal-form').submit(function(e, params) {
		var form = $(this);

		params = params == undefined ? {} : params;
		if(!params.paypal && form.hasClass('paypal-form-is-disabled')){
			e.preventDefault();
			return;
		}

		var itemName = $(this).find('input[name="item_name"]').attr('value');
		var hash = $(this).find('input[name="custom"]').attr('value');
		var price = $(this).find('input[name="amount"]').attr('value');
		var currency = $(this).find('input[name="currency_code"]').attr('value');

		var paymentData = {
			product: itemName,
			hash: hash,
			price: price,
			currency: currency,
			invoiceData: {
				fullname: '',
				company: '',
				address: '',
				country: ''
			}
		}
		form.addClass('paypal-form-is-disabled');


		if(!params.paypal){

			e.preventDefault();

			var loader = $('<div>', {
				class: 'paypal-form-loader'
			});

			var buyButton = $('.paypal-confirm-payment');
			buyButton.append(loader);

		    buyButton.prop('disabled', true);
		    buyButton.css({opacity: '.6'});
		    
			_that.savePayment(paymentData, function(){
				form.trigger('submit', { paypal: true });
			});
			return;
		}
	});
};


Portal.prototype.savePayment = function(data, onResult) {

	data.async = false;

	DataAccess.initPortalPayment(
		data,
		function() {
			onResult();
		},
		function() {
			_Notify(Lang.get('pricing.SAVE_PRICING_ERROR'), 'danger');
		}
	)
};


Portal.prototype.deletePublication = function(e) {

};


Portal.prototype.sendAccessRequest = function(e) {
	e.preventDefault();
	$('#send-access-request').attr('disabled', 'disabled');
	DataAccess.sendAccessRequest(
		{},
		function(response) {
			if (response.success) {
				$('#send-access-request')
					.attr('id', '')
					.addClass('text-success')
					.text(response.data.message);
			} else {
				$('#send-access-request')
					.attr('id', '')
					.addClass('text-danger')
					.text(response.data.message);
			}
			

		},
		function() {
			_log('request err');
		}
	);
};


Portal.prototype.readMoreClick = function(ob) {
	ob.hide();
	ob.closest('.thumbnail').find('.thumbnail-caption-shorten').hide();
	ob.closest('.thumbnail').find('.thumbnail-caption').show();
};


Portal.prototype.showHide = function(e) {
	var bannerId = $(e.currentTarget).attr('pid');
	DataAccess.showHidePublication(
		{bannerId: bannerId},
		function() {
			var publicationBlock = $(e.currentTarget).closest('.thumbnail');
			if (publicationBlock.hasClass('visible')) {
				publicationBlock.removeClass('visible');
			} else {
				publicationBlock.addClass('visible');
			}
		},
		function() {
		}
	);
};

Portal.prototype.applySortable = function() {
	var _that = this;
    
    $('.sortable-content').sortable({
        placeholder: "sortable-banners-placeholder col-md-4 publication-block",
        refreshPositions: true,
        scroll: false,
        tolerance: 'pointer',
        forcePlaceholderSize: true,
        delay: 200,
        start: function(e, ui) {
        	$('.sortable-banners-placeholder').css({
        		width: $(ui.item).width() + "px",
        		height: $(ui.item).height() + "px"
        	})
        },
        stop: function(event, ui) {

            // var sort_order = [ ];
            // $('.sortable-content').find('.image-container').each(function() {
            //     sort_order.push($(this).attr('path'));
            // });
            
            
            // var request = {
            //     request: 23,
            //     sort_order: sort_order
            // };

            // var ret = _that.ajaxRequest(request, true);

            var sortOrder = [ ];
            $('.sortable-content').find('.image-container').each(function() {
                sortOrder.push($(this).attr('hash'));
            });

	        DataAccess.sortPublication(
	            { sortOrder:sortOrder },
	            function(data){
	                _log('sortPublication', data, _log.dataaccessOutResult);

	                if(!data.success){

	                    _Notify('Fault');
	                    return;
	                }

	                _Notify('Success');

	                
	            },
	            function(data){
	                _log('sortPublication', data, _log.dataaccessOutFault);
	            }
	        );

        }
    });
    $('.presentations-wrapper .row.my-content').disableSelection();
}




//////////////////////////
$(document).ready(function(){
	var portal = new Portal();
});
