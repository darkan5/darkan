function _Notify(message, type) {
	type = type || 'info';
	$.notify({
		// options
		message: message
	},{
		// settings
		newest_on_top: true,
		offset: {
			y: 120,
			x: 20
		},
		type: type,
		z_index: 2000,
		animate: {
			enter: 'animated fadeInRight',
			exit: 'animated fadeOutRight'
		}
	});
}