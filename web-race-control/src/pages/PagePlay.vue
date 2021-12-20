<template>
  <LayoutFull>
    <div>
      Hey Its me Page Play
      
    </div>
  </LayoutFull>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "PagePlay",
  components: {
    LayoutFull: defineAsyncComponent(
      () => import("../layouts/LayoutFull.vue")
    )
  },
});
</script>