import Vue from 'nativescript-vue';
import Vuex from './vuex';
import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tickets: ""
    },
    mutations: {
        load(state) {
            return ApplicationSettings.getString("store");
        },
        save(state, data) {
            ApplicationSettings.setString("store", data);
        }
    }
});

Vue.prototype.$store = store;

module.exports = store;

import Tickets from './components/Tickets';


// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = true;

new Vue({

    render: h => h('frame', [h(Tickets)]),
    data() {
        return {
            tickets: []
        }
    },
    created() {
        if (ApplicationSettings.getString("tickets") == undefined) {
            ApplicationSettings.setString("tickets", JSON.stringify([]));
            this.tickets = [];
            console.log("uj");
        } else {
            this.tickets = JSON.parse(ApplicationSettings.getString("tickets"));
            console.log("betoltve");
        }


    }

}).$start();

