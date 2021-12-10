<template>
  <Base v-if="isAuth" />
  <Auth v-else />
  <s-toast />
</template>

<style lang="scss"></style>
<script>
import Base from "@/layouts/Base";
import { useStore } from "@/store";
import { EUserActions } from "@/types/UserTypes";
import Auth from "@/views/Auth";
import SToast from "@ui/SToast";
import { computed, defineComponent } from "vue";

export default defineComponent({
  components: { Base, Auth, SToast },

  setup() {
    const { getters } = useStore();

    const isAuth = computed(() => getters[EUserActions.GET_USER].id);

    return { isAuth };
  },
});
</script>
