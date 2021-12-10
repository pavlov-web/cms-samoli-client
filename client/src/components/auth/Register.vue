<template>
  <div class="register">
    <div class="s-d-flex s-dir-col">
      <div class="s-field s-mb-5">
        <h3 class="s-text-center">Регистрация</h3>
      </div>
      <div class="s-field">
        <s-validate
          :rules="valid.firstName.rules"
          :errors="valid.firstName.errors"
          v-model:is-error="valid.firstName.isError"
        >
          <s-input
            label="Имя"
            placeholder="Имя"
            :error="valid.firstName.isError"
            v-model="form.firstName"
            required
          />
        </s-validate>
      </div>
      <div class="s-field">
        <s-validate
          :rules="valid.lastName.rules"
          :errors="valid.lastName.errors"
          v-model:is-error="valid.lastName.isError"
        >
          <s-input
            label="Фамилия"
            placeholder="Фамилия"
            :error="valid.lastName.isError"
            v-model="form.lastName"
            required
          />
        </s-validate>
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
      <div class="s-field">
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
      </div>
      <s-input
        label="Повторите пароль"
        placeholder="Пароль"
        v-model="rePassword.val"
        type="password"
      />
      <div class="s-field">
        <p class="s-text-small s-mt-3">
          Уже есть учетная запись?
          <router-link to="/auth/login">Войти</router-link>
        </p>
      </div>
      <div class="s-d-flex s-jc-end s-ai-center">
        <s-button class="s-success" @click="sendForm">
          Зарегистрироваться
        </s-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { EToast } from "@/store/Toast/types";
import { EUserActions, UserRegister } from "@/types/UserTypes";
import SButton from "@ui/SButton.vue";
import SInput from "@ui/SInput/SInput.vue";
import SValidate from "@ui/SValidate.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Register",
  components: { SValidate, SInput, SButton },

  setup() {
    const { dispatch, getters, commit } = useStore();
    const router = useRouter();

    const errors = {
      email: "Некоректный E-mail",
      required: "Поле обязательно",
      min: "Минимальная длина пароля 6 символов",
    };
    const form = ref<UserRegister>({
      firstName: " ",
      lastName: " ",
      email: " ",
      password: " ",
      role: "admin",
      position: "admin",
    });

    const rePassword = ref({ val: "" });

    const valid = ref({
      email: {
        isError: false,
        rules: ["required", "email"],
        errors: [errors.required, errors.email],
      },
      firstName: {
        isError: false,
        rules: ["required"],
        errors: [errors.required],
      },
      lastName: {
        isError: false,
        rules: ["required"],
        errors: [errors.required],
      },
      password: {
        isError: false,
        rules: ["min:6"],
        errors: [errors.min],
      },
    });

    const sendForm = async () => {
      if (form.value.password === rePassword.value.val) {
        await dispatch(EUserActions.REGISTER, form.value);
        const user = getters.GET_USER;
        console.log(user);
        if (user.id) {
          await router.push("/");
        }
      } else {
        commit(EToast.PUSH_TOAST, {
          type: "danger",
          message: `Пароли не совпадают`,
        });
      }
    };
    return { form, valid, rePassword, sendForm };
  },
});
</script>

<style scoped lang="scss"></style>
