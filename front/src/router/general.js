// Import Modules
import error404 from '@/modules/Error404'
import login from '@/modules/Login'
import register from '@/modules/Register'
import dashboard from '@/modules/Admin/Dashboard'
import userDashboard from '@/modules/User/Dashboard'
import userTasks from '@/modules/User/Tasks'

export default [
    // Home Page
    { path: '/', redirect: '/login' },

    // Errors
    { path: '*',  component: error404 },

    // Auth
    { path: '/login', name: 'login', component: login, meta: { guest: true } },
    { path: '/register', name: 'register', component: register, meta: { guest: true } },

    // Admin
    { path: '/admin/dashboard', name: 'admin.dashboard', component: dashboard, meta: { auth: true } },

    // User
    { path: '/user/dashboard', name: 'user.dashboard', component: userDashboard, meta: { auth_user: true } },
    { path: '/user/tasks', name: 'user.tasks', component: userTasks, meta: { auth_user: true } },
]