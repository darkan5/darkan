var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = UpdatePagesOptionsVisitor;


function UpdatePagesOptionsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

UpdatePagesOptionsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start update pages options');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    var pagesOptions = data.pagesOptions;

    if(!_.isArray(pagesOptions)){
        this.onFault({error:'Updated pages options fault'});
    }

    var newPagesOptions = [];

    for (var i = 0; i < pagesOptions.length; i++) {

        var pageOptions = pagesOptions[i];

        var pageId = pageOptions.pageid;

        if(!_.isNumber(pageId)){
            continue;
        }

        var pageId = pageId.toString();


        var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
                                            userId:project.socket.ownerId.toString(), 
                                            projectId:project.socket.myRoom.toString(), 
                                            pageId:pageId, 
                                            socket:project.socket });

        var newPageOptions = pageModel.updatePageOptions({ pageOptions:pageOptions, action:'' });

        if(newPageOptions){

            var result = pageModel.save();   

            if(result){

                newPagesOptions.push(newPageOptions);
            }
        }

    };

    
    this.onResult({ 
        status:'Update page successed', pagesOptions: newPagesOptions
    });

    this.onChangeResult( {
        status:'Page file changed and update pages options',
        event: 'updatePagesOptions',
        pagesOptions: newPagesOptions
    } );

    var pagesIds = _.map(newPagesOptions, function(o) {
        return _.pick(o, "pageid");
    });

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('updatePagesOptions', { pagesIds:pagesIds });

    console.log('-------------------end update pages options');
}
