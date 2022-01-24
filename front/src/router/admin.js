// Import Modules
import users from '@/modules/Admin/Users'
import dashboard from '@/modules/Admin/Dashboard'

export default [
    // Admin
    { path: '/admin/dashboard', name: 'admin.dashboard', component: dashboard, meta: { auth: true } },
    { path: '/admin/users', name: 'admin.users', component: users, meta: { auth: true } },
]