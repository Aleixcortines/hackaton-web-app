
start('https://api.myjson.com/bins/uw5e6')


//Fetch function. As as parameter I put the url API
function start(url) {


    fetch(url).then(function (response) {
            return response.json();

        })
        //convert the json in data   
        .then(function (json) {

            console.log(json);
            //members object Vue take the value of json.results[0].members;
            demo.jsonData = json.items;
//
//            //after to declare statistics object, statistics object vue take the value of statistics
            demo.cityEvents = json.events;

            //Here all the calls to functions
            login();
            writeNewPost();
            getPosts();

        })
}

// Creating a new Vue instance and pass in an options object.
var demo = new Vue({

    el: '#app',

    // This is the model.
    // Define properties and give them initial values.
    data: {
        active: 'index',
        jsonData: [],
        hackaton: {},
        cityEvents: [],

    },

    // Functions we will be using.
    methods: {
        makeActive: function (item) {
            // When a model is changed, the view will be automatically updated.
            this.active = item;
        },
        getHackaton(hackaton) {

            this.hackaton = this.jsonData.filter(event => event.name_hackaton == hackaton.name)[0];

        }
        
        
        
        
    }
});




document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);


getPosts();

function login() {

    // https://firebase.google.com/docs/auth/web/google-signin

    //Provider
    var provider = new firebase.auth.GoogleAuthProvider();

    //How to signin

    firebase.auth().signInWithPopup(provider);


    console.log("login")



}


function writeNewPost() {

    // https://firebase.google.com/docs/database/web/read-and-write

    //Values from HTML

    var text = document.getElementById("textInput").value;

    var name = firebase.auth().currentUser.displayName;

    var objectToSend = {

        message: text,
        author: name
    };


    firebase.database().ref("hack_chat").push(objectToSend);

    console.log(objectToSend);





}


function getPosts() {



    firebase.database().ref('hack_chat').on('value', function (data) {
        var posts = document.getElementById("posts");
        posts.innerHTML = "";
        console.log(data.val());
        var messages = data.val();
        for (var key in messages) {
            var text = document.createElement("div");
            var element = messages[key];

            text.append(element.message);
            text.append(element.author);
            posts.append(text);
        }
    })

    console.log("getting posts");

}
