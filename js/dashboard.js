/**
 * Created by USER on 18/07/16.
 */



$(document).ready(function() {
    /*$(function () {
        $("#header").load("../nav.html");

    });*/

    //$.get('../nav.html', function(data) { $('#header').html(data); });
    //Cookies.remove("login_socialWare",{ path: '' });
    if (Cookies.getJSON("login_socialWare")) {
        var cookie = Cookies.getJSON("login_socialWare");

        //console.log(cookie);
        if(cookie['displayName']) {
            $("#user-name").text(cookie["displayName"]);//cookie['displayName']);
            console.log(cookie);


        }

        else {
            if(cookie['email']) {
                $("#user-name").text(cookie['email']);//cookie['displayName']);
                console.log(cookie);
            }
            else
                $("#user-name").text(cookie);//cookie['displayName']);

        }
        //window.location="dashborad.html";

        $("#user-img").attr("src", cookie['photoURL']);

    }

    else
        window.location="login.html";

/////////////////////// function/////////////////////////////


    $("#logout").click(function(){
        sessionStorage.removeItem('role');
        sign_out()
    });






});



function ReadRepo() {
    var userRepo=new Gh3.User("motkeg");
}