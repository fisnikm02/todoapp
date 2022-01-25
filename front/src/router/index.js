// Import
import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import general from './general'
import users from './users'
import admin from './admin'

Vue.use(VueRouter)

var allRoutes = []
allRoutes = allRoutes.concat(general, users, admin)
const routes = allRoutes
const router = new VueRouter({
    mode: 'history',
    routes
})

// Middlewares
router.beforeEach((to, from, next) => {
    // Redirect to route
    let redirectToRoute = function(name) {
		if (name === from.name) {
			next()
			return
        }
        
		next({ name: name })
    }
    
    // Get logged user
    let loggedUser = store.getters.getLoggedUser

    // Check if access token expired
	if (loggedUser) {
		let currentDateTime = new Date().getTime()
		if (currentDateTime > loggedUser.expiryDate) {
            store.dispatch('logOut')
            return redirectToRoute('login')
		}
	}

    // Auth
    if (to.meta.auth) {
        if (loggedUser && loggedUser.role == 'admin')
            return next()
        else
            return redirectToRoute('login')
    }

     // User
     if (to.meta.auth_user) {
        if (loggedUser && loggedUser.role == 'user')
            return next()
        else
            return redirectToRoute('login')
    }

    // Guest
    if (to.meta.guest) {
        if (loggedUser && loggedUser.role == 'admin')
            return redirectToRoute('admin.dashboard')
        else if(loggedUser && loggedUser.role == 'user')
            return redirectToRoute('user.dashboard')
        else
            return next()
    }

    next()
})

export default router