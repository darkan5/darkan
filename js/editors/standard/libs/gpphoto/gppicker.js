 // Google Picker API for the Google Docs import
function newPicker() {
    google.load('picker', '1', {"callback" : createPicker});
}       

// Create and render a Picker object for selecting documents
function createPicker() {
    var origin = window.location.protocol + '//' + window.location.host;
    var view = new google.picker.View(google.picker.ViewId.PHOTOS);
    view.setMimeTypes("image/png,image/jpeg,image/jpg");    
    var picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .setAppId("380112302826.apps.googleusercontent.com")
        .addView(view)
        .addView(new google.picker.DocsUploadView())
        .setCallback(pickerCallback)
        .setOrigin(origin)
        .build();
     picker.setVisible(true);
}

// A simple callback implementation which sets some ids to the picker values.
function pickerCallback(data) {
    if(data.action == google.picker.Action.PICKED){
//        document.getElementById('gdocs_resource_id').value = google.picker.ResourceId.generate(data.docs[0]);
//        document.getElementById('gdocs_access_token').value = data.docs[0].accessToken;           

            alert(data.docs[0].thumbnails[4].url);

    }
}    