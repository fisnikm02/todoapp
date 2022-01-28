import Vue from "vue"
export default {
  data() {
    return {};
  },
  methods: {
    image: function (name) {
      try {
        return require("@/assets/images/" + name);
      } catch (error) {
        return;
      }
    },
    notify: function (type, title, text) {
      Vue.notify({
        group: "notify",
        type: type,
        title: title,
        text: String(text),
      });
      return 1;
    },
    go_after: function (sec) {
      setTimeout(() => {
        this.$router.go();
      }, sec);
    }
  },
};
