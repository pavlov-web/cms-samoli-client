<template>
  <div :class="[`s-textarea`, classes()]">
    <label :for="id">
      {{ label }}
    </label>
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emitValue($event)"
      @focus="focus = true"
      @blur="focus = false"
    />
  </div>
</template>

<script lang="ts">
import { getUniqueId } from "@/helpers";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "STextarea",
  props: {
    modelValue: String,
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },

  setup(props, { emit }) {
    const id = getUniqueId(`textarea`);
    const focus = ref(false);

    const emitValue = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      emit("update:modelValue", value);
    };

    const classes = () => {
      return {
        "s-focus": focus.value,
      };
    };
    return { id, focus, emitValue, classes };
  },
});
</script>

<style scoped lang="scss">
.s-textarea {
  display: inline-flex;
  width: 240px;
  flex-direction: column;

  textarea {
    font-family: inherit;
    width: 100%;
    border: none;
    padding: $padding;
    height: 105px;
    border-radius: $round;
    background-color: $white;
    transition: $transition;
    resize: none;
    @include border($white);
    @include shadow();

    &::placeholder {
      color: $gray-dark;
    }
  }

  &.s-focus textarea {
    @include border($yellow);
    @include shadow($yellow);
  }
}
</style>
