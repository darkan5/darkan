var apiD = {
        init: function() {
            return false;
        },
        get: function() {
            return false;
        },
        set: function() {
            return false;
        },
        save: function() {
            return false;
        },
        quit: function() {
            return false;
        },
        XHR: function() {
            var file = '../../../api.php';

            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState === 1) {
                    request.send();
                } else if (request.readyState === 4) {
                    if (request.status === 200) {
                            console.log("Zwrotka z glownego");
                            console.log(request.responseText);
                    } else if(request.status === 404) {
                            console.log('TEN PLIK NIE ISTNIEJE: ' + file);
                    } else {
                            console.log('BLAD XHR: ' + request.status);
                    }
                }
            }

            request.open('POST', file, true);
        }
    };