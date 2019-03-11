//start('https://api.myjson.com/bins/uw5e6')
//
//
////Fetch function. As as parameter I put the url API
//function start(url) {
//
//
//    fetch(url).then(function (response) {
//            return response.json();
//
//        })
//        //convert the json in data   
//        .then(function (json) {
//
//            console.log(json);
//            
//            demo.jsonData = json.items;
//        
//            demo.cityEvents = json.events;
//
//
//
//        })
//}

// vue.js Object
var demo = new Vue({

    el: '#app',
    //on mounted We put this function is to call my json (on myjason.com url)
    mounted() {
        this.cargarPage();
    },

    // This is the model.

    data: {
        jsonData: [],
        cityEvents: [],
        Myjson: [],
        active: 'index',
        hackaton: {},
        text: "",
        messages: [],
        noLog: false,
        message_chat: "true",


    },

    // Functions we will be using.
    methods: {
        //function to call the json on myjason.com
        cargarPage() {

            this.$http.get('https://api.myjson.com/bins/uw5e6')
                .then((response) => {

                    //on this variables I put the values of my json 

                    this.Myjson = response.body;

                    this.jsonData = response.body.items;

                    this.cityEvents = response.body.events;
                });
        },

        //function to show every part of the menu

        makeActive: function (item) {
            // When a model is changed, the view will be automatically updated.
            this.active = item;
        },
        //function to get every information about the hackaton
        getHackaton(hackaton) {

            this.hackaton = this.jsonData.filter(event => event.name_hackaton == hackaton.name)[0];

        },
        // function to do the login
        login() {

            //Provider

            var provider = new firebase.auth.GoogleAuthProvider();

            //How to signin
            //posar el condicional aqui the true i false
            firebase.auth().signInWithPopup(provider).then(() => this.getPosts());

            console.log("login")
            // hide the login button and show the send button
            this.noLog = true;
            this.message_chat = false;


        },
        //function to unlogin
        unLogin() {

            firebase.auth().signOut();
            //hide the send button 
            this.noLog = false;
            //hide the messages meanwhile we are not login
            demo.messages = [];
            this.message_chat = true;

        },

        //functions to write messages on the chat

        writeNewPost() {


            var name = firebase.auth().currentUser.displayName;

            var objectToSend = {

                message: this.text,
                author: name
            };

            firebase.database().ref("hack_chat").push(objectToSend);

        },

        getPosts() {

            //every time we put empty the message array

            demo.messages = [];
            firebase.database().ref('hack_chat').on('value', function (data) {


                demo.messages = data.val();

            })

            console.log("getting posts");

        }

    },

    //function to know if a user is signes or not
    created() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                demo.getPosts()
            } else {
                // No user is signed in.


            }
        });
    }

});
