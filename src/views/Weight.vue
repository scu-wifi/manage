<template>
  <div>
    <!-- show-summary -->
    <div style="padding-bottom: 10px">
      <el-button
        class="topbutton"
        type="primary"
        size="medium "
        @click="refreshWeight()"
        >全页刷新</el-button
      >
      <el-button
        type="primary"
        size="medium"
        @click="querybydate"
        class="topbutton"
        >按日期查询</el-button
      >
      <div class="block">
        <span class="demonstration" style="margin-left: 10px; margin-right: 5px"
          >筛选日期
        </span>
        <el-date-picker
          v-model="value1"
          is-range
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </div>
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
      value1: [new Date(), new Date()],
      tableData: [],
      selectbydate: {
        begin: null,
        end: null,
      },
    };
  },
  beforeMount() {
    this.refreshWeight();
  },
  mounted() {},
  methods: {
    refreshWeight() {
      axios
        .get(this.$store.state.preurl + "/data/weight/allweight")
        .then((resp) => {
          if (resp) {
            this.tableData = resp;
          }
        });

      // this.filter = Array.from(new Set(this.filter));
      // console.log("set:" + this.filter);
    },
    delateRow(index, rows) {
      rows.splice(index, 1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    querybydate() {
      this.selectbydate.begin = this.value1[0];
      this.selectbydate.end = this.value1[1];
      if (this.selectbydate.begin < this.selectbydate.end) {
        console.log(this.selectbydate);
        axios
          .put(
            this.$store.state.preurl + "/data/weight/getweightbydate",
            this.selectbydate
          )
          .then((resp) => {
            if (resp) {
              this.tableData = resp;
            }
          });
      } else {
        this.$message({
          type: "error",
          message: "日期设置错误，请重新设置",
        });
      }
    },
  },
};
</script>
<style>
.block {
  margin: 0 10px 0 10px;
  padding-bottom: 10px;
  float: left;
}
.topbutton {
  margin: 2px;
  float: left;
}
</style>
