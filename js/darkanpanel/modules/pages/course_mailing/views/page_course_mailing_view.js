var PageCourseMailingView = PageView.extend({
    template: '#page-course-mailing-view-template',

    ckTO: undefined,

    events:{
        'click .mailing-button-send' : 'sendMessage',
        'submit #mailing-address-form' : 'addMailToListFromInput',
        'click .add-mail-to-list-from-list' : 'addMailToListFromUsersList',
        'click .add-mail-to-list-from-group' : 'addMailToListFromUsersGroup',
        'click .delete-mail' : 'deleteMail'
    },

    regions: {
        usersList: '#assign-users-mailing-view',
        groupUsersMailing: '#assign-group-users-mailing-view'
    },

    initialize: function(data){

        this.model = new PageCourseMailingModel(data);
        this.model.on('change', this.onModelChanged, this);
    },

    

    sendMessage: function(){
        var _that = this;

        _log('sendMessage', this.model);

        var _that = this;

        var dataForServer = {
            request: 1,
            mails: this.model.get('users'),//this.usersToSendInput.val().split(';|'),
            title: this.$el.find('.mailing-title').val(), //  "Mailing title", //this.$el.find('.banner-mailing-title').val(),
            message: this.mailingsEditor.getData(),// "Mailing message", //this.mailingsEditor.getData(),
            bannerID:  this.model.get('courseId') // this.model.get('id_banner')
        };

        var progressDiv = this.$el.find('#mailing-progress-info').clone();
        var completionDiv = this.$el.find('#mailing-completed-info').clone();

        this.$el.html(progressDiv.show());

        DataAccess.sendMails(
            {
                request: JSON.stringify(dataForServer)
            },
            function(data) {
                _log('Message send', data);
                _that.$el.html(completionDiv.show());
            },
            function(data) { _log('data', data); },
            this

        );
    },

    addMailToListFromInput: function(e){
        e.preventDefault();

        var oneMail = this.$el.find('.mailing-address').val();

        if(oneMail != ''){
            this.addMailToList(oneMail);

            this.render();
        }
    },

    

    addMailToListFromUsersGroup: function(e){

        var _that = this;
        var groupId = parseInt($(e.target).attr('gid'));
        this.assignUsersView = new AsignGroupUsersToMailView({groupId:groupId});

        this.assignUsersView.on('assign-selected-mails', function(selectedUsers){
            _log('selectedUsers', selectedUsers);

            setTimeout(function(){
                _that.addMailsToList(selectedUsers);
                _that.renderUsersList();
            },1000);

           
        });
        

        this.groupUsersMailing.show(this.assignUsersView);
    },

    addMailToListFromUsersList: function(e){

        var _that = this;
        var groupId = parseInt($(e.target).attr('gid'));
        this.assignUsersView = new AsignUsersToMailView({groupId:groupId});

        this.assignUsersView.on('assign-selected-mails', function(selectedUsers){
            _log('selectedUsers', selectedUsers);

            setTimeout(function(){
                _that.addMailsToList(selectedUsers);
                _that.renderUsersList();
            },1000);

           
        });
        

        this.usersList.show(this.assignUsersView);
    },

    addMailToListFromGroup: function(e){

        var _that = this;
        var groupId = parseInt($(e.target).attr('gid'));
        this.assignUsersView = new AsignGroupUsersToMailView({groupId:groupId});

        this.assignUsersView.on('assign-selected-users', function(selectedUsers){
            _log('selectedUsers', selectedUsers);

            setTimeout(function(){
                _that.addMailsToList(selectedUsers);
                _that.renderUsersList();
            },1000);

           
        });
        

        this.usersList.show(this.assignUsersView);
    },

    addMailsToList: function(mailsArray){

        var users = this.model.get('users');

        for (var i = 0; i < mailsArray.length; i++) {
            var oneMail = mailsArray[i];

            
            if(users.indexOf(oneMail) == -1){
                users.push(oneMail);
            }
        };

    },

    addMailToList: function(oneMail){

        var users = this.model.get('users');


        if(users.indexOf(oneMail) == -1){
            users.push(oneMail);
        }
        
    },

    deleteMail: function(e){

        var index = parseInt($(e.target).attr('index'));
        var users = this.model.get('users');

        _.each(users, function(item, i){

             if(i == index ){
                 users.splice(i, 1);
             }
        });

        this.renderUsersList();

        
    },

    validateButtonSend: function(e){
        
        if(this.model.get('users').length > 0){
            this.$el.find('.mailing-button-send').removeAttr('disabled');
        }
    },

    renderUsersList: function() {
        var users = this.model.get('users');

        var panelBody = this.$el.find('.panel-body-users-list');
        panelBody.html('');

        var table = $('<table class="table table-striped table-bordered table-hover emails-list"></table>');

        var tHead = $('<thead>\
                            <tr>\
                                <th></th>\
                                <th>'+_lang("table_column_mail")+'</th>\
                                <th>'+_lang("table_column_options")+'></th>\
                            </tr>\
                        </thead>');

        table.append(tHead);                

        var tBody = $('<tbody class="emails-list-tbody">');

        _.each(users, function(mail, index){

            var tr = $('<tr class="odd gradeX">\
                                <td>'+(index + 1)+'</td>\
                                <td>'+mail+'</td>\
                                 <td>\
                                    <input class="btn btn-danger delete-mail" type="button" value="' +_lang('mailing_delete_mail_btn') +'" index="'+index+'">\
                                 </td>\
                            </tr>');


            tBody.append(tr);

        });

        table.append(tBody);    

        panelBody.append(table);    

        this.makeDataTable();
    },

    makeDataTable: function() {
        
        var _that = this;

        this.validateButtonSend();
        this.$el.find('.emails-list').DataTable({
            responsive: true,
            "language": {
                "lengthMenu": _lang('lengthMenu'),
                "zeroRecords": _lang('zeroRecords'),
                "info": _lang('info'),
                "infoEmpty": _lang('infoEmpty'),
                "infoFiltered": _lang('infoFiltered'),
                "search":         _lang('search'),
                "paginate": {
                    "first":      _lang('first'),
                    "last":       _lang('last'),
                    "next":       _lang('next'),
                    "previous":   _lang('previous')
                },
            }
        });
    },


    onRender: function() {
        var _that = this;

        this.makeDataTable();

        clearTimeout(this.ckTO);
        this.ckTO = setTimeout(function() {
            var defaultEditorValue = '<h2 style="font-style:italic">Witaj</h2><hr /><p>Poniżej link do kursu.</p><p>&nbsp;</p><p><a href="http://{LINK}" style="float:right;-moz-border-radius:4px;-moz-box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;-webkit-border-radius:4px;-webkit-box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;background-image:linear-gradient(top, #3BA4C7 0% ,#1982A5 100%);background:#3BA4C7;border-radius:4px;border:solid 1px #004F72;box-shadow:0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;color:#E5FFFF !important;filter:progid:DXImageTransform.Microsoft.gradient( startColorstr=&quot;#1982A5&quot;, endColorstr=&quot;#1982A5&quot;,GradientType=0 );font-weight:bold;font:18px Arial, Helvetica, sans-serif;padding:11px 32px;text-align:center;text-decoration:none;">Otw&oacute;rz</a></p>';
            _that.$el.find('.mailing-message').val(defaultEditorValue);
            _that.mailingsEditor = CKEDITOR.replace(_that.$el.find('.mailing-message')[0]);
        }, 1000)

    },
});