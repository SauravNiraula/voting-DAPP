import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Admin from "./components/Admin.vue";
import Voter from "./components/Voter.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/admin', component: Admin },
    { path: '/voter', component: Voter }
]

export default createRouter({
  history: createWebHistory(),
  routes
})