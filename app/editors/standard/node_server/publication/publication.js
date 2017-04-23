module.exports = Publication;
var squel = require('squel');
var debug = require('debug')('database');
var md5 = require('MD5');
var fs = require('fs.extra');
var path = require('path');
var nodeDir = require('node-dir');
var async = require('async');
var ConfigController = require('../config_controller/config_controller.js');

// var mysql      = require('mysql');
// var DB = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'darkan'
// });

function Publication(socket) {

	this.socket = socket;

	this.mysql = require('mysql');

	// this.DIRNAME = path.join(__dirname, '../','../', 'projects');
    this.DIRNAME = ConfigController.get('PROJECTS_PATH');

	this.connection = this.mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : '',
	    database : 'darkan'
	});
}

Publication.prototype.query = function(queryString, callback) {

	// var escapedQueryString = this.mysql.escape(queryString);

	debug("QUERY STRING: " + queryString);

    this.connection.query( queryString, function(err, rows, fields) {
      if (!err) {
      	debug('MYSQL COMPLETED .......... ' + rows);
      	callback(rows);
      }
      else {
      	debug('MYSQL ERROR.......... ' + err);
      	callback(false);
      }
        
    });
};


Publication.prototype.getAllProjectsList = function(data, onResult, onFault) {
    var _that = this;

    var projectId = this.socket.myRoom.toString();
    var userID = this.socket.myId.toString();

    console.log('------');

    var userProjectDataQuery = squel.select()
        .from('projects')
        .where('user_id = ?', userID)
        .toString();

    _that.query(userProjectDataQuery, function(userProjectData) {

        var shareProjectDataQuery = squel.select()
            .from('share', 't1')
            .left_join('projects', 't2', 't1.project_id = t2.project_id')
            .where('t1.user_id = ?', userID)
            .toString();

        _that.query(shareProjectDataQuery, function(shareProjectData) {

            var shareTemplateProjectDataQuery = squel.select()
                .from('share_user_template', 't1')
                .left_join('projects', 't2', 't1.template_id = t2.project_id')
                .where(squel.expr().or('t1.user_id = ?').or( 't1.user_id = ?').toString(), '0', userID)
                .where('t1.owner_id != ?', userID)
                .toString();



            _that.query(shareTemplateProjectDataQuery, function(shareTemplateProjectData) {

                var templateProjectDataQuery = squel.select()
                    .from('projects', 'prj')
                    .where('prj.user_id = ?', userID)
                    .where('prj.template = ?', '1')
                    .toString();

                _that.query(templateProjectDataQuery, function(templateProjectData) {

                    onResult({
                        status:'Get all projects list result',
                        userProjectData:userProjectData,
                        shareProjectData:shareProjectData,
                        shareTemplateProjectData:shareTemplateProjectData,
                        templateProjectData:templateProjectData
                    });
                });
            });
        });
    });
};



Publication.prototype.getPublishedData = function(data, onResult, onFault) {

	var _that = this;

	var userID = this.socket.ownerId.toString();
	var projectID = data.projectID;

	// var responsePublicationData = [];

	var publicationsListQuery = squel.select()
									.from('banners_projects')
									.where('user_id = ?', userID)
									.order("ord")
									.toString();

	try {

		_that.query(publicationsListQuery, function(publicationsListData) {

		var publicationsExistsQuery = squel.select()
										.from('banners_projects')
										.where('project_id = ?', projectID)
										.order("ord")
										.toString();

			_that.query(publicationsExistsQuery, function(publicationsExistsData) {

				// if (publicationsExistsData.length === 1) {

				// 	responsePublicationData.publishExists = true;
				// 	responsePublicationData.publicationID = publicationsExistsData[0].id_banner;
				// 	responsePublicationData.title = publicationsExistsData[0].name;
				// 	responsePublicationData.description = publicationsExistsData[0].summary;

				// }

				onResult({ publicationsList: publicationsListData, publication: publicationsExistsData, sql: publicationsExistsQuery });

			});

		});

	} catch (ex) {
		onFault({ error: 'error' });

        this.socket.errorMailer.send(ex);
	}
}

Publication.prototype.pad = function(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) val = "0" + val;
    return val;
}

