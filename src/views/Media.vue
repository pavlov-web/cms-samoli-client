<template>
  <div class="page media"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Media",
  props: {},

  setup() {
    const data = ref(null);
    return {};
  },
});
</script>

<style scoped lang="scss">
.media {
}
</style>
