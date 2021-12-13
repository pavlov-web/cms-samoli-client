<template>
  <div class="s-avatar">
    <span>{{ name[0] }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SAvatar",
  props: {
    name: {
      type: String,
      default: " ",
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.s-avatar {
  width: $padding * 4;
  height: $padding * 4;
  border-radius: 50%;
  background-color: $greens;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
  line-height: 1;
  @include border($white);

  span {
    margin-top: 2px;
  }
}
</style>
