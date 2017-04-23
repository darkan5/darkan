var QuestionsAnalyticsView = PageView.extend({
    template: '#questions-analytics-template',


    initialize: function(data){

        this.model = new QuestionsAnalyticsModel(data);

        var courseId = this.model.get('courseId');
        this.model.on('change', this.onModelChanged, this);
    },

    onRender :function() {

        var questionData = this.model.get('questiondata');
        var questionListCollection = new QuestionsAnalyticsCollection(questionData);

        var mergedQuestionsStatuses = this.mergeQuestionsStatuses(questionListCollection);

        this.finddInputGroup(mergedQuestionsStatuses, 'form-radio');
        this.finddInputGroup(mergedQuestionsStatuses, 'form-checkbox');

        var questionsListView = new QuestionsAnalyticsListView({collection: mergedQuestionsStatuses});



        this.$el.html(questionsListView.render().$el);
    },

    mergeQuestionsStatuses: function(questionsCollection) {
        var _that = this;

        questionsCollection.each(function(qModel) {
            var scormData = _that.prepareScormDataComponents( _that.model.get('scormdata'), qModel.get('actionkey') );
            qModel.set('scormdata', scormData);
            qModel.set('panelTitle', qModel.get('reportName')); 

            _log('qModel', qModel);
        });

        return questionsCollection;
    },

    finddInputGroup: function(collection, type) {

        var foundedModels = {};

        collection.each(function(model){

            if(model.get('type') == type){

                var groupName = model.get('groupName');

                _log('groupName', model.toJSON());

                if(!foundedModels[groupName]){
                    foundedModels[groupName] = {
                        models : []
                    }
                }

                foundedModels[groupName].models.push(model);
            }
        });

         _.each(foundedModels, function(item){
            _.each(item.models, function(model){
                collection.remove(model);
            });
        });    


        _log('foundedModels', foundedModels);

        var NewModel = Backbone.Model.extend({   

            defaults :function(){

                return {

                    scormdatas:[], 
                    reportName:'',
                    type: type + '-group',
                    answers: {},
                    attempts: '',
                    scoreBadAnswer: 0,
                    scoreFail: 0,
                    scoreSuccess: 0,
                    panelTitle: ''

                } 

            }
        });

        _.each(foundedModels, function(item){

            var newModel = new NewModel();

            _log('newModel', newModel);

            var groupedModels = [];

            if(item.models){
                var groupName = item.models[0].get('groupName');
            }

            _.each(item.models, function(model){
                groupedModels.push( model );
            });

            newModel.set('groupedModels', groupedModels);
            newModel.set('panelTitle', groupName);

            collection.add(newModel);
        });

        _log('newModel collection', collection.toJSON());

    },

    prepareScormDataComponents: function(scormData, a) {
        var _that = this;

        var components = this.components || { };

        if(!Utils.ObjectLength(components)) {

       
            if (scormData) {

                for (var componentData in scormData) {
                    var component = scormData[componentData];

                    if (component != null) {
                        var uc = component.uc;

                        // get all objects from "o" in scorm data (add compl information)
                        _.each(component.o, function(obj) {

                            var _obj = obj.split(',');
                            var aKey = uc[_obj[0]] + '-' + _obj[1] + '-' + _obj[2];

                            components[aKey] = components[aKey] || { };
                            components[aKey].compl = components[aKey].compl || [ ];

                            components[aKey].compl.push(_obj[3]);
                        });

                        // get all questions userSelection from "q" in scorm data
                        _.each(component.q, function(qData, qKey) {

                            var _qKey = qKey.split(',');
                            var qActionkey = uc[_qKey[0]] + '-' + _qKey[1] + '-' + _qKey[2];

                            components[qActionkey] = components[qActionkey] || { };
                            // components[qActionkey].compl = components[qActionkey].compl || [1];
                            components[qActionkey].data = components[qActionkey].data || [ ];

                            var answerObject = _that.getAnswerDataByComponent(qData);

                            components[qActionkey].data.push(qData);

                        });
                    }
                }

            }

        }



        return components[a];
    },

    getAnswerDataByComponent: function(answerData) {

        if (_.isString(answerData)) {
            return answerData;
        }

        if (_.isObject(answerData)) {
            var obKeys = _.keys(answerData);
            return answerData[obKeys[0]];
        }

        return 'NA';
    }


});