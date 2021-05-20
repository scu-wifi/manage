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
      <el-table-column
        prop="date"
        label="日期"
        width="180"
        :filters="filter"
        :filter-method="filterHandler"
        filter-placement="bottom-end"
      >
      </el-table-column>
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
      filter: [],
      tableData: [],
    };
  },
  beforeMount() {
    this.refreshWeight();
  },
  mounted() {
    this.select();
    console.log(this.filter);
    let a = this.filter;
    this.filter = a;
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

      // this.filter = Array.from(new Set(this.filter));
      // console.log("set:" + this.filter);
    },
    select() {
      this.tableData.forEach((element) => {
        console.log("element:" + JSON.stringify(element));
        let ele = element.date;
        console.log("ele:" + ele);
        let valuele = ele.substring(0, 10);
        this.filter.push({ text: valuele, value: ele });
        console.log(this.filter);
      });
    },
    delateRow(index, rows) {
      rows.splice(index, 1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    filterHandler(value, row, column) {
      console.log(
        "value:" +
          value +
          "row: " +
          JSON.stringify(row) +
          "\r\ncolumn:" +
          JSON.stringify(column)
      );
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>
<style></style>
