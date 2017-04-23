$('#changesubdomainform').submit(function(e){
	e.preventDefault();

	var subdomain = $('.profile-subdomain').val();

	var request = {
                request: 9,
                subdomain: subdomain
            };

    _log('saveSubdomen request', request, _log.dataaccessIn);

	DataAccess.saveSubdomain(
		request,
		function(data){
			_log('saveSubdomen data result', data, _log.dataaccessOutResult);

			switch(data.ret){

				case 'success':
					$('.subdomain-link').attr('href', data.newsubdomainlink);
					_Notify(Lang.get('profile.PROFILE_NOTIFY_SDCHANGED') + ' ' + '<b>' + data.subname + '</b>', 'success');
					break;

				case 'empty':
					_Notify(Lang.get('profile.PROFILE_NOTIFY_CANTBEEMPTY'), 'danger');
					break;

				case 'invalid':
					$('.profile-subdomain').addClass('warning');
					_Notify(Lang.get('profile.PROFILE_NOTIFY_NOTVALID'), 'danger');
					break;

				case 'taken':
					_Notify(Lang.get('profile.PROFILE_NOTIFY_TAKEN'), 'danger');
					break;	


				default:
					_Notify(Lang.get('profile.PROFILE_NOTIFY_ERROR'), 'danger');
					break;
			}


		},
		function(data){
			_log('saveSubdomen data fault', data, _log.dataaccessOutFault);
		}
	);

});

$('.save-profile-subdomain-name').click(function(e){

	var subdomainName = $('.profile-subdomain-name').val();

	var request = {
                request: 71,
                subdomainName: subdomainName
            };

    _log('saveSubdomen request', request, _log.dataaccessIn);

	DataAccess.saveSubdomainName(
		request,
		function(data){
			_log('saveSubdomenName data result', data, _log.dataaccessOutResult);

				switch(data.ret){

					case 'success':

						_Notify(Lang.get('profile.PROFILE_NOTIFY_SDNCHANGED') + ' ' + '<b>' + data.subdomainName + '</b>', 'success');
						break;

					default:
						_Notify(Lang.get('profile.PROFILE_NOTIFY_ERROR'), 'danger');
						break;	
				}

		},
		function(data){
			_log('saveSubdomenName data fault', data, _log.dataaccessOutFault);
		}
	);

});



$('.change-pass-oldpass').click(function(){
	$(this).removeClass('warning');
});

$('.change-pass-newpass').click(function(){
	$(this).removeClass('warning');
});

$('.change-pass-retypepass').click(function(){
	$(this).removeClass('warning');
});

$('#changepasswordform').submit(function(e) {
	e.preventDefault();

        $('.change-pass-oldpass').removeClass('warning');
        $('.change-pass-newpass').removeClass('warning');
        $('.change-pass-retypepass').removeClass('warning');

        var oldPass = $('.change-pass-oldpass').val();
        var newPass = $('.change-pass-newpass').val();
        var retypePass = $('.change-pass-retypepass').val();

        var request = {
                request: 27,
                oldpass: oldPass,
                newpass: newPass,
                retypepass: retypePass
            };

        _log('changePassword request', request, _log.dataaccessIn);


        DataAccess.changePassword(
			request,
			function(data){

				_log('changePassword data result', data, _log.dataaccessOutResult);

				if(data.request == 1){
					_Notify(data.msg, 'danger');
				}
				
				switch(data.ret){

					case 0:

						$('.change-pass-oldpass').val('');
		             	$('.change-pass-newpass').val('');
		             	$('.change-pass-retypepass').val('');

						_Notify(Lang.get('profile.PROFILE_NOTIFY_PASSWD_CHANGED'), 'success');
						break;


					case 1:
						_Notify(Lang.get('profile.PROFILE_NOTIFY_OLDEMPTY'), 'danger');
						break;

					case 2:
						_Notify(Lang.get('profile.PROFILE_NOTIFY_NEWEMPTY'), 'danger');
						break;

					case 3:
						_Notify(Lang.get('profile.PROFILE_NOTIFY_PASSWD_NOTMATCH'), 'danger');
						break;

					case 4:
						_Notify(Lang.get('profile.PROFILE_NOTIFY_PASSWD_NOTMATCH'), 'danger');
						break;

					case 5:
						_Notify(Lang.get('profile.PROFILE_NOTIFY_PASSWD_OLD_NOTVALID'), 'danger');
						break;

					case 6:
						_Notify(Lang.get('profile.PROFILE_NOTIFY_PASSWD_OLD_NOTVALID'), 'danger');
						break;

					case 7:
						_Notify(Lang.get('profile.PROFILE_NOTIFY_PASSWD_TOO_SHORT'), 'danger');
						break;	

					default:
						_Notify(Lang.get('profile.PROFILE_NOTIFY_PASSWD_FAILED_CHANGE_PASS'), 'danger');
						break;
				}

			},
			function(data){
				_log('changePassword data fault', data, _log.dataaccessOutFault);
			}
		);    
        
        
    });

$('#changeavatar').change(function(e) {
    

	var postData = new FormData($('#changeavatarform')[0]);

	$.ajax({
	      url:_appLink + '/profilerequest/changeavatar',
	      data:new FormData($("#changeavatarform")[0]),
	      dataType:'json',
	      async:false,
	      type:'post',
	      processData: false,
	      contentType: false,
	      success:function(response){
	        $('.edit-profile-avatar-preview').css({
	        	'background-image': "url('" + response.imagelink + "?r=" + Math.floor((Math.random()*100) + 1) + "')"
	        });
	      },
	    });

});