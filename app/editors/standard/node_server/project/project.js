module.exports = Project;

var path = require('path'),
    unzip = require('unzip'),
    fs = require('fs.extra'),
    fse = require('fs-extra'),
    wrench = require('wrench'),
    async = require('async'),
    Utils = require('../utils/Utils.js'),
    nodeDir = require('node-dir'),
    CopyComponentVisitor = require('../project/visitors/copy_component_visitor.js'),
    Psd2Darkan = require('../project/psd/psd2darkan.js'),
    CopyComponentVisitor = require('../project/visitors/copy_component_visitor.js'),
    CopyComponentVisitor2 = require('../project/visitors/copy_component_visitor2.js'),
    CopyComponentVisitor3 = require('../project/visitors/copy_component_visitor3.js'),
    CopyPageVisitor = require('../project/visitors/copy_page_visitor.js'),
    ConvertFromV1 = require('../convert_from_v1/convert_from_v1.js'),
    ConfigController = require('../config_controller/config_controller.js'),
    AddComponentsVisitor = require('../project/visitors/add_components_visitor.js'),
    UpdateComponentsVisitor = require('../project/visitors/update_components_visitor.js'),
    CutComponentsVisitor = require('../project/visitors/cut_components_visitor.js'),
    PasteComponentsVisitor = require('../project/visitors/paste_components_visitor.js'),
    DuplicateComponentVisitor = require('../project/visitors/duplicate_components_visitor.js'),
    UpdatePageOptionsVisitor = require('../project/visitors/update_page_options_visitor.js'),
    UpdatePagesOptionsVisitor = require('../project/visitors/update_pages_options_visitor.js'),
    AddNewPageVisitor = require('../project/visitors/add_new_page_visitor.js'),
    AddNewPsdPageVisitor = require('../project/visitors/add_new_psd_page_visitor.js'),
    LoadProjectVisitor = require('../project/visitors/load_project_visitor.js'),
    LoadProjectByIdVisitor = require('../project/visitors/load_project_by_id_visitor.js'),
    UpdateProjectOptionsVisitor = require('../project/visitors/update_project_options_visitor.js'),
    DeleteComponentsVisitor = require('../project/visitors/delete_components_visitor.js'),
    DeletePagesVisitor = require('../project/visitors/delete_pages_visitor.js'),
    UpdatePageSortVisitor = require('../project/visitors/update_page_sort_visitor.js'),
    UpdateRowOptionsVisitor = require('../project/visitors/update_row_options_visitor.js'),
    MoveComponentsToLayerVisitor = require('../project/visitors/move_components_to_layer_visitor.js'),
    SortRowsVisitor = require('../project/visitors/sort_rows_visitor.js'),
    DuplicatePagesVisitor = require('../project/visitors/duplicate_pages_visitor.js'),
    DuplicatePagesVisitorFromOtherProject = require('../project/visitors/duplicate_pages_visitor_from_other_project.js'),
    GetComponentsListToPasteVisitor = require('../project/visitors/get_components_list_to_paste_visitor_visitor.js'),
    ProjectModel = require('../project/modules/project/s_project_model.js'),
    PageModel = require('../project/modules/pages/s_page_model.js'),
    PageSelectorByUser = require('../project/modules/selector/page_selector_by_user.js'),
    ComponentsSelectorByUser = require('../project/modules/selector/components_selector_by_user.js'),
    HistoryModel = require('../project/modules/history/history_model.js');


function Project(socket, sockets) {
    this.connectedUsers = 0;
    this.componentsToDelete = [];
    this.socket = socket;
    this.sockets = sockets;
    this.onChangeResult = function(){};
    this.onFileChangeFault = function(){};

    this.convertFromV1 = new ConvertFromV1(socket);


    this.DIRNAME = ConfigController.get('PROJECTS_PATH');
    // this.publicPath = ConfigController.getPublicPath();

    this.history_enabled = ConfigController.get('HISTORY_ENABLED', false); 
}

Project.DIRNAME = ConfigController.get('PROJECTS_PATH');



Project.prototype.connected = function( ){

    
}

Project.prototype.startLastVisitInterval = function( socket ){
  
}

Project.prototype.projectDownloadedFromOcs = function( data, onResult, onFault ){

   var historyModel = this.createHistory();

   console.log('projectDownloadedFromOcs create history model', historyModel.projectId);
   //console.log('history model', historyModel);

   if(historyModel){
        this.historyModel = historyModel;
        onResult({});
   }else{
        onFault({});
   }  
}


Project.prototype.createHistory = function(){

    var userId = this.socket.ownerId.toString();
    var projectId = this.socket.myRoom.toString();

    var params = {};

    params.DIRNAME = this.DIRNAME;
    params.userId = userId;
    params.projectId = projectId;
    params.socket = this.socket;

    console.log('Start run history');

    return HistoryModel.get(params, this);
}



Project.prototype.disconnect = function(e, data, onResult, onFault ){


    console.log("disconnect");

    var _that = this;

    try{

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();

        var sitemap = 'sitemap';

        


        var dirname  = path.join(this.DIRNAME, userId, projectId, sitemap);

        var mapFilePath = path.join(this.DIRNAME, userId, projectId, sitemap, 'map.json' );

        


        fs.exists(mapFilePath, function(exists) {
            if (exists) {

                var map = Utils.jsonParse(fs.readFileSync(mapFilePath, 'utf8'));

                var pages = map.pages;

                if(pages != undefined){

                    var firstPageId = pages[0];

                    if(firstPageId){

                        _that.createProjectThumb(firstPageId.toString());
                    }
                   

                    console.log('disconnect dirname', dirname);
                    console.log('disconnect pages', pages);

                    _that.clearBeforeDisconnect(dirname, pages);
                }
            }
        });




    }catch (ex) {
        this.socket.errorMailer.send(ex);
    }
}


Project.prototype.setProjectPermissions = function(data, onResult, onFault){

    try{

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();

        var projectPath = path.join(ConfigController.get('PROJECTS_PATH'), userId, projectId);

        wrench.chmodSyncRecursive(projectPath, 511);
        onResult({});

    }catch(ex){
        onFault({error: ex});
        this.socket.errorMailer.send(ex);
    }

}

Project.prototype.createProjectThumb = function(firstPageId){

    try{

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();


        var projectThumbPath = path.join(ConfigController.get('PROJECTS_PATH'), userId, projectId, 'pre', 'exported_view', firstPageId, 'pagethumb.jpg');

        var copiedProjectThumbPath = path.join(ConfigController.get('PROJECTS_THUMBS_PATH'), projectId + '.jpg');

        fse.copySync(projectThumbPath, copiedProjectThumbPath);

    }catch(ex){
        this.socket.errorMailer.send(ex);
    }

}

