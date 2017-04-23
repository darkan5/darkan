var Plans = function() {

	this.initbuttons();
}

Plans.prototype.initbuttons = function() {

	var _that = this;

	$(document).on('click', '.edit-plan', function(e) { _that.editPlan(e); });
	$(document).on('click', '.delete-plan', function(e) { _that.deletePlan(e); });

};

Plans.prototype.editPlan = function(e) {

	var _that = this;

	var plan_id = $(e.currentTarget).attr('plan_id');
	var name = $(e.currentTarget).attr('name');
	var form_of_payment_id = $(e.currentTarget).attr('form_of_payment_id');
	var description = $(e.currentTarget).attr('description');
	var limit = $(e.currentTarget).attr('limit');
	var start_date = $(e.currentTarget).attr('start_date');
	var expiration_date = $(e.currentTarget).attr('expiration_date');
	var limit_enabled = $(e.currentTarget).attr('limit_enabled');
	var date_enabled = $(e.currentTarget).attr('date_enabled');
	var for_admin_only = $(e.currentTarget).attr('for_admin_only');
	var period = $(e.currentTarget).attr('period');
	var plans_period_type_id = $(e.currentTarget).attr('plans_period_type_id');
	var active = $(e.currentTarget).attr('active');
	var version_id = $(e.currentTarget).attr('version_id');


	var editPlanWindow = $('#edit-plan-window');
	editPlanWindow.find('input[name="plan_id"]').val(plan_id);
	editPlanWindow.find('input[name="name"]').val(name);
	editPlanWindow.find('select[name="form_of_payment_id"]').val(form_of_payment_id);
	editPlanWindow.find('input[name="description"]').val(description);
	editPlanWindow.find('input[name="limit"]').val(limit);
	editPlanWindow.find('input[name="start_date"]').val(start_date);
	editPlanWindow.find('input[name="expiration_date"]').val(expiration_date);
	editPlanWindow.find('select[name="limit_enabled"]').val(limit_enabled);
	editPlanWindow.find('select[name="date_enabled"]').val(date_enabled);
	editPlanWindow.find('select[name="for_admin_only"]').val(for_admin_only);
	editPlanWindow.find('input[name="period"]').val(period);
	editPlanWindow.find('select[name="plans_period_type_id"]').val(plans_period_type_id);
	editPlanWindow.find('select[name="active"]').val(active);
	editPlanWindow.find('select[name="version_id"]').val(version_id);

};

Plans.prototype.deletePlan = function(e) {

	var _that = this;

	var plan_id = $(e.currentTarget).attr('plan_id');

	var editPlanWindow = $('#delete-plan-window');
	editPlanWindow.find('input[name="plan_id"]').val(plan_id);

};

$(document).ready(function() {

	var plans = new Plans();

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