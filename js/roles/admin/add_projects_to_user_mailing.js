var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
   
    },

    initialize: function( ) {

        var defaultEditorValue = '<h2 style="font-style:italic">Witaj</h2><hr /><p>Przekopiowałem dla Ciebie projekty demo, które możesz udostępniać innym użytkownikom.</p><p>&nbsp;</p><p><a href="{LINK}" style="float:right;-moz-border-radius:4px;-moz-box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;-webkit-border-radius:4px;-webkit-box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;background-image:linear-gradient(top, #3BA4C7 0% ,#1982A5 100%);background:#3BA4C7;border-radius:4px;border:solid 1px #004F72;box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;color:#E5FFFF !important;filter:progid:DXImageTransform.Microsoft.gradient( startColorstr=&quot;#1982A5&quot;, endColorstr=&quot;#1982A5&quot;,GradientType=0 );font-weight:bold;font:18px Arial, Helvetica, sans-serif;padding:11px 32px;text-align:center;text-decoration:none;">Otw&oacute;rz</a></p>';
        
        defaultEditorValue = defaultEditorValue.replace('{LINK}', LINK);

        var mailingMessage = $('.mailing-message').val(defaultEditorValue);
        var mailingsEditor = CKEDITOR.replace(mailingMessage[0]);
        
    },

    render: function(){

    },

    serializeData: function(){
        return {};
    },

    afterRender: function(){
        
    },

});

var bodyView = new BodyView();