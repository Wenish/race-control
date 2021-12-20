<template>
    <span>{{ userData.raceControlPoints }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUser } from "../hooks/useUser";

export default defineComponent({
    name: "RcPoints",
    setup() {
        const { userData } = useUser()
        return {
            userData
        }
    }
});
</script>