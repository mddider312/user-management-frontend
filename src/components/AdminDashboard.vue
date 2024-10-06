<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="max-w-md mx-auto p-8">
      <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div v-if="users.length > 0">
        <table class="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Approved</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.is_approved ? 'Yes' : 'No' }}</td>
              <td>
                <button
                  v-if="!user.is_approved"
                  @click="approveUser(user.id)"
                  class="bg-green-500 text-white p-1 rounded"
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
  