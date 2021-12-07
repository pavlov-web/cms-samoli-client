<template>
  <div class="auth">
    <div class="content">
      {{ $route.params.id }}
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Auth",
  components: { Login, Register },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.auth {
  .content {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
