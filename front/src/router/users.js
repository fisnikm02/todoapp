// Import Modules
import users from '@/modules/Admin/Users'

export default [
    // Users
    { path: '/users', name: 'admin.users', component: users, meta: { auth: true } },
]