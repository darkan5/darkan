var PasteComponentsItemView = Backbone.View.extend({

    tagName: "li",
    className: 'paste-components-item',

    template: _.template($('#paste-components-item-template').html()),

    events: function(){
        // return _.extend({},TriggerSubtriggerItemView.prototype.events,{
        //     'keyup .create-new-variable-item-name': 'changeValueName',
        //     'keyup .create-new-variable-item-value': 'changeValueValue',
        //     'click .create-new-variable-delete-button': 'deleteVariable',
        //     'drop-item' : 'dropItem'
        // });

        return {
            'click': 'pasteComponents',
        }
    },


    render: function(){

        var template = this.template( this.model.toJSON() );
        this.$el.html(template);

        this.addItems();

        return this;
    },

    addItems:function(){
        var components = this.model.get('components');
        var hashName = this.model.get('hashName');
        var hashId = this.model.get('hashId');

        for (var i = 0; i < components.length; i++) {
            var component = components[i];

            var imageFileName = component.imageFileName;

            if(imageFileName && imageFileName != ''){

                var imageFileName = component.imageFileName;
                var actionkey = component.actionkey;


                var userId = StageView.instance.model.ownerId // __meta__.ownerID;
                var projectId = StageView.instance.model.projectId;
                var pageId = StageView.instance.model.get('options').get('pageid');
                var r = '?r=' + new Date().getUTCMilliseconds();


                var path = __meta__.projects_link + userId + '/' + projectId + '/history/' + hashName + '/' + hashId + '/images/' + actionkey + '/' + imageFileName + r;

                var div = $('<div class="ex-object" componenttype="'+ component.type + '"></div>');


                div.css({
                    'background-image': 'url(\'' + path + '\')',
                    'background-repeat': 'no-repeat',
                    'background-position': '50% 50%',
                    'background-size': '100% 100%'
                });


                this.$el.append(div);

            }else{
                var div = $('<div class="ex-object" componenttype="'+ component.type + '"></div>');
                this.$el.append(div);
            }

        };
    },

    pasteComponents: function(){
        this.trigger('paste-components', this.model);
    }
});

