var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    MapModel = require('../../project/modules/map/s_map_model.js');

var _ = require('underscore');

module.exports = UpdatePageSortVisitor;


function UpdatePageSortVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

UpdatePageSortVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start update page sorts');

    try{

        this.onChangeResult = project.onChangeResult;
        this.DIRNAME = project.DIRNAME;
        this.project = project;

        var data = this.data;

        var pageId = data.pageId;
        var position = data.position;

        var mapModel = new MapModel.get({ DIRNAME:this.DIRNAME, 
                                            userId:project.socket.ownerId.toString(), 
                                            projectId:project.socket.myRoom.toString(),
                                            socket:project.socket });

        var pages = mapModel.updatePageSort(data);

    
        if(!pages){
            this.onFault({error:'update page sorts fault'});
            project.socket.errorMailer.send('update page sorts fault');
            return;
        }

        mapModel.save();

        this.onResult({
            status: 'update page sorts result',
            pageId:pageId,
            position:position
        });

        _that.onChangeResult( {
            status:'Update Page Sort ',
            event: 'updatePageSort',
            pageId:pageId,
            position:position
        } );

        this.project.historyModel = this.project.historyModel || this.project.createHistory();

        this.project.historyModel.add('updatePageSort', { pageId:pageId, position:position });

    }catch(ex){
        throw ex;
    }

    console.log('-------------------end update page sorts');
}
