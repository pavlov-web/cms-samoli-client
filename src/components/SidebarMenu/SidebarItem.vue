<template>
  <li class="sidebar-item" v-if="route.meta?.visible">
    <router-link :to="route.path" exact-active-class="sidebar-item--active">
      <s-icon v-if="route.meta.icon" :name="route.meta.icon" />
      {{ route.name }}
    </router-link>
  </li>
  <ul class="sidebar-item-parent" v-if="route.children?.length">
    <sidebar-item
      v-for="item in route.children"
      :key="item.name"
      :route="item"
    />
  </ul>
</template>

<script lang="ts">
import { MenuItem } from "@/components/SidebarMenu/SidebarMenu.vue";
import SIcon from "@ui/SIcon.vue";
import { defineComponent, PropType } from "vue";

interface MMenuItem extends MenuItem {
  meta: {
    visible?: boolean;
    icon?: string;
  };
}

export default defineComponent({
  name: "SidebarItem",
  components: { SIcon },
  props: {
    route: {
      type: Object as PropType<MMenuItem>,
      default: () => ({}),
    },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.sidebar-item {
  list-style: none;
  font-weight: 600;
  margin-bottom: $padding;

  a {
    padding: $padding * 2;
    text-decoration: none;
    display: flex;
    align-items: center;
    border-radius: $round;

    .s-icon {
      color: inherit;
      transition: 0s;
      margin-right: $padding * 2;
    }

    &:hover {
      color: $blue-dark;
    }
  }

  &--active {
    background-color: $blue-dark;
    color: $white !important;
    @include shadow-card();
  }
}
.sidebar-item-parent {
  li {
    padding-left: $padding;
  }
}
</style>