Publication.prototype.getDate = function() {

    var d = new Date();

	return d.getFullYear() + '-' + this.pad(d.getMonth() + 1) + '-' + this.pad(d.getDate()) + ' ' + this.pad(d.getHours()) + ':' + this.pad(d.getMinutes()) + ':' + this.pad(d.getSeconds());
}

Publication.prototype.newPublication = function(data, onResult, onFault) {

	var _that = this;

	var userID = this.socket.ownerId.toString();

    var projectID = data.projectID.toString();
    var title = data.title;
    var description = data.description;
    var zoom = data.zoom;
    var fullscreen = data.fullscreen;
    var share = data.share;
    var resetProgress = data.resetProgress;
    var joinSource = data.joinSource;
    var NOW = this.getDate();
    var hash;

	var publicationsListQuery = squel.select()
									.from('banners_projects')
									.where('user_id = ?', userID)
									.toString();

	try {

		_that.query(publicationsListQuery, function(publicationsListData) {

			var publicationPath = ConfigController.get('PUBLICATIONS_PATH');
			var publicationDir;

			for (;;) {

				console.log('przed hashem');

				hash = md5(title + NOW + Math.random());

				console.log(hash);

				// var publicationsListQuery = squel.select()
				// 								.from('banners_projects')
				// 								.where('user_id = ?', userID)
				// 								.toString();

				publicationDir = path.join(publicationPath, hash);

				console.log('dir');
				console.log(publicationDir);

				if (!fs.existsSync(publicationDir)) {

					fs.mkdirsSync(publicationDir);
					break;
				}

			}

			var publicationData = {

				projectPath: path.join(_that.DIRNAME, userID, projectID),
				pulicationPath: publicationDir,
				hash: hash

			};

			_that.createPublicationFiles(publicationData, onResult, onFault);


			var ord = publicationsListData.length + 1;

			var newPublishQuery = squel.insert()
											.into('banners_projects')
											.set('user_id', userID)
											.set('project_id', projectID)
											.set('name', title)
											.set('summary', description)
											.set('zoom', zoom)
											.set('share', share)
											.set('fullscreen', fullscreen)
											.set('reset_progress', resetProgress)
											.set('date_create', NOW)
											.set('ord', ord)
											.toString();

			_that.query(newPublishQuery, function(newPublishData) {

				//onResult({  });

			});
		});
		
	} catch (ex) {
		onFault({ error: 'error' });

        this.socket.errorMailer.send(ex);
	}
}

Publication.prototype.overridePublication = function(data, onResult, onFault) {

	var _that = this;

	debug('nadpisanie danych');
}


Publication.prototype.deletePublication = function(data, onResult, onFault) {

	var _that = this;

	var userID = this.socket.ownerId.toString();

	var bannerID = data.id_banner;

	var deletePublicationQuery = squel.delete()
										.from('banners_projects')
										.where('id_banner = ?', bannerID)
										.toString();


	try {
		_that.query(deletePublicationQuery, function(sqlData) {
			onResult({ callbackData: 'Publication deleted!', sql: deletePublicationQuery, sqlData: sqlData });
		});
	} catch (ex) {
		onFault({ statuses: ex });

        this.socket.errorMailer.send(ex);
	}
}


Publication.prototype.setPublicationOptions = function(data, onResult, onFault) {

	var _that = this;

	var userID = this.socket.ownerId.toString();
	var projectID = data.projectID;

	var bannerID = data.id_banner;

    var name = data.name;
    var description = data.summary;
    var zoom = data.zoom ? 1 : 0;
    var fullscreen = data.fullscreen ? 1 : 0;
    var share = data.share ? 1 : 0;
    var resetProgress = data.reset_progress ? 1 : 0;
    var NOW = this.getDate();
    var active = data.active ? 1 : 0;
    var ord = data.ord;
    var primary = data.primary ? 1 : 0;
    var show_title = data.show_title ? 1 : 0;
    var thumb = data.thumb;


	var changePublicationDataQuery = squel.update()
										.table('banners_projects')
										.set('name', name)
										.set('summary', description)
										.set('zoom', zoom)
										.set('active', active)
										.set('share', share)
										.set('fullscreen', fullscreen)
										.set('`primary`', primary)
										.set('show_title', show_title)
										.set('thumb', thumb)
										.set('reset_progress', resetProgress)
										.set('date_create', NOW)
										.set('ord', ord)
										.where('id_banner = ?', bannerID)
										.where('user_id = ?', userID)
										.toString();

	debug(data);

	try {
		_that.query(changePublicationDataQuery, function(sqlData) {
			onResult({ callbackData: 'success!', sql: changePublicationDataQuery, sqlData: sqlData });
		});
	} catch (ex) {
		onFault({ statuses: ex });

        this.socket.errorMailer.send(ex);
	}
}

