import HomeView from "@/views/HomeView.vue"
import SystemsView from "@/views/SystemsView.vue"

import { createRouter as createVueRouter, createWebHistory } from "vue-router"

const createRouter = () => {
	const router = createVueRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		routes: [
			{
				path: "/",
				name: "home",
				component: HomeView,
			},
			{
				path: "/systems",
				name: "systems",
				component: SystemsView,
			}
		],
	})

	return router
}

export default createRouter