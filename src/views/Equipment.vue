<template>
  <div class="equipment">
    <el-card class="box-card" style="width: 400px" shadow="hover">
      <div slot="header" class="clearfix">
        <span style="font-family: 楷体">{{ user.name }}</span>
      </div>
      <div></div>
    </el-card>
    <el-switch
      active-text="开"
      inactive-text="关"
      active-color="#13ce66"
      inactive-color="#ff4949"
      v-model="value"
      :disabled="state"
      @change="tempeter"
    ></el-switch>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      value: false,
      state: false,
      eqstatedata: [],
    };
  },
  mounted() {},
  methods: {
    refersheq() {
      axios
        .get(this.$store.state.preurl + "/data/state-equpment/getall")
        .then((resp) => {
          if (resp) {
            this.eqstatedata = resp;
          }
        });
    },
    tempeter(value) {
      console.log(value);
    },
  },
};
</script>
<style></style>
