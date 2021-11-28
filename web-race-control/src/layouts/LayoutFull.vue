<template>
  <div class="min-h-screen grid layout">
    <header>
        <router-link to="/">Home</router-link><br>
        <router-link to="/store">Store</router-link><br>
        <router-link to="/logout" v-if="isAuthenticated">Logout</router-link>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <p>© 2021 Jonas Voland</p>
      <pre v-if="isAuthenticated">{{ user }}</pre>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAuth } from '@firebase/auth';
import { useAuth } from '../hooks/useAuth'

export default defineComponent({
  name: "LayoutFull",
  components: {
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
</style>