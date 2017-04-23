var SummaryView = Backbone.View.extend({

    template: _.template($('#summary-template').html()),


    bindings: {
        '.userprojectsnumber' : 'userProjects',
        '.usermaxprojects' : 'userMaxProjects',
        '.userpublications' : 'userPublications',
        '.maxpublications' : 'maxPublications',
        '.size-user' : 'userUsedSpace',
        '.size-max' : 'maxUsedSpace'
    },

   
    initialize: function(data){

    	var _that = this;

        this.projectsListModel = data.projectsListModel;

        this.model = new SummaryModel();

        this.$el.hide();
    },

    beforRender: function(){
        
    }, 

    render: function(){

        this.beforRender();

        var dataModel = this.getRenderData();

        var template = this.template();
        this.$el.html(template);

        this.afterRender();

        this.stickit();

        return this;

    },

    getRenderData: function() {
        return this.model.toJSON();
    },

    updateModel: function() {

        var projectsCollection = this.projectsListModel.get('objs');
        var pCollection = projectsCollection.where({ 'pType': 'userProjects' });
        
        this.model.set('userProjects', pCollection.length);

        var userUsedSpace = 0;

        _.each(pCollection, function(pModel){

            if(pModel.get('size') != undefined && _.isNumber(pModel.get('size'))){
                userUsedSpace += pModel.get('size');
            }
            
        });

        this.model.set('userUsedSpace', this.roundToTwo(userUsedSpace / 1024 / 1024));

        this.checkConditions();

        
    },

    checkConditions: function(){

        if(this.model.get('userProjects') == this.model.get('userMaxProjects')){
            this.$el.find('.userprojectsnumber').addClass('projects-limit');
        }else{
            this.$el.find('.userprojectsnumber').removeClass('projects-limit');
        } 


        if(this.model.get('userPublications') == this.model.get('maxPublications')){
            this.$el.find('.userpublications').addClass('publications-limit');
        }else{
            this.$el.find('.userpublications').removeClass('publications-limit');
        } 

        if((this.model.get('userUsedSpace') + 20) >= this.model.get('maxUsedSpace')){
            this.$el.find('.size-user').addClass('size-is-ending');
        }else{
            this.$el.find('.size-user').removeClass('size-is-ending');
        }
    },

    

    roundToTwo: function (value) {
        return(Math.round(value * 100) / 100);
    },


    afterRender: function(){

        var _that = this;

        setTimeout(function(){

            _that.updateModel();

            _that.getSummaryUserProjects();

        },2500);

        
    },

    
    update: function(){
        this.updateModel();
    },

    getSummaryUserProjects: function(){

        var _that = this;

        DataAccess.getSummaryUserProjects(
            { },
            function(data){
                _log('getSummaryUserProjects', data, _log.dataaccessOutResult);

                if(!data.success){

                    return;
                }

                if(!data.data.result){
    
                }

                var result = data.data.result;

                var userMaxProjects = parseInt(result.userMaxProjects);
                var maxPublications = parseInt(result.maxPublications);
                var maxUsedSpace = parseInt(result.maxUsedSpace);
                var userPublications = parseInt(result.userPublications);
                var userUsedSpace = parseInt(result.userUsedSpace);

                _that.model.set('userMaxProjects', userMaxProjects);
                _that.model.set('maxPublications', maxPublications);
                _that.model.set('maxUsedSpace', maxUsedSpace);
                _that.model.set('userPublications', userPublications);

                _that.model.set('userUsedSpace', _that.roundToTwo(userUsedSpace / 1024 / 1024));

                _that.checkConditions();

                _that.$el.addClass('animated');
                _that.$el.show('fadein');

            },
            function(data){
                _log('getSummaryUserProjects', data, _log.dataaccessOutFault);
            }
        );
    },

  

	
});