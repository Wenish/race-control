<template>
  <LayoutFull>
    <div>
      Successfull purchased RACE CONTROL Points.
    </div>
  </LayoutFull>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "PageHome",
  components: {
    LayoutFull: defineAsyncComponent(
      () => import("../layouts/LayoutFull.vue")
    )
  },
});
</script>