<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="max-w-md mx-auto p-8 hover:shadow-2xl shadow-lg transition duration-300">
      <h1 class="text-2xl font-bold mb-4">Register</h1>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium">Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="mt-1 p-2 block w-full border rounded"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded"
        >Register</button>
      </form>
      <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        message: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://localhost:8000/api/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          this.message = response.data.message;
        } catch (error) {
          this.message = 'Registration failed. Please try again.';
        }
      }
    }
  };
  </script>
  