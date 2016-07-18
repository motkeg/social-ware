

$(document).ready(function() {
    var role= sessionStorage.getItem('role');
    if (role=='developer'){
        $("#e_pwd").addClass("hidden");

    }

    //console.log(role);


});






// authentication  moudels

function Create_user() {

    var email=$("#email").val();
    console.log(email);

    var password=$("#pwd").val();
    console.log(password);


    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        window.location="../main-page/index.html";

        // ...
    });
    Cookies.set('login_socialWare', email, { expires:1});
    if (email)
        window.location="dashborad.html";
    /*if(verify())
       alert("user create successfuly! wait for verifiying..");*/





}


function sign_in() {

    var email=$("#email-login").val();
    console.log(email);
    
    var password=$("#pwd-login").val();
    console.log(password);

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        window.location="../main-page/index.html";
        // ...
    });
   
  
     alert("login success!");
    Cookies.set('login_socialWare', email, { expires:1});
    window.location="dashborad.html";
}



function google_Auth() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
   
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        Cookies.set('login_socialWare', user, { expires:1});
        console.log(Cookies.get("login_socialWare"));
        window.location="dashborad.html";
           //write(400,"moti",u)
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    //window.location="dashborad.html";

}

function GitHub_Auth() {
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        Cookies.set('login_socialWare', user, { expires:1});
        window.location="dashborad.html";
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    //window.location="dashborad.html";
}


function facebook_Auth() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');


    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        Cookies.set('login_socialWare', user, { expires:1});
        window.location="dashborad.html";

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function sign_out() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        Cookies.remove("login_socialWare");
        window.location="../main-page/index.html";
    }, function(error) {
        // An error happened.
        console.log(error.message);
    });


}



/////////////////////////////////////////////
function getUser() {
    var name, email, photoUrl, uid;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            uid = user.uid;
         console.log(user);

        }
    //var user = firebase.auth().currentUser;
     // No user is signed in.
    if (user != null) {
        alert("current user is null");
     }

        });

}


function resetPassword() {
    var auth = firebase.auth();
    var emailAddress =$("#email-login").val();
    console.log(email);

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        $("#alert1").removeClass("hidden");
    }, function(error) {
        
        // An error happened.
        console.log(error.message);
    });
}


//end auth moudels

//database moudels

function write(id,name,email) {

     firebase.database().ref('users/' + id).set({
    username: name,
    email: email
  });

  }


function verify() {
    var status=false;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user != null) {
            //toastr.info('Sending email verification message to your email. Check inbox now!', 'Email Verification');
           status= user.sendEmailVerification();
        }
    });
    return status;
}