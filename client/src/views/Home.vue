<template>
  <div class="home">
    <SIcon size="small" name="house-blank" />
    <SIcon size="medium" name="house-blank" />
    <SIcon size="large" name="house-blank" />
    <SIcon size="large" type="light" name="house-blank" />
    <SIcon size="large" type="normal" name="house-blank" />
    <SIcon size="large" type="solid" name="house-blank" />
    <SIcon size="large" type="solid" name="house-blank" class="s-icon--dark" />
    <SButton>Button</SButton>
    <SButton class="s-button--danger">Кнопка</SButton>
    <s-button class="s-button--warning" size="medium" icon="gear">
      Кнопка
    </s-button>
    <s-button class="s-button--secondary" size="medium" icon="gear" outline>
      Кнопка
    </s-button>
  </div>
</template>

<script lang="ts">
import SButton from "@ui/SButton.vue";
import SIcon from "@ui/SIcon.vue";
import SInput from "@ui/SInput/SInput.vue";
import SValidate from "@ui/SValidate.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { SValidate, SInput, SButton, SIcon },

  setup() {
    return {};
  },
});
</script>
<style lang="scss">
.home {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;

  & > * {
    margin: 5px;
  }
}
</style>
