var TimerClockModel = Backbone.Model.extend({
	defaults:{
		hours: 0,
		minutes: 0,
		seconds : 0,
		hoursEnabled : true,
		minutesEnabled : true,
		secondsEnabled : true
	}
});