Project.prototype.loadProject = function( data, onResult, onFault ){

    var _that = this;

    this.userId = this.socket.ownerId.toString();
    this.projectId = this.socket.myRoom.toString();

    var userId = '' + data.userId;
    var projectId = '' + data.projectId;


    var onProjectLoaded = function(result){

        console.log('onProjectLoaded', result);

        if(_that.historyModel){
            _that.historyModel.add('onProjectLoaded', { pagesLength:result.projectModel.collection.length });
        }
    }

    try{

        var loadProjectVisitor = new LoadProjectVisitor(data, onResult, onFault, onProjectLoaded);
        this.accept(loadProjectVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Load project' });
        onFault({ error:'Load project fault', ex:ex, message:'ERROR Load project' });

        this.socket.errorMailer.send(ex);
    }

//     var _that = this;

//     this.userId = this.socket.ownerId.toString();
//     this.projectId = this.socket.myRoom.toString();

//     var userId = '' + data.userId;
//     var projectId = '' + data.projectId;

//     var sitemap = 'sitemap';

//     var dir = require('node-dir');

// //    try{
// //        this.convertFromV1.checkProjectVersion(projectId, userId);
// //    }catch (ex){
// //        onFault({ ex:ex, message:'Error convert project', code:1 });
// //        return;
// //    }


//     try{
//         var dirname  = path.join(this.DIRNAME, userId, projectId, sitemap);

//         var mapFilePath = path.join(this.DIRNAME, userId, projectId, sitemap, 'map.json' );

//         //var projectOptionsFilePath = path.join(this.DIRNAME, userId, projectId, sitemap, '/options.json' );

//         this.createFolder(dirname);

//         fs.exists(mapFilePath, function(exists) {
//             if (exists) {

//                 var map = Utils.jsonParse(fs.readFileSync(mapFilePath, 'utf8'));

//                 var pages = map.pages;

//                 if(pages != undefined){

//                    _that.openPageFiles(dirname, pages, onResult, data);

//                 }else{
//                     onFault({ status:'no-files', message:'Content of map file is empty' });
//                 }

//             }else{


//                 var fileMapContent = _that.createDeafultMapFileContent();

//                 _that.saveMapFile(mapFilePath, fileMapContent );

//                 onResult({ status:"Create map file"});
//             }
//     });


//     }catch (ex) {
//         onFault({ ex:ex, message:'ERROR on loadProject' });

//         this.socket.errorMailer.send(ex);
//     }
}

Project.prototype.clearBeforeDisconnect = function(dir, list) {

    console.log('clearBeforeDisconnect');

    var _that = this;

    try{

        var login = this.socket.__meta__.login;


        this.resetPagesByUser();
        this.resetComponentsByUser();

        

        // console.log('LOGIN: ' + login);

        // for (var i = 0; i < list.length; i++) {
        //     var fileName = list[i];

        //     var filePath = path.join( dir, fileName + '.json');

        //     var content = Utils.jsonParse(fs.readFileSync(filePath, 'utf8'));

        //     // console.log('filePath', filePath);
        //     // console.log('content', content);

        //     if(content != ''){

        //         var selectedBy = content.options.selectedBy;

        //         var newSelectedBy = [];

        //         for (var j = 0; j < selectedBy.length; j++) {
        //             var item = selectedBy[j];

        //             if(item.login != login){
        //                 newSelectedBy.push(item);
        //             }
        //         };

        //         content.options.selectedBy = newSelectedBy;

        //         fs.writeFileSync(filePath, Utils.jsonStringify(content) );

                
        //     }

        // };

        //console.log('_that.onChangeResult', _that.onChangeResult);

        _that.onChangeResult( {
            status:'User disconnected',
            name:'page',
            event: 'userDisconnected',
            login: login
        } );


        this.deleteHistory();


    }catch (ex){
        console.log('clearBeforeDisconnect error', ex);

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.deleteHistory = function(){

    console.log('deleteHistory', this.socket.rooms.length);

    try{
        var userId = '' + this.userId;
        var projectId = '' + this.projectId;
        if(this.socket.rooms.length == 0){


            console.log('---------------deleteHistory------------------------');

            var historyPath =  path.join(this.DIRNAME, userId, projectId, 'history');
            this.deleteFolder(historyPath);
        }

    }catch(ex){


        console.log('deleteHistory error', ex);

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.openPageFiles = function(dir, list, done, data) {

    var results = [];

    try{

        var skipNotActive = data.skipNotActive == undefined ? false : data.skipNotActive;

        for (var i = 0; i < list.length; i++) {
            var fileName = list[i];

            var filePath = path.join( dir, fileName + '.json');

            var content = Utils.jsonParse(fs.readFileSync(filePath, 'utf8'));

            if(skipNotActive){
                if(content.options.active){
                    results.push(  content  );
                }
            }else{
                results.push(  content  );
            }


            var projectOptionsFilePath = path.join(dir, 'options.json' );

            var contentOptions = Utils.jsonParse(fs.readFileSync(projectOptionsFilePath, 'utf8'));

        };

        done ({ status:"Open folder correctly", files:list, pages:results, options:contentOptions });

    }catch (ex) {
        console.log({ ex:ex, message:'ERROR on openPageFiles' });

        this.socket.errorMailer.send(ex);
    }

//    var i = 0;
//    (function next() {
//        var file = list[i++];
//        if (!file){
//            return openProjectOptions( done, { files:list,
//                                               status:"Open folder correctly",
//                                               pages:results }  );
//        }
//
//
//        file = path.join( dir, file + '.json');
//        fs.readFile(file, 'utf8', function(err, content) {
//            if (err) {
//                //console.log("Error open file " + file);
//            } else {
//                results.push( Utils.jsonParse( content ) );
//                next();
//            }
//        });
//    })();
//
//    function openProjectOptions( onOpen, toSend ) {
//
//        var projectOptionsFilePath = path.join(dir, '/options.json' );
//
//        fs.exists(projectOptionsFilePath, function(exist) {
//
//                if(exist){
//                    fs.readFile(projectOptionsFilePath, 'utf8', function(err, content) {
//                        if (err) {
//                            console.log("Error open file " + file);
//
//                            onOpen(toSend);
//
//                        } else {
//
//                            toSend.options =  Utils.jsonParse( content );
//                            onOpen(toSend);
//                        }
//                    });
//                }else{
//
//                    onOpen(toSend);
//                }
//            }
//        );
//    };
};

Project.prototype.createBlankPage = function( data, onResult, onFault ){

    var _that = this;

    try{

        var addNewPageVisitor = new AddNewPageVisitor(data, onResult, onFault);
        this.accept(addNewPageVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Add new page' });
        onFault({ error:'Add new page fault', ex:ex, message:'ERROR Add new page' });

        this.socket.errorMailer.send(ex);
    }



    //console.log('-- Creating blank page: ' + pageId);

    // try{


    //     console.log("ROOOOM");
    //     console.log(this.socket.myRoom.toString());

    //     var page = data.page;
    //     var map = data.map;
    //     var oldPageId = parseInt(data.oldPageId);

    //     var userId = this.socket.ownerId.toString();
    //     var projectId = this.socket.myRoom.toString();
    //     var sitemap = 'sitemap';
    //     //var pageId = page.options.pageid.toString();


    //     var errors = [];
    //     var statuses = [];

    //     var optionsFilePath  = path.join(this.DIRNAME, userId, projectId, sitemap, 'options.json');

    //     console.log('optionsFilePath', optionsFilePath)

    //     var pageId = this.setLastPageID( optionsFilePath );

    //     page.options.pageid = pageId;
    //     //page.options.pagename = "Strona: " + pageId;
    //     page.options.pagename = "" + (map.pages.length + 1);

    //     var pidString = '' + pageId;

    //     var url = path.join(this.DIRNAME, userId, projectId, sitemap, pidString);

    //     var fileContent = Utils.jsonStringify( page );

    //     //console.log('fileContent', fileContent);

    //     _that.saveFile(url, fileContent );

    //     var oldPageIndex = map.pages.length;

    //     if(oldPageId){

    //         oldPageIndex = map.pages.indexOf(oldPageId) + 1;
    //         map.pages.splice(oldPageIndex, 0, pageId);

    //         console.log('oldPageId', oldPageId);
    //         console.log('oldPageIndex', oldPageIndex);
    //         console.log(' map.pages',  map.pages);

    //     }else{
    //         map.pages.push(pageId);
    //     }



    //     var fileMapContent = Utils.jsonStringify( map );

    //     var mapFilePath = path.join(this.DIRNAME, userId, projectId, sitemap, '/map.json' );

    //     _that.saveMapFile(mapFilePath, fileMapContent );

    //     onResult({
    //         status:statuses,
    //         page: page,
    //         lastPageId:pageId,
    //         oldPageId:oldPageId,
    //         oldPageIndex:oldPageIndex,

    //     });


    //     var projectRootPath = path.join(this.DIRNAME, userId, projectId, 'pre', 'exported_view', pidString);
    //     _that.createPageFolderStructure(projectRootPath);

    //     _that.onChangeResult( {
    //         status:'Create blank page ' + url,
    //         name:'page',
    //         event: 'createBlankPage',
    //         page: page,
    //         lastPageId:pageId,
    //         oldPageId:oldPageId,
    //         oldPageIndex:oldPageIndex
    //     } );

    // }catch (ex) {
    //     onFault({ ex:ex, message:'ERROR on createBlankPage' });

    //     this.socket.errorMailer.send(ex);
    // }
}

Project.prototype.setLastPageID = function( optionsFilePath ) {


    var optionsFile = optionsFilePath;

    var options = Utils.jsonParse(fs.readFileSync(optionsFile, 'utf8'));

    var lastPageId = parseInt(options.last_page_id);
    lastPageId += 1;
    options.last_page_id = lastPageId;

    fs.writeFileSync(optionsFile, Utils.jsonStringify(options));

    return options.last_page_id;

};

Project.prototype.getFolderStructurePathsArray = function( pageExportedPath ){

    var arr = [];

        var audioPath =  path.join(pageExportedPath, 'audio');
        var soundsPath =  path.join(pageExportedPath, 'sounds');
        var filePath =  path.join(pageExportedPath, 'files');
        var galleryPath =  path.join(pageExportedPath, 'gallery');
        var imagesPath =  path.join(pageExportedPath, 'images');
        var imgpagePath =  path.join(pageExportedPath, 'imgpage');
        var swfPath =  path.join(pageExportedPath, 'swf');
        var videoPath =  path.join(pageExportedPath, 'videos');
        var thumbPath =  path.join(pageExportedPath, 'thumb');

    arr = [audioPath, soundsPath, filePath, galleryPath, imagesPath, imgpagePath, swfPath, swfPath, videoPath, thumbPath ];

    try{

    }catch (ex){

    }finally{
        return arr;
    }

}

Project.prototype.createPageFolderStructure = function( pageExportedPath ){

    var _that = this;

    var folderStructurePathsArray = _that.getFolderStructurePathsArray( pageExportedPath );

    for (var i = 0; i < folderStructurePathsArray.length; i++) {
        var dir = folderStructurePathsArray[i];

        _that.createFolder(dir);
    };

}

Project.prototype.deletePageFolderStructure = function( pageExportedPath ){

    var _that = this;

    _that.deleteFolder(pageExportedPath);
}

Project.prototype.createFolder = function( path ){

    try{

        fs.mkdirsSync(path, function(e){

            if(!e || (e && e.code === 'EEXIST')){
                //do something with contents
            } else {
                //debug
                //console.log(e);
            }
        });

    }catch(ex){
        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.renameFolder = function( oldPath, newPath ) {

    try{
        fs.renameSync(oldPath, newPath);

    }catch(ex){
        //console.log('Rename folder error', path);

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.deleteFolder = function( path ) {

    try{
        fs.removeSync(path);

    }catch(ex){
         console.log('Delete folder error', path);

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.updatePage = function(data, onResult, onFault ){

    var _that = this;

    try{

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();
        var sitemap = 'sitemap';
        var pageId = data.options.pageid.toString();
        var fileContent = Utils.jsonStringify( data );

        //console.log('-- Updating page: ' + pageId);


        var url  = path.join(this.DIRNAME, userId, projectId, sitemap, pageId);

        _that.saveFile(url, fileContent);

        onResult({ status:'Update page successed' });

        _that.onChangeResult( {
            status:'Page file changed ' + url,
            name:'page',
            event: 'updatePage',
            page: data
        } );


    }catch (ex) {
        onFault({ ex:ex, message:'ERROR on updating page' });
        //console.log({ ex:ex, message:'ERROR on updating page' });

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.deletePages = function(data, onResult, onFault ){

    var _that = this;

    try{

        var deletePagesVisitor = new DeletePagesVisitor(data, onResult, onFault);
        this.accept(deletePagesVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Delete pages' });
        onFault({ error:'Delete pages fault', ex:ex, message:'ERROR Delete pages' });

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.deletePage = function(data, onResult, onFault ){

    var _that = this;

    try{

        var map = data.map;

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();
        var sitemap = 'sitemap';
        var pageId = data.pageId.toString();
        var fileMapContent = Utils.jsonStringify( map );


        console.log('-- Delete page: ' + pageId);



        var errors = [];
        var statuses = [];

        var url  = path.join(this.DIRNAME, userId, projectId, sitemap, pageId );

        fs.unlinkSync(url + '.json');

        statuses.push({ status:'Delete page successed' });

        var mapFilePath = path.join(this.DIRNAME, userId, projectId, sitemap, '/map.json' );

        this.deleteFolder(url);

        _that.saveMapFile(mapFilePath, fileMapContent );

        onResult({ status:statuses });


        var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, pageId);
        _that.deletePageFolderStructure( pageExportedPath );

        _that.onChangeResult( {
            status:'Page is deleted ' + url,
            name:'page',
            event: 'deletePage',
            page: data,
            pageId: pageId
        } );


    }catch (ex) {
        onFault({ ex:ex, message:'ERROR on delete page' });
        //console.log({ ex:ex, message:'ERROR on delete page' });

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.getPageExportedPath = function(dirname, userId, projectId, pageId ){

    var dir = "";

    try{
        dir =  path.join(dirname, userId, projectId, 'pre', 'exported_view', pageId);
    }catch (ex){
        this.socket.errorMailer.send(ex);
    }finally{
        return dir;
    }
}


Project.prototype.copyPage = function(data, onResult, onFault ){

    var _that = this;

    try{

        var copyPageVisitor = new CopyPageVisitor(data, onResult, onFault);

        this.accept(copyPageVisitor);

    } catch (ex){

        onFault({ error:'Copy page fault' });

        this.socket.errorMailer.send(ex);
    }

}

Project.prototype.duplicatePagesFromOtherProject = function(data, onResult, onFault ){

    var _that = this;

    try{

        var duplicatePagesVisitorFromOtherProject = new DuplicatePagesVisitorFromOtherProject(data, onResult, onFault);
        this.accept(duplicatePagesVisitorFromOtherProject);

    } catch (ex){

        onFault({ error:'Duplicate pages visitor fom other project fault' });

        this.socket.errorMailer.send(ex);
    }

}

Project.prototype.watchProject = function(data, onResult, onFault ){

    var _that = this;

    this.onChangeResult = onResult;
    this.onFileChangeFault = onFault;

}

Project.prototype.goToHistoryItem = function(data, onResult, onFault ){

    var _that = this;

    try{

        this.historyModel.goToHistoryItem(data, onResult, onFault);

    } catch (ex){

        onFault({ error:'Go to history item fault', ex:ex, message:'ERROR Go to history item' });

        this.socket.errorMailer.send(ex);
    }
}




Project.prototype.updatePageSort = function(data, onResult, onFault ){

    var _that = this;

    try{

        var updatePageSortVisitor = new UpdatePageSortVisitor(data, onResult, onFault);
        this.accept(updatePageSortVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Update page sort' });
        onFault({ error:'Update page sort fault', ex:ex, message:'ERROR Update page sort' });

        this.socket.errorMailer.send(ex);
    }

    // var _that = this;

    // var userId = this.socket.ownerId.toString();
    // var projectId = this.socket.myRoom.toString();
    // var sitemap = 'sitemap';


    // try{

    //     var errors = [];
    //     var statuses = [];

    //     var mapFilePath = path.join(this.DIRNAME, userId, projectId, sitemap, '/map.json' );

    //     var fileContent = Utils.jsonStringify( data );

    //     _that.saveMapFile(mapFilePath, fileContent );

    //     onResult({ status:statuses });

    //     _that.onChangeResult( {
    //         status:'Update Page Sort ',
    //         name:'map',
    //         event: 'updatePageSort',
    //         map: data,
    //         page:data.page
    //     } );


    // }catch (ex) {
    //     onFault({ ex:ex, message:'ERROR on copy page' });

    //     this.socket.errorMailer.send(ex);
    // }
}

Project.prototype.saveProjectOptions = function(data, onResult, onFault ){

    var _that = this;

    try{

        var updateProjectOptionsVisitor = new UpdateProjectOptionsVisitor(data, onResult, onFault);
        this.accept(updateProjectOptionsVisitor);

    } catch (ex){


        console.log('!!! ERR', { ex:ex, message:'ERROR Update project options' });
        onFault({ error:'Update project options fault', ex:ex, message:'ERROR Update project options' });

        this.socket.errorMailer.send(ex);
    }

    // var _that = this;

    // var userId = this.socket.ownerId.toString();
    // var projectId = this.socket.myRoom.toString();
    // var sitemap = 'sitemap';

    // try{
    //     var url  = path.join(this.DIRNAME, userId, projectId, sitemap );

    //     var optionsFilePath = path.join(this.DIRNAME, userId, projectId, sitemap, '/options.json' );

    //     var fileContent = Utils.jsonStringify( data );

    //     _that.saveProjectOptionsFile(optionsFilePath, fileContent);

    //     onResult({ status:'Save options successed' });

    //     _that.onChangeResult( {
    //         status:'Save Project Options',
    //         name:'options',
    //         event: 'saveProjectOptions',
    //         options: data,
    //         page:data.page
    //     } );


    // }catch (ex) {
    //     onFault({ ex:ex, message:'ERROR save options file' });

    //     this.socket.errorMailer.send(ex);
    // }
}

Project.prototype.copyFoldersToHash = function( pagePath, hash, components ){

    var _that = this;

    if(hash == undefined){
        return;
    }

    var userId = this.socket.ownerId.toString();
    var projectId = this.socket.myRoom.toString();

    try{

        var historyPath =  path.join(this.DIRNAME, userId, projectId, 'history');


        nodeDir.paths(pagePath, function(err, paths) {
            if (err) {
                console.log('kritikal error ;]');
                return;
            }

            try {

                for (var i in paths.dirs) {

                    var actualFolder =  paths.dirs[i];

                    var pathN = path.dirname(actualFolder);
                    var dirName = path.basename(actualFolder);

                    var prefixFolder =  path.basename(pathN);

                    var hashPath =  path.join(historyPath, hash, prefixFolder, dirName );


                    for (var j = 0; j < components.length; j++) {

                        var actionkey = components[j].actionkey;

                        if(dirName == actionkey){
                            fse.copySync(actualFolder, hashPath);

                            _that.deleteFolder(actualFolder);
                        }
                    }
                }
                
            } catch(error) {
                console.log(error);
            }
        });

    }catch (ex){
        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.addComponents = function(data, onResult, onFault ){

    var _that = this;

    try{

        var addComponentsVisitor = new AddComponentsVisitor(data, onResult, onFault);
        this.accept(addComponentsVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Add component' });
        onFault({ error:'Add components fault', ex:ex, message:'ERROR Add component' });

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.deleteComponents = function(data, onResult, onFault ){

}

Project.prototype.updateComponents = function(data, onResult, onFault ){

    var _that = this;

    try{

        var updateComponentsVisitor = new UpdateComponentsVisitor(data, onResult, onFault);
        this.accept(updateComponentsVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Update component' });
        onFault({ error:'Update components fault', ex:ex, message:'ERROR Update component' });

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.cutComponents = function(data, onResult, onFault ){

    var _that = this;

    try{

        var cutComponentsVisitor = new CutComponentsVisitor(data, onResult, onFault);
        this.accept(cutComponentsVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Cut components' });
        onFault({ error:'Cut componentss fault', ex:ex, message:'ERROR Cut components' });

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.pasteComponents = function(data, onResult, onFault ){

    var _that = this;

    console.log('pasteComponents', data);

    try{

        var pasteComponentsVisitor = new PasteComponentsVisitor(data, onResult, onFault);
        this.accept(pasteComponentsVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Paste components' });
        onFault({ error:'Paste componentss fault', ex:ex, message:'ERROR Paste components' });

        this.socket.errorMailer.send(ex);
    }
}






Project.prototype.deleteComponents = function(data, onResult, onFault, imageMagick ){

    var _that = this;

    try{

        var deleteComponentsVisitor = new DeleteComponentsVisitor(data, onResult, onFault);
        this.accept(deleteComponentsVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Delete components' });
        onFault({ error:'Delete components fault', ex:ex, message:'ERROR Delete components' });

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.updateComponent = function(data, onResult, onFault, imageMagick ){

    

    var _that = this;

    try{



        var page = data.page;
        var component = data.component;
        var action = data.action;
        var timeline = data.timeline;
        var selectedRowId = data.selectedRowId;

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();
        var sitemap = 'sitemap';
        var pageId = page.options.pageid.toString();
        var fileContent = Utils.jsonStringify( page );




        var url  = path.join(this.DIRNAME, userId, projectId, sitemap, pageId);

        switch (action) {

            // case 'add':

            //     var oneComponent = component[0];
            //     var actionkey = oneComponent.actionkey;

            //     console.log('add', component.type);

            //     switch (oneComponent.type) {

            //         case 'infopoint-download':
            //         case 'infopoint-gallery':
            //         case 'infopoint-link':
            //         case 'infopoint-popup':
            //         case 'infopoint-sound':
            //         case 'infopoint-soundrecord':
            //         case 'form-upload':
            //         //case 'image':

            //             var fileName = oneComponent.type + '.png';

            //             var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, pageId);

            //             var imageFilePath =  path.join(ConfigController.get('APP_IMAGES_PATH'), 'buttons', fileName);
            //             var copiedImageFilePath =  path.join(pageExportedPath, 'images', actionkey, fileName );

            //             oneComponent.imageFileName = fileName;



            //             fs.exists(imageFilePath, function(exists) {
            //                 if (exists) {
            //                     fse.copySync(imageFilePath, copiedImageFilePath);
                                

            //                     // console.log('imageFilePath', imageFilePath);
            //                     // console.log('copiedImageFilePath', copiedImageFilePath);

                               

            //                     var file = copiedImageFilePath;

            //                     var extFileName = file.split('.').pop().toLowerCase();

            //                     var pathN = path.dirname(file);
            //                     var minFile = path.join(pathN, 'min.' + extFileName);

            //                     fse.copySync(file, minFile);

            //                     if(extFileName == 'png'){

            //                         var buffer = fs.readFileSync(file);
            //                         var resBuffer = pngquant.compress(buffer, {
            //                             "speed": 1 //1 ~ 11 
            //                         });
            //                         fs.writeFileSync(minFile, resBuffer);

            //                         // console.log('min file finished');

            //                         // data.fileName = minFile;
            //                         // data.pageID = pageId;
            //                         // data.actionkey = actionkey;
            //                         // data.width = oneComponent.width;
            //                         // data.height = oneComponent.height;

            //                         // imageMagick.resizeImage( data, onResult, onFault );
            //                     }
            //                 }
            //             });



            //             break;
            //     }

            //     break;

            case 'delete-without-delete-folder':
                console.log('component', component);

                _that.componentsToDelete = component;

                // TODO: zrobić usuwanie elementów z tablicy this.componentsToDelete
                //       zbudować tablice sciezek do usuniecia i wykonac w DISCONNECT 
                //       usuwanie tych ciezek z dysku - dopiero jak bedzie dopracowany CTRL+Z
                break;

            case 'delete':

                var hash = data.hash;

                var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, pageId);

                var folderStructurePathsArray = _that.getFolderStructurePathsArray( pageExportedPath );

                _that.copyFoldersToHash( pageExportedPath, hash, component );

                //for (var i = 0; i < folderStructurePathsArray.length; i++) {
                    //var dir = folderStructurePathsArray[i];

                    for (var j = 0; j < component.length; j++) {

                        var actionkey = component[j].actionkey;

                        for (var k = 0; k < folderStructurePathsArray.length; k++) {
                            var dir = folderStructurePathsArray[k];

                            console.log('delete', actionkey);

                            //var filePath = path.join(dir, actionkey);
                            //_that.deleteFolder(filePath);

                            //var oldPath = path.join(dir, actionkey);
                            //var newPath = path.join(dir, 'del-' + actionkey);

                            //this.renameFolder(oldPath, newPath);
                        };
                    }
                //}

                //_that.copyFoldersToHash( hash, dir, actionkey );

                //var oldPath = path.join(dir, actionkey);
                //var newPath = path.join(dir, 'del-' + actionkey);

                //this.renameFolder(oldPath, newPath);

                var filePath = path.join(dir, actionkey);
                _that.deleteFolder(filePath);
                
                break;

            case 'delete-file-gallery':

                var actionkey = data.actionkey;
                var fileName = data.fileName;

                var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, pageId);

                var galleryFilesDir  = path.join(pageExportedPath, 'gallery', actionkey);

                fs.readdir(galleryFilesDir, function(err, files){

                    if(err == false){
                        onFault({ err:err });
                    }else{
                        if(files != undefined && files.length > 1){

                            var galleryFilePath = path.join(galleryFilesDir, fileName);
                            fs.unlink(galleryFilePath);
                        }else{
                            _that.deleteFolder(galleryFilesDir);
                        }
                    }
                });
                break;

            case 'delete-file-crossword':

                var actionkey = data.actionkey;
                var fileName = data.fileName;
                var type = data.type;

                var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, pageId);

                var fileDir;

                if (type === 'image') {

                    fileDir = path.join(pageExportedPath, 'images', actionkey);
                } else {

                    fileDir = path.join(pageExportedPath, 'sounds', actionkey);

                }

                //var galleryFilesDir  = path.join(pageExportedPath, 'gallery', actionkey);

                fs.readdir(fileDir, function(err, files){

                    if(err == false){
                        onFault({ err:err });
                    }else{
                        if(files != undefined && files.length > 1){

                            var filePath = path.join(fileDir, fileName);
                            fs.unlink(filePath);
                        }else{
                            _that.deleteFolder(fileDir);
                        }
                    }
                });
                break;

            case 'delete-file-sound':

                var actionkey = data.actionkey;
                var fileName = data.fileName;

                var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, pageId);

                var soundFilesDirAudio  = path.join(pageExportedPath, 'audio', actionkey);

                fs.readdir(soundFilesDirAudio, function(err, files){

                    if(err == false){
                        onFault({ err:err });
                    }else{
                        console.log('usuwnaie sound');
                        if(files != undefined && files.length > 1){

                            var soundFilePath = path.join(soundFilesDirAudio, fileName);
                            fs.unlink(soundFilePath);
                        }else{
                            _that.deleteFolder(soundFilesDirAudio);
                        }
                    }
                });

                var soundFilesDirSound  = path.join(pageExportedPath, 'sounds', actionkey);

                fs.readdir(soundFilesDirSound, function(err, files){

                    if(err == false){
                        onFault({ err:err });
                    }else{
                        if(files != undefined && files.length > 1){

                            var soundFilePath = path.join(soundFilesDirSound, fileName);
                            fs.unlink(soundFilePath);
                        }else{
                            _that.deleteFolder(soundFilesDirSound);
                        }
                    }
                });
                break;

            case 'delete-file-file':

                var actionkey = data.actionkey;
                var fileName = data.fileName;

                var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, pageId);

                var filesDir  = path.join(pageExportedPath, 'file', actionkey);

                fs.readdir(filesDir, function(err, files){

                    if(err == false){
                        onFault({ err:err });
                    }else{
                        if(files != undefined && files.length > 1){

                            var filePath = path.join(filesDir, fileName);
                            fs.unlink(filePath);
                        }else{
                            _that.deleteFolder(filesDir);
                        }
                    }
                });
                break;

            case 'delete-file-video':

                var actionkey = data.actionkey;
                var fileName = data.fileName;

                var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, pageId);

                var filesDir  = path.join(pageExportedPath, 'videos', actionkey);

                fs.readdir(filesDir, function(err, files){

                    if(err == false){
                        onFault({ err:err });
                    }else{
                        if(files != undefined && files.length > 1){

                            var filePath = path.join(filesDir, fileName);
                            fs.unlink(filePath);
                        }else{
                            _that.deleteFolder(filesDir);
                        }
                    }
                });
                break;

            default:
                break;
        }

        _that.saveFile(url, fileContent);

        // var pageModel = projectModel.getPageModelById(1);
        // var componentModel = pageModel.addNewComponent(component, 1);

        onResult({ 
            status:'Update page successed', 
            action: action, 
            component: component,
            responce: PageModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:this.socket.ownerId.toString(), 
                                        projectId:this.socket.myRoom.toString(), 
                                        pageId:pageId, 
                                        socket:this.socket })
        });

        _that.onChangeResult( {
            status:'Page file changed and update component' + url,
            name:'component',
            event: 'updateComponent',
            action: action,
            page: page,
            components: component,
            pageId: pageId,
            timeline: timeline,
            selectedRowId: selectedRowId

        } );


    }catch (ex) {
        console.log('!!! ERR', { ex:ex, message:'ERROR Update component' });
        onFault({ ex:ex, message:'ERROR Update component' });

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.updateTimeline = function(data, onResult, onFault ){

    var _that = this;

    try{

        var page = data.page;
        var component = data.component;
        var action = data.action;
        var timeline = data.timeline;
        var selectedRowId = data.selectedRowId;
        var position = data.position;
        var line = data.line;

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();
        var sitemap = 'sitemap';
        var pageId = page.options.pageid.toString();
        var fileContent = Utils.jsonStringify( page );


        var url  = path.join(this.DIRNAME, userId, projectId, sitemap, pageId);

        _that.saveFile(url, fileContent);

        onResult({ status:'Update page successed' });

        _that.onChangeResult( {
            status:'Timeline is updated' + url,
            name:'timeline',
            event: 'updateTimeline',
            action: action,
            page: page,
            component: component,
            position : position,
            line: line,
            pageId: pageId,
            timeline: timeline,
            selectedRowId: selectedRowId
        } );


    }catch (ex) {
        onFault({ ex:ex, message:'ERROR Update component' });

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.updateTimelineOptions = function(data, onResult, onFault ){

    var _that = this;

    var _that = this;

    try{

        var updateRowOptionsVisitor = new UpdateRowOptionsVisitor(data, onResult, onFault);
        this.accept(updateRowOptionsVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Update row options' });
        onFault({ error:'Update row options fault', ex:ex, message:'ERROR Update row options' });

        this.socket.errorMailer.send(ex);
    }

    // try{

    //     var page = data.page;
    //     var pageId = page.options.pageid.toString();

    //     var timelineOptions = data.timelineOptions;
    //     var lineId = timelineOptions.id;

    //     var userId = this.socket.ownerId.toString();
    //     var projectId = this.socket.myRoom.toString();

    //     var sitemap = 'sitemap';

    //     var url  = path.join(this.DIRNAME, userId, projectId, sitemap, pageId);

    //     var pageData = Utils.jsonParse(fs.readFileSync(url + '.json', 'utf8'));

    //     for (var line in pageData.lines) {
    //         if (pageData.lines[line].options.id == lineId) {
    //             pageData.lines[line].options = timelineOptions;
    //         }
    //     }

    //     var pageDataToSave = Utils.jsonStringify(pageData);

    //     _that.saveFile(url, pageDataToSave );

    //     onResult({ status:'Line options is updated' });

    //     _that.onChangeResult( {
    //         status:'line options is updated' + url,
    //         name:'line-options',
    //         event: 'updateTimelineOptions',
    //         lineId: lineId,
    //         timelineOptions: timelineOptions,
    //         pageId: pageId,
    //         page:data.page
    //     } );

    // }catch (ex){
    //     onFault({ ex:ex, message:'ERROR open page file' });

    //     this.socket.errorMailer.send(ex);
    // }

//    fs.exists(url + ".json", function(exists) {
//        if (exists) {
//            fs.readFile(url + ".json", 'utf8', function (err, content) {
//                if (err) {
//                    onFault({ ex:ex, message:'ERROR open page file' });
//                }else{
//                    try{
//                        if(content != ""){
//                            var pageData = Utils.jsonParse(  content );
//
//                            for (var line in pageData.lines) {
//                                if (pageData.lines[line].options.id == data.lineid) {
//                                    pageData.lines[line].options = data.timelineOptions;
//                                }
//                            }
//                            var pageDataToSave = Utils.jsonStringify(pageData);
//
//                            _that.saveFile(url, pageDataToSave );
//
//                            _that.onChangeResult( {
//                                status:'line options is updated' + url,
//                                name:'line-options',
//                                event: 'updateTimelineOptions',
//                                lineid: data.lineid,
//                                timelineOptions: data.timelineOptions,
//                                pageId: pageId
//                            } );
//
//                        }else{
//                            onFault({ status:'ERROR, there is no content in page file', message:'Content of page file is empty' });
//                        }
//                    }catch(ex){
//                        onFault({ ex:ex, message:'ERROR open page file' });
//                    }
//                }
//            });
//        }
//    });
}


Project.prototype.updatePageOptions = function(data, onResult, onFault ){

    var _that = this;

    try{

        var updatePageOptionsVisitor = new UpdatePageOptionsVisitor(data, onResult, onFault);
        this.accept(updatePageOptionsVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Update components' });
        onFault({ error:'Update components fault', ex:ex, message:'ERROR Update components' });

        this.socket.errorMailer.send(ex);
    }

    // var _that = this;

    // try{

    //     var page = data.page;
    //     var pageOptions = data.pageOptions;
    //     var action = data.action;

    //     var userId = this.socket.ownerId.toString();
    //     var projectId = this.socket.myRoom.toString();
    //     var sitemap = 'sitemap';
    //     var pageId = page.options.pageid.toString();
    //     var fileContent = Utils.jsonStringify( page );

    //     var url  = path.join(this.DIRNAME, userId, projectId, sitemap, pageId);

    //     if(action == 'delete-page-sound'){

    //         var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, pageId);

    //         var pageSoundFilesDir  = path.join(pageExportedPath, 'audio', 'page');

    //         _that.deleteFolder(pageSoundFilesDir);
    //     }

    //     if (action == 'delete-page-background') {

    //         var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, pageId);

    //         var pageImageFilesDir  = path.join(pageExportedPath, 'imgpage');

    //         _that.deleteFolder(pageImageFilesDir);
    //     }

    //     _that.saveFile(url, fileContent );

    //     onResult({ status:'Update page successed' });

    //     _that.onChangeResult( {
    //         status:'Page options is updated' + url,
    //         name:'page-options',
    //         event: 'updatePageOptions',
    //         page: page,
    //         pageOptions: pageOptions,
    //         pageId: pageId
    //     } );


    // }catch (ex) {
    //     onFault({ ex:ex, message:'ERROR Update component' });

    //     this.socket.errorMailer.send(ex);
    // }
}

Project.prototype.updatePagesOptions = function(data, onResult, onFault ){

    var _that = this;

    try{

        var updatePagesOptionsVisitor = new UpdatePagesOptionsVisitor(data, onResult, onFault);
        this.accept(updatePagesOptionsVisitor);

    }catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Update pages options' });
        onFault({ error:'Update pages options fault', ex:ex, message:'ERROR Update pages options' });

        this.socket.errorMailer.send(ex);
    }

   
}




Project.prototype.createDeafulProjectOptionsContent = function(){
    var settings = {
        name: "Testowy projekt",
        snapping: true,
        showsnaplines : true,
        show_titles : false,
        draggable_snaptolerance: 10,
        scorm_score_required: false,
        require_score: false,
        require_pages: true,
        require_elements: false,
        help_title : "",
        sound_loop : true,
        sound_vol : 100,
        pagelisttype: 'thumbs',
        singlefile: false,
        orginal_images: false,
        convert_sound_to_ogg: true,
        toc_enabled: true,
        last_page_id: 0
    };

    var fileContent = Utils.jsonStringify( settings );

    return fileContent;
}


Project.prototype.createDeafultMapFileContent = function(){
    var settings = {
        pages:[]
    };

    var fileContent = Utils.jsonStringify( settings );

    return fileContent;
}

Project.prototype.saveProjectOptionsFile = function(path, fileContent, onError ){

    var _that = this;

    fs.writeFileSync(path, fileContent, onError );
}

Project.prototype.saveMapFile = function(path, fileContent, onError ){

    var _that = this;

    fs.writeFileSync(path, fileContent, onError );
}

Project.prototype.saveFile = function(url, fileContent, onError ){

    var _that = this;

    fs.writeFileSync(url + '.json', fileContent, onError );
}


Project.prototype.copyComponents = function( data, onResult, onFault ){


    try{


        var copyComponentVisitor = new CopyComponentVisitor2(data, onResult, onFault);

        this.accept(copyComponentVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Copy components' });
        onFault({ error:'Copy components fault', ex:ex, message:'ERROR Copy components' });

        this.socket.errorMailer.send(ex);
    }


}

Project.prototype.copyComponentsFromOtherProject = function( data, onResult, onFault ){

    try{

        var copyComponentVisitor = new CopyComponentVisitor3(data, onResult, onFault);

        this.accept(copyComponentVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Copy components from other project' });
        onFault({ error:'Copy components from other project fault', ex:ex, message:'ERROR Copy components from other project' });

        this.socket.errorMailer.send(ex);
    }


}

Project.prototype.duplicateComponents = function( data, onResult, onFault ){

    try{

        var duplicateComponentVisitor = new DuplicateComponentVisitor(data, onResult, onFault);

        this.accept(duplicateComponentVisitor);

    } catch (ex){

        onFault({ error:'Duplicate components fault' });

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.moveComponentsToLayer = function( data, onResult, onFault ){

    try{

        var moveComponentsToLayerVisitor = new MoveComponentsToLayerVisitor(data, onResult, onFault);

        this.accept(moveComponentsToLayerVisitor);

    } catch (ex){

        onFault({ error:'Move components to layer fault' });

        this.socket.errorMailer.send(ex);
    }    
   
}

Project.prototype.sortRows = function( data, onResult, onFault ){


    try{

        var sortRowsVisitor = new SortRowsVisitor(data, onResult, onFault);

        this.accept(sortRowsVisitor);

    } catch (ex){

        onFault({ error:'Sort rows fault' });

        this.socket.errorMailer.send(ex);
    }    

}

Project.prototype.duplicatePages = function( data, onResult, onFault ){

    try{

        var duplicatePagesVisitor = new DuplicatePagesVisitor(data, onResult, onFault);

        this.accept(duplicatePagesVisitor);

   } catch (ex){

        onFault({ error:'Duplicate pages fault' });

        this.socket.errorMailer.send(ex);
    }  

}

Project.prototype.getComponentsListToPaste = function( data, onResult, onFault ){

    try{

        var getComponentsListToPasteVisitor = new GetComponentsListToPasteVisitor(data, onResult, onFault);

        this.accept(getComponentsListToPasteVisitor);

    } catch (ex){

        onFault({ error:'Get components list paste fault' });

        this.socket.errorMailer.send(ex);
    }  

}




Project.prototype.generateActionkey = function( pageJsonContent ) {

    var userId = this.socket.ownerId.toString();
    var projectId = this.socket.myRoom.toString();

    var lastComponentId = pageJsonContent.options.lastComponentId;

    var pageId = pageJsonContent.options.pageid;

    var __meta__ = this.socket.__meta__;

    var loginHashed = __meta__.loginHashed;

    var actionkey = loginHashed + '-' + lastComponentId + '-' + pageId;

    lastComponentId++;
    pageJsonContent.options.lastComponentId = lastComponentId;

    return { actionkey:actionkey, lastComponentId:lastComponentId };
}

Project.prototype.clearProject = function( data, onResult, onFault ){
    var _that = this;



    var userId = this.socket.ownerId.toString();
    var projectId = this.socket.myRoom.toString();


    try{

        var dirname  = path.join(this.DIRNAME, userId, projectId);

        var sitemapDir =  path.join(dirname, 'sitemap');
        var exportedViewDir =  path.join(dirname, 'pre', 'exported_view');

        this.deleteFolder(sitemapDir);
        this.createFolder(sitemapDir);

        this.deleteFolder(exportedViewDir);
        this.createFolder(exportedViewDir);

        onResult({ status:'Clear project correctly' });


        this.onChangeResult( {
            status:'Clear project',
            name:'clear-project',
            event: 'clearProject'
        } );


    } catch (ex){
        onFault({ status:'Clear project fault', ex:ex });

        this.socket.errorMailer.send(ex);
    }

}

Project.prototype.preparePreview = function( data, onResult, onFault, onProggres ){
    var _that = this;

    console.log('templateContent', data);

    var statuses = [];
    var errors = [];


    var userId = this.socket.ownerId.toString();
    var projectId = this.socket.myRoom.toString();

    onProggres = onProggres || function(){};

    onProggres({ status:'Start prepare preview' });

    /*
     / copy index file to project directory (maybe index file has changed so update it)
     */
    try {

        var lang = this.socket.__meta__.lang;

        var dataToSaveToFileUrl  = path.join(_that.DIRNAME, userId, projectId, 'pre', 'js', 'lang');
        var dataToSaveToFile = "var __lang = '" +  lang + "';";

        var jsFolder = path.join(_that.DIRNAME, userId, projectId, 'pre', 'js');
        if (fs.existsSync(jsFolder)) {
            _that.createFolder(jsFolder);

            onProggres({ status:'Create folder' });
        }

        fs.writeFile(dataToSaveToFileUrl + '.js', dataToSaveToFile, function(err) {

            errors.push(err);
        });

         fs.chmod(dataToSaveToFileUrl + '.js', 511, () => {});

        onProggres({ status:'chmod 511' });

        var skin = data.skin || 'sk00';

        var template = path.join(ConfigController.get('SKINS_PATH'), skin, 'templates', 'template.html');
        var indexToCopyFrom = path.join(ConfigController.get('CONTENT_TEMPLATE_VIEW_PATH'), 'index_single.html');
        var indexToPasteInto  = path.join(_that.DIRNAME, userId, projectId, 'pre', 'index.html');

        var templateContent = fs.readFileSync(template, 'utf8');
        var indexContent = fs.readFileSync(indexToCopyFrom, 'utf8');



        var margeIndexContent = indexContent.replace("[-=TEMPLATE=-]", templateContent);

        margeIndexContent = margeIndexContent.replace(/\[\-\=CONTENT_TEMPLATE_PATH\=\-\]/g, ConfigController.get('CONTENT_TEMPLATE_LINK', false));

        margeIndexContent = margeIndexContent.replace(/\[\-\=SKINS_LINK\=\-\]/g, ConfigController.get('SKINS_LINK', false));



        var timestamp = new Date().getTime();
        margeIndexContent = margeIndexContent.replace(/\[\-\=RANDOMVAL\=\-\]/g, timestamp);

        var version = ConfigController.get('VERSION');

        var find = '';
        var re = new RegExp(find, 'g');
        margeIndexContent = margeIndexContent.replace(/\[\-\=VERSION\=\-\]/g, version);

        fs.writeFileSync(indexToPasteInto, margeIndexContent);

        onProggres({ status:'Marge index content' });


//        fs.copy(indexToCopyFrom, indexToPasteInto, { replace: true }, function (err) {
//            if (err) {
//                errors.push(err);
//            }
//        });
    }catch(ex) {
        console.log('error');
        console.log(ex);

        this.socket.errorMailer.send(ex);

        onFault({ error:'Copy index file to project directory fault', ex:ex, message:'ERROR Copy index file to project directory', errors:errors });
    }


    /*
     / copy styles to project direcotory
     */
    try {
        var indexToCopyFrom = path.join(ConfigController.get('MODULES_COMPONENTS_PATH'), 'components.css');
        var indexToPasteInto  = path.join(ConfigController.get('CONTENT_TEMPLATE_PATH'), 'css', 'f_components.css');
        fs.copy(indexToCopyFrom, indexToPasteInto, { replace: true }, function (err) {
             if (err) {
                 errors.push(err);
             }
        });

        onProggres({ status:'Copy styles to project direcotory' });

    }catch(ex) {
        console.log('error');
        this.socket.errorMailer.send(ex);

        onFault({ error:'Copy styles to project direcotory fault', ex:ex, message:'ERROR Copy styles to project direcotory' });
    }


    /*
     / load project to one big JS file (variables.js) and save it in project directory
     */

     try{

        onProggres({ status:'Start load project', userId:userId, projectId:projectId });

        var loadProjectVisitor = new LoadProjectByIdVisitor( 
            {userId:userId, projectId:projectId, skipNotActive:true }, 
            function(courseData){

                onProggres({ status:'On project loaded correctly' });

                _that.createFolder( path.join(_that.DIRNAME, userId, projectId, 'pre', 'js') );

                var dataToSaveToFileUrl  = path.join(_that.DIRNAME, userId, projectId, 'pre', 'js', 'variables');
                var dataToSaveToFile = "var ProjectObject = " + Utils.jsonStringify(courseData);

                // fs.writeFile(dataToSaveToFileUrl + '.js', dataToSaveToFile, function(err) {

                //     errors.push(err);
                // });

                 fs.writeFileSync(dataToSaveToFileUrl + '.js', dataToSaveToFile);
                 fs.chownSync(dataToSaveToFileUrl + '.js', 33, 33);
		fs.chmodSync(dataToSaveToFileUrl + '.js', '755');

                if(errors.length > 0){
                    onFault({errors:errors, error:'error'});
                }else{
                    statuses.push('Write file correctly');
                    onResult({ statuses:statuses });
                }

                onProggres({ status:'Finish publish project', errors:errors, statuses:statuses });

            },
            function(errorData) {
                onFault({error:'error', errorData:errorData})
            }
        );
        this.accept(loadProjectVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Load project publication' });
        onFault({ error:'Load project publication fault', ex:ex, message:'ERROR Load project publication' });

        this.socket.errorMailer.send(ex);
    }

    // try {

    //     this.loadProject(
    //         { userId:userId, projectId:projectId, skipNotActive:true, },
    //         function(courseData){

    //             _that.createFolder( path.join(_that.DIRNAME, userId, projectId, 'pre', 'js') );

    //             var dataToSaveToFileUrl  = path.join(_that.DIRNAME, userId, projectId, 'pre', 'js', 'variables');
    //             var dataToSaveToFile = "var ProjectObject = " + Utils.jsonStringify(courseData);

    //             fs.writeFile(dataToSaveToFileUrl + '.js', dataToSaveToFile, function(err) {

    //                 errors.push(err);
    //             });

    //             if(errors.length > 0){
    //                 onFault({errors:errors, error:'error'});
    //             }else{
    //                 statuses.push('Write file correctly');
    //                 onResult({ statuses:statuses });
    //             }

    //         },
    //         function(errorData) {
    //             onFault({error:'error', errorData:errorData})
    //         }
    //     );

    // }catch(ex) {
    //     console.log('error');
    //     console.log(ex);
    //     this.socket.errorMailer.send(ex);
    // }
}



Project.prototype.addMapFromProjectToTemplate = function( data){

    var shareTemplateProjectData = data.shareTemplateProjectData;
    var templateProjectData = data.templateProjectData;

    this.addMapFromProject(shareTemplateProjectData);
    this.addMapFromProject(templateProjectData);

}

Project.prototype.addMapFromProject = function( templates ){


    try{

        for (var i = 0; i < templates.length; i++) {

            var template =  templates[i];
            var userId = '' + template.user_id;
            var projectId = '' + template.project_id;

            var mapFilePath  = path.join(this.DIRNAME, userId, projectId, 'sitemap', 'map.json');

            try{
                var map = Utils.jsonParse(fs.readFileSync(mapFilePath, 'utf8'));
                template.map = map;
            }catch (ex){

            }
        };

    }catch (ex){
        this.socket.errorMailer.send(ex);
    }
}



Project.prototype.loadProjectById = function( data, onResult, onFault ){
    var _that = this;

    var statuses = [];
    var errors = [];


    var userId = data.userId;
    var projectId = data.projectId;

    try{

        var loadProjectVisitor = new LoadProjectByIdVisitor({ userId:userId, projectId:projectId }, onResult, onFault);
        this.accept(loadProjectVisitor);

    } catch (ex){

        console.log('!!! ERR', { ex:ex, message:'ERROR Load project by id' });
        onFault({ error:'Load project by id fault', ex:ex, message:'ERROR Load project by id' });

        this.socket.errorMailer.send(ex);
    }

    //this.loadProject( { userId:userId, projectId:projectId }, onResult, onFault);
}

Project.prototype.changeStageBackgroundLibrary = function( data, onResult, onFault ){
    var _that = this;

    try {

        var statuses = [];
        var errors = [];

console.log(itemDir);
        var userID = this.socket.ownerId.toString();
        var projectID = this.socket.myRoom.toString();
        var pageID = data.pageID.toString();
        var itemDir = data.itemDir;
        var fileName = itemDir.split('/').pop();
        // var actionkey = data.actionkey;
        var libraryFilePath = path.join(ConfigController.get('LIBRARY_PATH'), itemDir);
        var imageFileDir = path.join(this.DIRNAME, userID, projectID, 'pre', 'exported_view', pageID, 'imgpage');
        var imageFilePath = path.join(this.DIRNAME, userID, projectID, 'pre', 'exported_view', pageID, 'imgpage', fileName);
        var oldFileName = data.oldFileName;

        // console.log('oldFileName');
        // console.log(data);

        var _oldFileName = oldFileName.split('/');

        if (_oldFileName.length > 1) {
            oldFileName = '';
        }



console.log(imageFileDir);
        fs.mkdirRecursiveSync(imageFileDir);

        if (oldFileName !== '') {

            var oldFileNamePath = path.join(imageFileDir, oldFileName);

            fs.unlinkSync(oldFileNamePath);
        }

        fs.copy(libraryFilePath, imageFilePath, { replace: true }, function(err) {
            if (err) {

                onFault({error:'error'});

            } else {

                onResult({ fileName: fileName });
                
            }
        });

    } catch(ex) {
        onFault({error:'error', errorData:ex});

        this.socket.errorMailer.send(ex);
    }

}

Project.prototype.saveHistory = function( data, onResult, onFault ){

    if (!this.history_enabled) {
        return
    }

    var _that = this;

    try{

        var page = data.page;
        var action = data.action;
        var components = data.components;
        var direction = data.direction;
        var hash = data.hash;

        var pageId = page.options.pageid;

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();
        var sitemap = 'sitemap';
        var fileContent = Utils.jsonStringify( page );

        var url  = path.join(this.DIRNAME, userId, projectId, sitemap, '' + pageId);

        this.saveFile(url, fileContent );

        var prefix1 = '';
        var prefix2 = '';

        console.log('action', action);
        //console.log('direction', direction);

        //console.log('hash', hash);

        var historyPath =  path.join(this.DIRNAME, userId, projectId, 'history');
        var pageExportedPath =  path.join(this.DIRNAME, userId, projectId, 'pre', 'exported_view', '' + pageId);

        var hashPath =  path.join(historyPath, hash );

        fs.exists(hashPath, function(exists) {
            if (exists) {
                fse.copySync(hashPath, pageExportedPath);
            }
        });


        if(action == 'add'){

            var pagePath = _that.getPageExportedPath(_that.DIRNAME, userId, projectId, '' + pageId);

            console.log('pagePath', pagePath);

            nodeDir.paths(pagePath, function(err, paths) {
                if (err) {
                    console.log('kritikal error ;]');
                }

                console.log('components', components);

                for (var i in paths.dirs) {

                    var actualFolder =  paths.dirs[i];
                    var dirName = path.basename(actualFolder);

                    for (var j = 0; j < components.length; j++) {

                        var actionkey = components[j].actionkey;

                        if(dirName == actionkey){
                            _that.deleteFolder(actualFolder);
                        }
                    }
                }
            });

        }
//
//        if(action == 'add'){
//            if(direction == 'back'){
//
//                prefix1 = '';
//                prefix2 = 'del-';
//
//            } else if(direction == 'prew'){
//                prefix1 = 'del-';
//                prefix2 = '';
//            }
//        }

        //var pageExportedPath = _that.getPageExportedPath(this.DIRNAME, userId, projectId, '' + pageId);

        //var folderStructurePathsArray = _that.getFolderStructurePathsArray( pageExportedPath );

        //for (var i = 0; i < folderStructurePathsArray.length; i++) {
            //var dir = folderStructurePathsArray[i];

//            for (var j = 0; j < components.length; j++) {
//
//                var actionkey = components[j].actionkey;
//
//                for (var k = 0; k < folderStructurePathsArray.length; k++) {
//                    var dir = folderStructurePathsArray[k];
//
//                    var oldPath = path.join(dir, prefix1 + actionkey);
//                    var newPath = path.join(dir, prefix2 + actionkey);
//
//                    //console.log('oldPath', oldPath);
//                    //console.log('newPath', newPath);
//
//                    this.renameFolder(oldPath, newPath);
//                };
//            }
        //}

        //var oldPath = path.join(dir, actionkey);
        //var newPath = path.join(dir, 'del-' + actionkey);

        //this.renameFolder(oldPath, newPath);

        onResult({ status:"Save history correctly" });

        this.onChangeResult( {
            status:'Save history ',
            name:'page',
            event: 'saveHistory',
            page: page,
            pageId:pageId
        } );

    }catch (ex){
        onFault({ error:"Save history fault" });

        this.socket.errorMailer.send(ex);
    }

}



Project.prototype.createPsdPage = function( data, onResult, onFault, onProggres, onComplete ){
    var _that = this;

    var userId = this.socket.ownerId.toString();
    var projectId = this.socket.myRoom.toString();

    console.log('createPsdPage');

    // try{

    //     this.psd2Darkan = new Psd2Darkan();
    //     this.psd2Darkan.extract(this.DIRNAME, userId, projectId, data, this);

    //     this.psd2Darkan.addEventListener(Psd2Darkan.ON_EXTRACT_PROGGRESS, onProggres);
    //     this.psd2Darkan.addEventListener(Psd2Darkan.ON_EXTRACT_COMPLETE, onComplete);
    //     this.psd2Darkan.addEventListener(Psd2Darkan.ON_CONVERT_COMPLETE, onResult);
    //     this.psd2Darkan.addEventListener(Psd2Darkan.ON_CONVERT_FAIL, onFault);


    // } catch (ex){
    //     onFault({ status:'CreatePsdPage fault', ex:ex });

    //     this.socket.errorMailer.send(ex);
    // }

    try{

        var addNewPsdPageVisitor = new AddNewPsdPageVisitor(data, onResult, onFault, onProggres, onComplete);

        this.accept(addNewPsdPageVisitor);

    } catch (ex){

        onFault({ error:'Add new psd page fault' });

        this.socket.errorMailer.send(ex);
    } 

}

Project.prototype.selectPageByUser = function(data){
    var _that = this;

    try{

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();


        var pageSelectorByUser = new PageSelectorByUser.get({ DIRNAME:this.DIRNAME, 
                                                                userId:this.socket.ownerId.toString(), 
                                                                projectId:this.socket.myRoom.toString(),
                                                                socket:this.socket });

        pageSelectorByUser.select(data);

    } catch (ex){

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.resetPagesByUser = function(){
    var _that = this;

    try{

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();

        var pageSelectorByUser = new PageSelectorByUser.get({ DIRNAME:this.DIRNAME, 
                                                                userId:this.socket.ownerId.toString(), 
                                                                projectId:this.socket.myRoom.toString(),
                                                                socket:this.socket });

        pageSelectorByUser.reset();

    } catch (ex){

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.selectComponentsByUser = function(data){
    var _that = this;

     try{

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();


        var componentsSelectorByUser = new ComponentsSelectorByUser.get({ DIRNAME:this.DIRNAME, 
                                                                userId:this.socket.ownerId.toString(), 
                                                                projectId:this.socket.myRoom.toString(),
                                                                socket:this.socket });

        componentsSelectorByUser.select(data);

    } catch (ex){

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.resetComponentsByUser = function(){
    var _that = this;

    try{

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();

        var componentsSelectorByUser = new ComponentsSelectorByUser.get({ DIRNAME:this.DIRNAME, 
                                                                userId:this.socket.ownerId.toString(), 
                                                                projectId:this.socket.myRoom.toString(),
                                                                socket:this.socket });

        componentsSelectorByUser.reset();

    } catch (ex){

        this.socket.errorMailer.send(ex);
    }
}

Project.prototype.accept = function(visitor){
    visitor.visit(this);
}

