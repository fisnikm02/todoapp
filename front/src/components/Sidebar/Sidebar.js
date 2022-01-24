export default {
    name: 'Sidebar-Component',
    props: ['activeMenu'],
    data() {
        return {
            authUser: this.$store.getters.getLoggedUser.token
        }
    }
}