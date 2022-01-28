export default {
  name: "Login-Module",
  metaInfo: function () {
    return {
      title: this.$t("auth.login"),
    };
  },
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
      errors: {
        email: false,
        password: false,
      },
    };
  },
  methods: {
    login: function () {
      const self = this;

      // Clear Errors
      Object.keys(this.errors).forEach(function (key) {
        self.errors[key] = false;
      });

      // Ajax Request
      self.$http
        .post(this.$backendUrl + "/login", self.loginData)
        .then((res) => {
          self.$store.commit("LOGGED_USER", res.data);
          if(res.data.role == 'admin')
            self.$router.push({ name: "admin.dashboard" });
          else 
            self.$router.push({ name: "user.dashboard" });
        })
        .catch(() => {
        });
    },
  },
};
