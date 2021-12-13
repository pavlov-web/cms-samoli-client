<template>
  <div class="page short-card">
    <!--  todo: Добавить статус(Принят, В работе, Отказ, Перезвонит, Оплачен)  -->
    <!--  todo: Способ оплаты(Разовый платеж, Рассрочка)  -->
    <!--  todo: Статус портфолио(Не обработана, Редактировать)  -->
    <div class="s-d-flex s-flex-wrap">
      <div class="s-col-3">
        <div class="s-field">
          <s-input placeholder="ФИО" label="ФИО клиента" />
        </div>
        <div class="s-field">
          <s-input placeholder="+7 (___) ___-__-__" label="Номер телефона" />
        </div>
      </div>
      <div class="s-col-3">
        <div class="s-field">
          <s-input placeholder="Адресс" label="Адресс клиента" />
        </div>
        <div class="s-field">
          <s-input placeholder="__-__-____ г." label="Дата сдачи" />
        </div>
      </div>
      <div class="s-col-3">
        <div class="s-field">
          <s-input placeholder="1.000.000 руб." label="Выручка" />
        </div>
        <div class="s-field">
          <s-input placeholder="1.000.000 руб." label="Полная стоимость" />
        </div>
      </div>
      <div class="s-col-3">
        <div class="s-field">
          <s-textarea
            label="Дополнительное описание"
            v-model="val"
            placeholder="Описание"
          />
        </div>
      </div>
      <div class="s-col-12">
        <div class="s-field">
          <s-upload label="Добавьте фото" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SInput from "@ui/SInput/SInput.vue";
import STextarea from "@ui/STextarea.vue";
import SUpload from "@ui/SUpload.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ShortCard",
  components: { STextarea, SUpload, SInput },
  props: {},

  setup() {
    const val = ref("");

    return { val };
  },
});
</script>

<style scoped lang="scss">
.short-card {
  .s-input,
  .s-textarea {
    width: 100%;
  }
}
</style>
