// Creating a new Vue instance and pass in an options object.
var demo = new Vue({
        
      
        el: '#app',

        // This is the model.
        // Define properties and give them initial values.
        data: {
                active: 'index'
        },

        // Functions we will be using.
        methods: {
                makeActive: function(item){
                        // When a model is changed, the view will be automatically updated.
                        this.active = item;
                }
        }
});