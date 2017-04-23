var QuestionsAnalyticsVariablesSingleUserView = PageView.extend({
    template: '#questions-analytics-variables-template',


    initialize: function(data){

        this.model = new QuestionsAnalyticsVariablesSingleUserModel(data);

        var courseId = this.model.get('courseId');
        this.model.on('change', this.onModelChanged, this);
    },

    onModelChanged: function(){

        var scormDataSummary = {};

        var scormDatas = this.model.get('scormdata');

        _log('scormDatas', scormDatas);

        _.each(scormDatas, function(scormData){

            //_.each(scormData.v, function(variables){

                if(scormData && scormData.v && scormData.v.p){

                    _.each(scormData.v.p, function(item){

                        var pvarname = item.pvarname;
                        var pvarvalue = parseInt(item.pvarvalue);

                        if(!scormDataSummary[pvarname]){
                            scormDataSummary[pvarname] = {
                                pvarname: pvarname,
                                pvarvalue: 0,
                                pvarlength: 0,
                            };
                        }

                        scormDataSummary[pvarname].pvarvalue += pvarvalue;
                        scormDataSummary[pvarname].pvarlength++;

                    });
                }
            //});

        });

        this.model.set('scormDataSummary', scormDataSummary);

        this.render();

    },


    // <% if(scormdata.length > 0){ %>

    //     <% _.each(_.first(scormdata).v, function(variables, index) { %>

    //             <% _.each(variables, function(item, index) { %>

    //                 <tr class="odd gradeX">
    //                     <td><%= index + 1 %></td>
    //                     <td>
    //                         <div> <%- item.pvarname %> </div>
    //                     </td>
    //                     <td>
    //                        <div> <%- item.pvarvalue %> </div>
    //                     </td>
    //                 </tr>

    //             <% }); %>

    //     <% }); %>

    // <% } %>

});