//var WebServiceNode = WebService.create('node');


// create new project model
//var projectModel = new ProjectModel();

// init project view with created project model
//var projectView = new ProjectView({model: projectModel});

// var appController = new AppController();

// window.addEventListener("dragover",function(e){
//   e = e || event;
//   e.preventDefault();
// },false);
// window.addEventListener("drop",function(e){
//   e = e || event;
//   e.preventDefault();
// },false);

var appController = new AppController2();

$('.darkan-content').append(appController.render().$el);

appController.afterRender();

window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);

