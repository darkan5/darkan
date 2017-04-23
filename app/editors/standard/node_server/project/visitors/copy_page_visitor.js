var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    CopyVisitor = require('../../project/visitors/copy_visitor.js'),
    ErrorMailer = require('../../error_mailer/error_mailer.js'),
    nodeDir = require('node-dir');

module.exports = CopyPageVisitor;


function CopyPageVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
    
    this.pageListToCopy = data.pageListToCopy;
    this.oldPageId = data.oldPageId;
    this.oldPageIdCopy = parseInt(data.oldPageId);
}

CopyPageVisitor.prototype = new CopyVisitor();

CopyPageVisitor.prototype.visit = function(project) {
	var _that = this;


    this.triggerMapPageIds = {};

    var userID = project.socket.ownerId.toString();
    var projectID = project.socket.myRoom.toString();

    this.socket = project.socket;


    this.onChangeResult = project.onChangeResult;

    // var pageID = data.pageID.toString();
    console.log('copy()');

    this.DIRNAME = project.DIRNAME;
    

    var data = this.data;


    this.sourceUserId = userID.toString();
    this.sourceProjectId = projectID.toString();

    if(data.sourceUserId != undefined){
        this.sourceUserId = '' + data.sourceUserId;
    }

    if(data.sourceProjectId != undefined){
        this.sourceProjectId = '' + data.sourceProjectId;
    }

    //console.log('userID', typeof userID);
    //console.log('projectID', typeof  projectID);
    //console.log('this.sourceUserId', this.sourceUserId);
    //console.log('this.sourceProjectId', this.sourceProjectId);
    //console.log('this.DIRNAME', this.DIRNAME);


    this.prefixSourceDirPath = path.join(this.DIRNAME, this.sourceUserId, this.sourceProjectId, 'pre/exported_view' );
    this.prefixDestDirPath = path.join(this.DIRNAME, userID, projectID, 'pre/exported_view' );

    this.sourcePageJson = path.join(_that.DIRNAME, this.sourceUserId, this.sourceProjectId, 'sitemap' );
    this.destPageJson = path.join(_that.DIRNAME, userID, projectID, 'sitemap' );

    //console.log('this.prefixSourceDirPath', this.prefixSourceDirPath);
    //console.log('this.prefixDestDirPath', this.prefixDestDirPath);

    //console.log('this.sourcePageJson', this.sourcePageJson);
    //console.log('this.destPageJson', this.destPageJson);


    this.clonePageListToCopy = this.cloneArray(this.pageListToCopy);
    this.startedLastPageId = this.getLastPageID();

    this.copyOnePage();

    this.pagesJsonArray = [];

    this.projectVariables = [];
};


CopyPageVisitor.prototype.cloneArray = function(arr) {

    var tempArray = [];

    for (var i = 0; i < arr.length; i++) {
        tempArray.push(arr[i]);
    }

    return tempArray;
}

