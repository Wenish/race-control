<template>
  <div class="layout">
    <header>
      <TheHeader></TheHeader>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <div v-if="isAuthenticated">Logged in as {{ user?.displayName }}</div>
      <p>© 2021 Jonas Voland</p>
      <router-link to="/logout" v-if="isAuthenticated">Logout</router-link>
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
    TheHeader: defineAsyncComponent(() => import('../components/TheHeader.vue'))
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
.layout {
  min-height: 100vh;
  display: grid;
  width: 100%;
  height: 100%;
  gap: 0px 0px;
  grid-template-rows: auto 1fr auto;
}

main {
  padding: 20px;
}

footer {
  padding: 20px;
}
</style>