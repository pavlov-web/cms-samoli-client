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
    <s-validate
      :rules="form.input.rules"
      :errors="form.input.errors"
      v-model:is-error="form.input.isError"
    >
      <s-input
        label="Пароль"
        placeholder="Введите пароль"
        v-model="form.input.data"
        :error="form.input.isError"
      />
    </s-validate>
    <pre>{{ form }}</pre>
  </div>
</template>

<script lang="ts">
import SButton from "@ui/SButton.vue";
import SIcon from "@ui/SIcon.vue";
import SInput from "@ui/SInput.vue";
import SValidate from "@ui/SValidate.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { SValidate, SInput, SButton, SIcon },

  data() {
    return {
      form: {
        validate: true,
        input: {
          data: "",
          isError: false,
          rules: ["required", "minmax:6,9", "email"],
          errors: [
            "Поле обязательно",
            "Минимальная и максимальная длина 6 и 9 символов",
            "Некоректный E-mail",
          ],
        },
      },
    };
  },

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
