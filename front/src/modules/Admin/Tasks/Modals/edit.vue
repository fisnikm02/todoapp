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
                <label for="">{{ $t("auth.first_name") }}</label>
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
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" @click="save" class="btn btn-primary">
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
      basicInfo: {}
    };
  },
  mounted() {
  },
  methods: {
    save: function () {
      let self = this;

      self.$http
        .put(this.$backendUrl + "/tasks", self.row)
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
        .delete(this.$backendUrl + "/tasks", self.row)
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
    }
  },
};
</script>
