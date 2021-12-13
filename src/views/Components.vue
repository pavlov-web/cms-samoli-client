<template>
  <div class="page components">
    <h1>Font choices as flexible as your imagination</h1>
    <h2>Font choices as flexible as your imagination</h2>
    <h3>Font choices as flexible as your imagination</h3>
    <p>Font choices as flexible as your imagination</p>
    <small>Font choices as flexible as your imagination</small>
    <ul>
      <li>Option 1</li>
      <li>Option 2</li>
      <li class="child">
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
        </ul>
      </li>
    </ul>
    <div class="s-field">
      <s-input
        label="Label"
        placeholder="Placeholder"
        icon-left="calendar"
        icon-right="search"
      />
    </div>
    <div class="s-field">
      <s-button class="s-warning" icon="calendar">Button</s-button>
    </div>
    <s-upload />
  </div>
</template>

<script lang="ts">
import SButton from "@ui/SButton.vue";
import SInput from "@ui/SInput/SInput.vue";
import SUpload from "@ui/SUpload.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Components",
  components: { SUpload, SButton, SInput },
  props: {},

  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.components {
}
</style>
