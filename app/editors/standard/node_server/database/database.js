module.exports = Database;
var squel = require('squel');
var debug = require('debug')('database');
var ConfigController = require('../config_controller/config_controller.js');

var path = require('path');
var fs = require('fs.extra');
var async = require('async');

var Utils = require('../utils/Utils.js');

var _ = require('underscore');

// var mysql      = require('mysql');
// var DB = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'darkan'
// });

function Database(socket) {

	var _that = this;

	this.socket = socket;

	this.mysql = require('mysql');

	this.mysqlConnectionTimeout = null;
	this.mysqlConnected = false;
	this.visitIntervalArray = [];

	this.InstanceName = ConfigController.get('INSTANCE_NAME', false);


	this.testDriveProjects = [
		0, 1011
	];

    this.projectsPath = ConfigController.get('PROJECTS_PATH');

}

Database.prototype.mysqlConnect = function() {
	/*
	*	Polaczenie z baza danych jest przy kazdym zapytaniu.
	*	Disconnect robiony jest po 5 sec od polaczenia
	*/

	var _that = this;

	if (!this.mysqlConnected) {

		switch(this.InstanceName) {

			//localhost
			case 'localhost':
				this.connection = this.mysql.createConnection({
				     host     : 'localhost',
				     user     : 'homestead',
				     password : 'secret',
				     database : 'darkan_test'
				});
				break;

				
			// Darkan
			case 'darkan':
				this.connection = this.mysql.createConnection({
				    host     : 'localhost',
				    user     : 'darkan',
				    password : 'ZhhFrLCnxfa4XF9U',
				    database : 'darkandb'
				});
				break;


			// euroforum2				
			case 'euroforum':
				this.connection = this.mysql.createConnection({
				    host     : 'localhost',
				    user     : 'euroforum2',
				    password : 'Aj4YScYNAVyyKw84',
				    database : 'darkan_euroforum2'
				});
				break;

			// test				
			case 'test':
				this.connection = this.mysql.createConnection({
				    host     : 'localhost',
				    user     : 'darkan_test1',
				    password : 'Tzhbvf48P5ZsHnzD',
				    database : 'darkan_test'
				});
				break;

			// smartlearnapp				
			case 'smartlearnapp':
				this.connection = this.mysql.createConnection({
				    host     : 'localhost',
				    user     : 'd_smartlearnapp',
				    password : 'UsF5YR3BdJCst5Jr',
				    database : 'd_smartlearnapp'
				});
				break;

			// raspberry				
			case 'raspberry':
				this.connection = this.mysql.createConnection({
				    host     : 'localhost',
				    user     : 'root',
				    password : 'jarek@123',
				    database : 'darkan3'
				});
				break;


		}

		this.mysqlConnected = true;

	}

	clearTimeout(this.mysqlConnectionTimeout);
	this.mysqlConnectionTimeout = setTimeout(function() {

		_that.mysqlDisconnect();

	}, 5000);


};

Database.prototype.isSuperAdmin = function(userID) {

	var superAdmins = [ ];

	switch(this.InstanceName) {

		//localhost
		case 'localhost':
			superAdmins.push(1);
			break;

			
		// Darkan
		case 'darkan':
			superAdmins.push(3, 26, 166);
			break;


		// euroforum2				
		case 'euroforum':
			superAdmins.push(4, 15);
			break;
			
		// test				
		case 'test':
			// superAdmins.push(205, 213, 214, 215);
			superAdmins.push(3, 26);
			break;
	}

	return superAdmins.indexOf(userID) !== -1;
}

Database.prototype.mysqlDisconnect = function() {

	this.mysqlConnected = false;

	this.connection.end();
};

