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
			enter: 'animated fadeInRight',
			exit: 'animated fadeOutRight'
		}
	});
}