export default {
  name: "Profile-Module",
  metaInfo: function () {
    return {
      title: this.$t("navbar.dashboard"),
    };
  },
  data() {
    return {
      authUser: this.$store.getters.getLoggedUser,
    };
  },
  methods: {
    update: function () {
      let self = this;

      self.$http
        .put(this.$backendUrl + "/users/profile", self.authUser)
        .then((res) => {
          self.$store.commit("UPDATE_LOGGED_USER", res.data);

          // console.log(self.authUser);
        })
        .catch((error) => {
          try {
            if (error.response.status == 422) {
              for (var errorKey in error.response.data.errors) {
                if (errorKey in self.errors) {
                  self.errors[errorKey] = true;
                }
              }
            }
          } catch (e) {
            console.log(e);
          }
        });
    },
  },
};
