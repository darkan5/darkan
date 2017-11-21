module.exports = Config;

function Config(){ }

// app url with trailing slash
var url=process.env.APP_PROTOCOL + process.env.APP_URL + "/" ;
Config.VERSION = '001';

Config.PORT = 3000;

Config.HTTPS = true;

Config.INSTANCE_NAME = 'localhost';

Config.PROJECTS_PATH = '/var/www/darkan/storage/app/projects';

Config.PROJECTS_LINK = url+'storage/app/projects/';

Config.PUBLICATIONS_PATH = '/var/www/darkan/storage/app/publications/';

Config.APP_IMAGES_PATH = '/var/www/darkan/js/editors/standard/images/';

Config.SKINS_PATH = '/var/www/darkan/js/editors/standard/skins/';

Config.SKINS_LINK = url+'js/editors/standard/skins/';

Config.CONTENT_TEMPLATE_VIEW_PATH = '/var/www/darkan/js/editors/standard/content_template_view/';

Config.CONTENT_TEMPLATE_PATH = '/var/www/darkan/js/editors/standard/content_template/';

Config.CONTENT_TEMPLATE_LINK = url+'js/editors/standard/content_template/';

Config.MODULES_COMPONENTS_PATH = '/var/www/darkan/js/editors/standard/modules/components/';

Config.LIBRARY_PATH = '/var/www/darkan/js/editors/standard/library/';

Config.PROJECTS_THUMBS_PATH = '/var/www/darkan/storage/app/projectsthumbs/';
