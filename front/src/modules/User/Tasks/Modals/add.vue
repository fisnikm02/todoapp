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
                <label for="">{{ $t("auth.name") }}</label>
                <input
                  type="text"
                  v-model="basicInfo.name"
                  class="form-control"
                />
              </div>
              <!-- <div class="form-group col">
                <label for="">{{ $t("auth.last_name") }}</label>
                <input
                  type="text"
                  v-model="basicInfo.last_name"
                  class="form-control"
                />
              </div> -->
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
  props: ['status'],
  data() {
    return {
      basicInfo: {
        name: "",
        image: "",
      },
    };
  },
  mounted() {},
  methods: {
    add: function () {
      let self = this;

      self.basicInfo['status'] = this.status

      self.$http
        .post(this.$backendUrl + "/tasks", self.basicInfo)
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
  },
};
</script>
