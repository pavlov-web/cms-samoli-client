<template>
  <button class="s-button">Test</button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class SButton extends Vue {}
</script>

<style scoped lang="scss">
.s-button {
  background-color: $global;
}
</style>