Publication.prototype.conversionImagesMin = function(publicationExported, pulicationPath, onResult, onFault) {

	var _that = this;

	nodeDir.paths(publicationExported, function(err, paths) {
        if (err) {
            console.log('kritikal error ;]');
        }

        for (var i in paths.files) {

        	var filePath = paths.files[i];
            var pathN = path.dirname(paths.files[i]);
            var fileName = path.basename(paths.files[i]);
            var extName = path.extname(paths.files[i]);

            if (extName.toLowerCase() === '.png' && path.basename(paths.files[i], extName) !== 'min') {

            	var minFileName = 'min' + extName;
            	var minFilePath = path.join(pathN, minFileName);

            	if (fs.existsSync(minFilePath)) {

            		fs.renameSync(minFilePath, filePath);
            	}
            }

            if (extName.toLowerCase() === '.jpg' && path.basename(paths.files[i], extName) !== 'min') {

            	var minFileName = 'min' + extName;
            	var minFilePath = path.join(pathN, minFileName);

            	if (fs.existsSync(minFilePath)) {

            		fs.renameSync(minFilePath, filePath);
            	}
            }

            if (extName.toLowerCase() === '.jpeg' && path.basename(paths.files[i], extName) !== 'min') {

            	var minFileName = 'min' + extName;
            	var minFilePath = path.join(pathN, minFileName);

            	if (fs.existsSync(minFilePath)) {

            		fs.renameSync(minFilePath, filePath);
            	}
            }

        }

		var publicationSizeCallback = function(u, size) {
			console.log(u);
			console.log(size);


        	onResult({ size: size });
		}

		_that.readSizeRecursive(pulicationPath, publicationSizeCallback);


    });
}

Publication.prototype.createPublicationFiles = function(data, onResult, onFault) {

	var _that = this;

	var contentTemplatePath = ConfigController.get('CONTENT_TEMPLATE_PATH');
	var projectPrePath = path.join(data.projectPath, 'pre');
	var publicationExportedViewPath = path.join(data.pulicationPath, 'exported_view');

	console.log(data.projectPath);

	fs.copyRecursive(projectPrePath, data.pulicationPath, function (err) {

		if (err) {
			return console.error(err);
		}

		fs.copyRecursive(contentTemplatePath, data.pulicationPath, function(err) {

			if (err) {
				return console.error(err);
			}

			console.log("success!");

			_that.conversionImagesMin(publicationExportedViewPath, data.pulicationPath, onResult, onFault);
		});

	});

}

Publication.prototype.readSizeRecursive = function(item, cb) {

	var _that = this;

	fs.lstat(item, function(err, stats) {
		var total = stats.size;

		if (!err && stats.isDirectory()) {
			fs.readdir(item, function(err, list) {
				if (err) return cb(err);

				async.forEach(
					list,
					function(diritem, callback) {
						_that.readSizeRecursive(path.join(item, diritem), function(err, size) {
							total += size;
							callback(err);
						}); 
					},  
					function(err) {
						cb(err, total);
					}   
				);  
			}); 
		} else {
			cb(err, total);
		}   
	}); 
}





// testowa funkcja
Publication.prototype.abcTest = function(data, onResult, onFault) {

	var _that = this;

    var projectID = this.socket.myRoom.toString();
    var userID = this.socket.ownerId.toString();

	console.log('to jest test');
	console.log(md5('message'));

	var mapFilePath = path.join(_that.DIRNAME, userID, projectID);

	console.log(mapFilePath);

	console.log('<<<<<<<>>>>>>');

	// console.log(fs.stat(mapFilePath));

	// fs.lstat(mapFilePath, function(a, b) {
	// 	console.log('---- a ----');
	// 	console.log(a);
	// 	console.log('---- b ----');
	// 	console.log(b);
	// });

	var cb = function(u, size) {
		console.log(x);
		console.log(y);
	}

	this.readSizeRecursive(mapFilePath, cb);

	console.log('--- cc ----');

}