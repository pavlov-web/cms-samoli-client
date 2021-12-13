<template>
  <div class="page portfolio"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Portfolio",
  props: {},

  setup() {
    const data = ref(null);
    return {};
  },
});
</script>

<style scoped lang="scss">
.portfolio {
}
</style>
