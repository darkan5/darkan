var SecondPagesListView = PagesListView.extend({

    el: "#other-projects-container",
    selectedPageModel: null,

    events: {
        'change .second-pages-list-select': 'secondPagesListChanged',
        'click .second-pages-list-copy-page': 'copyPages',
        'click .select-all-pages': 'selectedAllPages',
        'click .second-pages-list-open-page': 'openInNewTab'
    },

    initialize: function( data ) {


        //this.collection = data.collection;
        this.$el.find('#second-pages-list-wrapper').perfectScrollbar();

        var userProjectData = data.data.userProjectData;
        var shareProjectData = data.data.shareProjectData;
        var shareTemplateProjectData = data.data.shareTemplateProjectData;
        var templateProjectData = data.data.templateProjectData;

        var secondPagesListSelect = $('.second-pages-list-select');

        var firstOption = $('<option />')
            .html(_lang('TOOLBAR_OPEN_SECOND_SELECT_TITLE'));

        secondPagesListSelect.append(firstOption);

        this.loadSelect(_lang('TOOLBAR_SECOND_PROJECT_SELECT_MINE'), userProjectData, secondPagesListSelect);
        this.loadSelect(_lang('TOOLBAR_SECOND_PROJECT_SELECT_MINE_TEMPLATES'), templateProjectData, secondPagesListSelect);
        this.loadSelect(_lang('TOOLBAR_SECOND_PROJECT_SELECT_SHARED'), shareProjectData, secondPagesListSelect);
        this.loadSelect(_lang('TOOLBAR_SECOND_PROJECT_SELECT_SHARED_TEMPLATES'), shareTemplateProjectData, secondPagesListSelect);

        this.$el.find('.second-pages-list-select').chosen({ width: '130px' });
    },

    openInNewTab: function(){

        var select = this.$el.find('.second-pages-list-select');

        var projectId = select.val();
        var userId = select.find(':selected').attr('userid');

        var href = window.location.href;

        var arr =  href.split('/');

        arr[arr.length - 1] = projectId;

        href = arr.join('/');

        window.open(href,'_blank');
    },

    selectedAllPages: function() {


        var pagesCollection = this.collection;
        var setActive = true;
        var _act = true;
        var _uni = true;

        pagesCollection.each(function(childModel, index) {

            if (index == 0) {
                _act = childModel.isSelected;
            }

            if (_uni && _act !== childModel.isSelected) {
                _uni = false;
            }

        });

        if (_uni) {

            if (_act == false)
                setActive = true;
            else
                setActive = false;
        }

        pagesCollection.each(function(childModel) {

            childModel.isSelected = setActive;

            childModel.setCheckboxSelected(setActive);

        });
    },

    copyPages: function(){

        var _that = this;

        var select = this.$el.find('.second-pages-list-select');

        var projectId = select.val();
        var userId = select.find(':selected').attr('userid');

        var pageIdsListToCopy = this.getIdsFromSelectedPages( this.collection );

        this.addCopyPage( pageIdsListToCopy, userId, projectId );

    },

    addCopyPage : function( pageListToCopy, userId, projectId ){

        var _that = this;

        var oldPageId = User.getModel().get('activePageId');

        DataAccess.copyPage(
            { pageListToCopy: pageListToCopy, sourceUserId:userId, sourceProjectId:projectId, oldPageId:oldPageId },
            function(data) { _that.onPageCopiedResult(data) },
            _that.onPageCopiedFault
        );

    },


    secondPagesListChanged: function(e){
       var sender = $(e.target);

       var projectId = sender.val();
       var userId = sender.find(':selected').attr('userid');

       var openPageButton = this.$el.find('.second-pages-list-open-page');

       if(projectId != ''){
           openPageButton.removeAttr('disabled');
       }else{
           openPageButton.attr('disabled', 'disabled');
       }

       this.clearList();
       this.trigger('get-project-by-id', { projectId:projectId, userId:userId });
    },

    loadSelect: function(group, list, select){

        var optionGroup = $('<optgroup>', {
            label: group
        });

        select.append(optionGroup);

        for (var i = 0; i < list.length; i++) {
            var item = list[i];

            var option = $('<option />')
                .html(item.name)
                .val(item.project_id)
                .attr('userid', item.user_id)

            optionGroup.append(option);
        };
    },

    clearList: function(){
        if (this.collection) {
            this.collection.reset();
            this.render();   
        }
    },

    render: function(){

        //this.$el.html("");

        this.$el.find('.second-pages').html("");

        this.collection.each(this.addPageItem, this);



        return this;
    },

    addPageItem: function( pageModel ) {


        var _that = this;
        var secondPageView = new SecondPageItemView({ model: pageModel });
        secondPageView.on('setpage', function(model, sender){
            _that.trigger('onsetpage', model  );
        });
        this.$el.find('.second-pages').append(secondPageView.render().el);


        this.selectedPageModel = pageModel;
    },

    showList: function( collection ){
        this.collection = collection;

        this.render();
    }
});
