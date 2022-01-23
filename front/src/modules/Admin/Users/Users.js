import addModal from './Modals/add'
export default {
  name: "Dashboard-Module",
  metaInfo: function () {
    return {
      title: this.$t("navbar.dashboard"),
    };
  },
  data() {
    return {
      searchInput: "",
      users: [],
      showAddModal: true
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    toggleModalNew: function () {
      this.showAddModal = !this.showAddModal;
    },
    get: function (search = '', page = 1) {
      let self = this;

      self.users = [];
      
      let url = this.$backendUrl + '/users?page=' + page + ((search != '') ? '&search=' + search : '')
      self.$http
        .get(url)
        .then((res) => {
          self.users = res.data.data;
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
    search: function() {
      this.get(this.searchInput);
    }
  },
  components: { addModal }
};
