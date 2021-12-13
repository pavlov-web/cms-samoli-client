<template>
  <div class="page material"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Material",
  props: {},

  setup() {
    const data = ref(null);
    return {};
  },
});
</script>

<style scoped lang="scss">
.material {
}
</style>
