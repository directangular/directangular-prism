function initConsole() {
    const origConsole = console;

    console = {
        log: function() {
            const newargs = ["[D]"].concat(Array.from(arguments));
            origConsole.log.apply(null, newargs);
        }
    };
}

function printBuildId() {
    const buildId = document.getElementById('StrBuildId').innerHTML;
    console.log(buildId);
}

function initAJAX() {
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            var csrftoken = getCookie('csrftoken');
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
}

function pingOF() {
    console.log("Pinging OF...");
    $.post("/api/v1/ofping/", () => {console.log("PINGED!");});
}

// MAIN!
(function() {
    initConsole();
    initAJAX();
    pingOF();
    printBuildId();
})();
