<template>
  <div class="min-h-screen grid layout">
    <header>
        <router-link to="/">Home</router-link><br>
        <router-link to="/store">Store</router-link><br>
        <router-link to="/logout" v-if="isAuthenticated">Logout</router-link>
        <div v-if="isAuthenticated"> My RACE CONTROL Points: <RcPoints></RcPoints></div>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <div v-if="isAuthenticated">Logged in as {{ user?.displayName }}</div>
      <p>© 2021 Jonas Voland</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { getAuth } from '@firebase/auth';
import { useAuth } from '../hooks/useAuth'

export default defineComponent({
  name: "LayoutFull",
  components: {
    RcPoints: defineAsyncComponent(() => import('../components/RcPoints.vue')),
  },
  setup() {
      const auth = getAuth()
      const { isAuthenticated, user } = useAuth(auth)
      return {
          isAuthenticated,
          user
      }
  }
});
</script>

<style scoped>
footer {
  padding: 20px;
}
</style>