export default {
  name: "Register-Module",
  metaInfo: function () {
    return {
      title: this.$t("auth.register"),
    };
  },
  data() {
    return {
      registerData: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender: "m",
      },
      errors: {
        first_name: false,
        last_name: false,
        email: false,
        password: false,
        gender: false,
      },
    };
  },
  methods: {
    register: function () {
      const self = this;

      // Clear Errors
      Object.keys(this.errors).forEach(function (key) {
        self.errors[key] = false;
      });

      // Ajax Request
      self.$http
        .post(this.$backendUrl + "/register", self.registerData)
        .then(() => {
          self.$router.push({ name: "login" });
        })
        .catch(() => {
        });
    },
  },
};
