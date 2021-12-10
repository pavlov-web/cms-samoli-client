<template>
  <div class="s-toast-wrapper">
    <transition-group name="s-toast">
      <template v-for="toast in toasts" :key="toast.id">
        <div class="s-toast-item">
          <div :class="`s-toast s-toast--${toast.type}`">
            <s-icon :name="EToastIcon[toast.type]" type="solid" />
            <p>{{ toast.message }}</p>
          </div>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { getUniqueId } from "@/helpers";
import { useStore } from "@/store";
import SIcon from "@ui/SIcon.vue";
import { computed, defineComponent } from "vue";
import { EToastIcon } from "@/store/Toast/types";

export default defineComponent({
  name: "SToast",
  components: { SIcon },
  props: {},

  setup() {
    const { getters } = useStore();
    const toasts = computed(() => getters.GET_ALL_TOAST);
    return { toasts, getUniqueId, EToastIcon };
  },
});
</script>

<style scoped lang="scss">
.s-toast-wrapper {
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 999;
}

.s-toast {
  display: flex;
  align-items: center;
  border-radius: $round;
  margin-bottom: $padding;
  min-height: $padding * 4;
  transition: transform 0.3s;
  padding: $padding;
  @include shadow();

  .s-icon {
    margin-right: $padding;
  }

  p {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
  }
}

.s-toast-enter-from {
  opacity: 0;
  -webkit-transform: translateY(50%);
  transform: translateY(50%);
}

.s-toast-leave-from {
  max-height: 100px;
}

.s-toast-item.s-toast-leave-to {
  max-height: 0;
  opacity: 0;
  margin-bottom: 0;
  .s-toast {
    transform: translateY(-100%);
  }
}

.s-toast-enter-active {
  transition: transform 0.3s, opacity 0.3s, -webkit-transform 0.3s;
}

.s-toast-leave-active {
  transition: max-height 0.5s, opacity 0.5s, margin-bottom 0.5s;
}
</style>
