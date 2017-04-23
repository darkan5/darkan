var UserPlan = function() {

	this.initbuttons();
}

UserPlan.prototype.initbuttons = function() {

	var _that = this;

	$(document).on('click', '.delete-user-plan', function(e) { _that.deletePlan(e); });

	$(document).on('click', '.edit-user-plan', function(e) { _that.editPlan(e); });

};

UserPlan.prototype.editPlan = function(e) {

	var _that = this;

	var user_plan_id = $(e.currentTarget).attr('user_plan_id');
	var plan_id = $(e.currentTarget).attr('plan_id');
	var start_date = $(e.currentTarget).attr('start_date');
	var expiration_date = $(e.currentTarget).attr('expiration_date');
	var plan_cost_to_pay = $(e.currentTarget).attr('plan_cost_to_pay');
	var active = $(e.currentTarget).attr('active');
	var currency_id = $(e.currentTarget).attr('currency_id');
	var plan_options = $(e.currentTarget).attr('plan_options');


	var editCourseWindow = $('#edit-plan-window');
	editCourseWindow.find('input[name="user_plan_id"]').val(user_plan_id);
	editCourseWindow.find('select[name="plan_id"]').val(plan_id);
	editCourseWindow.find('input[name="start_date"]').val(start_date);
	editCourseWindow.find('input[name="expiration_date"]').val(expiration_date);
	editCourseWindow.find('input[name="plan_cost_to_pay"]').val(plan_cost_to_pay);
	editCourseWindow.find('select[name="active"]').val(active);
	editCourseWindow.find('select[name="currency_id"]').val(currency_id);
	editCourseWindow.find('textarea[name="plan_options"]').val(plan_options);
};

UserPlan.prototype.deletePlan = function(e) {

	var _that = this;

	var user_plan_id = $(e.currentTarget).attr('user_plan_id');

	var editCourseWindow = $('#delete-plan-window');
	editCourseWindow.find('input[name="user_plan_id"]').val(user_plan_id);
};

$(document).ready(function() {

	var userPlan = new UserPlan();

	$('.datepicker').datetimepicker({
     	  format:'Y-m-d H:i:s',
		  lang:'pl'
    }); 
});