<template>
  <i :class="`s-icon s-icon-${name} s-icon--${size} s-icon--${type}`" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IconNames, IconSizes, IconTypes } from "@/types/icons.js";

export default defineComponent({
  name: "SIcon",
  props: {
    name: {
      type: String as PropType<IconNames>,
      required: true,
    },
    size: {
      type: String as PropType<IconSizes>,
      default: "medium",
    },
    type: {
      type: String as PropType<IconTypes>,
      default: "solid",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import "~@/assets/scss/icons/icons.scss";
.s-icon {
  font-style: normal;
  line-height: 1;
  transition: $transition;
  position: relative;
  display: block;

  &:before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &--small {
    font-size: 12px;
    width: 12px;
    height: 12px;
  }

  &--medium {
    font-size: 16px;
    width: 16px;
    height: 16px;
  }

  &--large {
    font-size: 24px;
    width: 30px;
    height: 30px;
  }

  &--light {
    font-weight: 100;
  }

  &--normal {
    font-weight: 300;
  }

  &--solid {
    font-weight: 900;
  }
}
</style>
