<template>
  <div>
    person
    <el-button type="primary" size="mini" @click="getmessage"> log</el-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  onload() {},
  methods: {
    getmessage() {
      axios
        .get(
          this.$store.state.weburl +
            "/user/gercurrenuser/" +
            this.$store.state.user.id
        )
        .then((resp) => {
          console.log();
        });
    },
  },
};
</script>
<style></style>
