// Import Modules
import error404 from '@/modules/Error404'
import login from '@/modules/Login'
import dashboard from '@/modules/Dashboard'

export default [
    // Home Page
    { path: '/', redirect: '/login' },

    // Errors
    { path: '*',  component: error404 },

    // Auth
    { path: '/login', name: 'login', component: login, meta: { guest: true } },

    // Admin
    { path: '/admin/dashboard', name: 'admin.dashboard', component: dashboard, meta: { auth: true } },
]