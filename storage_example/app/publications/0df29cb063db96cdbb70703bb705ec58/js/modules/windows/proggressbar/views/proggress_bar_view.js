var ProggressBarView = WindowView.extend({

    className : 'window window-view proggress-bar-window',

    template: _.template($('#proggress-bar-window-template').html()),

    showingTimeout: undefined,

    initialize: function( data ) {
        this.windowModel = data.windowModel;
        this.runListeners();
    },

    loadAllPeges: function( ) {

        var assets = ProjectModel.instance.getAssetsToLoad();

        var assetsToLoad = [];

        for (var i = 0; i < assets.length; i++) {
            assetsToLoad = assetsToLoad.concat(assets[i]);
        };

        _log('assetsToLoad 12345', assetsToLoad);

        var pageModel = this.getFirstPageToLoad();

        this.startUploading(assetsToLoad, pageModel, true);
    },

    loadFirstPageAndOtherPegesInBackground: function( ) {

    },

    loadPage: function( pageModel ) {

        var assets = pageModel.getAssetsToLoad();

        _log('assetsToLoad 12345', assets);

        this.startUploading(assets, pageModel);
    },

    startUploading: function( assetsToLoad, pageModel, all ) {

        var _that = this;

        if(_.isUndefined(this.loadQueue)){

            var loadQueue = new createjs.LoadQueue(true);
            loadQueue.on("progress", function(e) { _that.onProgressLoading(e) });
            loadQueue.on("complete", function(e) { _that.onCompleteLoading(e, pageModel, all) });
            loadQueue.on("error", function(e) { _that.onCompleteLoading(e, pageModel, all) });

            this.loadQueue = loadQueue;
        } else {
            alert('cos jest nie tak');
        }
       

        //var assetsToLoad = ProjectModel.instance.getAssetsToLoad();

        if (assetsToLoad.length && window.location.protocol !== 'file:') {
            this.loadQueue.loadManifest(assetsToLoad);
        } else {
            this.onCompleteLoading({}, pageModel, all);
        } 
    },

    onProgressLoading: function(e) {
        // this.$el.find('.page-load-progressbar-text').text(parseInt(e.progress*100) + "%");
        // this.$el.find('.page-load-progressbar-inner').css({width: parseInt(e.progress*100) + "%"});

        // _log('%', parseInt(e.progress*100) + "%");

        // this.trigger('on-proggress', e);


        progress = parseInt(e.progress*100);
        if(progress<25){
            var angle = -90 + (progress/100)*360;
            this.$el.find(".animate-0-25-b").css("transform","rotate("+angle+"deg)");
        }
        else if(progress>=25 && progress<50){
            var angle = -90 + ((progress-25)/100)*360;
            this.$el.find(".animate-0-25-b").css("transform","rotate(0deg)");
            this.$el.find(".animate-25-50-b").css("transform","rotate("+angle+"deg)");
        }
        else if(progress>=50 && progress<75){
            var angle = -90 + ((progress-50)/100)*360;
            this.$el.find(".animate-25-50-b, .animate-0-25-b").css("transform","rotate(0deg)");
            this.$el.find(".animate-50-75-b").css("transform","rotate("+angle+"deg)");
        }
        else if(progress>=75 && progress<=100){
            var angle = -90 + ((progress-75)/100)*360;
            this.$el.find(".animate-50-75-b, .animate-25-50-b, .animate-0-25-b")
                                                  .css("transform","rotate(0deg)");
            this.$el.find(".animate-75-100-b").css("transform","rotate("+angle+"deg)");
        }
    },

    onCompleteLoading: function(e, pageModel, all) {

        var _that = this;

        //alert('onCompleteLoading');

        _log('onCompleteLoading', pageModel);

        pageModel.isLoaded = true;

        if(all){

            ProjectModel.instance.get('pages').each(function(pageModel) {
                pageModel.isLoaded = true;
            });
        }

        clearTimeout(this.showingTimeout);
        setTimeout(function(){
            _that.trigger('on-complete', pageModel, _that);
            // _that.close();
        }, 5);

        
    },

    onErrorLoading: function(e) {

        _log('onErrorLoading', e);
    },

    render : function(dataModel) {

        this.beforeRender();

        var template = this.template(dataModel);
        this.$el.html(template);

        var modal = this.windowModel.get('modal');

        if (modal) {
            var windowID = new Date().getUTCMilliseconds();
            this.$el.attr('windowid', windowID);
            this.addModalTransparent(windowID);
        }

        this.afterRender();

        // this.setWindowPosition();

        return this;
    },

    afterRender: function() {
        var _that = this;
        clearTimeout(this.showingTimeout);
        this.$el.hide();
        this.showingTimeout = setTimeout(function() {
            _that.$el.fadeIn(400);
        }, 300);
    },

    getFirstPageToLoad: function() {
        var par = Utils.getURLParam();
        for (var paramName in par) {
            if (paramName == 'p') {
                var pageOrder = parseInt(par[paramName]) - 1;
                var pageModel = ProjectModel.instance.get('pages').at( pageOrder );
                if (pageModel) {
                    return pageModel;
                }
            }
        }

        var firstPage = ProjectModel.instance.get('pages').at(0);
        return firstPage;
    },

    reset : function() {
        if(this.loadQueue){
            this.loadQueue.removeAll();
            this.loadQueue.reset();
        }
    },

    cancel : function() {
        if(this.loadQueue){
            this.loadQueue.removeAll();
            this.close();
        }
    },

    onClose : function(){
        this.reset();
        this.loadQueue = undefined;
    },

    addModalTransparent: function(windowID) {
        var modal = $('<div></div>', {
                class: 'modal-block-transparent'
            });
        this.modalWindowEl = modal;
        $(__meta__.darkanContainer).append(modal);
    },

});