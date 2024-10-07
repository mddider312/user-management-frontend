<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="max-w-md mx-auto p-8 hover:shadow-2xl shadow-lg transition duration-300">
    <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
    <form @submit.prevent="login">
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
      >Login</button>
    </form>
    <p v-if="message" class="mt-4 text-red-600">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        localStorage.setItem('auth_token', token); 
        localStorage.setItem('user_data', JSON.stringify(response.data.user)); // Set user data as a string
        const user = response.data.user;

        if (user.role == 'admin') {
          this.$router.push('/admin'); // Redirect to admin dashboard
        }else{

          this.$router.push('/profile');  // Redirect to profile
        }
        
        // Save token for future requests
      } catch (error) {
        // this.message = 'Login failed. Please check your credentials.';
        this.message = error.response.data.message;
      }
    }
  }
};
</script>
