$(document).ready(function() { 

	

	setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }

    getFontSize = function(){
    	return getCookie('fontsize');
    }

    setFontSize = function(value){
    	setCookie('fontsize', value, 20);
    }



	getHighcontrast = function(){
    	return getCookie('highcontrast');
    }

    setHighcontrastYes = function(){
    	setHighcontrast('yes');
    	//$('.navbar').addClass('navbar-inverse');
    	//$('.navbar').removeClass('topmenu');
    	$('head').append('<link rel="stylesheet" href="../../../css/highcontrast/high_contrast.css" type="text/css" id="hc_stylesheet"/>');
    }

    setHighcontrastNo = function(){
    	setHighcontrast('no');
    	//$('.navbar').removeClass('navbar-inverse');
    	//$('.navbar').addClass('topmenu');
    	$("#hc_stylesheet").remove();
    }

    setHighcontrast = function(value){

    	setCookie('highcontrast', value, 20);
    }
    
    $('.change-contrast').click(function () {

    	var highcontrast = getHighcontrast();

    	switch(highcontrast){
    		case 'yes':
    			setHighcontrastNo();
    			break;

    		case 'no':
    			setHighcontrastYes();
    			break;

    		default:
    			setHighcontrastNo();
    			break;
    	}

    });

    var highcontrast = getHighcontrast();

    switch(highcontrast){
		case 'yes':
			setHighcontrastYes();
			break;

		case 'no':
			setHighcontrastNo();
			break;

	}




	$(".plustext").click( function() {
		resizeText(1);
	});

	$(".minustext").click( function() {
		resizeText(-1);
	});

	function resizeText(multiplier) {
		if (document.body.style.fontSize == "") {
			document.body.style.fontSize = "1.0em";
		}

		var fontSize = parseFloat(document.body.style.fontSize) + (multiplier * 0.2) + "em";

		document.body.style.fontSize = fontSize;

		setFontSize(fontSize);
	}

	var fontSize = getFontSize();

	if(fontSize && fontSize != ''){
		document.body.style.fontSize = fontSize;
	}

    $(".open-stats-users").click(function(){
        $("#collapseOne").collapse('toggle');
    });

    $('#accordion .panel-collapse').on('shown.bs.collapse', function () {
        $(this).prev().find(".glyphicon").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-down");
    });

    //The reverse of the above on hidden event:

    $('#accordion .panel-collapse').on('hidden.bs.collapse', function () {
        $(this).prev().find(".glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-right");
    });

});