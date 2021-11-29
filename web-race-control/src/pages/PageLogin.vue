<template>
  <LayoutFull>
    <div>
      <h1>Login</h1>
    </div>
    <div ref="firebaseAuthContainer"></div>
  </LayoutFull>
</template>

<script lang="ts">
import {
  defineAsyncComponent,
  defineComponent,
  onUnmounted,
  ref,
  watchEffect,
} from "vue";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import "firebaseui/dist/firebaseui.css";
import * as firebaseui from "firebaseui";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "PageLogin",
  components: {
    LayoutFull: defineAsyncComponent(() => import("../layouts/LayoutFull.vue")),
  },
  setup() {
    const firebaseAuthUi = new firebaseui.auth.AuthUI(getAuth());
    const firebaseAuthContainer = ref();
    const auth = getAuth();
    const router = useRouter();

    const uiConfig: firebaseui.auth.Config = {
      callbacks: {
        signInSuccessWithAuthResult: () => false,
      },
      signInOptions: [
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true
        },
      ],
      tosUrl: "/terms-of-service",
      privacyPolicyUrl: "privacy-policy",
    };

    const unsubscribeOnAuthStateChanged = auth.onAuthStateChanged((user) => {
      if (user) {
        if (router.currentRoute.value.query.redirect) {
          router.replace(router.currentRoute.value.query.redirect as string);
        } else {
          router.replace("/");
        }
      } else {
        console.log("not logged in");
      }
    });

    watchEffect(() => {
      if (!!firebaseAuthContainer.value) {
        firebaseAuthUi.start(firebaseAuthContainer.value, uiConfig);
      }
    });

    onUnmounted(() => {
      unsubscribeOnAuthStateChanged();
      firebaseAuthUi.delete();
    });

    return {
      firebaseAuthContainer,
    };
  },
});
</script>

<style>
</style>