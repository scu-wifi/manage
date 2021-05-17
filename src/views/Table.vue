<template>
  <div>
    <!-- show-summary -->
    <div style="padding-bottom: 10px">
      <el-button type="primary" size="small" @click="refreshWeight()"
        >刷新</el-button
      >
    </div>

    <el-table
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="weight" label="重量" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="delateRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.refreshWeight();
  },
  methods: {
    refreshWeight() {
      axios
        .get(this.$store.state.preurl + "/data/weight/allweight")
        .then((resp) => {
          if (resp) {
            this.tableData = resp;
          }
        });
    },
    delateRow(index, rows) {
      rows.splice(index, 1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style></style>
