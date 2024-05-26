<template>
  <div class="registration-form">
    <h1>Регистрация</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="name">Имя:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="phoneNumber">Номер телефона:</label>
        <input type="text" id="phoneNumber" v-model="phoneNumber" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label for="birthday">Дата рождения:</label>
        <input type="date" id="birthday" v-model="birthday" required>
      </div>
      <div class="form-group">
        <label>Пол:</label>
        <div>
          <label>
            <input type="radio" v-model="genderId" :value="1">
            Мужской
          </label>
        </div>
        <div>
          <label>
            <input type="radio" v-model="genderId" :value="2">
            Женский
          </label>
        </div>
      </div>
      <button type="submit">Зарегистрироваться</button>
      <button type="button" @click="resetForm">Сбросить</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      phoneNumber: '',
      password: '',
      birthday: '',
      genderId: null,
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:3000/register', {
          name: this.name,
          phoneNumber: this.phoneNumber,
          password: this.password,
          birthday: this.birthday,
          genderId: this.genderId,
        });
        console.log('Регистрация успешна:', response.data);
        this.resetForm();
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
      }
    },
    resetForm() {
      this.name = '';
      this.phoneNumber = '';
      this.password = '';
      this.birthday = '';
      this.genderId = null;
    }
  },
};
</script>

<style src="@/styles/global.css" scoped>
</style>
