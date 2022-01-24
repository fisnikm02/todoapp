<template>
  <div class="modal" role="dialog" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Users - New</h5>
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
                  v-model="basicInfo.first_name"
                  class="form-control"
                />
              </div>
              <div class="form-group col">
                <label for="">{{ $t("auth.last_name") }}</label>
                <input
                  type="text"
                  v-model="basicInfo.last_name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="row d-flex">
              <div class="form-group col">
                <label for="">{{ $t("auth.email") }}</label>
                <input
                  type="text"
                  v-model="basicInfo.email"
                  class="form-control"
                />
              </div>
              <div class="form-group col">
                <label for="">{{ $t("auth.gender") }}</label>
                <select v-model="basicInfo.gender" class="form-control">
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
                  v-model="basicInfo.password"
                  class="form-control"
                />
              </div>
              <div class="form-group col">
                <label for="">{{ $t("auth.confirmation_password") }}</label>
                <input
                  type="password"
                  v-model="basicInfo.password_confirmation"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
                <label for="">Role</label>
                <select v-model="basicInfo.role" class="form-control">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
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
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender: "m",
        role: "user",
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
  },
};
</script>
