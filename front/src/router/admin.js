// Import Modules
import dashboard from '@/modules/Admin/Dashboard'
import users from '@/modules/Admin/Users'
import profile from '@/modules/Admin/Profile'
import tasks from '@/modules/Admin/Tasks'

export default [
    // Admin
    { path: '/admin/dashboard', name: 'admin.dashboard', component: dashboard, meta: { auth: true } },
    { path: '/admin/users', name: 'admin.users', component: users, meta: { auth: true } },
    { path: '/admin/tasks', name: 'admin.tasks', component: tasks, meta: { auth: true } },
    { path: '/admin/profile', name: 'admin.profile', component: profile, meta: { auth: true } },
]