import addModal from './Modals/add'
import editModal from './Modals/edit'
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
      tasks: [],
      row: [],
      showAddModal: false,
      showEditModal: false
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    toggleModalNew: function () {
      this.showAddModal = !this.showAddModal;
    },
    toggleModalEdit: function () {
      this.showEditModal = !this.showEditModal;
    },
    get: function (search = '') {
      let self = this;

      self.tasks = [];
      
      let url = this.$backendUrl + '/tasks' + ((search != '') ? '?search=' + search : '')
      self.$http
        .get(url)
        .then((res) => {
          self.tasks = res.data;
        })
        .catch(() => {
          
        });
    },
    search: function() {
      this.get(this.searchInput);
    }
  },
  components: { addModal, editModal }
};
