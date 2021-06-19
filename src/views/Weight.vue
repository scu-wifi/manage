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
        style="margin-bottom: 10px"
        >按日期查询</el-button
      >
      <div class="block" style="margin-bottom: 15px">
        <span class="demonstration" style="margin-left: 10px; margin-right: 5px"
          >查询日期
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
    <div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        :data="
          tableData.slice(
            this.total - this.currentpage * this.pageSize,
            this.total - (this.currentpage - 1) * this.pageSize
          )
        "
        :default-sort="{ prop: 'date', order: 'descending' }"
        border
        @selection-change="handleSelectionChange"
        stripe
        height="500"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="weight" label="重量/kg"></el-table-column>
        <el-table-column label="操作">
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
      <el-pagination
        :page-size="pageSize"
        :pager-count="11"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentchange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      total: 0,
      pageSize: 8,
      currentpage: 1,
      loading: true,
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
  mounted() {
    this.$watch("tableData", function () {
      this.loading = false;
    });
  },
  methods: {
    refreshWeight() {
      axios
        .get(this.$store.state.preurl + "/data/weight/allweight")
        .then((resp) => {
          if (resp) {
            this.tableData = resp;
            this.total = resp.length;
          }
        });

      // this.filter = Array.from(new Set(this.filter));
      // console.log("set:" + this.filter);
    },
    currentchange: function (currentpage) {
      this.currentpage = currentpage;
    },
    delateRow(index, rows) {
      if (this.$store.state.user.chageRight === "允许修改") {
        rows.splice(index, 1);
        axios.delete(
          this.$store.state.preurl + "/data/weight/delete/" + rows[index].id
        );
      } else {
        this.$message({
          type: "warning",
          message: "您没有修改权限，如有需要，请联系系统管理员",
        });
      }
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
              this.total = resp.length;
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
