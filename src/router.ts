import VesmosApp from "./components/VesmosApp.vue";
import ProjectsView from "./ProjectsView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{ path: "/", component: VesmosApp },
	{ path: "/projects", component: ProjectsView },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