Database.prototype.query = function(queryString, callback) {

	// var escapedQueryString = this.mysql.escape(queryString);

	this.mysqlConnect();

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


Database.prototype.deleteSharedUser = function(data, onResult, onFault) {

	var _that = this;
	var id = data.id.toString();
	var exists = data.exists;

	var deleteSharedUser;

	if (exists) {

		deleteSharedUser = squel.delete()
										.from('share')
										.where('id = ?', id)
										.toString();
	} else {
		deleteSharedUser = squel.delete()
										.from('share_noexists')
										.where('id = ?', id)
										.toString();
	}

	try {

		_that.query(deleteSharedUser, function(sqlData) {
			onResult({  });
		});
	} catch (ex) {
		onFault({ statuses: ex });

        this.socket.errorMailer.send(ex);
	}

}

Database.prototype.getSharedUsers = function(data, onResult, onFault) {

	var _that = this;

	var projectID = this.socket.myRoom.toString();
	var usersList = {};

	var getSharedUsersQuery = squel.select()
									.from('share', 't1')
									.left_join('users', 't2', 't1.user_id = t2.id')
									.where('project_id = ?', projectID)
									.toString();

	try {

		_that.query(getSharedUsersQuery, function(sqlData) {

			for (var index in sqlData) {

				var mail = sqlData[index].email;
				var id = sqlData[index].id;
				var photo = sqlData[index].photo;

				usersList[mail] = {
					mail: mail,
					id: id,
					exists: true,
					photo: photo
				};
			}

			var getSharedNoexistsUsersQuery = squel.select()
											.from('share_noexists')
											.where('project_id = ?', projectID)
											.toString();

			_that.query(getSharedNoexistsUsersQuery, function(sqlNoexistsData) {

				for (var index in sqlNoexistsData) {

					var mail = sqlNoexistsData[index].mail;
					var id = sqlNoexistsData[index].id;

					usersList[mail] = {
						mail: mail,
						id: id,
						exists: false
					};
				}


				onResult({ usersList: usersList });
			});


		});

	} catch (ex) {
		onFault({ statuses: ex });

        this.socket.errorMailer.send(ex);
	}
}

Database.prototype.shareProjectToUser = function(data, onResult, onFault) {
	var _that = this;

	var projectID = this.socket.myRoom.toString();
	var userID = this.socket.ownerId.toString();
	var userEmail = data.userEmail.trim();
	

    var statuses = [];
    var errors = [];

	var shareUserIDQuery = squel.select()
								.from('users')
								.where('email = ?', userEmail)
								.limit(1)
								.toString();

	try {
		_that.query(shareUserIDQuery, function(userData) {

			if (userData.length !== 0) {
				// sharownaie dla istniejacego uzytkownika
				var shareUserEmail = userData[0].id.toString();
				var photo = userData[0].photo;

				if (userID !== shareUserEmail) {

					var addProjectShareQuery = "INSERT INTO `share` (`user_id`, `project_id`) "
												+ "SELECT * FROM (SELECT '" + shareUserEmail + "', '" + projectID + "') AS tmp "
												+ "WHERE NOT EXISTS ( "
												+ "SELECT `user_id`, `project_id` FROM `share` WHERE `user_id`='" + shareUserEmail + "' AND `project_id`='" + projectID + "' "
												+ ") LIMIT 1";


					_that.query(addProjectShareQuery, function(retData) {

						onResult({ existsMail: true, mail: userEmail, photo: photo, uid: retData.insertId });

					});
				}
			} else {
				// sharownie dla nieistniejacego uzytkownika

				onResult({ existsMail: false, mail: userEmail });

				// var addProjectShareQuery = "INSERT INTO `share_noexists` (`mail`, `project_id`) "
				// 							+ "SELECT * FROM (SELECT '" + userEmail + "', '" + projectID + "') AS tmp "
				// 							+ "WHERE NOT EXISTS ( "
				// 							+ "SELECT `mail`, `project_id` FROM `share_noexists` WHERE `mail`='" + userEmail + "' AND `project_id`='" + projectID + "' "
				// 							+ ") LIMIT 1";

				// _that.query(addProjectShareQuery, function(retData) {

				// 	onResult({ existsMail: false, mail: userEmail, uid: retData.insertId });

				// })
			}
		});
	} catch (ex) {
		onFault({ statuses: ex });

        this.socket.errorMailer.send(ex);
	}
};

Database.prototype.shareProjectToNoExistsUser = function(data, onResult, onFault) {
	var _that = this;

	var projectID = this.socket.myRoom.toString();
	var userID = this.socket.ownerId.toString();
	var userEmail = data.userEmail.trim();
	var emailMessage = data.message;

	//TODO: zrobić wysyłanie maila do usera - tresc pod zmienna emailMessage

    var statuses = [];
    var errors = [];

	var shareUserIDQuery = squel.select()
								.from('users')
								.where('email = ?', userEmail)
								.limit(1)
								.toString();

	try {
		_that.query(shareUserIDQuery, function(userData) {
				// sharownie dla nieistniejacego uzytkownika

			var addProjectShareQuery = "INSERT INTO `share_noexists` (`mail`, `project_id`) "
										+ "SELECT * FROM (SELECT '" + userEmail + "', '" + projectID + "') AS tmp "
										+ "WHERE NOT EXISTS ( "
										+ "SELECT `mail`, `project_id` FROM `share_noexists` WHERE `mail`='" + userEmail + "' AND `project_id`='" + projectID + "' "
										+ ") LIMIT 1";

			_that.query(addProjectShareQuery, function(retData) {

				onResult({ existsMail: false, mail: userEmail, uid: retData.insertId });

			});
		});
	} catch (ex) {
		onFault({ statuses: ex });

        this.socket.errorMailer.send(ex);
	}
};

Database.prototype.verifyAccessToProject = function(projectID, userID, callback) {
	var _that = this;

	console.log('projectID', projectID);

	var projectDataQuery = squel.select()
							.from('projects')
							.where('project_id = ?', projectID)
							.limit(1)
							.toString();

	console.log(projectDataQuery);

	_that.query(projectDataQuery, function(projectData) {

		console.log(projectData);

        if (!projectData || projectData.length === 0) {
        	console.log('projekt nie istnieje');
        	callback('notexist');
        	return;
        }

        try {

			if (projectData) {
				var projectOwner = projectData[0].user_id;
				console.log("Project owner: ", projectOwner);

				if (userID == projectOwner) {
					callback(true, projectOwner);
	                return;
				}
				else {

					// sprawdz czy jestem super adminem
					if (_that.isSuperAdmin(userID)) {
						callback(true, projectOwner);
		                return;
					}

					// sprawdz czy projekt jest dostepny dla wszystkich
					if (_that.testDriveProjects.indexOf(projectID) !== -1) {
						callback(true, projectOwner);
		                return;
					}					

					// sprawdz czy projekt jest dla tego usera udostepniony
					var sharedProjectsQuery = squel.select()
											.from('share')
											.where('project_id = ?', projectID)
											.toString();

					_that.query(sharedProjectsQuery, function(sharedProjectsData) {
						for (var i = sharedProjectsData.length - 1; i >= 0; i--) {
							if (sharedProjectsData[i].user_id === userID) {
								callback(true, projectOwner);
								return;
							}
						};

						console.log('not shared project');
						callback(false);
						return;
					});

				}

			} else {
				console.log('project not found');
				callback(false);
				return;
			}
        }catch (ex) {
        	console.log('ERROR');
        	console.log(ex);
        	callback(false);

            _that.socket.errorMailer.send(ex);
        }
	});
};


Database.prototype.getAllProjectsList = function(data, onResult, onFault) {
    var _that = this;

    var projectId = this.socket.myRoom.toString();
    var userID = this.socket.myId.toString();

    var userProjectDataQuery = squel.select()
        .from('projects')
        .where('user_id = ?', userID)
        .where('version = ?', '2.0.0')
        .where('editor_id != ?', '1')
        .toString();

    _that.query(userProjectDataQuery, function(userProjectData) {

        var shareProjectDataQuery = squel.select()
            .from('share', 't1')
            .left_join('projects', 't2', 't1.project_id = t2.project_id')
            .where('t1.user_id = ?', userID)
            .where('t2.version = ?', '2.0.0')
            .where('t2.editor_id != ?', '1')
            .toString();

        _that.query(shareProjectDataQuery, function(shareProjectData) {

            var shareTemplateProjectDataQuery = squel.select()
                .from('share', 't1')
		        .left_join('projects', 't2', 't1.project_id = t2.project_id')
		        .where(squel.expr().or('t1.user_id = ?').or( 't1.user_id = ?').toString(), '3', userID)
		        .where('t2.template = ?', '1')
		        .where('t2.version = ?', '2.0.0')
		        .where('t2.editor_id != ?', '1')
		        .toString();



            _that.query(shareTemplateProjectDataQuery, function(shareTemplateProjectData) {

                var templateProjectDataQuery = squel.select()
                    .from('projects', 'prj')
                    .where('prj.user_id = ?', userID)
                    .where('prj.template = ?', '1')
                    .where('prj.version = ?', '2.0.0')
                    .where('prj.editor_id != ?', '1')
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

Database.prototype.getFoldersStructure = function(data, onResult, onFault) {

	var _that = this;

	try{

		console.log('getFoldersStructure');

		var projectId = this.socket.myRoom.toString();
	    var userID = this.socket.myId.toString();

	    var foldersStructureQuery = squel.select()
	    	.field("folders_structure")
	        .from('users')
	        .where('id = ?', userID)
	        .toString();

	    _that.query(foldersStructureQuery, function(rDtata) {


	    	var shareTemplateProjectDataQuery = squel.select()
	                .from('share', 't1')
			        .left_join('projects', 't2', 't1.project_id = t2.project_id')
			        .where(squel.expr().or('t1.user_id = ?').or( 't1.user_id = ?').toString(), '3', userID)
			        .where('t2.template = ?', '1')
			        .where('t2.version = ?', '2.0.0')
			        .where('t2.editor_id != ?', '1')
			        .toString();

	            _that.query(shareTemplateProjectDataQuery, function(shareTemplateProjectData) {

	            	var fs = Utils.jsonParse(_.first(rDtata).folders_structure, 'utf8');

	            	onResult({
			            status:'Get folder structure result',
			            folderStructure:fs,
			            shareTemplateProjectData:shareTemplateProjectData
			        });
	            });
	    });

    }catch(ex){
		console.log('getFoldersStructure error', ex);

		onFault({ error:ex });
	}
}


Database.prototype.getTemplatesProjectsList = function(data, onResult, onFault) {
    var _that = this;

    var projectId = this.socket.myRoom.toString();
    var userID = this.socket.ownerId.toString();

    var shareTemplateProjectDataQuery = squel.select()
            .from('share', 't1')
	        .left_join('projects', 't2', 't1.project_id = t2.project_id')
	        .where(squel.expr().or('t1.user_id = ?').or( 't1.user_id = ?').toString(), '3', userID)
	        .where('t2.template = ?', '1')
	        .where('t2.version = ?', '2.0.0')
	        .where('t2.editor_id != ?', '1')
	        .toString();

    _that.query(shareTemplateProjectDataQuery, function(shareTemplateProjectData) {


        var templateProjectDataQuery = squel.select()
            .from('projects', 'prj')
            .where('prj.user_id = ?', userID)
            .where('prj.template = ?', '1')
            .where('prj.version = ?', '2.0.0')
            .where('prj.editor_id != ?', '1')
            .toString();

        _that.query(templateProjectDataQuery, function(templateProjectData) {

            onResult({
                status:'Get template projects list result',
                shareTemplateProjectData:shareTemplateProjectData,
                templateProjectData:templateProjectData
            });
        });
    });
};


Database.prototype.changeLanguage = function(data, onResult, onFault) {

	var _that = this;
	var userID = this.socket.ownerId.toString();
	var lang = data.lang;

	var changeLanguageQuery = squel.update()
									.table('users')
									.set('lang', lang)
									.where('id = ?', userID)
									.toString();



	try {

		_that.query(changeLanguageQuery, function(sqlData) {
			onResult({ lang: lang });
		});
	} catch (ex) {
		onFault({ statuses: ex });

        this.socket.errorMailer.send(ex);
	}

}


Database.prototype.getPublishedData = function(data, onResult, onFault) {

	var _that = this;

	var userID = this.socket.myId.toString();
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
                                        .where('user_id = ?', userID)
										.order("ord")
										.toString();

			_that.query(publicationsExistsQuery, function(publicationsExistsData) {

				// if (publicationsExistsData.length === 1) {

				// 	responsePublicationData.publishExists = true;
				// 	responsePublicationData.publicationID = publicationsExistsData[0].id_banner;
				// 	responsePublicationData.title = publicationsExistsData[0].name;
				// 	responsePublicationData.description = publicationsExistsData[0].summary;

				// }

				onResult({ publicationsList: publicationsListData, publication: publicationsExistsData, sql: publicationsExistsQuery, q:'q' });

			});

		});

	} catch (ex) {
		onFault({ error: 'error' });

        this.socket.errorMailer.send(ex);
	}
}

Database.prototype.pad = function(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) val = "0" + val;
    return val;
}

Database.prototype.getDate = function() {

    var d = new Date();

	return d.getFullYear() + '-' + this.pad(d.getMonth() + 1) + '-' + this.pad(d.getDate()) + ' ' + this.pad(d.getHours()) + ':' + this.pad(d.getMinutes()) + ':' + this.pad(d.getSeconds());
}

// Database.prototype.newPublication = function(data, onResult, onFault) {

// 	var _that = this;

// 	var userID = this.socket.ownerId.toString();

//     var projectID = data.projectID;
//     var title = data.title;
//     var description = data.description;
//     var zoom = data.zoom;
//     var fullscreen = data.fullscreen;
//     var share = data.share;
//     var resetProgress = data.resetProgress;
//     var joinSource = data.joinSource;
//     var NOW = this.getDate();

// 	var publicationsListQuery = squel.select()
// 									.from('banners_projects')
// 									.where('user_id = ?', userID)
// 									.toString();

// 	try {

// 		_that.query(publicationsListQuery, function(publicationsListData) {


// 			var ord = publicationsListData.length + 1;
				//onResult({ message: 'Success creating new publication!', publicationData: newPublishData });

// 			var newPublishQuery = squel.insert()
// 											.into('banners_projects')
// 											.set('user_id', userID)
// 											.set('project_id', projectID)
// 											.set('name', title)
// 											.set('summary', description)
// 											.set('zoom', zoom)
// 											.set('share', share)
// 											.set('fullscreen', fullscreen)
// 											.set('reset_progress', resetProgress)
// 											.set('date_create', NOW)
// 											.set('ord', ord)
// 											.toString();

// 			_that.query(newPublishQuery, function(newPublishData) {

// 				onResult({  });

// 			});
// 		});
		
// 	} catch (err) {
// 		onFault({ error: 'error' });
// 	}
// }

// Database.prototype.overridePublication = function(data, onResult, onFault) {

// 	var _that = this;

// 	debug('nadpisanie danych');
// }


// Database.prototype.deletePublication = function(data, onResult, onFault) {

// 	var _that = this;

// 	var userID = this.socket.ownerId.toString();

// 	var bannerID = data.id_banner;

// 	var deletePublicationQuery = squel.delete()
// 										.from('banners_projects')
// 										.where('id_banner = ?', bannerID)
// 										.toString();


// 	try {
// 		_that.query(deletePublicationQuery, function(sqlData) {
// 			onResult({ callbackData: 'Publication deleted!', sql: deletePublicationQuery, sqlData: sqlData });
// 		});
// 	} catch (err) {
// 		onFault({ statuses: err });
// 	}
// }


Database.prototype.setPublicationOptions = function(data, onResult, onFault) {

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

Database.prototype.readSizeRecursive = function(item, cb) {

    var _that = this;

    try {
	    fs.lstat(item, function(err, stats) {
	    	try {
	    		if (err) {
	    			_that.socket.errorMailer.send(err);
	    			return;
	    		}
		        var total = stats.size;

		        if (!err && stats.isDirectory()) {
		            fs.readdir(item, function(err, list) {
		            	try {
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
		                } catch (ex) {
					        _that.socket.errorMailer.send(ex);
						}
		            }); 
		        } else {
		            cb(err, total);
		        }   
		    } catch (ex) {
		        _that.socket.errorMailer.send(ex);
			}

	    }); 
    } catch (ex) {
        _that.socket.errorMailer.send(ex);
	}
}

Database.prototype.calculateProjectSize = function( data ){

    var _that = this;

    try{

        this.DIRNAME = this.projectsPath;

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();

        var projectPath = path.join(this.DIRNAME, userId, projectId);
        var projectSitemapPath = path.join(projectPath, 'sitemap');
        var projectPrePath = path.join(projectPath, 'pre');

        var projectSize = 0;

        var callbackSitemap = function(u, size) {

            projectSize += parseInt(size);


            // add all project versions size
            var projectVersionsQuery = squel.select()
                                            .from('project_version')
                                            .where('user_id = ?', userId)
                                            .where('project_id = ?', projectId)
                                            .toString();

            _that.query(projectVersionsQuery, function(projectVersions) {
                try {
                    for (var i in projectVersions) {
                        projectSize += projectVersions[i]['size'];
                    }
                } catch(ex) {
                    // console.dir(ex);

                    _that.socket.errorMailer.send(ex);
                }

                var userQuery = squel.select()
                                                .from('users')
                                                .where('id = ?', userId)
                                                .toString();

                _that.query(userQuery, function(sqlDataUser) {




                    if (sqlDataUser.length > 0) {

                        // console.dir('Podliczam miejsce zajete przez projekt...');
                        // console.dir(projectSize);


                        try {
                            var dataObject = JSON.parse(sqlDataUser[0].folders_structure);

                            var allProjects = dataObject.objs;
                            for (var param in allProjects) {
                                if (allProjects[param].project_id == projectId) {
                                    allProjects[param].size = projectSize;
                                    // console.dir('ZMIENIAM SIZE W PROJEKCIE ' + projectId);
                                    // console.dir(allProjects[param]);
                                    break;
                                }
                            }

                            var foldersStructureString = JSON.stringify(dataObject);

                            var saveUserQuery = squel.update()
                                                                .table('users')
                                                                .set('folders_structure', foldersStructureString)
                                                                .where('id = ?', userId)
                                                                .toString();

                            _that.query(saveUserQuery, function(sqlData) {});
                        } catch(ex) {
                            // console.dir(ex);

                            _that.socket.errorMailer.send(ex);
                        }


                    }

                    var projectSizeQuery = squel.update()
                                                        .table('projects')
                                                        .set('size', projectSize)
                                                        .where('project_id = ?', projectId)
                                                        .toString();

                    try {
                        _that.query(projectSizeQuery, function(sqlData) {
                            // onResult({});
                        });
                    } catch (ex) {
                        // console.dir(ex);
                        // onFault({ statuses: err });

                        _that.socket.errorMailer.send(ex);
                    }
                });

            });


        }

        var callbackPre = function(u, size) {

            projectSize = parseInt(size);

            _that.readSizeRecursive(projectSitemapPath, callbackSitemap);
        }

        this.readSizeRecursive(projectPrePath, callbackPre);

    }catch(ex){
        this.socket.errorMailer.send(ex);
    }

}

Database.prototype.startLastVisitInterval = function(){

    var _that = this;

    clearInterval(this.mainProjectVisitInterval);
    this.mainProjectVisitInterval = setInterval(function(){
        _that.saveLastVisit();
    }, 240000);

    this.saveLastVisit();
}

Database.prototype.stopLastVisitInterval = function(){

    clearInterval(this.mainProjectVisitInterval);
    this.saveLastVisit();


    // Clear other projects intervals

    if(this.visitIntervalArray){
    	for(var item in this.visitIntervalArray){
	    	var interval = this.visitIntervalArray[item];
	    	clearInterval(interval);
	    }
    }
}

Database.prototype.saveLastVisit = function(){

	try {

	    var userId = this.socket.ownerId.toString();
	    var projectId = this.socket.myRoom.toString();

	    console.log('saveLastVisit Main', { userId:userId, projectId:projectId });

	    var updateLastVisitQuery = 'UPDATE `projects` SET `last_visit`= (NOW() + INTERVAL 2 HOUR) WHERE `user_id`='+ userId +' AND `project_id`='+ projectId +'';

	    this.query(updateLastVisitQuery, function(retData) {
	        // console.log('retData', retData);
	    });

	} catch(msg) {
		console.log('-------------- ERROR saveLastVisit --------------');
		console.log(msg);
	}
}


Database.prototype.startSecondProjectVisitInterval = function(projectId){

    var _that = this;

    clearInterval(this.visitIntervalArray[projectId]);
	this.visitIntervalArray[projectId] = setInterval(function(){
		_that.saveSecondProjectVisitInterval(projectId);
	}, 240000); //240000


    this.saveSecondProjectVisitInterval(projectId);
}

Database.prototype.saveSecondProjectVisitInterval = function(projectId){

	try {

		console.log('Saving last_visit on Second: ' + projectId);

	    var updateLastVisitQuery = 'UPDATE `projects` SET `last_visit`= (NOW() + INTERVAL 2 HOUR) WHERE `project_id`='+ projectId +'';

	    this.query(updateLastVisitQuery, function(retData) {
	        // console.log('retData', retData);
	    });

	} catch(msg) {
		console.log('-------------- ERROR saveSecondProjectVisitInterval --------------');
		console.log(msg);
	}
}

Database.prototype.submitTestDriveEmail = function(data, onResult, onFault){

	try {

	    var userId = this.socket.ownerId.toString();
	    var projectId = this.socket.myRoom.toString();

	    var email = data.email;

	    var testDriveQuery = squel.insert()
					        .into("testdrive")
					        .set("email", email)
					        .toString()

		console.log(testDriveQuery);

		this.query(testDriveQuery, function(retData) {
			onResult({ success:'true' });
	    });

	} catch(msg) {
		console.log('-------------- ERROR submitTestDriveEmail --------------');
		console.log(msg);

		onFault({ error:msg });
	}
}

Database.prototype.getExpirationResult = function(startDate, expirationDate) {

	var now = new Date();
	var first = new Date(startDate).getTime();
	var second = new Date(expirationDate).getTime();

	if (now >= first && now <= second)
	{
	    return true;
	}

	return false;
}


Database.prototype.getCapabilities = function(data, onResult, onFault) {
	var _that = this;

	try {

	    var userId = this.socket.myId.toString();

		var plansUsers = squel.select('plan_options')
									.from('plans_users')
									.where('user_id = ?', userId)
									.toString();

		this.query(plansUsers, function(allUsersPlans) {


			for (var item in allUsersPlans) {

				var planUser = allUsersPlans[item];
				//console.log('___________________planUser', planUser);
				var expirationResult = _that.getExpirationResult(planUser['start_date'], planUser['expiration_date']);

	            if(expirationResult){

	            	var planOptions = JSON.parse(planUser['plan_options']);
	            	//console.log('___________________planOptions', planOptions);
	            	onResult(planOptions);
	            	return;
	            }


				//var userPlans = JSON.parse(userPlansData[0]['user_plans']);
			}

			console.log('___________________no plans');

			onResult({});

		});

	} catch(msg) {
		console.log('-------------- ERROR getCapabilities --------------');
		console.log(msg);

		onFault({ error:msg });
	}
}

// Database.prototype.getCapabilities = function(data, onResult, onFault) {
// 	var _that = this;

// 	try {

// 	    var userId = this.socket.myId.toString();

// 		var plansDetailsQuery = squel.select('*')
// 									.from('plans_details')
// 									.toString();

// 		this.query(plansDetailsQuery, function(allPlansData) {
// 			var userPlansQuery = squel.select('user_plans')
// 										.from('users')
// 										.where('id = ?', userId)
// 										.toString();


// 			_that.query(userPlansQuery, function(userPlansData) {
// 				try {


// 					var userPlans = JSON.parse(userPlansData[0]['user_plans']);

// 					var userBestPlan = false;


// 					for (var planCode in userPlans) {
// 						if (planCode != "mp") {
// 							for (var planName in userPlans[planCode]) {
// 								var expirationDate = userPlans[planCode][planName];
// 								if (!_that.isDateExpired(expirationDate)) {
// 									userBestPlan = planName;
// 								}
								
// 							}	
// 						}
// 					}


// 					var bestCapabilitiesForUser = '{}';
// 					for ( var planData in allPlansData ) {
// 						if (allPlansData[planData]['name'] == userBestPlan) {
// 							bestCapabilitiesForUser = allPlansData[planData]['capabilities'];
// 						}
// 					}

// 					console.log(bestCapabilitiesForUser);

// 					onResult(JSON.parse(bestCapabilitiesForUser));

// 				} catch (err) {
// 					console.log(err);
// 					onResult({});
// 				}
				
// 		    });

// 		});

// 	} catch(msg) {
// 		console.log('-------------- ERROR getCapabilities --------------');
// 		console.log(msg);

// 		onFault({ error:msg });
// 	}
// }

Database.prototype.isDateExpired = function(expirationDate) {
	today_dt = new Date();
    expire_dt = new Date(expirationDate + ' 23:59:59');
    if (today_dt <= expire_dt ) {
        return false;
    } else {
        return true;
    }
}