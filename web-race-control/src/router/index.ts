import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getAuth } from "@firebase/auth";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "PageHome",
        component: () => import("../pages/PageHome.vue"),
    },
    {
        path: "/store",
        name: "PageStore",
        component: () => import("../pages/PageStore.vue"),
        meta: {
            title: "Store",
            requiresAuth: true,
        },
    },
    {
        path: "/success",
        name: "PageSuccess",
        component: () => import("../pages/PageSuccess.vue"),
        meta: {
            title: "Success"
        },
    },
    {
        path: "/login",
        name: "PageLogin",
        component: () => import("../pages/PageLogin.vue"),
        meta: {
            title: "Login",
        },
    },
    {
        path: "/logout",
        name: "PageLogout",
        redirect: (to) => {
            const auth = getAuth();
            auth.signOut();
            return "/";
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const auth = getAuth();
    document.title = (to.meta.title as string) || "Race Control";

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const unsubscribeOnAuthStateChanged = auth.onAuthStateChanged(user => {
            if (user) {
                next()
            } else {
                next({
                    path: "/login",
                    query: { redirect: to.fullPath },
                });
            }
        })
        unsubscribeOnAuthStateChanged()
    } else {
        next();
    }
});

export default router;