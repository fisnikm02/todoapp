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

          this.notify('success', 'Profile', 'Profile updated successfully');
          this.go_after(300)
        })
        .catch(() => {
          
        });
    },
  },
};
