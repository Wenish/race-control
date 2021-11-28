import { computed, ComputedRef, ref, Ref } from 'vue'
import { Auth, User } from "firebase/auth";

export interface FirebaseAuthOptions {
  isAuthenticated: ComputedRef<boolean>
  user: Ref<User | null>
}

export function useAuth(auth: Auth) {
  const user = ref<User | null>(auth.currentUser)
  const isAuthenticated = computed(() => !!user.value)

  auth.onIdTokenChanged(authUser => user.value = authUser)

  return {
    isAuthenticated,
    user
  }
}