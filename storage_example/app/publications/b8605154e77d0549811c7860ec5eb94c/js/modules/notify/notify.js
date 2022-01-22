function _Notify(message, type) {
	type = type || 'info';
	$.notify({
		// options
		message: message
	},{
		// settings
		type: type,
		z_index: 2000,
		animate: {
			enter: 'animated fadeInDown',
			exit: 'animated fadeOutUp'
		},
		element: '#stage',
		placement: {
			from: "top",
			align: "center"
		},
		delay:1000,
		timer:1000
	});
}