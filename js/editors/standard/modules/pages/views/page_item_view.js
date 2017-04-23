var PageItemView = ItemView.extend({

	tagName: 'li',
	className: 'page',
	template: _.template($('#page-template').html()),
    pageSelectedByListTemplate: _.template($('#page-selected-by-list-template').html()),

    dinamicPageThumbEl: undefined,
    dinamicPageThumbExists: undefined,
    changesWereMade: false,

    active : false,

	events: {

		'click .page-thumb': 'onClick',
        'click .dinamic-page-thumb-overlay': 'onClick',
        'mousedown': 'onMouseDown',

        'mousedown .page-notes': 'onMouseDown',

		'drop-item': 'dropItem',
        'click .page-show': 'changePageShow',
        'click .page-sound': 'showPageSoundWindow',
        'click .page-label': 'activeEditingPageName',
        'click .page-notes': 'pageNote',
        'blur input[name="pagename"]': 'changePageName',
        'keyup input[name="pagename"]': 'changePageName',
        'change .page-checkbox': 'selectPage'
	},

    reloadEvents: function(){
        this.model.get('options').off();
        this.model.off();
        this.$el.off();
        this.createListeners();

        this.delegateEvents();
    },

    copyTrigger: function(){
        this.$el.trigger('copy-page-trigger', this.model, this);
    },

    pasteTrigger: function( pageTrigger ){
        this.model.get('options').set('triggers', JSON.parse(pageTrigger));

        this.$el.trigger('on-paste-page-trigger', this.model, this);
    },

    pageNote: function() {

        appController.bottomMenuView.$el.find('#menu-bottom-tabs').tabs('option', 'active', 5);
        appController.bottomMenuView.showMenu();

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
            this.model.setCheckboxSelected(true);
        }

        var contextMenuView = new PageContextMenuView({ model: this.getModel(), view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);
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
            

            var thumbHtml = StageView.instance.$el.html().replace(/name="[^"]*"/g, "");

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


    selectPage: function(e) {
        var selected = $(e.target).is(':checked');

        this.model.isSelected = selected;

        //this.createDinamicPageThumb();
    },

    unselectAllPages: function() {
        this.model.collection.each(function(model) {
            model.isSelected = false;
            model.setCheckboxSelected(false);

            model.view.closeSettingsWindows();
        });

        this.$el.trigger('unselect-all-pages');
    },



    dropItem: function(event, index) {
        this.$el.trigger('update-sort', [this.model, index]);
    },

	onClick :function(e) {

        if (e.shiftKey) {

            var pagesCollection = this.model.collection;
            var indexModel = pagesCollection.indexOf(this.model);

            var chFrom = 0;
            var chTo = 0;
            var check = false

            for (var i = indexModel; i >= 0; i--) {

                var model = pagesCollection.at(i);

                if (model.isSelected) {
                    chFrom = i;
                    chTo = indexModel;
                    check = true;
                    break;
                }
            }

            if (!check) {
                for (var i = indexModel; i < this.model.collection.length; i++) {

                    var model = pagesCollection.at(i);

                    if (model.isSelected) {
                        chFrom = indexModel;
                        chTo = i;
                        check = true;
                        break;
                    }
                }
            }

            if (check) {
                pagesCollection.each(function(model, iModel) {

                    if ((iModel < chFrom) || (iModel > chTo)) {
                        model.isSelected = false;
                        model.setCheckboxSelected(false);
                    } else {
                        model.isSelected = true;
                        model.setCheckboxSelected(true);
                    }

                });
            }

        } else if (e.ctrlKey) {

            if (this.model.isSelected) {
                this.model.isSelected = false;
                this.model.setCheckboxSelected(false);
            } else {
                this.model.isSelected = true;
                this.model.setCheckboxSelected(true);
            }

        } else {

            this.unselectAllPages();

            this.model.isSelected = true;
            this.model.setCheckboxSelected(true);

            this.setPage();

            //this.createDinamicPageThumb();
        }
	},

    unsetPageComing: function(login){

        var selectedBy = this.model.get('options').get('selectedBy');

        for (var i = 0; i < selectedBy.length; i++) {
            var item = selectedBy[i];

            if(item.login == login){
                selectedBy.splice(i, 1);

                this.model.get('options').set('selectedBy', selectedBy, {silent:true});
                this.renderSelectedBy();
            }
        };

    },

    unsetPage: function(){
        // remove from selected by

        // var selectedBy = this.model.get('options').get('selectedBy');

        // var login = __meta__.login;

        // var newSelectedBy = [];

        // for (var i = 0; i < selectedBy.length; i++) {
        //     var item = selectedBy[i];

        //     if(item.login != login){
        //         newSelectedBy.push( item );
        //     }
        // };

        // this.model.get('options').set('selectedBy', newSelectedBy, {silent:true});
        // this.model.get('options').trigger('change');

        // this.renderSelectedBy();

    },

    setPage: function(){

        this.trigger('setpage', this.model, this);
    },

    setSectionBy: function() {

        // var selectedBy = this.model.get('options').get('selectedBy');
        // var login = __meta__.login;

        // _log('selectedBy', selectedBy, _log.error);

        // var exist = selectedBy.indexOf(_.findWhere(selectedBy, { login:login }));

        // _log('exist', exist, _log.error);

        // if(exist == -1){
        //     selectedBy.push( { login:login } );
        // }

        // this.model.get('options').set('selectedBy', selectedBy, {silent:true});
        // this.model.get('options').trigger('change');

        // _log('selectedBy', this.model.get('options').toJSON(), _log.error);

        // this.renderSelectedBy();
    },

    initialize: function() {
        this.createListeners();
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



        this.$el.on('data-picker-picked-page', this.dataPickerPicked, this);

        this.model.on('selected-by-miniature', this.renderSelectByMinaiture, this);

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

    onImageChanged: function() {

        this.updateDinamicPageThumb();
    },

    onSoundChanged: function() {

        this.render();
    },

    changeNoteIcon: function() {

        var note = this.model.get('options').get('note');

        if (note === '') {
            this.$el.find('.page-notes').removeClass('page-notes-on');
        } else {
            this.$el.find('.page-notes').addClass('page-notes-on');
        }
    },

    renderSelectedCheckbox: function(value) {
        this.$el.find('.page-checkbox').prop('checked', value);
    },

    renderPageName: function() {
        var options = this.model.get('options');
        var pageName = options.get('pagename');

        this.$el.find('.page-label').text(pageName);
    },

    dataPickerPicked : function(){

        this.trigger('data-picker-picked', this.model, this);
    },

    addModelEvents :function(){

        var _that = this;

        this.model.on('set-active', function(value){

            _that.setActive( value );
        });
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

    setActive :function(value){

        this.active = value;
        this.$el.attr('active', value);
    },

	render: function(){

        var pageCollection = this.model.collection;

        var order = 0;

        if(pageCollection != undefined){
            var order = pageCollection.indexOf(this.model) + 1;
        }

        var options = {
            options: this.model.get('options').toJSON(),
            isSelected: this.model.isSelected,
            order: order
        }

		var pageTemplate = this.template(options);
        //this.$el.attr('active', this.model.get('active'));
	    this.$el.html(pageTemplate);

        this.renderSelectedBy();

        this.delegateEvents();

        this.dinamicPageThumbExists = false;

        this.addTitleToButtons();

		return this;
	},

    addTitleToButtons: function(){
        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'right',
            width: 300,
            height: 200
        });
    },

    deleteSound : function( pageOptionsModel ){

        var _that = this;

        _log('updatePageOptions', _that.model.get('options'), _log.dataaccessIn);

        if(pageOptionsModel.onlyRefresh){
            return;
        }

        DataAccess.updatePageOptions(
            { pageOptions: pageOptionsModel, action: 'delete-page-sound', pageId:_that.model.getPageId() },
            function(data) { _log('Update page options result: ', data, _log.dataaccessOutResult)  },
            function(data) { _log('Update page options fault: ', data, _log.dataaccessOutFault)  }
        );
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

        _log('picked' , picked, _log.dataaccessIn);

        var shortedPageOptions =  _.pickFromArray(pageOptionsModel.toJSON(), picked);

        _log('shortedPageOptions' , shortedPageOptions, _log.dataaccessIn);


        DataAccess.updatePageOptions(
            { pageOptions: pageOptionsModel, pageId:_that.model.getPageId()  },
            function(data) { _log('Update page options result: ', data, _log.dataaccessOutResult)  },
            function(data) { _log('Update page options fault: ', data, _log.dataaccessOutFault)  }
        );

    },

    renderSelectByMinaiture : function(value){
        this.$el.attr('selected-by-miniature', value);
    },

    renderSelectByTrigger : function(value){
        this.$el.attr('selected-by-trigger', value);
    },

    renderSelectedBy: function(){

        

        // var selectedBy = this.model.get('options').get('selectedBy');
        // _log('renderSelectedBy', selectedBy);

        // var pageSelectedBy = this.$el.find('.page-selected-by');

        // var pageTemplate = this.pageSelectedByListTemplate(this.model.toJSON());

        // pageSelectedBy.html(pageTemplate);
        // pageSelectedBy.find('.page-selected-by-item').tooltip({
        //     html: true,
        //     animated: 'fade',
        //     placement: 'left'
        // });
    },

    closeSettingsWindows: function(){
        if(this.pageSoundSettingView != undefined){
            this.pageSoundSettingView.remove();
            this.pageSoundSettingView = undefined;
        }
    },

    renderFlip: function(){

    },

    beforeDestroy : function(){

        // To override
    },

    destroy : function(){

        this.beforeDestroy();
        this.unbind();
        this.remove();
    },

});