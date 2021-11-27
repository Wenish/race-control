<template>
  <LayoutFull>
    <div>
      Hey Its me Page Store
    </div>
  </LayoutFull>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "PageStore",
  components: {
    LayoutFull: defineAsyncComponent(
      () => import("../layouts/LayoutFull.vue")
    )
  },
});
</script>