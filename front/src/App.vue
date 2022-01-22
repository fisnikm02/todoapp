<template>
  <div id="app">
    <loader-component v-if="displayLoader" />

    <notifications group="notify" class="notify" />

    <router-view />
  </div>
</template>

<script>
import loaderComponent from "@/components/Loader";
import { mapGetters } from "vuex";
import axios from 'axios';
import store from './store';
import Vue from 'vue';

export default {
  name: "App",
  components: {
    loaderComponent,
  },
  computed: {
    ...mapGetters({
      displayLoader: "getDisplayLoader",
    }),
  },
  metaInfo() {
    return {
      title: this.$appName,
      titleTemplate: `%s - ` + this.$appName,
    };
  },
  created() {
    axios.interceptors.request.use(
      (config) => {
        store.dispatch("displayLoader", true);

        return config;
      },
      (error) => {
        store.dispatch("displayLoader", false);

        return Promise.reject(error);
      }
    );

    // Response Interceptor
    axios.interceptors.response.use(
      (response) => {
        store.dispatch("displayLoader", false);

        return response;
      },
      (error) => {
        store.dispatch("displayLoader", false);

        var errors = error;

        if (error.response) {
          // Session Expired
          if (401 === error.response.status) {
            errors = error.response.data.message;
            store.dispatch("logOut");
          }

          // Errors from backend
          if (error.response.status == 422) {
            errors = "";

            for (var errorKey in error.response.data.errors) {
              for (
                var i = 0;
                i < error.response.data.errors[errorKey].length;
                i++
              ) {
                errors +=
                  String(error.response.data.errors[errorKey][i]) + "<br>";
              }
            }
          }

          // Backend error
          if (500 === error.response.status) {
            errors = error.response.data.message;
          }

          // 404
          if (error.response.status == 404) {
            errors = "Page not found";
          }
        }

        Vue.notify({
          group: "notify",
          type: "error",
          title: "Error",
          text: String(errors),
        });

        return Promise.reject(error);
      }
    );
  },
};
</script>
