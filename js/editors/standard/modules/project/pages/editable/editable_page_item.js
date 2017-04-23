var EditablePageItem = LoadedPageItem.extend({

	template: _.template($('#page-item-template').html()),
    pageSelectedByListTemplate: _.template($('#page-selected-by-list-template').html()),

	events: {

		'click .page-thumb': 'onClick',
        'click .dinamic-page-thumb-overlay': 'onClick',
        'mousedown': 'onMouseDown',

        'mousedown .page-notes': 'onMouseDown',

        'drop-item': 'dropItem',
        'click .page-show': 'changePageShow',
        'click .page-sound': 'showPageSoundWindow',
        'click .page-label': 'activeEditingPageName',
        'click .page-notes': 'goToPageNote',
        'blur input[name="pagename"]': 'changePageName',
        'keyup input[name="pagename"]': 'changePageName',
        'change .page-checkbox': 'selectPage',
        'data-picker-picked-page': 'dataPickerPicked',
	},

    dinamicPageThumbEl: undefined,
    dinamicPageThumbExists: undefined,
    changesWereMade: false,
    active : false,


	initialize: function( ) {
    	this.createListeners();
  	},

    reloadEvents: function(){
        this.model.get('options').off();
        this.model.off();
        this.$el.off();
        this.createListeners();

        this.delegateEvents();
    },

    addModelEvents :function(){

        // var _that = this;

        // this.model.on('set-active', function(value){

        //     _that.setActive( value );
        // });
    },

    dropItem: function(event, index) {
        this.$el.trigger('update-sort', [this.model, index]);
    },

    showPageSoundWindow: function(e) {
        var _that = this;
        var windowPosition = {
            top: e.pageY,
            left: e.pageX
        };

        var options = this.model.get('options');

        if(this.pageSoundSettingView == undefined){
            this.pageSoundSettingView = new PageSoundSettingWindow({ model: options });
            this.pageSoundSettingView.on('on-close', function(){
                _that.pageSoundSettingView = undefined;
                //_that.render();
            });

            this.pageSoundSettingView.on('delete-sound', function(model){
                 _that.deleteSound(model);
                 //_that.render();
            });

            var dataToRender = { pageModel: options.toJSON() };

            $('body').append( this.pageSoundSettingView.render(dataToRender).$el );
            this.pageSoundSettingView.setWindowPosition(windowPosition);
        }
    },

    activeEditingPageName: function(e) {
        var options = this.model.get('options');
        var pageName = options.get('pagename');

        var pageInput = $('<input name="pagename"  onfocus="this.value = this.value;" type="text" value="' + pageName + '">');
        $(e.target).html('').append(pageInput);

        pageInput.focus();
    },

    changePageName: function(e) {
        var _that = this;
        var pageName = undefined;

        clearTimeout(this.changePageNameTO);

        this.changePageNameTO = setTimeout(function() {

            switch(e.type) {
                case 'focusout':
                    pageName = $(e.target).val();
                    break;

                case 'keyup':
                    if (e.keyCode === 27 || e.keyCode === 13) {
                        pageName = $(e.target).val();
                    }
                    break;
            }

            if (pageName != undefined) {
                _that.setPageName(pageName);
            }
        },10);


    },

    setPageName: function(name) {
        var options = this.model.get('options');
        options.set('pagename', name);
        this.$el.find('.page-label').text(name);
    },

    changePageShow: function(e) {

        var options = this.model.get('options');
        var active = parseInt(options.get('active'));


        if (active === 1) {
            // this.$el.find('.page-show').addClass('page-hide');
            options.set('active', 0);
        } else {
            // this.$el.find('.page-show').removeClass('page-hide');
            options.set('active', 1);
        }
    },

    onChangePageShow: function(e) {
        var options = this.model.get('options');
        var active = parseInt(options.get('active'));

        if (active === 0) {
            this.$el.find('.page-show').addClass('page-hide');
        } else {
            this.$el.find('.page-show').removeClass('page-hide');
        }
    },

    createListeners: function() {

        var _that = this;

        this.model.get('options').view = this;
        this.model.view = this;

        this.addModelEvents();

        // this.model.on('update-coming', function(model){

        //     _that.model = model;

        //     _that.addModelEvents();

        //     _that.render();
        // });

        this.model.on('update-pagethumb', this.updatePagethumb, this);

        this.model.off('update-dintamic-page-thumb');
        this.model.on('update-dintamic-page-thumb', function(){

            clearTimeout(_that.pageThumbTimeout);

            _that.pageThumbTimeout = setTimeout(function(){
                _that.updateDinamicPageThumb();
            }, 50);
        });

        this.model.get('options').on('update-dintamic-page-thumb', function(){

            clearTimeout(_that.pageThumbTimeout);

            _that.pageThumbTimeout = setTimeout(function(){
                _that.updateDinamicPageThumb();
            }, 50);
        });



        //this.$el.on('data-picker-picked-page', this.dataPickerPicked, this);

        this.model.off('selected-by-miniature');
        this.model.on('selected-by-miniature', this.renderSelectByMinaiture, this);

        this.model.off('selected-by-picker-miniature-1');
        this.model.on('selected-by-picker-miniature-1', this.renderSelectByMinaiture, this);

        this.model.off("selected-by-trigger");
        this.model.on("selected-by-trigger", this.renderSelectByTrigger, this);

        this.model.get('options').on("change", this.savePageOptions, this);

        // this.model.off("set-selected-coming");
        // this.model.on("set-selected-coming", function( options ) {

        //     // To do render ?

        //     _log('set-selected-coming', options, _log.error);

        // });

        this.listenTo(this.model, 'checkbox-selected', this.renderSelectedCheckbox);
        this.listenTo(this.model.get('options'), 'change:pagename', this.renderPageName);

        this.listenTo(this.model.get('options'), 'change:active', this.onChangePageShow);

        this.listenTo(this.model.get('options'), 'change:note', this.changeNoteIcon);
        this.listenTo(this.model.get('options'), 'change:image', this.onImageChanged);
        this.listenTo(this.model.get('options'), 'change:soundfilename', this.onSoundChanged);

        //this.render();


    },

    dataPickerPicked : function(){

        this.trigger('data-picker-picked', this.model, this);
    },

    updatePagethumb: function() {

        var _that = this;

        this.model.changesWereMade = false;

        var pageOptions = _that.model.get('options').toJSON();

        _log('updatePagethumb', pageOptions);


        var thumPath = __meta__.projects_link + __meta__.ownerID +"/"+ __meta__.projectID +"/pre/exported_view/"+ pageOptions.pageid +"/pagethumb.jpg?r="+ new Date().getUTCMilliseconds();

        //alert('updating for page: ' + thumPath);

        // set load queue
        var loadQueue = new createjs.LoadQueue();
        loadQueue.on("complete", function() {
            _that.$el
                .find('.page-thumb')
                .css({
                    'background-image': "url('"+thumPath+"')"
                })
                .show();

            _that.destroyDinamicPageThumb();
        });
        loadQueue.loadFile(thumPath);



    },

    savePageOptions : function( ){

        var _that = this;

        var pageOptionsModel = _that.model.get('options');

        _log('updatePageOptions' , pageOptionsModel, _log.dataaccessIn);

        if(pageOptionsModel.onlyRefresh){
            return;
        }

        var picked = [];

        for(var item in pageOptionsModel.changed){
            picked.push(item);
        }

        var shortedPageOptions = pageOptionsModel;

        _log('picked' , picked, _log.dataaccessIn);

        if(picked.length > 0){
            var shortedPageOptions =  _.pickFromArray(pageOptionsModel.toJSON(), picked);
        }

        _log('shortedPageOptions' , shortedPageOptions, _log.dataaccessIn);


        DataAccess.updatePageOptions(
            { pageOptions: shortedPageOptions, pageId:_that.model.getPageId()  },
            function(data) { _log('Update page options result: ', data, _log.dataaccessOutResult)  },
            function(data) { _log('Update page options fault: ', data, _log.dataaccessOutFault)  }
        );

    },

    onImageChanged: function() {

        this.updateDinamicPageThumb();
    },

    onSoundChanged: function() {

        this.render();
    },

    updateDinamicPageThumb: function(afterCreate) {

        //alert('updateDinamicPageThumb');

        if (!this.dinamicPageThumbExists) {

            this.createDinamicPageThumb();
        }

        if (this.dinamicPageThumbExists) {

            if (!afterCreate) {
                this.model.changesWereMade = true;
            }
            

            var thumbHtml = StageView.instance.$el.find('.stage-view').html().replace(/name="[^"]*"/g, "");

            this.dinamicPageThumbEl.html(thumbHtml);

            var options = this.model.get('options').toJSON();

            var backgroundImageDiv = $('<div></div>', {
                class: 'page-thumb-background-image'
            }).css({
                width: options.width + "px",
                height: options.height + "px",
                'background-color': options.bgcolor
            });

            if (options.image) {
                backgroundImageDiv.css({
                    'background-image': 'url("' + __meta__.projects_link + __meta__.ownerID +'/'+ __meta__.projectID +'/pre/exported_view/'+ options.pageid +'/imgpage/'+options.image+'")'
                });
            }

            this.dinamicPageThumbEl.prepend(backgroundImageDiv);
        }

    },

    createDinamicPageThumb: function() {
        var _that = this;

        if (!this.dinamicPageThumbExists) {

            _log('PAGE PAGE', this);

            this.model.changesWereMade = false;

            var zoom = 150 / StageView.instance.model.get('options').get('width');

            var options = this.model.get('options').toJSON();


            this.dinamicPageThumbEl = $('<div>', {
                class: 'dinamic-page-thumb-container'
            });
            this.dinamicPageThumbEl.css({
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                position: 'absolute',
                // 'background-position': '50% 50%',
                // 'background-size': 'cover',
                // 'background-repeat': 'no-repeat',
                'transform': 'scale(' + zoom + ')',
                'transform': 'scale(' + zoom + ')',
                '-moz-transform': 'scale(' + zoom + ')',
                '-ms-transform': 'scale(' + zoom + ')',
                '-o-transform': 'scale(' + zoom + ')',
                '-webkit-transform': 'scale(' + zoom + ')',
                'transform-origin': '0px 0px'
            });

            var overlay = $('<div>', {
                class: 'dinamic-page-thumb-overlay'
            });
            overlay.css({
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                position: 'absolute',
                'z-index': 5
            });

            this.$el.find('.page-thumb').hide();

            this.$el.find('.dinamic-page-thumb-wrapper').html('');



            this.$el.find('.dinamic-page-thumb-wrapper').html(this.dinamicPageThumbEl);
            this.$el.find('.dinamic-page-thumb-wrapper').append(overlay);


            // this.dinamicPageThumbEl.parent().css({
            //     'background-size': (zoom * 100) + '% '+ (zoom * 100) +'%',
            //     'background-repeat': 'no-repeat',
            //     'background-position': '50% 50%',
            // });

            this.$el.find('.dinamic-page-thumb-wrapper').show();

            this.dinamicPageThumbExists = true;

            this.updateDinamicPageThumb(true);

        }

    },

    destroyDinamicPageThumb: function() {

        if (this.dinamicPageThumbExists) {

            this.dinamicPageThumbEl.remove();

            this.$el.find('.dinamic-page-thumb').remove();
            this.$el.find('.dinamic-page-thumb-wrapper').hide();

            this.dinamicPageThumbEl = undefined;

            this.dinamicPageThumbExists = false;
        }

    },

    showContextMenu: function(e) {


        var itemsSelectedNumb = 0;

        this.model.collection.each(function(model){
            if(model.isSelected){
                itemsSelectedNumb++;
            }
        });

        if(itemsSelectedNumb <= 1){

            this.unselectAllPages();

            this.model.isSelected = true;
            this.model.view.setCheckboxSelected(true);
        }

        var contextMenuView = new PageContextMenuView({ model: this.getModel(), view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    goToPageNote: function(){

        this.trigger('change-tab-editor', { tabName:'note' });
        this.setPageAsActive();
    },

    selectPageByUser: function() {

        var data = { pageId: this.model.get('options').get('pageid') };

        DataAccess.selectPageByUser(data);

        DarkanEditorAplicationAPI.getInstance().pageSelected(data);
    },

    renderSelectedBy: function(selectedBy){

        _log('renderSelectedBy', selectedBy);

        var pageSelectedBy = this.$el.find('.page-selected-by');

        var pageTemplate = this.pageSelectedByListTemplate({ selectedBy:selectedBy });

        pageSelectedBy.html(pageTemplate);
        pageSelectedBy.find('.page-selected-by-item').tooltip({
            html: true,
            animated: 'fade',
            placement: 'left'
        });
    },

    renderSelectByMinaiture : function(value){
        this.$el.attr('selected-by-miniature', value);
    },

    renderSelectByTrigger : function(value){
        this.$el.attr('selected-by-trigger', value);
    },
});