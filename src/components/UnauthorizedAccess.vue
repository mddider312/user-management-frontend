<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8">
      <h1 class="text-2xl font-bold text-red-600">Unauthorized Access</h1>
      <p class="mt-4 text-gray-700">You do not have permission to access this page.</p>
      <router-link to="/login">
        <button class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Login
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnauthorizedAccess', // Updated name
};
</script>

<style scoped>
/* You can add any additional styles you need here */
</style>
