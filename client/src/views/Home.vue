<template>
  <div class="home">
    <SIcon />
  </div>
</template>

<script lang="ts">
import SIcon from "@ui/SIcon.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { SIcon },
});
</script>
