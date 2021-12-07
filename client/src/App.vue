<template>
  <router-view />
  <s-toast />
</template>

<style lang="scss"></style>
<script>
import SToast from "@ui/SToast";
export default {
  components: { SToast },
};
</script>
