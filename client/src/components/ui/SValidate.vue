<template>
  <div class="s-validate">
    <slot />
    <span class="s-error">{{ errors[errorIndex] }}</span>
  </div>
</template>

<script lang="ts">
import { validator } from "@/helpers/validator";
import { defineComponent, onUpdated, PropType, ref, VNode } from "vue";

export default defineComponent({
  name: "SValidate",
  props: {
    rules: {
      type: Array as PropType<ValidateKeys[]>,
      default: () => [],
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { slots, emit }) {
    const getDefaultSlot = (): VNode | null => {
      return slots.default?.()[0] || null;
    };

    const getModelValue = (): string | number => {
      return getDefaultSlot()?.props?.modelValue;
    };

    const splitRules = ((): SplitRulesResult[] => {
      return props.rules.map((rule) => {
        const [ruleName, params] = rule.split(":");

        return {
          params: params?.split(",") || [],
          func: validator[ruleName as ValidateKeys],
        };
      });
    })();

    const errorIndex = ref<number | null>(null);
    const oldValue = ref<string | number | null>(null);

    onUpdated(() => {
      const value = getModelValue();
      if (value === oldValue.value) return;

      for (let i = 0; i < splitRules.length; i++) {
        const { func, params } = splitRules[i];
        if (!func.call(null, value, ...(params || []))) {
          emit("update:isError", true);
          errorIndex.value = i;
          break;
        } else {
          emit("update:isError", false);
          errorIndex.value = null;
        }
      }

      oldValue.value = value;
    });

    return { errorIndex };
  },
});

// eslint-disable-next-line
type ValidateFunc = (...args: any[]) => boolean;
type ValidateKeys = "email" | "required" | "min" | "max";
interface SplitRulesResult {
  params: string[];
  func: ValidateFunc;
}
</script>

<style scoped lang="scss">
.s-validate {
  position: relative;
}
</style>
