import fire from '../src/Config/fire'


function iamclose(){
    fire.auth().signOut().then(function() {
        // Sign-out successful.
        alert("LogOut SuccessFull")
      }).catch(function(error) {
        // An error happened.
      });
      alert("aaaaaa")
    
}