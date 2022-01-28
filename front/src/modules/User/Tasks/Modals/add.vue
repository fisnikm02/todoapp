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
              <div class="form-group col-12">
                <label for="">{{ $t("auth.name") }}</label>
                <input
                  type="text"
                  v-model="basicInfo.name"
                  class="form-control"
                />
              </div>
              <div class="form-group col-12">
                <label for="">{{ $t("tasks.description") }}</label>
                <textarea
                  v-model="basicInfo.description"
                  class="form-control"
                ></textarea>
              </div>
              <div class="form-group col-12">
                <label for="">{{ $t("tasks.image") }}</label>
                <input
                  type="file"
                  ref="image"
                  class="form-control"
                  @change="createImage($refs.image.files[0])"
                />

                <img v-if="basicInfo.image" id="img-task" class="mt-2" :src="basicInfo.image">
              </div>
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
  props: ['status'],
  data() {
    return {
      basicInfo: {
        name: "",
        description: "",
        image: null
      },
    };
  },
  mounted() {},
  methods: {
    add: function () {
      let self = this;

      let form = new FormData;

      form.append('name', self.basicInfo.name);
      form.append('description', self.basicInfo.description);
      if(this.$refs.image.files[0]) form.append('image', this.$refs.image.files[0])
      form.append('status', this.status)

      self.$http
        .post(this.$backendUrl + "/tasks", form)
        .then(() => {
          this.notify('success', 'Task', 'Task added successfully');
          this.go_after(300)
        })
        .catch(() => {
        });
    },
    createImage: function(file){
        let reader = new FileReader();
        reader.onload = (e) =>{
            this.basicInfo.image = e.target.result;
        }
        reader.readAsDataURL(file)
    }
  },
};
</script>
