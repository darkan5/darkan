var Model = require('../../../libs/Model.js');
var Utils = require('../../../utils/Utils.js');
var path = require('path');
var fs = require('fs.extra');
var fsi = require('fs');
var fse = require('fs-extra');
var _ = require('underscore');
var nodeDir = require('node-dir');
//var ProjectModel = require('../../../project/modules/project/s_project_model.js');


module.exports = CopyHistoryFiles;


function CopyHistoryFiles(options) {

    this.listeners = {};

    options = options || {};
    this.updateOptions(options);
}

CopyHistoryFiles.prototype = new Model();


CopyHistoryFiles.prototype.copySitemaps = function(action, actions, params, meta){
    // dirPath = "../storage/app/projects/"+meta.userID+"/"+meta.projectID+"/history/" ;
    dirPath = "/var/www/darkan/storage/app/projects/"+meta.userID+"/"+meta.projectID+"/history/" ;
    function getDirectories(path) {
        return fsi.readdirSync(path).filter(function (file) {
            return fsi.statSync(path+'/'+file).isDirectory();
        });
    }
    var dirHistoryElements = getDirectories(dirPath);
    var dirHistoryElementsCount = dirHistoryElements.length ;



    rmDir = function(dirPath, removeSelf) {
        if (removeSelf === undefined)
            removeSelf = true;
        try { var files = fsi.readdirSync(dirPath); }
        catch(e) { return; }
        if (files.length > 0)
            for (var i = 0; i < files.length; i++) {
                var filePath = dirPath + '/' + files[i];
                if (fsi.statSync(filePath).isFile())
                    fsi.unlinkSync(filePath);
                else
                    rmDir(filePath);
            }
        if (removeSelf)
            fsi.rmdirSync(dirPath);
    };

    //
    if (dirHistoryElementsCount > 5) {
        rmDir(dirPath+dirHistoryElements[0], true);
    }

    // var _that = this;

	// this._copySitemaps(
	// 	actions.length,
	// 	function(){

	// 		_that.trigger('onCopySitemaps', {action:action, params:params, meta:meta}, _that  );
	// 	}
	// );

    var _that = this;

    
    if(!this.dirname){

        _that.trigger('onCopySitemapsFault', { error:'No diranme' }, _that  );
    }

    var lastAction = _.last(actions) || {};
    //var index = _.isUndefined(lastAction.id) ? 0 : lastAction.id + 1;
    var index = new Date().getTime();

    var historyItemDirname  = path.join(this.dirname, index.toString());

    if (!fs.existsSync(historyItemDirname)){
        fs.mkdirSync(historyItemDirname);
    }

    var sitemapDir  = path.join(this.projectDir, 'sitemap');

    var hSitemapDir  = path.join(historyItemDirname, 'sitemap');

    fs.copyRecursive(sitemapDir, hSitemapDir, function (err) {
        if (err) {
            _that.trigger('onCopySitemapsFault', { error:'Copy sitemap files fault' }, _that  );
            return;
        } 

        console.log("Success copy sitemap files!");

        _that.trigger('onCopySitemaps', {action:action, params:params, meta:meta, index:index}, _that  );

    });
}

// CopyHistoryFiles.prototype.copySitemapPage = function(action, actions, params, meta){

//     var _that = this;

//     this._copySitemapPage(
//         actions.length,
//         action,
//         params,
//         function(){

//             _that.trigger('onCopySitemapPage', {action:action, params:params, meta:meta}, _that  );
//         }
//     );
// }



CopyHistoryFiles.prototype.deleteSitemaps = function(indexsArray){

	var _that = this;

	this._deleteSitemap(indexsArray);
}



CopyHistoryFiles.prototype.copyBackSitemap = function(id, action, nowAction){

	var _that = this;

	this._copyBackSitemap(
		id,
        action,
        nowAction,
		function(data){

			_that.trigger('onCopyBackSitemap', data, _that  );
		},
        function(data){

            _that.trigger('error', data, _that  );
        }
	);
}

CopyHistoryFiles.prototype.copyBackPage = function(id, action, nowAction){

    var _that = this;

    this._copyBackPage(
        id,
        action,
        nowAction,
        function(data){

            _that.trigger('onCopyBackPage', data, _that  );
        }
    );
}



// CopyHistoryFiles.prototype._copySitemaps = function(index, onResult, onFault){

//     var _that = this;

    
//     if(this.dirname){

//         var historyItemDirname  = path.join(this.dirname, index.toString());

