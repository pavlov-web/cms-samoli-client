<template>
  <div class="header">
    <router-link to="/" class="logo">
      <img src="../../src/assets/images/logo.png" alt="" />
    </router-link>
    <div class="toolbar">
      <s-button
        class="s-success no-shadow"
        @click="$router.push('/short-card')"
      >
        Быстрая карточка
      </s-button>
      <s-button icon="bell" class="s-primary" />
      <s-button icon="envelope" class="s-primary" />
      <div class="user-info-wrapper">
        <s-avatar
          :name="user.firstName"
          @click.stop="showUserInfo = !showUserInfo"
        />
        <UserInfo
          v-if="showUserInfo"
          v-click-outside="hideUserInfo"
          :user="user"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserInfo from "@/components/UserInfo.vue";
import { useStore } from "@/store";
import { EUserGetters } from "@/types/UserTypes";
import SAvatar from "@ui/SAvatar.vue";
import SButton from "@ui/SButton.vue";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "Header",
  components: { UserInfo, SAvatar, SButton },
  props: {},

  setup() {
    const { getters } = useStore();
    const user = computed(() => getters[EUserGetters.GET_USER]);

    const showUserInfo = ref(false);
    const hideUserInfo = () => {
      showUserInfo.value = false;
    };

    return { user, showUserInfo, hideUserInfo };
  },
});
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: $blue-dark;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  @include shadow($black, 0.2);

  .logo {
    width: 220px;
    background-color: darken($blue-dark, 5%);
    padding: 0 $padding * 2;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 90px;
      margin-top: -3px;
    }
  }

  .toolbar {
    padding-right: $padding * 2;
    display: flex;
    align-items: center;

    & > * {
      margin-left: $padding * 2;
    }
  }

  .user-info-wrapper {
    position: relative;
  }
}
</style>