CopyPageVisitor.prototype.copyOnePage = function() {
	var _that = this;
    try{
    	//console.log('copyOnePage()')
        var errors = [];
        var statuses = [];

        var pageID = this.pageListToCopy[0].toString();

        //console.log('abc');
        var newPageID = this.setLastPageID().toString();
        this.newPageID = newPageID;
        //console.log('abc2');
        var sourcePath = path.join(this.prefixSourceDirPath, pageID );
        //console.log('abc3');
        var destPath = path.join(this.prefixDestDirPath, newPageID );


        //console.log('newPageID: ' + newPageID);

        this.copyDirPage(sourcePath, destPath, function() {

            try {

                // zmiana nazw katalogow (actionkey)
                nodeDir.paths(destPath, function(err, paths) {
                    if (err) {

                        _that.socket.errorMailer.send(err, ErrorMailer.ON_ERROR);
                        return;
                    }

                    try {

                        for (var i in paths.dirs) {

                            var pathN = path.dirname(paths.dirs[i]);
                            var dirName = path.basename(paths.dirs[i]);
                            var dirNameArr = dirName.split('-');

                            if (dirNameArr.length === 3 && dirNameArr.pop() === pageID) {

                                var newDirName = dirNameArr[0] + '-' + dirNameArr[1] + '-' + newPageID;

                                fs.renameSync(paths.dirs[i], path.join(pathN, newDirName));
                            }
                        }

                        var sourcePageJson = path.join(_that.sourcePageJson, pageID + '.json' );
                        var destPageJson = path.join(_that.destPageJson, newPageID + '.json' );



                        var siteMapFile = path.join(_that.destPageJson, 'map.json' );
                        var siteMap = Utils.jsonParse(fs.readFileSync(siteMapFile, 'utf8'));

                        //console.log('this.pageListToCopy', _that.pageListToCopy);
                        console.log('_that.oldPageIdCopy', _that.oldPageIdCopy);


                        var oldPageIndex = siteMap.pages.indexOf(_that.oldPageIdCopy) + 1;

                        console.log('pageID', pageID);
                        console.log('oldPageIndex', oldPageIndex);
                        console.log('siteMap.pages', siteMap.pages);

                        _that.addPageToSitemap(newPageID, oldPageIndex);

                        _that.oldPageIdCopy = parseInt(newPageID);

                        // podmiana w jsonie strony actionkey
                        _that.createPageJson(sourcePageJson, destPageJson, pageID, newPageID );
                        
                    }catch (ex) {

                        // onFault({ ex:ex, message:'ERROR on copy page' });
                        console.log({ ex:ex, message:'ERROR on copy page' });

                        _that.socket.errorMailer.send(ex);
                    }


                });

            }catch (ex) {

                // onFault({ ex:ex, message:'ERROR on copy page' });
                console.log({ ex:ex, message:'ERROR on copy page' });

                _that.socket.errorMailer.send(ex);
            }
        });


    }catch (ex) {

        // onFault({ ex:ex, message:'ERROR on copy page' });
        console.log({ ex:ex, message:'ERROR on copy page' });

        _that.socket.errorMailer.send(ex);
    }
};

CopyPageVisitor.prototype.copyDirPage = function(sourcePath, destPath, call) {

    fs.copyRecursive(sourcePath, destPath, call);
}

CopyPageVisitor.prototype.getLastPageID = function() {

    var optionsFile = path.join(this.destPageJson, 'options.json' );

    var options = Utils.jsonParse(fs.readFileSync(optionsFile, 'utf8'));

    var lastPageId = parseInt(options.last_page_id);

    return lastPageId;
};

CopyPageVisitor.prototype.setLastPageID = function() {

    var optionsFile = path.join(this.destPageJson, 'options.json' );

    var options = Utils.jsonParse(fs.readFileSync(optionsFile, 'utf8'));

    var lastPageId = parseInt(options.last_page_id);
    lastPageId += 1;
    options.last_page_id = lastPageId;

    fs.writeFileSync(optionsFile, Utils.jsonStringify(options));

    return options.last_page_id;
};

CopyPageVisitor.prototype.addPageToSitemap = function(newPageID, oldPageIndex) {


    var siteMapFile = path.join(this.destPageJson, 'map.json' );

    var siteMap = Utils.jsonParse(fs.readFileSync(siteMapFile, 'utf8'));

    //console.log('oldPageIndex', oldPageIndex);
    //console.log('newPageID', newPageID);

    siteMap.pages.splice(oldPageIndex, 0, parseInt(newPageID));

    //siteMap.pages.push(parseInt(newPageID));

    fs.writeFileSync(siteMapFile, Utils.jsonStringify(siteMap));

};

CopyPageVisitor.prototype.convertTriggerMapPageId = function(subtriggers) {
    for (var m = 0; m < subtriggers.length; m++) {
        var subtrigger = subtriggers[m];


        var whattodo = subtrigger.whattodo;
        var objs = subtrigger.objs;


        if(whattodo == 'gotopage'){

            var pageIndex = this.clonePageListToCopy.indexOf(parseInt(objs[0]));

            if(pageIndex != -1){
                var nextPageId = this.startedLastPageId + pageIndex + 1;

                objs = [];
                objs.push( "" + nextPageId );
            }else{
                objs = [];
            }
        }

        subtrigger.objs = objs;
    }
}

