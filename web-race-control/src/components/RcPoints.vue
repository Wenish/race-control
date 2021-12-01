<template>
    <span>{{ userData.raceControlPoints }}</span>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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

<style scoped>
.container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.top {
    background-color: hsl(214deg 23% 33%);
    height: 150px;
    display: grid;
    align-items: center;
    padding: 10px;
}

.bottom {
    background-color: hsl(211deg 20% 45%);
    padding: 10px;
}

.container:hover > .top {
    background-color: hsl(214deg 23% 38%);
}

.container:hover > .bottom {
    background-color: hsl(211deg 20% 50%);
}

.name {
    font-size: x-large;
    color: #bdf8ec;
    font-weight: bold;
}
.description {
    font-size: small;
    font-weight: bold;
}
.price {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    color: #edf6fe;
    font-weight: bold;
}
</style>