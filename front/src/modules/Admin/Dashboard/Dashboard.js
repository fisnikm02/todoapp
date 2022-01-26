export default {
  name: "Dashboard-Module",
  metaInfo: function() {
    return {
      title: this.$t("navbar.dashboard"),
    };
  },
  data() {
    return {
      logs: []
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get: function () {
      let self = this;

      self.$http.get(this.$backendUrl + '/logs').then(res => {
        self.logs = res.data;
      })
    }
  }
};