//         if (!fs.existsSync(historyItemDirname)){
//             fs.mkdirSync(historyItemDirname);
//         }

//         var sitemapDir  = path.join(this.projectDir, 'sitemap');

//         var hSitemapDir  = path.join(historyItemDirname, 'sitemap');

//         fs.copyRecursive(sitemapDir, hSitemapDir, function (err) {
//           if (err) {
//             console.error(err);
//           } else {
//             console.log("Success copy sitemap files!");


//             	onResult();

//                 //_that._copyThumbs(index); 
//            ;
//           }
//         });


//         return true;
//     }
//     return false;
// }

// CopyHistoryFiles.prototype._copySitemapPage = function(id, action, params, onResult, onFault){

//     var _that = this;

    
//     if(!_.isNumber(id)){
//         console.log('No number.');
//         return;
//     }

//     var stringId = id.toString();

//     if(!_.isString(stringId)){
//         console.log('No string.');
//         return;
//     }

//     if(!this.dirname){
//         console.log('No dirname.');
//         return;
//     }

//     if(!this.projectDir){
//         console.log('No projectDir.');
//         return;
//     }

//     console.log('params', params);

//     var params = params || {};
//     var pageId = parseInt(params.pageId);

//     if(!_.isNumber(pageId)){
//         console.log('No page id.');
//         return;
//     }

//     var stringPageId = pageId.toString();

    
//     var historyItemDirname  = path.join(this.dirname, stringId);

//     var sitemapPage  = path.join(this.projectDir, 'sitemap', stringPageId + '.json');

//     console.log('sitemapPage', sitemapPage);

//     var hSitemapPage = path.join(historyItemDirname, 'sitemap', stringPageId + '.json');

//     if(!fs.existsSync(sitemapPage)){
//         console.log('No sitemap page.');
//         return;
//     }

//     fse.copySync(sitemapPage, hSitemapPage);


//     onResult({ id:id, action:action });
// }

// CopyHistoryFiles.prototype._copyThumbs = function(index, onResult, onFault){

//     var _that = this;

    
//     if(this.dirname){

//         var exportedViewPath  = path.join(this.projectDir, 'pre', 'exported_view');

//         var historyItemDirname  = path.join(this.dirname, index.toString());

//         if (!fs.existsSync(historyItemDirname)){
//             fs.mkdirSync(historyItemDirname);
//         }

//         var hThumbsDir  = path.join(historyItemDirname, 'thumbs');

        
//         fs.readdir(exportedViewPath, function(err, files) { 

//             if(err){
//                 return;
//             }

//             console.log('files', files);

//             for (var i in files) {

//                 var file =  files[i];

//                 console.log('actualFolder', file);

//                 var thumbPath = path.join(exportedViewPath, file, 'pagethumb.jpg');
//                 var htmlThumbPath = path.join(exportedViewPath, file, 'pagethumb.html');

//                 var hThumbDir = path.join(hThumbsDir, file);

//                 var hThumbPath = path.join(hThumbDir, 'pagethumb.jpg');
//                 var hHtmlThumbPath = path.join(hThumbDir, 'pagethumb.html');

//                 console.log('thumbPath', thumbPath);
//                 console.log('hThumbPath', hThumbPath);

//                 fse.copy(thumbPath, hThumbPath, function(){});
//                 fse.copy(htmlThumbPath, hHtmlThumbPath, function(){});
//             }

//         });


//         return true;
//     }
//     return false;
// }

// CopyHistoryFiles.prototype._copyThumbsBack = function(index, onResult, onFault){

//     var _that = this;

//     console.log('_copyThumbsBack', index);

    
//     if(this.dirname){

//         var exportedViewPath  = path.join(this.projectDir, 'pre', 'exported_view');

//         var historyItemDirname  = path.join(this.dirname, index.toString());

//         var hThumbsDir  = path.join(historyItemDirname, 'thumbs');

        
//         var files = fs.readdirSync(historyItemDirname);


//         for (var i in files) {

//             var file =  files[i];

//             console.log('actualFolder', file);

//             var thumbPath = path.join(exportedViewPath, file, 'pagethumb.jpg');
//             var htmlThumbPath = path.join(exportedViewPath, file, 'pagethumb.html');

//             var hThumbDir = path.join(hThumbsDir, file);

//             var hThumbPath = path.join(hThumbDir, 'pagethumb.jpg');
//             var hHtmlThumbPath = path.join(hThumbDir, 'pagethumb.html');

//             console.log('thumbPath', thumbPath);
//             console.log('hThumbPath', hThumbPath);

