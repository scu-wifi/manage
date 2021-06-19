<template>
  <div class="log">
    <div style="padding-bottom: 10px">
      <el-button
        type="primary"
        @click="refreshEqlog()"
        size="small"
        style="margin-bottom: 10px"
        >刷新</el-button
      >
    </div>
    <el-table
      :data="logdata"
      border
      @selection-change="handleSelectionChange"
      stripe
      height="650"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        align="center"
        prop="date"
        label="操作时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="idEq"
        label="设备编号"
      ></el-table-column>
      <el-table-column
        header-align="center"
        align="left"
        prop="operation"
        label="操作来源"
      ></el-table-column>
      <el-table-column
        header-align="center"
        align="left"
        prop="loginName"
        label="操作者"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="left"
        prop="kindOp"
        label="操作"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      logdata: [
        {
          id: 1,
          date: "2021-05-17T12:50:45",
          idEq: "1",
          operation: "user",
          kindOp: "关闭",
          loginName: "user1",
        },
      ],
    };
  },
  mounted() {
    this.refreshEqlog();
  },
  methods: {
    refreshEqlog() {
      axios
        .get(this.$store.state.preurl + "/data/log-equpment/getall")
        .then((resp) => {
          this.logdata = resp;
        });
    },
  },
};
</script>
<style></style>