CopyPageVisitor.prototype.findTriggerMapPageId = function(page, oldPageID, newPageID) {

    var _that = this;

    var pageId = parseInt(page.options.pageid);

    var lines = page.lines;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        var objects = line.objects;

        for (var j = 0; j < objects.length; j++) {
            var object = objects[j];

            var triggers =  object.triggers;

            for (var k = 0; k < triggers.length; k++) {
                var trigger = triggers[k];

                var subtriggers = trigger.subtriggers;
                var elseactions = trigger.elseactions;

                this.convertTriggerMapPageId(subtriggers);
                this.convertTriggerMapPageId(elseactions);

                this.findVariables(subtriggers);
                this.findVariables(elseactions);

            }
        }
    };
}

CopyPageVisitor.prototype.changeActionKeys = function(obj, oldPageID, newPageID) {
    if (typeof obj === 'object') {
        for (var key in obj) {
            if (typeof obj[key] === 'object') {

                // podmiana kluczy (actionkey)
                if (typeof key === 'string') {
                    var _keyArr = key.split('-');

                    if (_keyArr.length === 3 && _keyArr[2] === oldPageID && _keyArr[0].length === 32) {

                        var newActionKey = _keyArr[0] + '-' + _keyArr[1] + '-' + newPageID;

                        obj[newActionKey] = obj[key];

                        delete obj[key];

                        // zmiana w nowym keyu
                        this.changeActionKeys(obj[newActionKey], oldPageID, newPageID);
                    }
                }

                this.changeActionKeys(obj[key], oldPageID, newPageID);

            } else {

                // podmiana wartosci (actionkey)
                if (typeof obj[key] === 'string') {
                    var _valArr = obj[key].split('-');

                    if (_valArr.length === 3 && _valArr[2] === oldPageID && _valArr[0].length === 32) {

                        var newActionKey = _valArr[0] + '-' + _valArr[1] + '-' + newPageID;

                        obj[key] = newActionKey;
                    }
                }
            }
        }
    }
};

CopyPageVisitor.prototype.createPageJson = function(sourcePageJson, destPageJson, oldPageID, newPageID ) {
    var _that = this;

    fs.copy(sourcePageJson, destPageJson, { replace: false }, function (err) {
        if (err) {
            console.log('nie moge skopiowac jsona do strony');
        }

        var pageMap = Utils.jsonParse(fs.readFileSync(destPageJson, 'utf8'));

        if(pageMap && pageMap.options && pageMap.options.selectedBy){
            pageMap.options.selectedBy = [];
        }

        _that.changeActionKeys(pageMap, oldPageID, newPageID);
        _that.findTriggerMapPageId(pageMap, oldPageID, newPageID);

        pageMap.options.pageid = parseInt(newPageID);

        fs.writeFile(destPageJson, Utils.jsonStringify(pageMap));
        // onResult({ page: pageMap });

        _that.pagesJsonArray.push(pageMap);

    	_that.pageListToCopy.splice(0, 1);

        if (_that.pageListToCopy.length !== 0) {
        	_that.copyOnePage();
        } else {
        	console.log('koniec kopiownaia stron');

        	//console.log('_that.triggerMapPageIds', _that.triggerMapPageIds);
        	//console.log('_that.pagesJsonArray', _that.pagesJsonArray[0].lines[0].objects);

            var projectOptions = _that.copyProjectVariables();

        	_that.onResult({
                pages: _that.pagesJsonArray,
                lastPageId: _that.newPageID,
                oldPageId: _that.oldPageId,
                projectOptions:projectOptions
            });

            _that.onChangeResult( {
                status:'Copy page',
                name:'page',
                event: 'copyPage',
                pages: _that.pagesJsonArray,
                lastPageId: _that.newPageID,
                oldPageId: _that.oldPageId,
                projectOptions: projectOptions
            } );

        }

        
    });
};

