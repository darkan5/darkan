var PromoCodes = function() {

	this.initbuttons();
}

PromoCodes.prototype.initbuttons = function() {

	var _that = this;

	$(document).on('click', '.edit-promocode', function(e) { _that.editPromocode(e); });
	$(document).on('click', '.delete-promocode', function(e) { _that.deletePromocode(e); });

};

PromoCodes.prototype.editPromocode = function(e) {

	var _that = this;

	var promo_code_id = $(e.currentTarget).attr('promo_code_id');
	var code = $(e.currentTarget).attr('code');
	var limit = $(e.currentTarget).attr('limit');
	var rabat = $(e.currentTarget).attr('rabat');
	var start_date = $(e.currentTarget).attr('start_date');
	var expiration_date = $(e.currentTarget).attr('expiration_date');
	var limit_enabled = $(e.currentTarget).attr('limit_enabled');
	var date_enabled = $(e.currentTarget).attr('date_enabled');
	var active = $(e.currentTarget).attr('active');


	var editPromocodeWindow = $('#edit-promocode-window');
	editPromocodeWindow.find('input[name="promo_code_id"]').val(promo_code_id);
	editPromocodeWindow.find('input[name="code"]').val(code);
	editPromocodeWindow.find('input[name="limit"]').val(limit);
	editPromocodeWindow.find('input[name="rabat"]').val(rabat);
	editPromocodeWindow.find('input[name="start_date"]').val(start_date);
	editPromocodeWindow.find('input[name="expiration_date"]').val(expiration_date);
	editPromocodeWindow.find('select[name="limit_enabled"]').val(limit_enabled);
	editPromocodeWindow.find('select[name="date_enabled"]').val(date_enabled);
	editPromocodeWindow.find('select[name="active"]').val(active);

};

PromoCodes.prototype.deletePromocode = function(e) {

	var _that = this;

	var promo_code_id = $(e.currentTarget).attr('promo_code_id');

	var editPromocodeWindow = $('#delete-promocode-window');
	editPromocodeWindow.find('input[name="promo_code_id"]').val(promo_code_id);

};

$(document).ready(function() {

	var promoCodes = new PromoCodes();

	$(".datepicker-start-date-add").datetimepicker({
	    format:'Y-m-d H:i:s',
	    lang:'pl',
	    onChangeDateTime: function(dp, $input){
	        var dt2 = $('.datepicker-end-date-add');
	        var minDate = $('.datepicker-start-date-add').val();
	        var currentDate = new Date();
	        var targetDate = moment(minDate).toDate();
	        var dateDifference = currentDate - targetDate;
	        var minLimitDate = moment(dateDifference).format('YYYY/MM/DD');
	        var endDate = moment(dt2.val()).toDate();
	        if((currentDate - endDate) >= (currentDate - targetDate))
	            dt2.datetimepicker({
	                'value': minDate
	            });
	        dt2.datetimepicker({
	            'minDate': '-'+minLimitDate
	        });
	    }
	});
	$(".datepicker-end-date-add").datetimepicker({
	    format:'Y-m-d H:i:s',
	    lang:'pl'
	});


	$(".datepicker-start-date-edit").datetimepicker({
	    format:'Y-m-d H:i:s',
	    lang:'pl',
	    onChangeDateTime: function(dp, $input){
	        var dt2 = $('.datepicker-end-date-edit');
	        var minDate = $('.datepicker-start-date-edit').val();
	        var currentDate = new Date();
	        var targetDate = moment(minDate).toDate();
	        var dateDifference = currentDate - targetDate;
	        var minLimitDate = moment(dateDifference).format('YYYY/MM/DD');
	        var endDate = moment(dt2.val()).toDate();
	        if((currentDate - endDate) >= (currentDate - targetDate))
	            dt2.datetimepicker({
	                'value': minDate
	            });
	        dt2.datetimepicker({
	            'minDate': '-'+minLimitDate
	        });
	    }
	});
	$(".datepicker-end-date-edit").datetimepicker({
	    format:'Y-m-d H:i:s',
	    lang:'pl'
	});
});