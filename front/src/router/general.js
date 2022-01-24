// Import Modules
import error404 from '@/modules/Error404'
import login from '@/modules/Login'
import register from '@/modules/Register'

export default [
    // Home Page
    { path: '/', redirect: '/login' },

    // Errors
    { path: '*',  component: error404 },

    // Auth
    { path: '/login', name: 'login', component: login, meta: { guest: true } },
    { path: '/register', name: 'register', component: register, meta: { guest: true } },
]