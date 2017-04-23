window.App = new Marionette.Application();

App.addRegions({
    appRegion: '#app',
    modalRegion: '#modal',
    listRegion: '#list'
    
});

App.Router = Marionette.AppRouter.extend({
    appRoutes: {
        '': 'index'
    }
});

App.Controller = Marionette.Controller.extend({
    index: function() {
        var view = new App.IndexView();
        App.appRegion.show(view);
    }
});

App.IndexView = Marionette.ItemView.extend({
    tagName: 'h1',
    template: _.template('Hello Marionette'),
    initialize: function(){

    }
});

var PersonModel = Backbone.Model.extend({
    name: '',
    surmame: '',
    age: '',
});

var PersonsCollection = Backbone.Collection.extend({
    model: PersonModel
});

var PersonItemView = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'person-item-view',
    template: '#item-template'
});

var PersonsCollectionView = Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: PersonItemView,
});



var personsArray = [];
personsArray.push({name: 'Jarosław',surname: 'Kutyna', age: '100'});
personsArray.push({name: 'Ktośtam',surname: 'Jakiśtam', age: '?'});
personsArray.push({name: 'Ktośtam2',surname: 'Jakiśtam2', age: '?'});

var personsCollection = new PersonsCollection(personsArray);
var personsCollectionView = new PersonsCollectionView({collection: personsCollection});


App.listRegion.show(personsCollectionView);


App.on("start", function() {
    App.controller = new App.Controller();
    
    App.router = new App.Router({
        controller: App.controller
    });
        
    Backbone.history.start();
});

$(function(){
    App.start();
});