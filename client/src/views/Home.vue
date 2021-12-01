<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <SButton />
  </div>
</template>

<script lang="ts">
import SButton from "@ui/SButton.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: { SButton },
})
export default class Home extends Vue {}
</script>
