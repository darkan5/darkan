var PreladerView = Backbone.View.extend({

    className: 'preloader-view',

    template: _.template($('#preloader-view-template').html()),

    render: function(){
        var template = this.template(this.serializeData());
        this.$el.html(template);

        return this;
    },

    serializeData: function(){
        return {};
    }

});

var ProjectsListControllerLoader = PreladerView.extend({

});

var NotEditableProjectViewLoader = PreladerView.extend({

    className: 'loader preloader-view',

    events:{
        'close': 'remove'
    },

});

var CropWindowLoader = PreladerView.extend({

    className: 'loader preloader-view',

    events:{
        'close': 'remove'
    },

});

var PreviewProjectLoader = PreladerView.extend({

    className: 'preloader-view preloader-view-preview',

    template: _.template($('#preloader-view-preview-template').html()),
});

var LoadProjectLoader = PreladerView.extend({

});
