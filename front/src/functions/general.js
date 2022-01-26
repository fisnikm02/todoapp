export default {
  data() {
    return {};
  },
  methods: {
    image: function (name) {
      try {
        return require("@/assets/images/" + name);
      } catch (error) {
        return;
      }
    },
  },
};
