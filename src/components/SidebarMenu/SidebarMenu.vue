<template>
  <div class="sidebar-menu">
    <sidebar-item :route="item" v-for="item in menu" :key="item.name" />
  </div>
</template>

<script lang="ts">
import SidebarItem from "@/components/SidebarMenu/SidebarItem.vue";
import { computed, defineComponent } from "vue";
import { RouteMeta, RouteRecordRaw, useRouter } from "vue-router";

export type MenuItem = {
  path: string | symbol | undefined;
  name: string | symbol | undefined;
  meta: RouteMeta | undefined;
  children: RouteRecordRaw[];
};

export default defineComponent({
  name: "SidebarMenu",
  components: { SidebarItem },
  props: {},

  setup() {
    const router = useRouter();

    const menu = computed(() => getItemsMenu(router.options.routes));
    const getItemsMenu = (router: RouteRecordRaw[], path = ""): MenuItem[] => {
      return router.map((route) => {
        if (route.children) {
          route.children = getItemsMenu(
            route.children,
            route.path
          ) as RouteRecordRaw[];
        }
        return {
          name: route.name,
          path: path + route.path,
          meta: route.meta,
          children: route.children || [],
        };
      });
    };

    return { menu };
  },
});
</script>

<style scoped lang="scss">
.sidebar-menu {
  padding: $padding * 2;
}
</style>
