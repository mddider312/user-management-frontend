<template>
  <div id="app">
    <header class="bg-blue-600 text-white p-4">
      <nav class="flex justify-between items-center">
        <router-link to="/" class="text-lg font-bold">My App</router-link>
        <div>
          <router-link v-if="!isAuthenticated" to="/login" class="mr-4">Login</router-link>
          <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
          <router-link v-if="isAuthenticated" to="/profile" class="mr-4">Profile</router-link>
          <router-link v-if="isAdmin" to="/admin" class="mr-4">Admin</router-link>
          <button v-if="isAuthenticated" @click="logout" class="bg-red-500 p-2 rounded">Logout</button>
        </div>
      </nav>
    </header>
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      isAdmin: false,
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.isAuthenticated = true;
        const user = JSON.parse(localStorage.getItem('user_data'));
        this.isAdmin = user && user.role === 'admin';
      }
    },
    logout() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style>
/* You can add global styles here */
</style>
