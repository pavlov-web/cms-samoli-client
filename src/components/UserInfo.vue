<template>
  <div class="user-info">
    <div class="user-info-heading">
      <h3>{{ user.firstName }}</h3>
      <p>{{ user.email }}</p>
    </div>
    <div class="user-info-content">
      <ul class="s-menu">
        <li>
          <router-link to="#">
            <s-icon size="small" name="cog" />
            Настройки профиля
          </router-link>
        </li>
        <li>
          <router-link to="#">
            <s-icon size="small" name="ruble-sign" />
            Баланс
          </router-link>
        </li>
      </ul>
    </div>
    <div class="user-info-actions">
      <s-button icon="sign-out" class="s-secondary" @click="logOut"
        >Выход</s-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { EUserActions, User } from "@/types/UserTypes";
import SButton from "@ui/SButton.vue";
import SIcon from "@ui/SIcon.vue";
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserInfo",
  components: { SIcon, SButton },
  props: {
    user: {
      type: Object as PropType<User>,
      default: () => ({}),
    },
  },

  setup() {
    const { dispatch } = useStore();
    const router = useRouter();
    const logOut = async () => {
      await dispatch(EUserActions.LOGOUT);
      await router.push("/auth/login");
    };
    return { logOut };
  },
});
</script>

<style scoped lang="scss">
.user-info {
  position: absolute;
  bottom: -$padding;
  right: 0;
  background-color: $white;
  border-radius: $round;
  width: 220px;
  transform: translateY(100%);
  @include shadow-card();

  &-heading {
    padding: $padding * 2;
    border-bottom: 1px solid $gray;

    p {
      color: $gray-dark;
      font-size: 14px;
    }
  }
  &-content {
    padding: $padding 0;
  }
  &-actions {
    padding: $padding * 2;
    border-top: 1px solid $gray;
  }
}
</style>
