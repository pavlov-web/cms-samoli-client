<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    @mousedown="press = true"
    @mouseup="press = false"
  >
    <slot />
    <s-icon v-if="icon" :name="icon" type="normal" :size="size" />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import SIcon from "@ui/SIcon.vue";
import { IconNames } from "@/types/icons.js";

type ButtonSize = "small" | "medium" | "large";

export default defineComponent({
  name: "SButton",
  components: { SIcon },
  props: {
    size: {
      type: String as PropType<ButtonSize>,
      default: "medium",
    },
    outline: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String as PropType<IconNames>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { slots }) {
    const press = ref(false);
    const buttonClass = computed(() => ({
      "s-button": true,
      "s-button--outline": props.outline,
      "s-button--press": press.value,
      "s-button--icon": !slots.default,
    }));

    return { buttonClass, press };
  },
});
</script>

<style scoped lang="scss">
.s-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: $padding $padding * 3;
  border-radius: $round;
  transition: $transition;
  color: $white;
  background-color: $black;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  border: none;
  @include shadow();

  .s-icon {
    margin-left: $padding;
    color: $white;
    margin-top: -2px;
    margin-bottom: -2px;
  }

  &--icon {
    box-shadow: none;
    padding: $padding;
    width: $padding * 4;
    border-radius: 50%;

    .s-icon {
      margin-right: 0;
      margin-left: 0;
    }
  }
  &.s-transparent {
    background-color: transparent !important;
    border: none !important;
  }
  &.no-shadow {
    @include shadow-card();
  }
}
</style>
