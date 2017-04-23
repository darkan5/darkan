var AddNewUserDealer = function() {

	this.initCkEditor();
};

AddNewUserDealer.prototype.initCkEditor = function() {
	var mailingsLoader = $('.mailing-message-loader');
	var mailingsEditor = CKEDITOR.replace($('.mailing-message')[0]);

	CKEDITOR.on( 'instanceReady', function( evt ) {
	   mailingsLoader.hide();
	   mailingsEditor.show();
	} );
}

var addNewUserDealer = new AddNewUserDealer();
