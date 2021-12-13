<template>
  <div class="auth">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Auth",
  props: {},

  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.auth {
}
</style>
