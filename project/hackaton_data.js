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

// Creating a new Vue instance and pass in an options object.
var demo = new Vue({

    el: '#app',
    mounted() {
        this.cargarPage();
    },

    // This is the model.

    data: {
        jsonData: [],
        cityEvents: [],
        Myjson: [],
        active: 'index',
        jsonData: [],
        hackaton: {},
        cityEvents: [],
        text: "",
        messages: [],
        noLog: false,
        message_chat: "true",


    },

    // Functions we will be using.
    methods: {

        cargarPage() {

            this.$http.get('https://api.myjson.com/bins/uw5e6')
                .then((response) => {

                    this.Myjson = response.body;

                    this.jsonData = response.body.items;

                    this.cityEvents = response.body.events;
                });
        },

        makeActive: function (item) {
            // When a model is changed, the view will be automatically updated.
            this.active = item;
        },
        //function to get every information about the hackaton
        getHackaton(hackaton) {

            this.hackaton = this.jsonData.filter(event => event.name_hackaton == hackaton.name)[0];

        },
        // to do the login
        login() {

            //Provider

            var provider = new firebase.auth.GoogleAuthProvider();

            //How to signin

            firebase.auth().signInWithPopup(provider).then(() => this.getPosts());

            console.log("login")
            // hide the login button and show the send button
            this.noLog = true;
            this.message_chat = false;


        },

        unLogin() {

            firebase.auth().signOut();
            //hide the send button 
            this.noLog = false;
            //hide the messages meanwhile we are not login
            demo.messages = [];
            this.message_chat = true;

        },

        writeNewPost() {


            var name = firebase.auth().currentUser.displayName;

            var objectToSend = {

                message: this.text,
                author: name
            };

            firebase.database().ref("hack_chat").push(objectToSend);

        },

        getPosts() {

            demo.messages = [];
            firebase.database().ref('hack_chat').on('value', function (data) {


                demo.messages = data.val();

            })

            console.log("getting posts");

        }

    },
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
