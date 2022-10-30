<script setup>
import { ref } from "vue";
import { getList, deleteUser } from "../../api";
import UserSaveForm from "./slices/UserSaveForm.vue";

const loading = ref(true);
const isFormOpened = ref(false);
const users = ref([]);
const selectedUser = ref(null);

function openForm(user) {
  if (user) {
    selectedUser.value = user;
  }

  isFormOpened.value = true;
}

function onUpdate(newUsers) {
  users.value = newUsers;
  onClose();
}

function onClose() {
  isFormOpened.value = false;
  selectedUser.value = null;
}

async function _deleteUser(id) {
  if (id) {
    try {
      loading.value = true;
      users.value = await new Promise((resolve) => {
        setTimeout(() => resolve(deleteUser(id)), 50);
      });
    } catch (error) {
      alert(error.message);
    } finally {
      loading.value = false;
    }
  }
}

async function fetch() {
  try {
    users.value = await new Promise((resolve) =>
      setTimeout(() => resolve(getList()), 1000)
    );
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

fetch();
</script>

<template>
  <template v-if="loading"> Загрузка... </template>
  <template v-else>
    <user-save-form
      v-if="isFormOpened"
      :user="selectedUser"
      class="mb"
      @update="onUpdate"
      @close="onClose"
    />
    <table>
      <thead>
        <th>ФИО</th>
        <th>Дата рождения</th>
        <th>Любимая книга</th>
        <th>Пол</th>
        <th>Навыки</th>
        <th>
          <button type="button" @click="openForm()" :disabled="isFormOpened">
            Добавить
          </button>
        </th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th>{{ user.name }}</th>
          <th>{{ user.birthday }}</th>
          <th>{{ user.book }}</th>
          <th>{{ user.sex }}</th>
          <th>{{ user.skills.join(", ") }}</th>
          <th>
            <div class="flex-list">
              <button
                type="button"
                @click="openForm(user)"
                :disabled="isFormOpened"
              >
                Редактировать
              </button>
              <button type="button" @click="_deleteUser(user.id)">
                Удалить
              </button>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </template>
</template>

<style scoped>
table,
th,
td {
  border: 1px solid;
  padding: 0.5rem;
}
</style>
