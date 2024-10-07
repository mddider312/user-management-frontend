<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="max-w-2xl mx-auto p-8 hover:shadow-2xl shadow-lg transition duration-300">
      <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div v-if="users.length > 0">
        <table class="min-w-full border-collapse border border-gray-300 text-left">
          <thead class="bg-gray-50">
            <tr class="border border-spacing-x-1 border-spacing-y-1">
              <th class="p-2">Name</th>
              <th>Email</th>
              <th>Approved</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border">
              <td class="border p-2">{{ user.name }}</td>
              <td class="border">{{ user.email }}</td>
              <td class="border">{{ user.is_approved ? 'Yes' : 'No' }}</td>
              <td class="border">
                <button
                  v-if="!user.is_approved"
                  @click="approveUser(user.id)"
                  class="bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-1 px-3 rounded"
                >Approve</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="message" class="mt-4 text-red-600">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
        message: ''
      };
    },
    async mounted() {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get('http://localhost:8000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.users = response.data;
      } catch (error) {
        this.message = 'Failed to fetch users.';
      }
    },
    methods: {
      async approveUser(id) {
        try {
          const token = localStorage.getItem('auth_token');
          await axios.put(`http://localhost:8000/api/admin/approve/${id}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.message = 'User approved successfully.';
          this.users = this.users.map(user =>
            user.id === id ? { ...user, is_approved: true } : user
          );
        } catch (error) {
          this.message = 'Failed to approve user.';
        }
      }
    }
  };
  </script>
  