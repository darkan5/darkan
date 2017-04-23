var TimerWindowModel = WindowModel.extend({
	defaults:{
		type:"",
		modal: false,
		draggable : true,

		hours: 0,
		minutes: 0,
		seconds : 0,
		hoursEnabled : false,
		minutesEnabled : true,
		secondsEnabled : true
	}
});