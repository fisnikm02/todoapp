<template>
  <div class="modal" role="dialog" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Task - Edit</h5>
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
                  v-model="row.name"
                  class="form-control"
                />
              </div>
              <div class="form-group col">
                <label for="">{{ $t("auth.status") }}</label>
                <select class="form-control" v-model="row.status">
                  <option value="0">Todo</option>
                  <option value="1">Doing</option>
                  <option value="2">Done</option>
                </select>
              </div>
              <div class="form-group col-12">
                <label for="">{{ $t("auth.description") }}</label>
                <textarea
                  v-model="row.description"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form-group col-12">
                <label for="">{{ $t("app.image") }}</label>
                <input type="file" class="form-control" ref="image" @change="createImage($refs.image.files[0])">

                <img v-if="image" id="img-task" :src="image" class="mt-2">
                <img v-else-if="row.image_url" id="img-task" :src="row.image_url" class="mt-2">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" @click="update" class="btn btn-primary">
            Save
          </button>
          <button type="button" @click="dtl" class="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['row'],
  data() {
    return {
      image: null,
      basicInfo: {}
    };
  },
  mounted() {
  },
  methods: {
    update: function () {
      let self = this;

      let form = new FormData;

      form.append('id', self.row.id);
      form.append('name', self.row.name);
      form.append('description', self.row.description);
      form.append('status', self.row.status);
      form.append('user_id', self.row.user_id);
      if(this.$refs.image.files[0]) form.append('image', this.$refs.image.files[0]);

      self.$http
        .post(this.$backendUrl + "/tasks/update", form)
        .then(() => {
          this.$router.go();
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
    dtl: function() {
      let self = this;

      self.$http
        .delete(this.$backendUrl + "/tasks", {data: { id: self.row.id } })
        .then(() => {
          this.$router.go();
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
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
