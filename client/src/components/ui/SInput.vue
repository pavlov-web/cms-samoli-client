<template>
  <div :class="[`s-input s-input--${type}`, inputClass()]">
    <label :for="id">{{ label }}</label>
    <input
      autocomplete="disabled"
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emitValue($event)"
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { getUniqueId } from "@/helpers";

export default defineComponent({
  name: "SInput",
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
  },

  setup(props, { emit }) {
    const id = `input_${props.type}_${getUniqueId()}`;
    const value = ref<Value>(null);
    const isFocus = ref(false);

    const inputClass = () => {
      return {
        "s-input--error": props.error,
        "s-input--focus": isFocus.value,
      };
    };

    const emitValue = (event: Event) => {
      value.value = (event.target as HTMLInputElement).value;

      emit("update:modelValue", value);
    };

    return { id, isFocus, emitValue, inputClass };
  },
});

type ButtonSize = "text" | "number" | "password";
type Value = string | number | null;
</script>

<style scoped lang="scss">
.s-input {
  display: inline-flex;
  flex-direction: column;
  min-width: 200px;
  position: relative;
  width: 100%;

  input {
    border-radius: 6px;
    transition: 0.2s;
    border: 1px solid $gray;
    padding: 10px;
  }

  &--focus {
    input {
      border: 1px solid $primary;
      box-shadow: 0 0 0 3px transparentize($primary, 0.8),
        0 0 0 50px white inset;
    }
  }

  &--error {
    input {
      border: 1px solid $danger;
      box-shadow: 0 0 0 3px transparentize($danger, 0.8), 0 0 0 50px white inset;
    }

    span {
    }
  }
}
</style>
