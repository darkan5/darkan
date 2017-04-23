var MailingWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-mailing-view',

    template: _.template($('#window-mailing-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .banner-send': 'startSendingMails',
            'click .open-dstats': 'openStatsPanel'
        });
    },

    openStatsPanel: function() {
        window.open('http://' + __meta__.serverLink + "/lms");
    },

    afterRender: function() {
        this.$el.find('.darkan-tabs').tabs();
    },

    initEditors: function() {
        this.usersToSendInput = this.$el.find('.banner-mailing-userstosend');
        this.usersToSendInput.val('');
        this.usersToSendInput.tagsInput({
            defaultText: _lang('BANNER_TAGSTEXT'),
            height: 'auto',
            width: 'auto'
        });

        var defaultEditorValue = '<h2 style="font-style:italic">Witaj</h2><hr /><p>Poniżej link do kursu.</p><p>&nbsp;</p><p><a href="http://{LINK}" style="float:right;-moz-border-radius:4px;-moz-box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;-webkit-border-radius:4px;-webkit-box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;background-image:linear-gradient(top, #3BA4C7 0% ,#1982A5 100%);background:#3BA4C7;border-radius:4px;border:solid 1px #004F72;box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;color:#E5FFFF !important;filter:progid:DXImageTransform.Microsoft.gradient( startColorstr=&quot;#1982A5&quot;, endColorstr=&quot;#1982A5&quot;,GradientType=0 );font-weight:bold;font:18px Arial, Helvetica, sans-serif;padding:11px 32px;text-align:center;text-decoration:none;">Otw&oacute;rz</a></p>';
        this.$el.find('.banner-mailing-message').val(defaultEditorValue);
        this.mailingsEditor = CKEDITOR.replace(this.$el.find('.banner-mailing-message')[0]);
    },


    startSendingMails: function() {
        var _that = this;



        var dataForServer = {
            request: 1,
            mails: this.usersToSendInput.val().split(';|'),
            message: this.mailingsEditor.getData(),
            title: this.$el.find('.banner-mailing-title').val(),
            bannerID: this.model.get('id_banner')
        };

        this.showModal();

        DataAccess.sendMails(
            {
                request: JSON.stringify(dataForServer)
            },
            function(data) {
                _that.hideModal();
                // _that.getPublishedData();
            },
            function(data) { _log('data', data); }
        );   
        

        // $.ajax({
        //     type: 'POST',
        //     url: 'php/mailings.php?project=' + ACV.project_id,
        //     data: { request: JSON.stringify(dataForServer) },
        //     async: true,
        //     // dataType: 'json',
        //     success: function(data) {
        //         console.log(data);
        //         ret = data;
        //         _that.hideModal();
        //     },
        //     error: function(data) {
        //         _that.hideModal();
        //         _dl('==================== ERROR banners.php =======================');
        //         _dl(data);
        //         _dl('==============================================================');
        //         //$('#modal').hide();
        //     }
        // });
    },

    showModal: function() {
        this.$el.find('.window-inner-modal').fadeIn(400);
    },

    hideModal: function() {
        this.$el.find('.window-inner-modal').fadeOut(400);
    },
});