//             //fse.copySync(hThumbPath, thumbPath);
//             //fse.copySync(hHtmlThumbPath, htmlThumbPath);
//         }


//         return true;
//     }
//     return false;
// }

CopyHistoryFiles.prototype._deleteSitemap = function(indexsArray){

    var _that = this;

    if(!_.isArray(indexsArray)){
    	return false;
    }

    
    if(this.dirname){

    	for (var i = 0; i < indexsArray.length; i++) {
    		var index = indexsArray[i];

    		var historyItemDirname  = path.join(this.dirname, index.toString());

    		if(fs.existsSync(historyItemDirname)){
    			var result = this.deleteFolder(historyItemDirname);
    		}
    	};

        this.trigger('onDeleteSitemaps', { indexsArray:indexsArray }, this);
    }
}

CopyHistoryFiles.prototype._copyBackSitemap = function(id, action, nowAction, onResult, onFault){

    var _that = this;

    if(!_.isNumber(id)){
    	console.log('No number.');
        return;
    }

    var stringId = id.toString();

    if(!_.isString(stringId)){
    	console.log('No string.');
        return;
    }

    if(!this.dirname){
    	console.log('No dirname.');
    	return;
    }

    if(!this.projectDir){
    	console.log('No projectDir.');
    	return;
    }

    
    var historyItemDirname  = path.join(this.dirname, stringId);

    var sitemapDir  = path.join(this.projectDir, 'sitemap');
    var sitemapDirOld  = path.join(this.projectDir, 'sitemap_old');

    var hSitemapDir  = path.join(historyItemDirname, 'sitemap');

    if(!fs.existsSync(sitemapDir)){
    	console.log('No sitemapDir.');
    	return;
    }

    if(!fs.existsSync(hSitemapDir)){
    	console.log('No hSitemapDir.');
    	return;
    }

    if(fs.existsSync(sitemapDirOld)){
         this.deleteFolder(sitemapDirOld);
    }

    try{

        fse.renameSync(sitemapDir, sitemapDirOld);

    }catch(ex){
        console.log('rename file fault');

        onFault({ satatus:"Copy back sitemap fault" });

        return;
    }


    try{

        fs.copyRecursive(hSitemapDir, sitemapDir, function (err) {
          if (err) {
            console.error(err);


            // To do: copy files back 

            console.log('!!!---------------Error copy history.');

            if(fs.existsSync(sitemapDir)){
                 _that.deleteFolder(sitemapDir);
            }

            try{

                fse.renameSync(sitemapDirOld, sitemapDir);

            }catch(ex){
                console.log('rename file fault');

                onFault({ satatus:"Copy back sitemap fault" });
            }

          } else {
            console.log("Success copy sitemap files!");

            //_that._copyThumbsBack(stringId);

            _that.deleteFolder(sitemapDirOld);

            onResult({ id:id, action:action, nowAction:nowAction });
          }
        });

    }catch(ex){
        onFault({ satatus:"Copy back sitemap fault" });
    }
}

CopyHistoryFiles.prototype._copyBackPage = function(id, action, nowAction, onResult, onFault){

    var _that = this;

    if(!_.isNumber(id)){
        console.log('No number.');
        return;
    }

    var stringId = id.toString();

    if(!_.isString(stringId)){
        console.log('No string.');
        return;
    }

    if(!this.dirname){
        console.log('No dirname.');
        return;
    }

    if(!this.projectDir){
        console.log('No projectDir.');
        return;
    }

    var params = nowAction.params || {};
    var pageId = parseInt(params.pageId);

    if(!_.isNumber(pageId)){
        console.log('No pageid');
        return;
    }

    var stringPageId = pageId.toString();

    console.log('stringId', stringId);
    console.log('stringPageId', stringPageId);

    
    var historyItemDirname  = path.join(this.dirname, stringId);

    var pagePath  = path.join(this.projectDir, 'sitemap', stringPageId + '.json');

    var hPagePath  = path.join(historyItemDirname, 'sitemap', stringPageId + '.json');

    if(!fs.existsSync(hPagePath)){
        return;
    }

    var result = fse.copySync(hPagePath, pagePath);

    console.log('Finish copy page file');

    onResult({ id:id, action:action, nowAction:nowAction });
}



CopyHistoryFiles.prototype.deleteFolder = function( path ) {

    try{
        fs.removeSync(path);
        return true;

    }catch(ex){
        console.log('Delete folder error', path);
        return false;
    }
}

