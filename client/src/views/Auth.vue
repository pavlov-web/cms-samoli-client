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

  .register,
  .login {
    max-width: 320px;
    border-radius: 10px;
    padding: 40px 40px;
    background-color: $gray-light;
    @include shadow();

    ::v-deep(.s-button) {
      width: 100%;
    }
  }
}
</style>
