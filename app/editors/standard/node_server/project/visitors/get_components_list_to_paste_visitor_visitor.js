var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    HashModel = require('../../project/modules/hash/hash_model.js');

var _ = require('underscore');

module.exports = GetComponentsListToPasteVisitor;


function GetComponentsListToPasteVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

GetComponentsListToPasteVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start getting components');

    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    var copyHashModel = HashModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        hashName:'copy', 
                                        socket:project.socket });

    var cutHashModel = HashModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        hashName:'cut', 
                                        socket:project.socket });

    var deleteHashModel = HashModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        hashName:'delete', 
                                        socket:project.socket });




    for (var i = 0; i < copyHashModel.list.length; i++) {
        var list = copyHashModel.list[i].components;

        var shorted = _.map(list, function(o) {
            return _.pick(o, "type", "actionkey", "imageFileName");
        });

        copyHashModel.list[i] = shorted;
    };

    for (var i = 0; i < cutHashModel.list.length; i++) {
        var list = cutHashModel.list[i].components;

        var shorted = _.map(list, function(o) {
            return _.pick(o, "type", "actionkey", "imageFileName");
        });

        cutHashModel.list[i] = shorted;
    };

    for (var i = 0; i < deleteHashModel.list.length; i++) {
        var list = deleteHashModel.list[i].components;

        var shorted = _.map(list, function(o) {
            return _.pick(o, "type", "actionkey", "imageFileName");
        });

        deleteHashModel.list[i] = shorted;
    };

    

    this.onResult({
        copyHash:copyHashModel,
        cutHash:cutHashModel,
        deleteHash:deleteHashModel
    });



    console.log('-------------------end getting components');
}
