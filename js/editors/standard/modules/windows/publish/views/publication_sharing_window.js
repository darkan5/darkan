var PublicationSharingWindow = WindowView.extend({

    tagName: 'div',
    className : 'window window-view window-publication-sharing-template',

    template: _.template($('#window-publication-sharing-template').html()),

    fbButtonEnabled: true,

	initialize: function( data ) {
        this.model = data.projectModel;
        this.windowModel = new WindowModel();
		this.runListeners();
  	},

  	afterRender: function() {
  		this.populateLinks();
  	},

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .share-link-direct': 'selectWholeText',
            'click .share-link-portal': 'selectWholeText',
            'click .share-link-iframe': 'selectWholeText',
            'keydown .share-link-direct': 'preventDefault',
            'keydown .share-link-portal': 'preventDefault',
            'keydown .share-link-iframe': 'preventDefault',
            'click .fb-share': 'openSharingWindowFB',
            'click .gp-share': 'openSharingWindowGP',
            'click .twitter-share': 'openSharingWindowTwitter',
            'click .external-link-direct': 'openPublicationDirect',
            'click .external-link-portal': 'openPublicationPortal'
        });
    },

    openPublicationDirect: function() {
        window.open(this.getDirectLink());
    },

    openPublicationPortal: function() {
        window.open(this.getPortalLink());
    },

    enableFbButton: function() {
        this.fbButtonEnabled = true;
        this.$el.find('.fb-share').removeAttr('disabled');
        this.$el.find('.fb-share').css({
            opacity: '1'
        });
    },

    disableFbButton: function() {
        this.fbButtonEnabled = false;
        this.$el.find('.fb-share').attr('disabled', 'disabled');
        this.$el.find('.fb-share').css({
            opacity: '.4'
        });
    },

    openSharingWindowFB: function() {
        var _that = this;

        if (this.fbButtonEnabled) {

            this.disableFbButton();

            var picture = _that.model.get('thumb') != "none" ? _that.model.get('thumb') : window.location.protocol + "//" +__meta__.serverLink + "/assets/img/logo_normal.png";

                $.post(
                    'https://graph.facebook.com',
                    {
                        id: _that.getFbDirectLink(),
                        scrape: true
                    },
                    function(response){
                        window.open(
                            "https://www.facebook.com/sharer/sharer.php?u=" +
                                _that.getFbDirectLink()
                            ,
                            "share_window",
                            'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=500');

                        _that.enableFbButton();
                    }
                );


        }
    },

    openSharingWindowGP: function() {
        window.open('https://plus.google.com/share?url='+this.getPortalLink(), 'menubar=no','toolbar=no','resizable=yes','scrollbars=yes', 'height=450',' width=550',' top='+($(window).height()/2 - 225) +'',' left='+$(window).width()/2);
    },

    openSharingWindowTwitter: function() {
        window.open('http://twitter.com/share?url=' + this.getPortalLink() + '&text=' + this.model.get('name') + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    },

    preventDefault: function(e) {
        if (e.ctrlKey && e.keyCode == 67) {
            // copy link!
        } else {
            e.preventDefault();
            return false;
        }
    },

    selectWholeText: function(e) {
        var input = e.currentTarget;
        input.select();
    },

    populateLinks: function() {
        var _that = this;
        this.$el.find('.share-link-direct').val( _that.getDirectLink() );
        this.$el.find('.share-link-portal').val( _that.getPortalLink() );
        this.$el.find('.share-link-iframe').val( _that.getIframeCode() );
    },

    getDirectLink: function() {
        return __meta__.content_link + this.model.get('path');
    },

    getFbDirectLink: function() {
        return __meta__.facebook_link + this.model.get('path');
    },

    getPortalLink: function() {
        return __meta__.content_subdomain_link + this.model.get('path');
    },

    getIframeCode: function() {
        return '<iframe webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" width="1000" height="800" src='+ this.getDirectLink() +'></iframe>';
    },

    onClose : function(){
    	this.trigger('on-close');
    }
});