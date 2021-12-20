<template>
    <div class="header">
        <div class="logo">
            <img src="../assets/logos/android-chrome-192x192.png" />
        </div>
        <div></div>
        <div>
            <router-link to="/">Home</router-link>
        </div>
        <div class="play-container">
            <router-link to="/play">
                <div class="play">Play</div>
            </router-link>
        </div>
        <div>
            <router-link to="/store">Store</router-link>
        </div>
        <div>
            <div class="points">
                <router-link to="/points">
                    <span>
                        <img class="coin" src="../assets/coin.png" />
                    </span>
                </router-link>
                <RcPoints v-if="isAuthenticated"></RcPoints>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { getAuth } from '@firebase/auth';
import { useAuth } from '../hooks/useAuth'

export default defineComponent({
    name: "TheHeader",
    components: {
        RcPoints: defineAsyncComponent(() => import('./RcPoints.vue')),
    },
    setup() {
        const auth = getAuth()
        const { isAuthenticated } = useAuth(auth)
        return {
            isAuthenticated
        }
    }
});
</script>

<style scoped>
.header {
    background: transparent;
    border-bottom: 1px solid white;
    display: grid;
    grid-template-columns: 60px 100px 1fr 1fr 1fr 100px 60px;
    grid-template-rows: 60px;
    align-items: center;
    text-transform: uppercase;
}

.logo {
    height: 50px;
    width: 50px;
    padding: 5px;
}

.logo > img {
    height: 100%;
}

.points {
    display: grid;
    grid-template-columns: 30px auto;
    grid-template-rows: 60px;
    align-items: center;
    text-align: left;
    gap: 5px;
    color: white;
}

a {
    text-decoration: none;
    color: hsl(0deg 0% 70%);
}

a:hover {
    color: white;
}

a.router-link-exact-active {
    color: hsl(53deg 100% 43%);
}

.coin {
    height: 30px;
}

.coin:hover {
    opacity: 0.7;
}

.play-container {
    height: 100%;
    clip-path: polygon(0% 0, 100% 0, 85% 100%, 15% 100%);
}

.play {
    height: 100%;
    font-weight: bold;
    font-size: 25px;
    background-color: hsl(0deg 0% 70%);
    color: hsl(210deg 32% 30%);
    display: grid;
    align-content: center;
    clip-path: polygon(0% 0, 100% 0, 85% 100%, 15% 100%);
}

/*

.play-container > a {
    color: hsl(210deg 32% 30%);
    height: 60px;
}
*/

/*

.play:hover {
    background-color: hsl(0deg 0% 70%);
}
*/

.play:hover {
    color: white;
    background-color: hsl(0deg 0% 50%);
}

a.router-link-exact-active > .play {
    color: black;
}
</style>