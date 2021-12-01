import { computed, ComputedRef, reactive, Ref } from 'vue'
import { Auth, getAuth, User } from "firebase/auth";
import { useAuth } from './useAuth';

export interface FirebaseAuthOptions {
    isAuthenticated: ComputedRef<boolean>
    user: Ref<User | null>
}


const userData = reactive({
    displayName: '',
    id: '',
    photoURL: '',
    raceControlPoints: 0,
    uid: '',
    userId: ''
})

const auth = getAuth()
const { user } = useAuth(auth)
const loadUser = async () => {
    const myToken = await user.value?.getIdToken()
    const response = await fetch(`${import.meta.env.VITE_RACE_CONTROL_API_HOST}/users/${user.value?.uid}`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": 'no-cors',
            "Authorization": `Bearer ${myToken}`
        }
    })
    const data = await response.json();
    userData.displayName = data.displayName
    userData.id = data.id
    userData.photoURL = data.photoURL
    userData.raceControlPoints = data.raceControlPoints
    userData.uid = data.uid
    userData.userId = data.userId
}

auth.onAuthStateChanged(user => {
    if(user) {
        loadUser()
    }
})

export function useUser() {

    return {
        loadUser,
        userData
    }
}