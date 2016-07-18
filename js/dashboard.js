/**
 * Created by USER on 18/07/16.
 */


$(document).ready(function() {
    $("#logout").click(function(){
        sessionStorage.removeItem('role');
        sign_out()
    });
});


function ReadRepo() {
    var userRepo=new Gh3.User("motkeg");
}