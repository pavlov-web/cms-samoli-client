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
      <div class="s-field">
        <s-input
          label="Повторите пароль"
          placeholder="Пароль"
          v-model="rePassword.val"
          type="password"
        />
      </div>
      <div class="s-d-flex s-jc-end s-ai-center">
        <s-button class="s-button--success s-ml-2" @click="sendForm">
          Зарегистрироваться
        </s-button>
      </div>
      <p class="s-text-small s-mt-3">
        Уже есть учетная запись?
        <router-link to="/auth/login">Войти</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { EToast } from "@/store/Toast/types";
import { EUser, IUserRegister } from "@/store/User/types";
import SButton from "@ui/SButton.vue";
import SInput from "@ui/SInput.vue";
import SValidate from "@ui/SValidate.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Register",
  components: { SValidate, SInput, SButton },

  setup() {
    const { dispatch, commit } = useStore();

    const errors = {
      email: "Некоректный E-mail",
      required: "Поле обязательно",
      min: "Минимальная длина пароля 6 символов",
    };
    const form = ref<IUserRegister>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
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
        dispatch(EUser.REGISTER, form.value);
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

<style scoped lang="scss">
.register {
  max-width: 380px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
  border: 1px solid #ebecec;
  padding: 60px 40px;
  background-color: #fff;
}
</style>
