<template>
  <div class="modal" role="dialog" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t('tasks.task') }} - {{ $t('general.new') }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('toggleModal')"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row d-flex">
              <div class="form-group col">
                <label for="">{{ $t("auth.name") }}</label>
                <input
                  type="text"
                  v-model="basicInfo.name"
                  class="form-control"
                />
              </div>
              <div class="form-group col">
                <label for="">{{ $t("tasks.status") }}</label>
                <select v-model="basicInfo.status" class="form-control">
                  <option value="0">Todo</option>
                  <option value="1">Doing</option>
                  <option value="2">Done</option>
                </select>
              </div>
            </div>
            <div class="row d-flex">
              <div class="form-group col-6">
                <label for="">{{ $t("tasks.user") }}</label>
                <select class="form-control" v-model="basicInfo.user_id">
                  <option value="">Choose one!</option>
                  <option v-for="user in users" :key="user.id" :value="user.id">

                    {{ user.fullname }}
                  </option>
                </select>
              </div>
              <div class="form-group col-6">
                <label for="">{{ $t("tasks.image") }}</label>
                <input
                  type="file"
                  ref="image"
                  @change="createImage($refs.image.files[0])"
                />
                <img
                  v-if="basicInfo.image"
                  :src="basicInfo.image"
                  id="img-task"
                />
              </div>
            </div>
            <div class="row form-group col-12 m-0 p-0">
              <label for="">{{ $t('tasks.description') }}</label>
              <textarea class="form-control" v-model="basicInfo.description"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" @click="add" class="btn btn-primary">
            {{ $t('general.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      basicInfo: {
        name: "",
        image: null,
        status: 0,
        user_id: "",
        description: ''
      },
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get: function () {
      let self = this;

      self.$http
        .get(this.$backendUrl + "/users?page=1")
        .then((res) => {
          self.users = res.data.data.filter((x) => x.role == 'user');
        })
        .catch(() => {
          
        });
    },
    add: function () {
      let self = this;

      let form = new FormData;

      form.append('name', self.basicInfo.name);
      form.append('description', self.basicInfo.description);
      form.append('status', self.basicInfo.status);
      form.append('user_id', self.basicInfo.user_id);
      if(this.$refs.image.files[0]) form.append('image', this.$refs.image.files[0]);
      self.$http
        .post(this.$backendUrl + "/tasks", form)
        .then(() => {
          this.notify('success', 'Task', 'Task added successfully!')
          this.go_after(300);
        })
        .catch(() => {
        });
    },
    createImage: function (file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.basicInfo.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
