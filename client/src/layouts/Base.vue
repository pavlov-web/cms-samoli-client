<template>
  <div class="base">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Base",
  props: {},

  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.base {
}
</style>
