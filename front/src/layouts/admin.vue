<template>
    <div class="row w-100 m-0">
        <div class="sidebar col-4 col-md-2 m-0 p-0">
            <sidebar-component v-bind:activeMenu="activeMenu"/>
        </div>

        <div class="col-8 col-md-10 d-flex flex-column">
            <navbar-component/>
            <div class="w-100 h-screen d-flex flex-column">
                <main class="w-100 p-6">
                    <slot></slot>
                </main>
                <footer class="w-100 bg-white text-right p-4">{{ $t('general.copyright') }}  © {{ new Date().getFullYear() }}.</footer>
            </div>
        </div>
    </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/assets/css/general.css'
import sidebarComponent from '@/components/Sidebar'
import navbarComponent from '@/components/Navbar'

export default {
    name: 'Admin-Layout',
    props: ['activeMenu'],
    components: {
        sidebarComponent,
        navbarComponent,
    }
}
</script>