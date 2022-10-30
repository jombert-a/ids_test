<script setup>
import { cloneDeep } from "lodash";
import "v-calendar/dist/style.css";
import { ref } from "vue";
import { updateUser, createUser } from "../../../api";

const emits = defineEmits(["update", "close"]);
const props = defineProps({
  user: {
    type: Object,
    required: false,
  },
});

const loading = ref(false);

const calendarModelConfig = {
  type: "string",
  mask: "YYYY-MM-DD",
};

const user = ref(
  cloneDeep(props.user) || {
    name: "",
    birthday: "",
    book: "",
    sex: "",
    skills: [],
  }
);

const title = props.user
  ? "Форма редактирования пользователя"
  : "Форма добавления пользователя";

const buttonTitle = props.user ? "Сохранить" : "Добавить";

async function onSumbit() {
  try {
    loading.value = true;
    if (props.user) {
      const users = await new Promise((resolve) => {
        setTimeout(() => resolve(updateUser(user.value)), 500);
      });

      emits("update", users);
    } else {
      const users = await new Promise((resolve) => {
        setTimeout(() => resolve(createUser(user.value)), 500);
      });

      emits("update", users);
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="onSumbit">
    <h2>{{ title }}</h2>
    <label class="mb-small" v-if="user.id">
      <span>id</span>
      <input type="text" v-model="user.id" disabled />
    </label>

    <label class="mb-small">
      <span>Имя</span>
      <input type="text" v-model="user.name" />
    </label>

    <label class="mb-small">
      <span>День рождения</span>
      <DatePicker
        :model-config="calendarModelConfig"
        mode="date"
        v-model="user.birthday"
      />
    </label>

    <label class="mb-small">
      <span>Любимая книга</span>
      <select v-model="user.book">
        <option>Harry Potter</option>
        <option>Test book</option>
      </select>
    </label>

    <div class="mb-small">
      <span>Пол</span>
      <div class="flex-list">
        <label for="sex_man">мужчина</label>
        <input type="radio" id="sex_man" v-model="user.sex" value="мужчина" />
        <label for="sex_woman">женщина</label>
        <input type="radio" id="sex_woman" v-model="user.sex" value="женщина" />
      </div>
    </div>

    <div class="flex-list">
      <button type="submit">{{ buttonTitle }}</button>
      <button type="button" @click="emits('close')">Закрыть</button>
    </div>
  </form>
</template>

<style scoped>
label {
  display: flex;
  flex-direction: column;
}

input,
select {
  max-width: 250px;
}

form {
  border: 1px solid black;
  padding: 0.5rem;
}
</style>
