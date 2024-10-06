import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import Profile from '../components/Profile.vue';
import AdminDashboard from '../components/AdminDashboard.vue';
import UnauthorizedAccess from '../components/UnauthorizedAccess.vue';

// Define your routes
const routes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  {
    path: '/admin',
    name: 'adminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }, // Only admin can access this
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true, role: 'user' }, // Only regular users can access this
  },
  {
    path: '/unauthorized',
    name: 'UnauthorizedAccess',
    component: UnauthorizedAccess, // Component to show unauthorized access
  },
];

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication and authorization
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth_token'); // Check if user is authenticated
  const user = JSON.parse(localStorage.getItem('user_data')); // Get user data

  // If route requires authentication and user is not authenticated, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } 
  // If the user is not authorized (wrong role), redirect to unauthorized page
  else if (to.meta.role && (!user || user.role !== to.meta.role)) {
    next({ name: 'UnauthorizedAccess' });
  } else {
    next(); // Allow access
  }
});

export default router;
