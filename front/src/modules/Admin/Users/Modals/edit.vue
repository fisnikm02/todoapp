<template>
  <div class="modal" role="dialog" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Users - Edit</h5>
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
                  v-model="row.first_name"
                  class="form-control"
                />
              </div>
              <div class="form-group col">
                <label for="">{{ $t("auth.last_name") }}</label>
                <input
                  type="text"
                  v-model="row.last_name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row d-flex">
              <div class="form-group col">
                <label for="">{{ $t("auth.email") }}</label>
                <input
                  type="text"
                  v-model="row.email"
                  class="form-control"
                />
              </div>
              <div class="form-group col">
                <label for="">{{ $t("auth.gender") }}</label>
                <select v-model="row.gender" class="form-control">
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select>
              </div>
            </div>
            <div class="row d-flex">
              <div class="form-group col">
                <label for="">{{ $t("auth.password") }}</label>
                <input
                  type="password"
                  v-model="row.password"
                  class="form-control"
                />
              </div>
              <div class="form-group col">
                <label for="">{{ $t("auth.confirmation_password") }}</label>
                <input
                  type="password"
                  v-model="row.password_confirmation"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
                <label for="">Role</label>
                <select v-model="row.role" class="form-control">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
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
      basicInfo: {}
    };
  },
  mounted() {
    console.log(this.row);
  },
  methods: {
    update: function () {
      let self = this;

      self.$http
        .put(this.$backendUrl + "/users", self.row)
        .then(() => {
          this.notify('success', 'User', 'User edited successfully');
          this.go_after(300)
        })
        .catch(() => {
        });
    },
    dtl: function () {
      let self = this;

      self.$http
        .delete(this.$backendUrl + "/users", { data: { id: self.row.id } })
        .then(() => {
          this.notify('success', 'User', 'User deleted successfully');
          this.go_after(300)
        })
        .catch(() => {
        });
    }
  },
};
</script>
