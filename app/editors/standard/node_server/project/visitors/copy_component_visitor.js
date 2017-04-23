var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    CopyVisitor = require('../../project/visitors/copy_visitor.js'),
    nodeDir = require('node-dir');

module.exports = CopyComponentVisitor;


function CopyComponentVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

CopyComponentVisitor.prototype = new CopyVisitor();


CopyComponentVisitor.prototype.visit = function(project) {
    var _that = this;

    console.log('-------------------startCopy');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var userID = project.socket.ownerId.toString();
    var userId = project.socket.ownerId.toString();
    var projectID = project.socket.myRoom.toString();
    var projectId = project.socket.myRoom.toString();

    var data = this.data;

    this.components = data.components;
    this.newComponents = [];
    this.actionKeysMap = {};
    this.sourcePageId = data.sourcePageId.toString(); // From
    this.destPageId = data.destPageId.toString(); // Destination
    this.destSelectedRowId = data.destSelectedRowId.toString();
    this.copyStatus = data.copyStatus;

    this.sourceUserId = userID;
    this.sourceProjectId = projectID;

    if(data.sourceUserId != undefined){
        this.sourceUserId = '' + data.sourceUserId;
    }

    if(data.sourceProjectId != undefined){
        this.sourceProjectId = '' + data.sourceProjectId;
    }

    this.projectPath = path.join(this.DIRNAME, userId, projectId);

    var pageFile  = path.join(this.DIRNAME, userId, projectId, 'sitemap', this.destPageId + '.json');

    this.prefixSourceDirPath = path.join(this.DIRNAME, this.sourceUserId, this.sourceProjectId, 'pre', 'exported_view', this.sourcePageId );
    this.prefixDestDirPath = path.join(this.DIRNAME, userId, projectId, 'pre', 'exported_view', this.destPageId );

    this.sourcePageJson = path.join(_that.DIRNAME, this.sourceUserId , this.sourceProjectId, 'sitemap' );
    this.destPageJson = path.join(_that.DIRNAME, userID, projectID, 'sitemap' );

    var pageContent = Utils.jsonParse(fs.readFileSync(pageFile, 'utf8'));
    this.pageContent = pageContent;

    //console.log('start copy ', this.components);

    this.projectVariables = [];

    this.copyOneComponent();

};

CopyComponentVisitor.prototype.copyOneComponent = function() {

    var _that = this;

    this.allPaths = [];

    var pageData = this.project.generateActionkey( this.pageContent );
    this.lastComponentId = pageData.lastComponentId;
    var component = this.components[0];

    this.findTrigger(component);



    this.oldActionKey = component.actionkey;
    this.newActionKey = pageData.actionkey;

    this.actionKeysMap[this.oldActionKey] = this.newActionKey;

    //console.log('this.actionKeysMap ', this.actionKeysMap);
    //console.log('this.sourcePageId ', this.sourcePageId);
    //console.log('this.destPageId ', this.destPageId);

    this.newComponents.push( component );

    nodeDir.paths(this.prefixSourceDirPath, function(err, paths) {
        if (err) {
            _that.onFault({ status:'Copy one component fault' });
        }

        for (var i in paths.dirs) {

            var dir =  paths.dirs[i];

            _that.allPaths.push( dir );
        }

        _that.copyOne();

    });

}

CopyComponentVisitor.prototype.copyOne = function() {

    var _that = this;

    var oldActionKey = this.oldActionKey;
    var newActionKey = this.newActionKey;

    var dir = _that.allPaths[0];

    var pathN = path.dirname(dir);
    var dirName = path.basename(dir);
    var dirFolder = path.basename(pathN); // Image, Gallery, etc

    if (dirName === oldActionKey) {

        var sourceFrom = dir;
        var sourceTo = path.join(_that.prefixDestDirPath , dirFolder, newActionKey);

        _that.copyDirPage( sourceFrom, sourceTo , function(err){

            if(_that.copyStatus == 'cut'){

                console.log('cut', dir);

                fs.removeSync(sourceFrom);
            }

            _that.allPaths.splice(0, 1);

            if(_that.allPaths.length == 0){

                _that.components.splice(0, 1);

                if (_that.components.length >= 1) {
                    _that.copyOneComponent();
                } else {

                    _that.finishCopy();
                }
            }else{
               _that.copyOne();
            }

        } );

    }else{

        _that.allPaths.splice(0, 1);

        if(_that.allPaths.length == 0){

            _that.components.splice(0, 1);

            if (_that.components.length >= 1) {
                _that.copyOneComponent();
            } else {

                _that.finishCopy();
            }

        }else{
            _that.copyOne();
        }
    }

}


CopyComponentVisitor.prototype.finishCopy = function() {

    var _that = this;

    for (var j = 0; j < _that.newComponents.length; j++) {
        var component = _that.newComponents[j];
        component['selected-by'] = -1;

        var oldActionKey = component.actionkey;

        _that.changeActionKeys( component, oldActionKey, _that.actionKeysMap[oldActionKey] );
    };

    var pageFilePath = path.join(this.projectPath, 'sitemap', this.destPageId + '.json' );
    //var pageContent = Utils.jsonParse(fs.readFileSync(pageFilePath, 'utf8'));
    var pageContent = this.pageContent;

    var lines = pageContent.lines;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        if(line.options.id == this.destSelectedRowId){

            line.objects = line.objects.concat(_that.newComponents);
        }
    };

    fs.writeFileSync(pageFilePath, Utils.jsonStringify(pageContent));

    var projectOptions = _that.copyProjectVariables();

    this.onResult({
        status:'Copy components result',
        components: this.newComponents,
        lastComponentId:this.lastComponentId,
        projectOptions:projectOptions
    });

    this.project.onChangeResult( {
        status:'Copy components',
        name:'components',
        event: 'updateCopyComponents',
        pageId: this.destPageId,
        components: this.newComponents,
        lastComponentId:this.lastComponentId,
        page: pageContent,
        rowId: this.destSelectedRowId,
        projectOptions:projectOptions
    } );
}


CopyComponentVisitor.prototype.copyDirPage = function(sourcePath, destPath, call) {

    fs.copyRecursive(sourcePath, destPath, call);
}

CopyComponentVisitor.prototype.findTrigger = function(component) {

    var _that = this;

    var triggers =  component.triggers;

    for (var k = 0; k < triggers.length; k++) {
        var trigger = triggers[k];

        var subtriggers = trigger.subtriggers;
        var elseactions = trigger.elseactions;

        this.findVariables(subtriggers);
        this.findVariables(elseactions);

    }
}


CopyComponentVisitor.prototype.changeActionKeys = function(object, oldActionKey, newActionKey) {

    var _that = this;

    if (typeof object === 'object') {

        for (var item in object) {

            if (typeof object[item] === 'object') {

                // podmiana kluczy (actionitem)
                if (typeof item === 'string') {

                    if (_that.actionKeysMap[item] != undefined) {

                        object[_that.actionKeysMap[item]] = object[item];

                        delete object[item];

                        // zmiana w nowym itemu
                        this.changeActionKeys(object[item],  oldActionKey,  newActionKey);
                    }

                }

                this.changeActionKeys(object[item],  oldActionKey, newActionKey);

            } else {

                // podmiana wartosci (actionitem)
                if (typeof object[item] === 'string') {

                    var _valArr = object[item].split('-');

                    if ( _valArr[0].length === 32) {

                        if (_that.actionKeysMap[object[item]] != undefined) {

                            object[item] = _that.actionKeysMap[object[item]];
                        }
                    }
                }
            }
        }
    }
};

