// Import Modules
import userDashboard from '@/modules/User/Dashboard'
import userTasks from '@/modules/User/Tasks'
import userProfile from '@/modules/User/Profile'

export default [
    // User
    { path: '/user/dashboard', name: 'user.dashboard', component: userDashboard, meta: { auth_user: true } },
    { path: '/user/tasks', name: 'user.tasks', component: userTasks, meta: { auth_user: true } },
    { path: '/user/profile', name: 'user.profile', component: userProfile, meta: { auth_user: true } },
]