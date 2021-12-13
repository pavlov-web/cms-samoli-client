<template>
  <div class="login">
    <div class="s-d-flex s-dir-col">
      <div class="s-field s-mb-5">
        <h3 class="s-text-center">Вход</h3>
      </div>
      <div class="s-field">
        <s-validate
          :rules="valid.email.rules"
          :errors="valid.email.errors"
          v-model:is-error="valid.email.isError"
        >
          <s-input
            label="E-mail"
            placeholder="E-mail"
            :error="valid.email.isError"
            v-model="form.email"
            required
          />
        </s-validate>
      </div>
      <s-validate
        :rules="valid.password.rules"
        :errors="valid.password.errors"
        v-model:is-error="valid.password.isError"
      >
        <s-input
          label="Пароль"
          placeholder="Пароль"
          :error="valid.password.isError"
          v-model="form.password"
          type="password"
        />
      </s-validate>
      <div class="s-field">
        <p class="s-text-small s-mt-3">
          Еще нет учетной записи?
          <router-link to="/auth/register">Зарегистрироваться</router-link>
        </p>
      </div>
      <div class="s-d-flex s-jc-end s-ai-center">
        <s-button class="s-success" @click="sendForm"> Войти </s-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { EToast } from "@/store/Toast/types";
import { EUserActions, UserLogin } from "@/types/UserTypes";
import SButton from "@ui/SButton.vue";
import SInput from "@ui/SInput/SInput.vue";
import SValidate from "@ui/SValidate.vue";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  components: { SValidate, SInput, SButton },

  setup() {
    const { dispatch } = useStore();
    const router = useRouter();
    const errors = {
      email: "Некоректный E-mail",
      required: "Поле обязательно",
      min: "Минимальная длина пароля 6 символов",
    };
    const form = reactive<UserLogin>({
      email: " ",
      password: " ",
    });
    const valid = ref({
      email: {
        isError: false,
        rules: ["required", "email"],
        errors: [errors.required, errors.email],
      },
      password: {
        isError: false,
        rules: ["min:6"],
        errors: [errors.min],
      },
    });
    const sendForm = async () => {
      if (form.email && form.password) {
        await dispatch(EUserActions.LOGIN, form);
        await router.push("/");
        dispatch(EToast.PUSH_SUCCESS, "Регистрация успешна");
      }
    };

    return { form, valid, sendForm };
  },
});
</script>

<style scoped lang="scss"></style>
