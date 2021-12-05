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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  transition: 0.2s;

  &--small {
    font-size: 12px;
    width: 16px;
    height: 16px;
  }

  &--medium {
    font-size: 18px;
    width: 22px;
    height: 22px;
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
    font-weight: 400;
  }

  &--solid {
    font-weight: 900;
  }
}
</style>
