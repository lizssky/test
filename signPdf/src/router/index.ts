import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";
import Index from "../view/Index.vue";

const routes:Array<RouteRecordRaw> =[
    {
        path:"/",
        name: "index",
        component: Index,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });


export default router;
