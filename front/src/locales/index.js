// Import
import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Config
Vue.use(VueI18n)

// Load messages
var messages = {
    en: {
        navbar: require('./en/navbar.json'),
        general: require('./en/general.json'),
        auth: require('./en/auth.json'),
        notFound: require('./en/404-not-found.json'),
        tasks: require('./en/tasks.json'),
        users: require('./en/users.json'),
    },
    de: {
        navbar: require('./de/navbar.json'),
        general: require('./de/general.json'),
        auth: require('./de/auth.json'),
        notFound: require('./de/404-not-found.json'),
        tasks: require('./de/tasks.json'),
        users: require('./de/users.json'),
    },
}

// Export VueI18n
export default new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: messages
})