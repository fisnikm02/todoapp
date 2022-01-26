<template>
  <div class="modal" role="dialog" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Task - New</h5>
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
                <label for="">{{ $t("app.status") }}</label>
                <select v-model="basicInfo.status" class="form-control">
                  <option value="0">Todo</option>
                  <option value="1">Doing</option>
                  <option value="2">Done</option>
                </select>
              </div>
            </div>
            <div class="row d-flex">
              <div class="form-group col-6">
                <label for="">{{ $t("auth.user") }}</label>
                <input
                  type="text"
                  v-model="basicInfo.user_id"
                  class="form-control"
                />
              </div>
              <div class="form-group col-6">
                <label for="">{{ $t("app.image") }}</label>
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
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" @click="add" class="btn btn-primary">
            Save
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
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
      basicInfo: {
        name: "",
        image: null,
        status: 0,
        user_id: "",
      },
    };
  },
  mounted() {},
  methods: {
    add: function () {
      let self = this;

      self.$http
        .post(this.$backendUrl + "/users", self.basicInfo)
        .then(() => {
          this.$router.push({ name: "admin.users" });
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
