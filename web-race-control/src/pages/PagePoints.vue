<template>
  <LayoutFull>
    <div class="title">SELECT RACE CONTROL POINTS</div>
    <div class="grid-products-wrapper">
      <div class="grid-products">
        <div v-for="product in products">
          <suspense>
            <template #default>
              <RcProduct
                :amount="product.amount"
                :name="product.name"
                :description="product.description"
                :id="product.id"
              ></RcProduct>
            </template>
          </suspense>
        </div>
      </div>
    </div>
  </LayoutFull>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from "vue";

export default defineComponent({
  name: "PagePoints",
  components: {
    LayoutFull: defineAsyncComponent(() => import("../layouts/LayoutFull.vue")),
    RcProduct: defineAsyncComponent(() => import('../components/RcProduct.vue')),
  },
  setup() {
    const products = ref([
      {
        amount: 500,
        name: '475',
        description: '475 RACE CONTROL Points + 0 bonus RACE CONTROL Points',
        id: 'prod_KgJ30IByFKidYr'
      },

      {
        amount: 1000,
        name: '1000',
        description: '950 RACE CONTROL Points + 50 bonus RACE CONTROL Points',
        id: 'prod_KgJ440e8f81VCO'
      },

      {
        amount: 2000,
        name: '2050',
        description: '1900 RACE CONTROL Points + 150 bonus RACE CONTROL Points',
        id: 'prod_KgJ4oaAsM0p4Vy'
      },

      {
        amount: 3500,
        name: '3650',
        description: '3330 RACE CONTROL Points + 320 bonus RACE CONTROL Points',
        id: 'prod_KgJ6wwUoa9iYIN'
      },

      {
        amount: 5000,
        name: '5350',
        description: '4750 RACE CONTROL Points + 600 bonus RACE CONTROL Points',
        id: 'prod_KgJ8QPHpL2bmDZ'
      },

      {
        amount: 10000,
        name: '11000',
        description: '9500 RACE CONTROL Points + 1500 bonus RACE CONTROL Points',
        id: 'prod_KgJ9lnd2qHVlHj'
      }
    ])
    return {
      products
    }
  }
});
</script>

<style scoped>
.title {
  font-size: large;
  font-weight: bold;
  padding: 20px;
  color: #edf6fe;
}
.grid-products-wrapper {
  max-width: 1000px;
  margin: auto;
}

.grid-products {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
}

@media only screen and (min-width: 600px) {
  .grid-products {
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (min-width: 900px) {
  .grid-products {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>