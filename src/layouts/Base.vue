<template>
  <div class="base">
    <Header />
    <div class="sidebar">
      <SidebarMenu />
    </div>
    <div class="content">
      <h1 class="page-title">{{ title }}</h1>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import SidebarMenu from "@/components/SidebarMenu/SidebarMenu.vue";
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Base",
  components: { SidebarMenu, Header },
  props: {},

  setup() {
    const router = useRouter();

    const title = computed(() => router.currentRoute.value.name);
    return { title };
  },
});
</script>

<style scoped lang="scss">
.base {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    padding-top: 50px;
    width: 220px;
    height: 100vh;
    background-color: $white;
    z-index: 9;
    @include shadow-card();
  }

  .content {
    padding: 70px 20px 20px 240px;
    height: 200vh;
  }

  .page-title {
    margin-bottom: $padding * 2;
  }

  .page {
    padding: $padding * 2;
    background-color: $white;
    border-radius: $round;
    height: 100%;
    @include shadow-card($gray, 0.8);
  }
}
</style>
