import addModal from './Modals/add'
import editModal from './Modals/edit'
import draggable from "vuedraggable";
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
      row: [],
      status: 0,
      showAddModal: false,
      showEditModal: false,
      todo: [],
      doing: [],
      done: []
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

      self.users = [];

      let url = this.$backendUrl + '/tasks' + ((search != '') ? '?search=' + search : '')
      self.$http
        .get(url)
        .then((res) => {
          let tasks = res.data;

          for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            if (task.status == 0)
              self.todo.push({
                name: task.name,
                id: task.id
              });
            else if (task.status == 1)
              self.doing.push({
                name: task.name,
                id: task.id
              })
            else
              self.done.push({
                name: task.name,
                id: task.id
              })
          }
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
    search: function () {
      this.get(this.searchInput);
    },
    add: function () {
      this.list.push({ name: "Juan" });
    },
    replace: function () {
      this.list = [{ name: "Edgard" }];
    },
    clone: function (el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function (evt, type) {
      let status = 0;

      if(type == 'doing') status = 1; else if(type == 'done') status = 2
      if(evt.added) {
        let data = {
          id: evt.added.element.id,
          name: evt.added.element.name,
          status: status
        }
        this.$http.put(this.$backendUrl + '/tasks', data).then(() => {
        })
      } else {
        // remove item
      }
    }
  },
  components: { addModal, editModal, draggable }
};
