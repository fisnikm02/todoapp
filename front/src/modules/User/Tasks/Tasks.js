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
      authUser: this.$store.getters.getLoggedUser,
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
    get: function () {
      let self = this;

      self.todo = []; self.doing = []; self.done = [];

      let url = this.$backendUrl + '/tasks/user/' + self.authUser.id;
      self.$http
        .get(url)
        .then((res) => {
          let tasks = res.data;

          for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            
            let row = {
              id: task.id,
              name: task.name,
              description: task.description,
              image: task.image_url,
              status: task.status
            }
            if (task.status == 0)
              self.todo.push(row);
            else if (task.status == 1)
              self.doing.push(row)
            else
              self.done.push(row)
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
    log: function (evt, type) {
      let status = 0;

      if(type == 'doing') status = 1; else if(type == 'done') status = 2
      if(evt.added) {
        let data = {
          id: evt.added.element.id,
          name: evt.added.element.name,
          description: evt.added.element.description,
          status: status
        }
        this.$http.post(this.$backendUrl + '/tasks/update', data).then(() => {
        })
      } else {
        // remove item
      }
    }
  },
  components: { addModal, editModal, draggable }
};
