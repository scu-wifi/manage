<template>
  <div class="equipment">
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
export default {
  data() {
    return {
      value: false,
      state: false,
    };
  },
  methods: {
    tempeter(value) {
      console.log(value);
    },
  },
};
</script>
<style></style>
