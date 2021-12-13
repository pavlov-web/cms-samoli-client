<template>
  <div :class="['s-circle-progress', { 's-circle-action': cancel }]">
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle
        class="percent"
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke-width="6"
        pathLength="100"
        :stroke-dashoffset="100 - progress"
      />
    </svg>
    <s-icon v-if="cancel" name="times" size="large" />
  </div>
</template>

<script lang="ts">
import SIcon from "@ui/SIcon.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SCircleProgress",
  components: { SIcon },
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.s-circle-progress {
  display: flex;
  padding: $padding / 3;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  position: relative;

  svg {
    width: 100%;
    height: auto;
    stroke-dasharray: 100;
    stroke: $white;

    circle {
      transition: 1s;
    }
  }

  .s-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: $white;
  }
}

.s-circle-action {
  cursor: pointer;
}
</style>
