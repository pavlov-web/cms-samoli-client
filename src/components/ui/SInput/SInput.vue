<template>
  <div ref="root" :class="[`s-input s-input--${type}`, inputClass()]">
    <label :for="id">{{ label }} <span v-if="required">*</span></label>
    <div class="s-input-wrapper">
      <div
        v-if="iconLeft"
        :class="['s-icon-left', { 's-icon-action': iconLeftAction }]"
        @click="!!iconLeftAction"
      >
        <s-icon type="normal" size="medium" :name="iconLeft" />
      </div>
      <input
        :disabled="disabled"
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="emitValue($event)"
      />
      <div
        v-if="iconRight"
        :class="['s-icon-right', { 's-icon-action': iconRightAction }]"
        @click="!!iconRightAction"
      >
        <s-icon type="normal" size="medium" :name="iconRight" />
      </div>
      <div v-else-if="error" class="s-icon-right s-icon-error">
        <s-icon name="times" size="small" />
      </div>
      <div v-else-if="success" class="s-icon-right s-icon-success">
        <s-icon name="thumbs-up" size="small" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IconNames } from "@/types/icons";
import SIcon from "@ui/SIcon.vue";
import { defineComponent, onDeactivated, onMounted, PropType, ref } from "vue";
import { getUniqueId } from "@/helpers";

export default defineComponent({
  name: "SInput",
  components: { SIcon },
  emits: ["update:modelValue"],
  props: {
    modelValue: String,
    type: {
      type: String as PropType<ButtonSize>,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconLeft: {
      type: String as PropType<IconNames>,
      default: "",
    },
    iconRight: {
      type: String as PropType<IconNames>,
      default: "",
    },
    iconLeftAction: Function,
    iconRightAction: Function,
  },

  setup(props, { emit }) {
    const root = ref<HTMLElement | null>(null);
    const id = getUniqueId(`input_${props.type}`);

    const value = ref<Value>(undefined);
    const focus = ref(false);
    const success = ref(false);

    const inputClass = () => {
      return {
        "s-required": props.required,
        "s-disabled": props.disabled,
        "s-error": props.error,
        "s-success": success.value,
        "s-focus": focus.value,
      };
    };

    const emitValue = (event: Event) => {
      value.value = (event.target as HTMLInputElement).value;
      emit("update:modelValue", value);
      if (props.error) success.value = true;
    };

    const isFocus = (e: Event) => {
      if (!root.value) return;
      focus.value = root.value.contains(e.target as HTMLElement);
    };

    onMounted(() => {
      document.addEventListener("click", isFocus);
    });

    onDeactivated(() => {
      document.removeEventListener("click", isFocus);
    });

    return { id, focus, success, root, emitValue, inputClass };
  },
});

type ButtonSize = "text" | "number" | "password";
type Value = string | number | undefined;
</script>

<style scoped lang="scss">
@import "SInput";
</style>
