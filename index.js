

error = false;

function addError(text){
    if (!error) {
        error = true;
        $(document.body).append("<div id='error'>" + text + "</div>");
    }
    else {
        $('#error').remove();
        $(document.body).append("<div id='error'>" + text + "</div>");
    }
}


function authenticated(){
    $(document.body).empty();

    $(document.body).append("<div id='auth'></div>");
    $("#auth").css({
        "width": "50%",
        "margin": "0 auto",
        "text-align": "center",
        "border": "1px solid gray",
        "margin-top": "10%"
    });

    $("#auth").append("<h1 id='auth_text'>Successfully authenticated!</h1>");
    $("#auth_text").css("text-decoration","underline");
}



function getSession(){

    return $.ajax({
        type:'GET',
        url: 'http://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha.php?callback=?&getIdentifier',
        dataType: 'json'
    }).then( function(data){

            return $.ajax({
                type:'GET',
                url: 'http://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha.php?callback=?&getImage&id=' + data.id,
                dataType: 'json'
            });

    }).done(function(data){
        $("#captcha").attr("src", "http://www.dais.unive.it/~cosmo/teaching/esercitazione3/" + data.url);

        return data.id;

    });
}


function checkingButton(sessionId){

    let button = $.Deferred();

    $("#ok").click(function () {

        let user_input = $("#captcha_code").val();

        if (user_input !== "") {
            $.ajax({
                type: 'GET',
                dataType: "json",
                url: "http://www.dais.unive.it/~cosmo/teaching/esercitazione3/captcha.php?callback=?&sendCode&id=" + sessionId + "&code=" + user_input,
            }).done(function (data) {
                button.resolve(data.auth);
            })

        } else {
            addError("Inserire un valore");
            return false;
        }

    });
    return button.promise();
}


function mainFunc() {

    getSession().then(function(data){

        return checkingButton(data.id);

    }).done(function(result){
        if (result) {
            return authenticated();
        }
        else{
            addError("Codice errato");
            mainFunc();
        }
    });

}

$(function (){mainFunc()});

