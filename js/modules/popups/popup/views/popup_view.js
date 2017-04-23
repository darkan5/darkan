var PopupView = WindowView.extend({

    tagName: 'div',
    className : 'window popup',

    template: _.template($('#popup-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .popup-ok-button': 'okButtonClick',
            'click .popup-cancel-button': 'cancelButtonClick'
        });
    },

    bindings: {
        '.window-top-bar': 'title',
        '.window-top-bar': 'content'
    },

    makeDraggable: function(modal) {

        var _that = this;

        if(modal){

            var content = this.$el.find('.popup-wrapper');

            content.draggable( {
                cursor: 'move',
                handle: ".window-top-bar"

            });

            content.css({ position:'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px'});



        }else{

            this.$el.draggable( {
                cursor: 'move',
                handle: ".window-top-bar"
            });
        }
    },



    runListeners :function(){
        // To overide
    },

    okButtonClick :function(){
        // To overide
    },

    cancelButtonClick :function(){
        // To overide
    },

    triggerOk :function(data){
        this.trigger('ok-button-click', data, this);
    },

    triggerCancel :function(data){
        this.trigger('cancel-button-click', data, this);
    },

    setContent: function(title) {
        this.windowModel.set('content', content);
    },
});
