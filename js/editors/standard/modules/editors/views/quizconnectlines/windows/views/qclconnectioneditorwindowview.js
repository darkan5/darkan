var QclConnectionEditWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-view qclconnectioneditorwindow-view editor-window',

    template: _.template($('#qclconnectioneditorwindow-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'change .qcl-option-align' : 'changeAlign',
            'change input[name="linewidth"]' : 'changeLineWidht',
            'change input[name="size"]' : 'changeSize',
            'change input[name="maxconnections"]' : 'changeMaxConnections'
        });
    },

    changeAlign: function(e) {
        var objs = this.componentModel.get('objs');
        var answers = this.componentModel.get('answers');

        var _objs = [];
        if (answers[this.line].form !== '')
            _objs.push(answers[this.line].from);

        _.each(answers[this.line].to, function(actionkey, index) {
            _objs.push(actionkey);
        });

        _.each(_objs, function(object, key) {
            objs[object].align = $(e.target).val();
        });

        this.componentModel.set('objs', objs);
        this.componentModel.trigger('change');

        this.componentModel.view.paintDots();
    },

    changeLineWidht: function(e) {
        var objs = this.componentModel.get('objs');
        var answers = this.componentModel.get('answers');

        var _objs = [];
        if (answers[this.line].form !== '')
            _objs.push(answers[this.line].from);

        _.each(answers[this.line].to, function(actionkey, index) {
            _objs.push(actionkey);
        });

        _.each(_objs, function(object, key) {
            objs[object].lineWidth = $(e.target).val();
        });

        this.componentModel.set('objs', objs);
        this.componentModel.trigger('change');

        this.componentModel.view.paintDots();
    },

    changeSize: function(e) {

        var objs = this.componentModel.get('objs');
        var answers = this.componentModel.get('answers');

        var _objs = [];
        if (answers[this.line].form !== '')
            _objs.push(answers[this.line].from);

        _.each(answers[this.line].to, function(actionkey, index) {
            _objs.push(actionkey);
        });

        _.each(_objs, function(object, key) {
            objs[object].size = $(e.target).val();
        });

        this.componentModel.set('objs', objs);
        this.componentModel.trigger('change');
        
        this.componentModel.view.paintDots();
    },

    changeMaxConnections: function(e) {
        var objs = this.componentModel.get('objs');
        var answers = this.componentModel.get('answers');

        var _objs = [];
        if (answers[this.line].form !== '')
            _objs.push(answers[this.line].from);

        _.each(answers[this.line].to, function(actionkey, index) {
            _objs.push(actionkey);
        });

        _.each(_objs, function(object, key) {
            objs[object].maxConnections = $(e.target).val();
        });

        this.componentModel.set('objs', objs);
        this.componentModel.trigger('change');
    },


	initialize: function( data ) {

        this.componentModel = data.componentModel;
        this.line = data.line;
        this.windowModel = new WindowModel();
		this.runListeners();
  	},

    afterRender: function() {
        // to override

        var _that = this;
        var objs = this.componentModel.get('objs');
        var answers = this.componentModel.get('answers');
        var connectionColor = objs[answers[this.line].from].color;


        this.colorPickerConnection = new ColorPickerView({ color: connectionColor });
        this.$el.find('.connection-color-picker').html(this.colorPickerConnection.render().$el);
        this.colorPickerConnection.on('move', function(data) {
            objs[answers[_that.line].from].color = data.color;

            _.each(answers[_that.line].to, function(val) {
                objs[val].color = data.color;
            });

            _that.componentModel.set('objs', objs);
            _that.componentModel.view.paintDots();
        });
        this.colorPickerConnection.on('change', function(data) {
            _that.componentModel.trigger('change');
        });
        this.colorPickerConnection.on('hide', function(data) {
            _that.colorPickerConnection.updateColorPicker({ color: objs[answers[_that.line].from].color });
        });
    },

    runListeners :function(){
        // To overide
    },

    onClose : function(){
    	this.trigger('on-close');
    }
});