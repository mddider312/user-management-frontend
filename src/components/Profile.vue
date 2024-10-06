<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="max-w-md mx-auto p-8">
      <h1 class="text-2xl font-bold mb-4">Profile</h1>
      <div v-if="user">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Approved:</strong> {{ user.is_approved ? 'Yes' : 'No' }}</p>
      </div>
      <p v-if="message" class="mt-4 text-red-600">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null,
        message: ''
      };
    },
    async mounted() {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.user = response.data;
      } catch (error) {
        this.message = 'You must be logged in to view this page.';
        this.$router.push('/login');  // Redirect to login if not authenticated
      }
    }
  };
  </script>
  