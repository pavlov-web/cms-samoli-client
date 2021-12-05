<template>
  <button :class="buttonClass()">
    <s-icon v-if="icon" :name="icon" type="solid" size="small" />
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import SIcon from "@ui/SIcon.vue";
import { IconNames } from "@/types/icons.js";

type ButtonIconPos = "left" | "right";
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
  },

  setup(props) {
    const buttonClass = () => ({
      "s-button": true,
      "s-button--outline": props.outline,
    });

    return { buttonClass };
  },
});
</script>

<style scoped lang="scss">
.s-button {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 6px;
  transition: 0.2s;
  color: $white;
  background-color: $black;
  border: 1px solid $black;
  font-size: 16px;
  line-height: 16px;

  .s-icon {
    margin-right: 5px;
  }
}
</style>
