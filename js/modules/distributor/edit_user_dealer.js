var EditUserDealer = function() {

	this.init();
};

EditUserDealer.prototype.init = function() {

	$( ".datepicker" ).datepicker( {'dateFormat': 'yy-mm-dd' });
}

var editUserDealer = new EditUserDealer();
