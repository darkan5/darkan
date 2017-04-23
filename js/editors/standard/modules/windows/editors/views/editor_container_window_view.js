var EditorConatinerWindowView = WindowView.extend({

    tagName: 'div',
    className : 'editor-container-window-view',

    template: _.template($('#window-editor-container-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            
        });
    },

    afterInitialize : function(data) {
        this.editorModel = data.data.editorModel;
    },

    appendEditor: function(model){

        var editorItemView = model.view;

        var tempModel = editorItemView.model;
        editorItemView.remove();
        editorItemView.model = tempModel;


        this.$el.find('.window-content').append(editorItemView.render().$el);
        editorItemView.afterRender();   

        editorItemView.show();

        editorItemView.setStageModelToEditor( StageView.instance.model );

        setTimeout(function(){
             editorItemView.onWindowResize();    
        }, 10);

        this.editorItemView = editorItemView; 

        
    },


    onClose : function(){

        this.trigger('on-close', this, this.editorModel);
    },

    afterRender: function() {
        this.makeResizable();
    },

    makeResizable: function() {

        var _that = this;

        this.$el.resizable({
            handles: "n, e, s, w, nw, ne, sw, se",

            resize: function(e){

                if(_that.editorItemView){
                    _that.editorItemView.onWindowResize(e);
                }  
            }
        });

        // if( parseInt(this.$el.css('width')) > 1000){
        //     this.$el.css('width', '800px');
        // }

        // if( parseInt(this.$el.css('height')) > 600){
        //     this.$el.css('height', '100px');
        // }
    },

});
