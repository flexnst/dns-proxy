import Vue from 'vue';
import App from "../Components/App";
import axios from 'axios'

window.http = axios.create({
    baseURL: location.origin,
    headers: { 'content-type': 'application/json' },
});

let _ = new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
});