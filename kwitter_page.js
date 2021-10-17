//YOUR FIREBASE LINKS
const firebaseConfig = {
    apiKey: "AIzaSyCTDBbz8egvWNmo0NmEVjO3H00Bdn3WIo4",
    authDomain: "kwitter-3440e.firebaseapp.com",
    databaseURL: "https://kwitter-3440e-default-rtdb.firebaseio.com",
    projectId: "kwitter-3440e",
    storageBucket: "kwitter-3440e.appspot.com",
    messagingSenderId: "219812384275",
    appId: "1:219812384275:web:01333bb676d2492f0d79e6"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
    console.log(firebase_message_id);
    console.log(message_data);
    senders_name = message_data['name'];
    message = message_data['message'];
    like = message_data['like']
    name_with_data = "<h4>" + senders_name + "<img class ='user_tick' src='tick.png'></h4>"
    message_with_tag = "<h4 class='message_h4" + message + "</h4>";
    like_button = "<button class='btn btn-warning' id=" + firebase_message_id+"value=" + like+ "onclick=updatelike(this.id)'>'";
    span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like: "+like+ "</span></button><hr>";

    row = name_with_tag + message_with_tag +like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;

    
//End code
    } });  }); }


getData();


function updatelike(message_id)
{
    console.log("clicked on like button - " + message_id)
    button_id = message_id
    likes = docuemnt.getElementById(button_id).value
    updated_likes = Number(likes) + 1
    console.log(updated_likes)
    firebase.database().ref(room_name).child(message_id).update({
          like : updated_likes
    })
}

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function send(){
    msg = document.getElementById("msg").value 
    firebase.database().ref(room_name).push({
         name:user_name,
         message:msg,
         like:0 
    });
    document.getElementById("msg").value = ""
    
}
function logout()
{
    localStorage.removeItem("user_name")
    localStorage.removeItem("room_name")
    window.location = "index.html"
}