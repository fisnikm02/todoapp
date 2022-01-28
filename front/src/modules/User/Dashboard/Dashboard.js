export default {
  name: "Dashboard-Module",
  metaInfo: function() {
    return {
      title: this.$t("navbar.dashboard"),
    };
  },
  data() {
    return {
      authUser: this.$store.getters.getLoggedUser,
      count: {
        todo: 0,
        doing: 0,
        done: 0
      }
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get: function () {
      let self = this;

      self.$http
        .get(this.$backendUrl + "/tasks/user/" + self.authUser.id)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            let row = res.data[i];

            if (row.status == 0) self.count.todo += 1;
            else if (row.status == 1) self.count.doing += 1;
            else self.count.done += 1;
          }
        })
        .catch(() => {
        });
    },
  }
};
