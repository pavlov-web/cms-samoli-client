<template>
  <div class="page clients"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Clients",
  props: {},

  setup() {
    const data = ref(null);
    return {};
  },
});
</script>

<style scoped lang="scss">
.clients {
}
</style>
