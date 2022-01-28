<template>
  <div class="modal" role="dialog" style="display: block">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t('tasks.task') }} - {{ $t('general.edit') }}</h5>
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
              <div class="form-group col-12">
                <label for="">{{ $t("auth.name") }}</label>
                <input type="text" v-model="row.name" class="form-control" />
              </div>
              <div class="form-group col-12">
                <label for="">{{ $t("tasks.description") }}</label>
                <textarea v-model="row.description" class="form-control"></textarea>
              </div>
              <div class="form-group col-12">
                <label for="">{{ $t("tasks.image") }}</label>
                <input type="file" class="form-control" ref="image" @change="createImage($refs.image.files[0])">
                
                <img v-if="image" id="img-task" :src="image" class="mt-2">
                <img v-else-if="row.image" id="img-task" :src="row.image" class="mt-2">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" @click="save" class="btn btn-primary">
            {{ $t('general.save') }}
          </button>
          <button type="button" @click="dtl" class="btn btn-danger">
            {{ $t('general.delete') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["row"],
  data() {
    return {
      image: null
    };
  },
  mounted() {},
  methods: {
    save: function () {
      let self = this;

      let form = new FormData;

      form.append('id', self.row.id);
      form.append('name', self.row.name);
      form.append('description', self.row.description);
      if(this.$refs.image.files[0]) form.append('image', this.$refs.image.files[0]);
      form.append('status', self.row.status)

      self.$http
        .post(this.$backendUrl + "/tasks/update", form)
        .then(() => {
          this.notify('success', 'Task', 'Task edited successfully');
          this.go_after(300)
        })
        .catch(() => {
        });
    },
    dtl: function () {
      let self = this;

      self.$http
        .delete(this.$backendUrl + "/tasks", { data: { id: self.row.id } })
        .then(() => {
          this.notify('success', 'Task', 'Task deleted successfully');
          this.go_after(300)
        })
        .catch(() => {
        });
    },
    createImage: function(file){
        let reader = new FileReader();
        reader.onload = (e) =>{
            this.image = e.target.result;
        }
        reader.readAsDataURL(file)
    }
  },
};
</script>