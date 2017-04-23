function WindowFactory(){

}

WindowFactory.createProggressBarWindow = function(data){

	var windowModel = new ProggressBarModel();

	var windowView = new ProggressBarView( { windowModel: windowModel, data:data } );

	return windowView;
}

WindowFactory.createProggressBarWindowNoModal = function(data){

	var windowModel = new ProggressBarModel({ modal:false });

	var windowView = new ProggressBarView( { windowModel: windowModel, data:data } );

	return windowView;
}